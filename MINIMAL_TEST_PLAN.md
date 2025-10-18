# Minimal Test Plan for Chunking Features

## Philosophy

**Snapshot tests** = Catch format/structure regressions
**Unit tests** = Verify logic/behavior with assertions

## Target: ~10-12 new snapshots

Following your existing pattern (~30 total snapshots for entire project).

---

## Test Structure

### 1. conftest.py - Add Snapshot Extensions

```python
import json
from pathlib import Path

class JsonSnapshotExtension(Docs2MarkdownSnapshotExtension):
    file_extension = "json"
    
    def serialize(self, data, **kwargs):
        if isinstance(data, Path):
            content = json.loads(data.read_text())
        else:
            content = data
        # Remove timestamps for deterministic snapshots
        if isinstance(content, dict):
            content.pop('created_at', None)
        return json.dumps(content, indent=2, sort_keys=True) + "\n"


class JsonlSnapshotExtension(Docs2MarkdownSnapshotExtension):
    file_extension = "jsonl"
    
    def serialize(self, data, **kwargs):
        if isinstance(data, Path):
            lines = []
            for line in data.read_text().strip().split('\n'):
                chunk = json.loads(line)
                chunk.pop('created_at', None)  # Remove timestamp
                lines.append(chunk)
            lines.sort(key=lambda x: x.get('order', 0))
            return '\n'.join(json.dumps(line, sort_keys=True) for line in lines) + '\n'
        return str(data)


@pytest.fixture
def snapshot_json(snapshot):
    return SnapshotWithGoal(snapshot.use_extension(JsonSnapshotExtension))


@pytest.fixture
def snapshot_jsonl(snapshot):
    return SnapshotWithGoal(snapshot.use_extension(JsonlSnapshotExtension))
```

---

### 2. test_chunker.py - **2 snapshots** ✅

```python
"""Test chunking with real documentation."""

from __future__ import annotations

from pathlib import Path

import pytest

from docs2markdown.chunker import ChunkStrategy
from docs2markdown.chunker import MarkdownChunker
from docs2markdown.convert import convert_file
from docs2markdown.convert import DocType
from docs2markdown.convert import Format


def serialize_chunks(chunks):
    """Serialize chunks for readable snapshots."""
    lines = [f"Total chunks: {len(chunks)}", ""]
    
    for i, chunk in enumerate(chunks):
        lines.append(f"## Chunk {i}")
        lines.append(f"ID: {chunk.metadata.id}")
        lines.append(f"Headings: {' > '.join(chunk.metadata.headings) if chunk.metadata.headings else '(none)'}")
        lines.append(f"Level: {chunk.metadata.level}")
        lines.append(f"Order: {chunk.metadata.order}")
        lines.append(f"Tokens: {chunk.metadata.tokens}")
        lines.append(f"Anchors: {', '.join(chunk.metadata.anchor_ids) if chunk.metadata.anchor_ids else '(none)'}")
        
        if chunk.metadata.code_languages:
            lines.append(f"Code languages: {', '.join(sorted(chunk.metadata.code_languages))}")
        
        if chunk.metadata.links_out:
            lines.append(f"Links: {len(chunk.metadata.links_out)}")
        
        lines.append(f"\nContent preview (200 chars):")
        preview = chunk.content[:200].replace('\n', '\\n')
        lines.append(preview)
        lines.append("")
    
    return '\n'.join(lines)


@pytest.mark.fixture_tags(["sphinx"])
def test_chunk_heading_strategy(doc_file, snapshot_md):
    """Test heading-based chunking output structure.
    
    Snapshots capture: chunk metadata structure, heading hierarchy, content format.
    Does NOT test: specific token counts (unit test that).
    """
    markdown = convert_file(doc_file, DocType.SPHINX, Format.LLMSTXT)
    
    chunker = MarkdownChunker(
        strategy=ChunkStrategy.HEADING,
        max_tokens=1000,
        overlap_tokens=0,
    )
    chunks = chunker.chunk(markdown, doc_file)
    
    assert serialize_chunks(chunks) == snapshot_md
    # 2 sphinx fixtures → 2 snapshots


# Unit tests (assertions only, no snapshots)

def test_chunk_respects_max_tokens():
    """Unit test: verify chunks stay under token limit."""
    markdown = "# Section\n\n" + "word " * 500  # Long content
    
    for max_tokens in [100, 500, 1000]:
        chunker = MarkdownChunker(
            strategy=ChunkStrategy.HEADING,
            max_tokens=max_tokens,
        )
        chunks = chunker.chunk(markdown, Path("test.md"))
        
        for chunk in chunks:
            # Allow 10% buffer for overhead
            assert chunk.metadata.tokens <= max_tokens * 1.1


def test_chunk_preserves_code_blocks():
    """Unit test: code blocks never split."""
    markdown = """# Section

```python
def function():
    return True
