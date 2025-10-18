from __future__ import annotations

import hashlib
from dataclasses import dataclass
from dataclasses import field
from enum import Enum
from pathlib import Path

from pydantic import BaseModel
from pydantic import Field

from docs2markdown.parser import Link
from docs2markdown.parser import Section
from docs2markdown.parser import parse_markdown_structure
from docs2markdown.tokenizer import CharEstimateCounter
from docs2markdown.tokenizer import TokenCounter


@dataclass
class ChunkingContext:
    source_path: Path
    headings: list[str] = field(default_factory=list)

    def extend_heading(self, heading: str | None) -> ChunkingContext:
        if not heading:
            return self
        return ChunkingContext(
            source_path=self.source_path,
            headings=self.headings + [heading],
        )


class ChunkStrategy(Enum):
    NONE = "none"
    HEADING = "heading"
    TOKEN = "token"
    HYBRID = "hybrid"


class Chunk(BaseModel):
    model_config = {"frozen": True}

    content: str
    source_file_id: str
    headings: tuple[str, ...] = Field(default_factory=tuple)
    order: int = Field(ge=0)
    level: int = Field(ge=0, le=6)
    tokens: int = Field(ge=0)
    code_languages: set[str] = Field(default_factory=set)
    links_out: tuple[Link, ...] = Field(default_factory=tuple)

    @property
    def id(self) -> str:
        return _generate_chunk_id(self.content, list(self.headings), self.order)

    @property
    def char_count(self) -> int:
        return len(self.content)

    def to_dict(self, include_content: bool = True) -> dict:
        """Serialize the chunk including computed properties."""
        data = self.model_dump(mode="json")
        data["id"] = self.id
        data["char_count"] = self.char_count
        # Ensure consistent ordering of code_languages
        if "code_languages" in data:
            data["code_languages"] = sorted(data["code_languages"])
        if not include_content:
            data.pop("content", None)
        return data


