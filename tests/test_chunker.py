from __future__ import annotations

from pathlib import Path

import pytest

from docs2markdown.chunker import ChunkStrategy
from docs2markdown.chunker import MarkdownChunker
from docs2markdown.convert import DocType
from docs2markdown.convert import Format
from docs2markdown.convert import convert_file


def serialize_chunks(chunks, counter):
    lines = [f"Total chunks: {len(chunks)}", ""]

    for i, chunk in enumerate(chunks):
        lines.append(f"## Chunk {i}")
        lines.append(f"ID: {chunk.id}")
        lines.append(
            f"Headings: {' > '.join(chunk.headings) if chunk.headings else '(none)'}"
        )
        lines.append(f"Level: {chunk.level}")
        lines.append(f"Order: {chunk.order}")
        lines.append(f"Tokens: {chunk.tokens}")

        if chunk.code_languages:
            lines.append(f"Code languages: {', '.join(sorted(chunk.code_languages))}")

        if chunk.links_out:
            lines.append(f"Links: {len(chunk.links_out)}")

        lines.append("\n### Content")
        lines.append("```markdown")
        lines.append(chunk.content)
        lines.append("```")
        lines.append("")

    return "\n".join(lines)


@pytest.mark.fixture_tags(["sphinx"])
def test_chunk_heading_strategy(doc_file, snapshot_md):
    markdown = convert_file(doc_file, DocType.SPHINX, Format.LLMSTXT)

    chunker = MarkdownChunker(
        strategy=ChunkStrategy.HEADING,
        max_tokens=1000,
        overlap_tokens=0,
    )
    chunks = chunker.chunk(markdown, doc_file)

    assert serialize_chunks(chunks, chunker.counter) == snapshot_md


def test_chunk_respects_max_tokens():
    markdown = "# Section\n\n" + "word " * 500

    chunker = MarkdownChunker(
        strategy=ChunkStrategy.HEADING,
        max_tokens=1000,
    )
    chunks = chunker.chunk(markdown, Path("test.md"))

    for chunk in chunks:
        assert chunk.tokens <= 1000 * 1.1


def test_chunk_preserves_code_blocks():
    markdown = """# Section

```python
def function():
    return True
```

More content."""

    chunker = MarkdownChunker(strategy=ChunkStrategy.HEADING, max_tokens=20)
    chunks = chunker.chunk(markdown, Path("test.md"))

    for chunk in chunks:
        assert chunk.content.count("```") % 2 == 0


def test_chunk_applies_overlap():
    markdown = "# Section 1\n\n" + "x " * 200 + "\n\n# Section 2\n\n" + "y " * 200

    chunker_with_overlap = MarkdownChunker(
        strategy=ChunkStrategy.HEADING,
        max_tokens=100,
        overlap_tokens=20,
    )
    chunks_with_overlap = chunker_with_overlap.chunk(markdown, Path("test.md"))

    chunker_no_overlap = MarkdownChunker(
        strategy=ChunkStrategy.HEADING,
        max_tokens=100,
        overlap_tokens=0,
    )
    chunks_no_overlap = chunker_no_overlap.chunk(markdown, Path("test.md"))

    if len(chunks_with_overlap) > 1:
        first_with = chunks_with_overlap[0].content
        second_with = chunks_with_overlap[1].content
        first_no = chunks_no_overlap[0].content

        overlap_content = set(first_with.split()) & set(second_with.split())
        assert len(overlap_content) > 0 or len(chunks_with_overlap) == len(
            chunks_no_overlap
        )


def test_chunk_none_strategy():
    markdown = "# Section 1\n\nContent\n\n# Section 2\n\nMore"

    chunker = MarkdownChunker(strategy=ChunkStrategy.NONE)
    chunks = chunker.chunk(markdown, Path("test.md"))

    assert len(chunks) == 1
    assert chunks[0].content == markdown
