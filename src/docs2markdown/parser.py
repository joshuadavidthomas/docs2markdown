from __future__ import annotations

import re
from typing import final

from pydantic import BaseModel
from pydantic import Field

from docs2markdown.tokenizer import TokenCounter

HEADING_PATTERN = re.compile(
    r"^(#{1,6})\s+(.+?)(?:\s*\{#([a-zA-Z0-9_-]+)\})?$", re.MULTILINE
)
CODE_FENCE_PATTERN = re.compile(r"^```(\w*)\n(.*?)^```$", re.MULTILINE | re.DOTALL)
HTML_CODE_PATTERN = re.compile(r"<pre><code[^>]*>(.*?)</code></pre>", re.DOTALL)
LINK_PATTERN = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")


class CodeBlock(BaseModel):
    model_config = {"frozen": True}

    language: str
    content: str
    start_pos: int = Field(ge=0)
    end_pos: int = Field(ge=0)


class Heading(BaseModel):
    model_config = {"frozen": True}

    pos: int = Field(ge=0)
    level: int = Field(ge=1, le=6)
    text: str


class Link(BaseModel):
    model_config = {"frozen": True}

    text: str
    href: str


class Section(BaseModel):
    model_config = {"arbitrary_types_allowed": True, "frozen": True}

    heading: str
    level: int = Field(ge=0, le=6)
    content: str
    subsections: tuple[Section, ...] = Field(default_factory=tuple)
    code_blocks: tuple[CodeBlock, ...] = Field(default_factory=tuple)
    links: tuple[Link, ...] = Field(default_factory=tuple)
    start_pos: int = Field(default=0, ge=0)
    end_pos: int = Field(default=0, ge=0)

    def full_content(self) -> str:
        if not self.subsections:
            return self.content

        result = [self.content.rstrip()]
        for subsection in self.subsections:
            result.append(subsection.full_content())
        return "\n\n".join(result)

    def token_count(self, counter: TokenCounter) -> int:
        return counter.count(self.full_content())

    def all_headings(self) -> list[str]:
        return [self.heading] + [
            h for sub in self.subsections for h in sub.all_headings()
        ]

    def code_languages(self) -> set[str]:
        languages = {cb.language for cb in self.code_blocks if cb.language}
        for subsection in self.subsections:
            languages.update(subsection.code_languages())
        return languages


def parse_markdown_structure(markdown: str) -> list[Section]:
    code_blocks = _extract_code_blocks(markdown)
    headings = _extract_headings(markdown)

    if not headings:
        links = _extract_links(markdown)

        return [
            Section(
                heading="",
                level=0,
                content=markdown,
                code_blocks=tuple(code_blocks),
                links=tuple(links),
                start_pos=0,
                end_pos=len(markdown),
            )
        ]

    section_tree = SectionTree(markdown, headings, code_blocks).build()

    return section_tree


def _extract_code_blocks(markdown: str) -> list[CodeBlock]:
    code_blocks: list[CodeBlock] = []

    for match in CODE_FENCE_PATTERN.finditer(markdown):
        code_blocks.append(
            CodeBlock(
                language=match.group(1),
                content=match.group(2),
                start_pos=match.start(),
                end_pos=match.end(),
            )
        )

    for match in HTML_CODE_PATTERN.finditer(markdown):
        if not any(
            match.start() >= cb.start_pos and match.end() <= cb.end_pos
            for cb in code_blocks
        ):
            code_blocks.append(
                CodeBlock(
                    language="",
                    content=match.group(1),
                    start_pos=match.start(),
                    end_pos=match.end(),
                )
            )

    return code_blocks


def _extract_headings(markdown: str) -> list[Heading]:
    return [
        Heading(
            pos=match.start(),
            level=len(match.group(1)),
            text=match.group(2).strip(),
        )
        for match in HEADING_PATTERN.finditer(markdown)
    ]


def _extract_links(markdown: str) -> list[Link]:
    return [
        Link(text=m.group(1), href=m.group(2)) for m in LINK_PATTERN.finditer(markdown)
    ]


@final
class SectionTree:
    def __init__(
        self, markdown: str, headings: list[Heading], code_blocks: list[CodeBlock]
    ) -> None:
        self.markdown = markdown
        self.headings = headings
        self.code_blocks = code_blocks

    def build(self) -> list[Section]:
        if not self.headings:
            return []

        root_sections: list[Section] = []
        i = 0

        while i < len(self.headings):
            root_level = self.headings[i].level

            j = i + 1
            while j < len(self.headings) and self.headings[j].level > root_level:
                j += 1

            root_end_pos = (
                self.headings[j].pos if j < len(self.headings) else len(self.markdown)
            )

            child_indices = list(range(i + 1, j))

            section = self._build_section(i, root_end_pos, child_indices)
            root_sections.append(section)

            i = j

        return root_sections

    def _build_section(
        self, heading_idx: int, end_pos: int, child_indices: list[int]
    ) -> Section:
        heading = self.headings[heading_idx]
        start_pos = heading.pos

        if child_indices:
            first_child_pos = self.headings[child_indices[0]].pos
            own_content = self.markdown[start_pos:first_child_pos]
            content_end = first_child_pos
        else:
            own_content = self.markdown[start_pos:end_pos]
            content_end = end_pos

        own_code_blocks = tuple(
            cb
            for cb in self.code_blocks
            if cb.start_pos >= start_pos and cb.end_pos <= content_end
        )

        own_links = tuple(_extract_links(own_content))

        subsections: list[Section] = []
        i = 0
        while i < len(child_indices):
            child_idx = child_indices[i]
            child_level = self.headings[child_idx].level

            child_end_idx = i + 1
            while child_end_idx < len(child_indices):
                if self.headings[child_indices[child_end_idx]].level <= child_level:
                    break
                child_end_idx += 1

            if child_end_idx < len(child_indices):
                child_end_pos = self.headings[child_indices[child_end_idx]].pos
            else:
                child_end_pos = end_pos

            grandchild_indices = child_indices[i + 1 : child_end_idx]

            subsection = self._build_section(
                child_idx, child_end_pos, grandchild_indices
            )
            subsections.append(subsection)

            i = child_end_idx

        return Section(
            heading=heading.text,
            level=heading.level,
            content=own_content,
            subsections=tuple(subsections),
            code_blocks=own_code_blocks,
            links=own_links,
            start_pos=start_pos,
            end_pos=end_pos,
        )