class MarkdownChunker:
    def __init__(
        self,
        max_tokens: int = 1000,
        overlap_tokens: int = 100,
        strategy: ChunkStrategy = ChunkStrategy.HEADING,
        counter: TokenCounter | None = None,
    ) -> None:
        self.max_tokens: int = max_tokens
        self.overlap_tokens: int = overlap_tokens
        self.strategy: ChunkStrategy = strategy
        self.counter: TokenCounter = counter or CharEstimateCounter()
        self._chunk_order: int = 0

    def chunk(self, markdown: str, source_path: Path) -> list[Chunk]:
        self._chunk_order = 0
        ctx = ChunkingContext(source_path=source_path)
        sections = parse_markdown_structure(markdown)

        if self.strategy == ChunkStrategy.NONE:
            return [
                self._create_chunk(
                    content=markdown,
                    ctx=ctx,
                    sections=sections,
                )
            ]

        chunks: list[Chunk] = []

        for section in sections:
            section_chunks = self._chunk_section(section, ctx)
            chunks.extend(section_chunks)

        if self.overlap_tokens > 0:
            chunks = self._apply_overlap(chunks)

        return chunks

    def _create_chunk(
        self,
        content: str,
        ctx: ChunkingContext,
        sections: list[Section] | None = None,
        level: int = 0,
    ) -> Chunk:
        code_languages: set[str] = set()
        links: list[Link] = []

        if sections:
            for section in sections:
                code_languages.update(section.code_languages())
                links.extend(section.links)
            if sections:
                level = sections[0].level

        content = content.strip("\n")

        chunk = Chunk(
            content=content,
            source_file_id=ctx.source_path.name,
            headings=tuple(ctx.headings),
            order=self._chunk_order,
            level=level,
            tokens=self.counter.count(content),
            code_languages=code_languages,
            links_out=tuple(links),
        )

        self._chunk_order += 1
        return chunk

    def _chunk_section(
        self,
        section: Section,
        ctx: ChunkingContext,
    ) -> list[Chunk]:
        section_ctx = ctx.extend_heading(section.heading)

        if section.token_count(self.counter) <= self.max_tokens:
            return [
                self._create_chunk(
                    content=section.full_content(),
                    ctx=section_ctx,
                    sections=[section],
                )
            ]

        if section.subsections:
            return self._chunk_with_subsections(section, section_ctx)

        return self._chunk_by_paragraphs(section, section_ctx)

    def _chunk_with_subsections(
        self,
        section: Section,
        ctx: ChunkingContext,
    ) -> list[Chunk]:
        chunks: list[Chunk] = []

        if section.content.strip():
            intro_chunk = self._create_chunk_from_content(
                content=section.content,
                ctx=ctx,
                section=section,
                subsections_to_include=[],
            )
            chunks.append(intro_chunk)

        for subsection in section.subsections:
            sub_chunks = self._chunk_section(subsection, ctx)
            chunks.extend(sub_chunks)

        return chunks

    def _create_chunk_from_content(
        self,
        content: str,
        ctx: ChunkingContext,
        section: Section,
        subsections_to_include: list[Section],
    ) -> Chunk:
        full_content = content
        if subsections_to_include:
            subsection_contents = [sub.full_content() for sub in subsections_to_include]
            full_content = "\n\n".join([content] + subsection_contents)

        sections_for_metadata = [section] + subsections_to_include

        return self._create_chunk(
            content=full_content,
            ctx=ctx,
            sections=sections_for_metadata,
        )

    def _chunk_by_paragraphs(
        self,
        section: Section,
        ctx: ChunkingContext,
    ) -> list[Chunk]:
        content_pieces = _split_content_by_tokens(
            section.content, self.counter, self.max_tokens
        )

        if not content_pieces:
            return [
                self._create_chunk(
                    content=section.full_content(),
                    ctx=ctx,
                    sections=[section],
                )
            ]

        chunks: list[Chunk] = []
        for piece in content_pieces:
            chunk = self._create_chunk(
                content=piece,
                ctx=ctx,
                sections=None,
                level=section.level,
            )
            chunks.append(chunk)

        return chunks

    def _apply_overlap(self, chunks: list[Chunk]) -> list[Chunk]:
        if len(chunks) <= 1 or self.overlap_tokens == 0:
            return chunks

        overlapped_chunks: list[Chunk] = []

        for i, chunk in enumerate(chunks):
            content = chunk.content

            if i > 0:
                prev_content = chunks[i - 1].content
                prev_tokens = self.counter.count(prev_content)

                if prev_tokens > 0:
                    overlap_chars = int(
                        (self.overlap_tokens / prev_tokens) * len(prev_content)
                    )
                    overlap_text = prev_content[-overlap_chars:]
                    content = overlap_text + "\n\n" + content

            if i < len(chunks) - 1:
                next_content = chunks[i + 1].content
                next_tokens = self.counter.count(next_content)

                if next_tokens > 0:
                    overlap_chars = int(
                        (self.overlap_tokens / next_tokens) * len(next_content)
                    )
                    overlap_text = next_content[:overlap_chars]
                    content = content + "\n\n" + overlap_text

            new_chunk = chunk.model_copy(update={"content": content})
            overlapped_chunks.append(new_chunk)

        return overlapped_chunks


def _generate_chunk_id(content: str, headings: list[str], order: int) -> str:
    components = headings + [str(order), content]
    id_string = "|".join(components)
    hash_digest = hashlib.sha256(id_string.encode()).hexdigest()
    return hash_digest[:16]


def _split_content_by_tokens(
    content: str, counter: TokenCounter, max_tokens: int
) -> list[str]:
    paragraphs = content.split("\n\n")
    content_pieces: list[str] = []
    current_chunk_parts: list[str] = []
    current_tokens = 0

    for paragraph in paragraphs:
        para_tokens = counter.count(paragraph)

        is_code_block = paragraph.strip().startswith(
            "```"
        ) or paragraph.strip().startswith("<pre>")

        if is_code_block:
            if current_chunk_parts:
                content_pieces.append("\n\n".join(current_chunk_parts))
                current_chunk_parts = []
                current_tokens = 0

            content_pieces.append(paragraph)
            continue

        if current_tokens + para_tokens > max_tokens and current_chunk_parts:
            content_pieces.append("\n\n".join(current_chunk_parts))
            current_chunk_parts = []
            current_tokens = 0

        current_chunk_parts.append(paragraph)
        current_tokens += para_tokens

    if current_chunk_parts:
        content_pieces.append("\n\n".join(current_chunk_parts))

    return content_pieces