```

More content."""
    
    chunker = MarkdownChunker(strategy=ChunkStrategy.HEADING, max_tokens=20)
    chunks = chunker.chunk(markdown, Path("test.md"))
    
    # Every chunk should have even number of ``` markers
    for chunk in chunks:
        assert chunk.content.count("```") % 2 == 0


def test_chunk_applies_overlap():
    """Unit test: verify overlap between chunks."""
    markdown = "# Section 1\n\n" + "x " * 200 + "\n\n# Section 2\n\n" + "y " * 200
    
    chunker = MarkdownChunker(
        strategy=ChunkStrategy.HEADING,
        max_tokens=100,
        overlap_tokens=20,
    )
    chunks = chunker.chunk(markdown, Path("test.md"))
    
    if len(chunks) > 1:
        # With overlap, chunks should be larger than without
        assert chunks[0].metadata.tokens > 100


def test_chunk_none_strategy():
    """Unit test: NONE strategy returns single chunk."""
    markdown = "# Section 1\n\nContent\n\n# Section 2\n\nMore"
    
    chunker = MarkdownChunker(strategy=ChunkStrategy.NONE)
    chunks = chunker.chunk(markdown, Path("test.md"))
    
    assert len(chunks) == 1
    assert chunks[0].content == markdown
```

---

### 3. test_output.py - **6 snapshots** ✅

```python
"""Test output writers with real documentation."""

from __future__ import annotations

import json

import pytest

from docs2markdown.chunker import ChunkStrategy
from docs2markdown.chunker import MarkdownChunker
from docs2markdown.convert import convert_file
from docs2markdown.convert import DocType
from docs2markdown.convert import Format
from docs2markdown.output import JsonlWriter
from docs2markdown.output import ManifestWriter
from docs2markdown.output import MarkdownWriter
from docs2markdown.output import OutputFormat
from docs2markdown.output import get_writer


def create_chunks(doc_file):
    """Helper to create chunks from fixture."""
    markdown = convert_file(doc_file, DocType.SPHINX, Format.LLMSTXT)
    chunker = MarkdownChunker(strategy=ChunkStrategy.HEADING, max_tokens=1000)
    return chunker.chunk(markdown, doc_file)


@pytest.mark.fixture_tags(["sphinx"])
def test_jsonl_writer(doc_file, tmp_path, snapshot_jsonl):
    """Test JSONL format structure."""
    chunks = create_chunks(doc_file)
    
    output_file = tmp_path / "chunks.jsonl"
    JsonlWriter().write(chunks, output_file)
    
    assert output_file == snapshot_jsonl
    # 2 sphinx fixtures → 2 snapshots


@pytest.mark.fixture_tags(["sphinx"])
def test_manifest_writer(doc_file, tmp_path, snapshot_json):
    """Test manifest format structure."""
    chunks = create_chunks(doc_file)
    
    manifest_file = tmp_path / "manifest.json"
    ManifestWriter().write(chunks, manifest_file)
    
    assert manifest_file == snapshot_json
    # 2 sphinx fixtures → 2 snapshots


@pytest.mark.fixture_tags(["sphinx"])
def test_markdown_writer(doc_file, tmp_path, snapshot_md):
    """Test markdown output with frontmatter."""
    chunks = create_chunks(doc_file)
    
    output_dir = tmp_path / "chunks"
    MarkdownWriter().write(chunks, output_dir)
    
    # Snapshot first chunk file (representative)
    first_chunk = output_dir / "chunk_0000.md"
    assert first_chunk.read_text() == snapshot_md
    # 2 sphinx fixtures → 2 snapshots


# Unit tests (no snapshots)

def test_get_writer_returns_correct_type():
    """Unit test: factory returns right writer."""
    assert isinstance(get_writer(OutputFormat.JSONL), JsonlWriter)
    assert isinstance(get_writer(OutputFormat.MANIFEST), ManifestWriter)
    assert isinstance(get_writer(OutputFormat.MARKDOWN), MarkdownWriter)


def test_jsonl_produces_valid_json(doc_file, tmp_path):
    """Unit test: JSONL is parseable."""
    chunks = create_chunks(doc_file)
    
    output_file = tmp_path / "test.jsonl"
    JsonlWriter().write(chunks, output_file)
    
    # Every line should parse as JSON
    for line in output_file.read_text().strip().split('\n'):
        chunk = json.loads(line)
        assert 'id' in chunk
        assert 'content' in chunk
        assert 'metadata' in chunk or 'tokens' in chunk


