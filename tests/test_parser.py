from __future__ import annotations

import pytest

from docs2markdown.convert import convert_file
from docs2markdown.convert import DocType
from docs2markdown.convert import Format
from docs2markdown.parser import parse_markdown_structure


def serialize_sections(sections, indent=0):
    lines = []
    for section in sections:
        prefix = "  " * indent

        heading = section.heading or "(root)"
        lines.append(f"{prefix}- {heading} (level {section.level})")

        if section.code_blocks:
            langs = sorted(
                set(cb.language for cb in section.code_blocks if cb.language)
            )
            lines.append(
                f"{prefix}  code: {len(section.code_blocks)} blocks ({', '.join(langs) if langs else 'plain'})"
            )

        if section.links:
            lines.append(f"{prefix}  links: {len(section.links)}")

        if section.subsections:
            lines.extend(serialize_sections(section.subsections, indent + 1))

    return lines


@pytest.mark.fixture_tags(["sphinx"])
def test_parse_markdown_structure(doc_file, snapshot_md):
    markdown = convert_file(doc_file, DocType.SPHINX, Format.LLMSTXT)
    sections = parse_markdown_structure(markdown)

    output = "\n".join(serialize_sections(sections))
    assert output == snapshot_md


def test_parse_detects_headings():
    markdown = "# H1\n\nText\n\n## H2\n\nMore"
    sections = parse_markdown_structure(markdown)

    assert len(sections) == 1
    assert sections[0].heading == "H1"
    assert sections[0].level == 1
    assert len(sections[0].subsections) == 1
    assert sections[0].subsections[0].heading == "H2"


def test_parse_detects_code_blocks():
    markdown = "# Test\n\n```python\ncode\n```"
    sections = parse_markdown_structure(markdown)

    assert len(sections[0].code_blocks) == 1
    assert sections[0].code_blocks[0].language == "python"


def test_parse_detects_links():
    markdown = "# Test\n\n[link](url)"
    sections = parse_markdown_structure(markdown)

    assert len(sections[0].links) == 1
    assert sections[0].links[0].text == "link"
    assert sections[0].links[0].href == "url"


def test_parse_empty_markdown():
    sections = parse_markdown_structure("")
    assert len(sections) == 1
    assert sections[0].heading == ""
    assert sections[0].level == 0
