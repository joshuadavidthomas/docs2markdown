from __future__ import annotations

import json

import pytest

from docs2markdown.chunker import ChunkStrategy
from docs2markdown.chunker import MarkdownChunker
from docs2markdown.convert import DocType
from docs2markdown.convert import Format
from docs2markdown.convert import convert_file
from docs2markdown.output import JsonlWriter
from docs2markdown.output import ManifestWriter
from docs2markdown.output import MarkdownWriter
from docs2markdown.output import OutputFormat
from docs2markdown.output import get_writer


def create_chunks(doc_file):
    markdown = convert_file(doc_file, DocType.SPHINX, Format.LLMSTXT)
    chunker = MarkdownChunker(strategy=ChunkStrategy.HEADING, max_tokens=1000)
    return chunker.chunk(markdown, doc_file)


@pytest.mark.fixture_tags(["sphinx"])
def test_jsonl_writer(doc_file, tmp_path, snapshot_jsonl):
    chunks = create_chunks(doc_file)

    output_file = tmp_path / "chunks.jsonl"
    JsonlWriter().write(chunks, output_file)

    assert output_file.read_text() == snapshot_jsonl


@pytest.mark.fixture_tags(["sphinx"])
def test_manifest_writer(doc_file, tmp_path, snapshot_json):
    chunks = create_chunks(doc_file)

    manifest_file = tmp_path / "manifest.json"
    ManifestWriter().write(chunks, manifest_file)

    assert manifest_file.read_text() == snapshot_json


@pytest.mark.fixture_tags(["sphinx"])
def test_markdown_writer(doc_file, tmp_path, snapshot_md):
    chunks = create_chunks(doc_file)

    output_dir = tmp_path / "chunks"
    MarkdownWriter().write(chunks, output_dir)

    first_chunk = output_dir / "chunk_0000.md"
    assert first_chunk.read_text() == snapshot_md


def test_get_writer_returns_correct_type():
    assert isinstance(get_writer(OutputFormat.JSONL), JsonlWriter)
    assert isinstance(get_writer(OutputFormat.MANIFEST), ManifestWriter)
    assert isinstance(get_writer(OutputFormat.MARKDOWN), MarkdownWriter)


def test_jsonl_produces_valid_json(doc_file, tmp_path):
    chunks = create_chunks(doc_file)

    output_file = tmp_path / "test.jsonl"
    JsonlWriter().write(chunks, output_file)

    for line in output_file.read_text().strip().split("\n"):
        chunk = json.loads(line)
        assert "id" in chunk
        assert "content" in chunk
        assert "tokens" in chunk


def test_manifest_structure(doc_file, tmp_path):
    chunks = create_chunks(doc_file)

    manifest_file = tmp_path / "manifest.json"
    ManifestWriter().write(chunks, manifest_file)

    manifest = json.loads(manifest_file.read_text())
    assert manifest["version"] == "1.0"
    assert "chunks" in manifest
    assert "files" in manifest
    assert manifest["total_chunks"] == len(chunks)


def test_markdown_writer_creates_multiple_files(doc_file, tmp_path):
    chunks = create_chunks(doc_file)

    output_dir = tmp_path / "output"
    MarkdownWriter().write(chunks, output_dir)

    chunk_files = sorted(output_dir.glob("chunk_*.md"))
    assert len(chunk_files) == len(chunks)

    for chunk_file in chunk_files:
        content = chunk_file.read_text()
        assert content.startswith("---")
        assert "id:" in content