def test_manifest_structure(doc_file, tmp_path):
    """Unit test: manifest has required fields."""
    chunks = create_chunks(doc_file)
    
    manifest_file = tmp_path / "manifest.json"
    ManifestWriter().write(chunks, manifest_file)
    
    manifest = json.loads(manifest_file.read_text())
    assert manifest['version'] == '1.0'
    assert 'chunks' in manifest
    assert 'anchors' in manifest
    assert 'files' in manifest
    assert manifest['total_chunks'] == len(chunks)


def test_markdown_writer_creates_multiple_files(doc_file, tmp_path):
    """Unit test: creates file per chunk."""
    chunks = create_chunks(doc_file)
    
    output_dir = tmp_path / "output"
    MarkdownWriter().write(chunks, output_dir)
    
    chunk_files = sorted(output_dir.glob("chunk_*.md"))
    assert len(chunk_files) == len(chunks)
    
    # Each file should have frontmatter
    for chunk_file in chunk_files:
        content = chunk_file.read_text()
        assert content.startswith("---")
        assert "id:" in content
```

---

### 4. test_parser.py - **2 snapshots** ✅

```python
"""Test markdown structure parsing."""

from __future__ import annotations

import pytest

from docs2markdown.convert import convert_file
from docs2markdown.convert import DocType
from docs2markdown.convert import Format
from docs2markdown.parser import parse_markdown_structure


def serialize_sections(sections, indent=0):
    """Serialize section tree for snapshots."""
    lines = []
    for section in sections:
        prefix = "  " * indent
        
        heading = section.heading or "(root)"
        lines.append(f"{prefix}- {heading} (level {section.level})")
        
        if section.anchor_ids:
            lines.append(f"{prefix}  anchors: {', '.join(section.anchor_ids)}")
        
        if section.code_blocks:
            langs = sorted(set(cb.language for cb in section.code_blocks if cb.language))
            lines.append(f"{prefix}  code: {len(section.code_blocks)} blocks ({', '.join(langs) if langs else 'plain'})")
        
        if section.links:
            lines.append(f"{prefix}  links: {len(section.links)}")
        
        if section.subsections:
            lines.extend(serialize_sections(section.subsections, indent + 1))
    
    return lines


@pytest.mark.fixture_tags(["sphinx"])
def test_parse_markdown_structure(doc_file, snapshot_md):
    """Test section tree structure from real docs."""
    markdown = convert_file(doc_file, DocType.SPHINX, Format.LLMSTXT)
    sections = parse_markdown_structure(markdown)
    
    output = '\n'.join(serialize_sections(sections))
    assert output == snapshot_md
    # 2 sphinx fixtures → 2 snapshots


# Unit tests (no snapshots)

def test_parse_detects_headings():
    """Unit test: finds headings."""
    markdown = "# H1\n\nText\n\n## H2\n\nMore"
    sections = parse_markdown_structure(markdown)
    
    assert len(sections) == 1
    assert sections[0].heading == "H1"
    assert sections[0].level == 1
    assert len(sections[0].subsections) == 1
    assert sections[0].subsections[0].heading == "H2"


def test_parse_detects_code_blocks():
    """Unit test: finds code blocks."""
    markdown = "# Test\n\n```python\ncode\n```"
    sections = parse_markdown_structure(markdown)
    
    assert len(sections[0].code_blocks) == 1
    assert sections[0].code_blocks[0].language == "python"


def test_parse_detects_links():
    """Unit test: finds links."""
    markdown = "# Test\n\n[link](url)"
    sections = parse_markdown_structure(markdown)
    
    assert len(sections[0].links) == 1
    assert sections[0].links[0].text == "link"
    assert sections[0].links[0].href == "url"


def test_parse_empty_markdown():
    """Unit test: handles empty input."""
    sections = parse_markdown_structure("")
    assert len(sections) == 1
    assert sections[0].heading == ""
    assert sections[0].level == 0
```

---

### 5. test_tokenizer.py - **0 snapshots** ✅

```python
"""Test token counting - pure unit tests."""

from __future__ import annotations

import pytest

from docs2markdown.tokenizer import CharEstimateCounter
from docs2markdown.tokenizer import TiktokenCounter
from docs2markdown.tokenizer import get_counter

try:
    import tiktoken
    TIKTOKEN_AVAILABLE = True
except ImportError:
    TIKTOKEN_AVAILABLE = False


class TestCharEstimateCounter:
    @pytest.mark.parametrize("text,expected", [
        ("hello", 1),
        ("hello world", 2),
        ("a" * 100, 25),
        ("", 0),
    ])
    def test_count(self, text, expected):
        counter = CharEstimateCounter(chars_per_token=4.0)
        assert counter.count(text) == expected


class TestTiktokenCounter:
    @pytest.mark.skipif(not TIKTOKEN_AVAILABLE, reason="tiktoken not installed")
    def test_count(self):
        counter = TiktokenCounter("gpt-4")
        assert counter.count("Hello world") > 0
    
    def test_requires_tiktoken(self, monkeypatch):
        monkeypatch.setattr("builtins.__import__", 
            lambda name, *args: (_ for _ in ()).throw(ImportError()) if name == "tiktoken" else __import__(name, *args))
        
        with pytest.raises(ImportError, match="tiktoken is required"):
            TiktokenCounter()


class TestGetCounter:
    def test_fallback_without_tiktoken(self, monkeypatch):
        monkeypatch.setattr("builtins.__import__",
            lambda name, *args: (_ for _ in ()).throw(ImportError()) if name == "tiktoken" else __import__(name, *args))
        
        counter = get_counter()
        assert isinstance(counter, CharEstimateCounter)
    
    @pytest.mark.skipif(not TIKTOKEN_AVAILABLE, reason="tiktoken not installed")
    def test_uses_tiktoken_when_available(self):
        counter = get_counter()
        assert isinstance(counter, TiktokenCounter)
```

---

### 6. test_cli.py - **0 new snapshots** ✅

Add to existing file:

```python
import json

# ... existing tests ...


def test_cli_chunking_single_file(tmp_path):
    """Test CLI creates chunk files."""
    output_dir = tmp_path / "output"
    
    result = runner.invoke(app, [
        str(TEST_FIXTURE_FILE),
        str(output_dir),
        "--chunk-strategy", "heading",
        "--max-tokens", "1000",
    ])
    
    assert result.exit_code == 0
    
    chunk_files = list(output_dir.glob("chunk_*.md"))
    assert len(chunk_files) > 0
    
    # Verify frontmatter
    first = chunk_files[0].read_text()
    assert first.startswith("---")
    assert "id:" in first


@pytest.mark.parametrize("chunk_output", ["jsonl", "manifest", "markdown"])
def test_cli_chunk_output_formats(chunk_output, tmp_path):
    """Test CLI output format options."""
    if chunk_output == "jsonl":
        output = tmp_path / "chunks.jsonl"
    elif chunk_output == "manifest":
        output = tmp_path / "manifest.json"
    else:
        output = tmp_path / "chunks"
    
    result = runner.invoke(app, [
        str(TEST_FIXTURE_FILE),
        str(output),
        "--chunk-strategy", "heading",
        "--chunk-output", chunk_output,
    ])
    
    assert result.exit_code == 0
    assert output.exists()
    
    if chunk_output == "jsonl":
        # Verify valid JSONL
        for line in output.read_text().strip().split('\n'):
            json.loads(line)
    
    elif chunk_output == "manifest":
        manifest = json.loads(output.read_text())
        assert "chunks" in manifest
        assert "anchors" in manifest


def test_cli_emit_manifest(tmp_path):
    """Test --emit-manifest flag."""
    output_dir = tmp_path / "output"
    
    result = runner.invoke(app, [
        str(TEST_FIXTURE_FILE),
        str(output_dir),
        "--chunk-strategy", "heading",
        "--emit-manifest",
    ])
    
    assert result.exit_code == 0
    assert (output_dir / "manifest.json").exists()


def test_cli_chunk_directory(tmp_path):
    """Test chunking directory produces JSONL."""
    output_dir = tmp_path / "output"
    
    result = runner.invoke(app, [
        str(TEST_FIXTURE_DIR),
        str(output_dir),
        "--chunk-strategy", "heading",
        "--chunk-output", "jsonl",
    ])
    
    assert result.exit_code == 0
    
    jsonl = output_dir / "chunks.jsonl"
    assert jsonl.exists()
    
    lines = jsonl.read_text().strip().split('\n')
    assert len(lines) > 1
```

---

## Summary

### Total Snapshots: **12**
- test_chunker.py: 2 snapshots
- test_output.py: 6 snapshots (2 per format × 3 formats)
- test_parser.py: 2 snapshots
- test_tokenizer.py: 0 snapshots
- test_cli.py: 0 new snapshots

### Test Breakdown:
- **Snapshot tests**: Capture format/structure changes
- **Unit tests**: Verify logic (token limits, code preservation, etc.)
- **CLI tests**: Assert file creation and structure

### Implementation:
1. Add snapshot extensions to conftest.py
2. Delete old test files
3. Write new focused tests
4. Run `pytest --snapshot-update`
5. Review 12 new snapshots
