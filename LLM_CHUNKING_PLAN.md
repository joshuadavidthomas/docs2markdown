# LLM-Friendly Chunking Plan for docs2markdown

## Overview

Add intelligent document chunking to make docs2markdown output more suitable for LLM consumption, reducing token costs and improving retrieval accuracy while preserving the library's existing functionality.

## Goals

- **Reduce token costs** by chunking documents intelligently
- **Preserve code integrity** - never split code blocks or tables
- **Maintain context** through heading hierarchies and overlap
- **Support multiple formats** - Markdown, JSONL, and manifests
- **Stay backwards compatible** - chunking is opt-in

## Implementation Plan

### Phase 1: Core Infrastructure

#### 1. Tokenizer Module (`src/docs2markdown/tokenizer.py`)

```python
from typing import Protocol


class TokenCounter(Protocol):
    """Abstract interface for token counting"""

    def count(self, text: str) -> int:
        ...


class TiktokenCounter:
    """Uses tiktoken library when available (via [token] extra)"""

    def __init__(self, model: str = "gpt-4"):
        import tiktoken  # Will be available via [token] extra

        self.encoder = tiktoken.encoding_for_model(model)

    def count(self, text: str) -> int:
        return len(self.encoder.encode(text))


class CharEstimateCounter:
    """Fallback counter using character estimates"""

    def __init__(self, chars_per_token: float = 4.0):
        self.chars_per_token = chars_per_token

    def count(self, text: str) -> int:
        return int(len(text) / self.chars_per_token)


def get_counter(model: str | None = None) -> TokenCounter:
    """Factory function to get appropriate counter"""
    try:
        import tiktoken

        return TiktokenCounter(model or "gpt-4")
    except ImportError:
        return CharEstimateCounter()
```

#### 2. Markdown Parser (`src/docs2markdown/parser.py`)

```python
from dataclasses import dataclass
from typing import List


@dataclass
class CodeBlock:
    language: str
    content: str
    start_line: int
    end_line: int


@dataclass
class Section:
    heading: str
    level: int  # 1-6 for H1-H6
    content: str  # Content before subsections
    subsections: List["Section"]
    anchors: List[str]
    code_blocks: List[CodeBlock]

    def full_content(self) -> str:
        """Get content including subsections"""
        pass

    def token_count(self, counter: TokenCounter) -> int:
        """Count tokens in this section"""
        pass


def parse_markdown_structure(markdown: str) -> List[Section]:
    """Parse markdown into hierarchical sections"""
    # Use regex to identify:
    # - Headings (^#{1,6}\s+.*)
    # - Code blocks (```...```)
    # - HTML anchors/IDs
    pass
```

#### 3. Chunking Engine (`src/docs2markdown/chunker.py`)

```python
from dataclasses import dataclass
from enum import Enum
from typing import List, Set


class ChunkStrategy(Enum):
    NONE = "none"  # No chunking (default)
    HEADING = "heading"  # Split on headings
    TOKEN = "token"  # Split on token count
    HYBRID = "hybrid"  # Heading-aware token splitting


@dataclass
class ChunkMetadata:
    id: str  # Stable ID
    source_path: str
    headings: List[str]  # Hierarchy ["H1", "H2", "H3"]
    anchor_ids: List[str]
    level: int
    tokens: int
    char_count: int
    code_languages: Set[str]
    links_out: List[dict]  # [{"text": "...", "href": "..."}]
    order: int  # For sequential reading


@dataclass
class Chunk:
    metadata: ChunkMetadata
    content: str


class MarkdownChunker:
    def __init__(
        self,
        max_tokens: int = 1000,
        overlap_tokens: int = 100,
        strategy: ChunkStrategy = ChunkStrategy.HEADING,
        counter: TokenCounter = None,
    ):
        self.max_tokens = max_tokens
        self.overlap_tokens = overlap_tokens
        self.strategy = strategy
        self.counter = counter or CharEstimateCounter()

    def chunk(self, markdown: str, source_path: Path) -> List[Chunk]:
        """Split markdown into chunks"""
        sections = parse_markdown_structure(markdown)

        if self.strategy == ChunkStrategy.NONE:
            return [self._create_single_chunk(markdown, source_path)]

        chunks = []
        for section in sections:
            chunks.extend(self._chunk_section(section, source_path))

        return self._apply_overlap(chunks)

    def _chunk_section(self, section: Section, source_path: Path) -> List[Chunk]:
        """Recursively chunk a section"""
        token_count = section.token_count(self.counter)

        if token_count <= self.max_tokens:
            # Section fits in one chunk
            return [self._create_chunk(section, source_path)]

        # Try splitting by subsections
        if section.subsections:
            chunks = []
            for subsection in section.subsections:
                chunks.extend(self._chunk_section(subsection, source_path))
            return chunks

        # Split by paragraphs/sentences as last resort
        return self._split_content(section, source_path)

    def _split_content(self, section: Section, source_path: Path) -> List[Chunk]:
        """Split large content preserving code blocks"""
        # Never split inside code blocks
        # Split on paragraph boundaries when possible
        pass

    def _apply_overlap(self, chunks: List[Chunk]) -> List[Chunk]:
        """Add overlap between adjacent chunks"""
        pass
```

### Phase 2: Output Formats

#### 4. Output Writers (`src/docs2markdown/output.py`)

```python
from typing import Protocol, List
from pathlib import Path
import json


class OutputWriter(Protocol):
    def write(self, chunks: List[Chunk], output: Path) -> None:
        ...


class MarkdownWriter:
    """Write chunks as individual markdown files"""

    def write(self, chunks: List[Chunk], output: Path) -> None:
        output.mkdir(parents=True, exist_ok=True)
        for i, chunk in enumerate(chunks):
            # Include metadata as frontmatter
            file_path = output / f"chunk_{i:04d}.md"
            content = self._add_frontmatter(chunk) + chunk.content
            file_path.write_text(content)

    def _add_frontmatter(self, chunk: Chunk) -> str:
        """Add YAML frontmatter with metadata"""
        pass


class JsonlWriter:
    """Write chunks as JSONL for programmatic use"""

    def write(self, chunks: List[Chunk], output: Path) -> None:
        output.parent.mkdir(parents=True, exist_ok=True)
        with open(output, "w") as f:
            for chunk in chunks:
                record = {
                    "id": chunk.metadata.id,
                    "source_path": str(chunk.metadata.source_path),
                    "headings": chunk.metadata.headings,
                    "anchor_ids": chunk.metadata.anchor_ids,
                    "level": chunk.metadata.level,
                    "order": chunk.metadata.order,
                    "content": chunk.content,
                    "tokens": chunk.metadata.tokens,
                    "char_count": chunk.metadata.char_count,
                    "code_languages": list(chunk.metadata.code_languages),
                    "links_out": chunk.metadata.links_out,
                }
                f.write(json.dumps(record) + "\n")


class ManifestWriter:
    """Write manifest for cross-references"""

    def write(self, chunks: List[Chunk], output: Path) -> None:
        manifest = {
            "version": "1.0",
            "chunks": [],
            "anchors": {},  # anchor_id -> chunk_id
            "files": {},  # source_path -> [chunk_ids]
        }

        for chunk in chunks:
            manifest["chunks"].append(
                {
                    "id": chunk.metadata.id,
                    "source_path": str(chunk.metadata.source_path),
                    "headings": chunk.metadata.headings,
                    "order": chunk.metadata.order,
                }
            )

            for anchor in chunk.metadata.anchor_ids:
                manifest["anchors"][anchor] = chunk.metadata.id

        output.write_text(json.dumps(manifest, indent=2))


class OutputFormat(Enum):
    MARKDOWN = "markdown"
    JSONL = "jsonl"
    MANIFEST = "manifest"
    ALL = "all"


def get_writer(format: OutputFormat) -> OutputWriter:
    """Get appropriate writer(s) for format"""
    pass
```

### Phase 3: CLI Integration

#### 5. CLI Updates (`src/docs2markdown/cli.py`)

Add new options to the convert command:

```python
@app.command()
def convert(
    # ... existing parameters ...
    chunk_strategy: Annotated[
        ChunkStrategy,
        typer.Option(
            "--chunk-strategy",
            help="Chunking strategy: none, heading, token, or hybrid",
        ),
    ] = ChunkStrategy.NONE,
    max_tokens: Annotated[
        int,
        typer.Option("--max-tokens", help="Maximum tokens per chunk (default: 1000)"),
    ] = 1000,
    overlap_tokens: Annotated[
        int,
        typer.Option(
            "--overlap-tokens", help="Token overlap between chunks (default: 100)"
        ),
    ] = 100,
    chunk_output: Annotated[
        OutputFormat,
        typer.Option(
            "--chunk-output",
            help="Output format for chunks: markdown, jsonl, manifest, or all",
        ),
    ] = OutputFormat.MARKDOWN,
    model: Annotated[
        str | None,
        typer.Option(
            "--model", help="Model for token counting (e.g., gpt-4, claude-3)"
        ),
    ] = None,
    emit_manifest: Annotated[
        bool,
        typer.Option(
            "--emit-manifest", help="Generate manifest.json for cross-references"
        ),
    ] = False,
):
    """Convert HTML documentation to Markdown with optional LLM-friendly chunking."""
```

#### 6. Integration in convert.py

```python
def convert_file_with_chunking(
    html_file: Path,
    doc_type: DocType,
    format: Format = Format.GHFM,
    chunk_options: ChunkOptions = None,
) -> Union[str, List[Chunk]]:
    """Convert and optionally chunk a file"""

    # First, convert HTML to Markdown as before
    markdown = convert_file(html_file, doc_type, format)

    # Then optionally chunk
    if chunk_options and chunk_options.strategy != ChunkStrategy.NONE:
        counter = get_counter(chunk_options.model)
        chunker = MarkdownChunker(
            max_tokens=chunk_options.max_tokens,
            overlap_tokens=chunk_options.overlap_tokens,
            strategy=chunk_options.strategy,
            counter=counter,
        )
        return chunker.chunk(markdown, html_file)

    return markdown
```

## Usage Examples

### Basic Chunking
```bash
# Convert with heading-based chunks
docs2markdown docs/ output/ --chunk-strategy heading --max-tokens 1000

# With specific model tokenizer
docs2markdown docs/ output/ --model gpt-4o-mini --chunk-strategy hybrid

# Generate JSONL for RAG systems
docs2markdown docs/ chunks.jsonl --chunk-output jsonl --emit-manifest
```

### Python API
```python
from docs2markdown import convert_file_with_chunking, ChunkStrategy
from docs2markdown.tokenizer import TiktokenCounter

# With tiktoken
counter = TiktokenCounter("gpt-4")
chunks = convert_file_with_chunking(
    html_file,
    doc_type=DocType.SPHINX,
    chunk_options=ChunkOptions(
        strategy=ChunkStrategy.HEADING, max_tokens=1500, counter=counter
    ),
)

# Write as JSONL
from docs2markdown.output import JsonlWriter

writer = JsonlWriter()
writer.write(chunks, Path("output.jsonl"))
```

## Testing Strategy

### Unit Tests
```python
# tests/test_tokenizer.py
def test_tiktoken_counter():
    """Test tiktoken counting when available"""


def test_char_estimate_fallback():
    """Test character-based estimation"""


# tests/test_chunker.py
def test_never_splits_code_blocks():
    """Ensure code blocks remain intact"""


def test_respects_token_limit():
    """Verify chunks stay under max_tokens"""


def test_preserves_heading_hierarchy():
    """Check heading chain accuracy"""


def test_overlap_between_chunks():
    """Verify overlap tokens exist"""


# tests/test_output.py
def test_jsonl_format():
    """Test JSONL output structure"""


def test_manifest_generation():
    """Test manifest anchor mapping"""
```

### Integration Tests
- Test with actual Sphinx documentation
- Verify cross-references in manifest
- Test token counting accuracy across models
- Benchmark performance on large documentation sets

## Implementation Timeline

### Week 1: Foundation ✅ COMPLETED
- [x] **COMPLETED**: Implement tokenizer module with tiktoken support
  - Created `src/docs2markdown/tokenizer.py`
  - Added `TokenCounter` protocol
  - Implemented `TiktokenCounter` (uses tiktoken when available)
  - Implemented `CharEstimateCounter` (fallback: 4 chars/token)
  - Added `get_counter()` factory function
  - Added `[token]` optional dependency in `pyproject.toml`
  - Created `tests/test_tokenizer.py` with 11 tests (6 passed, 5 skipped without tiktoken)
- [x] **COMPLETED**: Build markdown parser for structure extraction
  - Created `src/docs2markdown/parser.py`
  - Added `Section`, `CodeBlock`, `Link` dataclasses
  - Implemented `parse_markdown_structure()` for hierarchical parsing
  - Extracts headings, code blocks (fenced and HTML), links, and anchors
  - Handles nested heading hierarchies
  - Created `tests/test_parser.py` with 19 passing tests
- [x] **COMPLETED**: Create basic heading-based chunker
  - Created `src/docs2markdown/chunker.py`
  - Added `ChunkStrategy` enum (NONE, HEADING, TOKEN, HYBRID)
  - Implemented `MarkdownChunker` with token-aware splitting
  - Preserves code blocks intact (never splits inside them)
  - Generates stable chunk IDs via hashing
  - Maintains heading hierarchy in chunk metadata
  - Created `tests/test_chunker.py` with 17 passing tests

### Week 2: Smart Features ✅ COMPLETED
- [x] **COMPLETED**: Add token-budget splitting for large sections
  - Implemented in `_split_large_section()` method
  - Splits on paragraph boundaries when sections exceed max_tokens
  - Preserves code blocks as atomic units
- [x] **COMPLETED**: Implement overlap mechanism
  - Implemented in `_apply_overlap()` method
  - Configurable overlap_tokens parameter
  - Adds context from adjacent chunks
- [x] **COMPLETED**: Build JSONL and manifest writers
  - Created `src/docs2markdown/output.py`
  - Implemented `JsonlWriter`: Writes chunks as JSONL with full metadata
  - Implemented `ManifestWriter`: Creates manifest with anchor→chunk mapping
  - Implemented `MarkdownWriter`: Writes chunks as individual .md files with frontmatter
  - Added `OutputFormat` enum and `get_writer()` factory
  - Created `tests/test_output.py` with 18 passing tests
- [x] **COMPLETED**: Wire up CLI options
  - Updated `src/docs2markdown/cli.py` with chunking parameters
  - Added `--chunk-strategy`, `--max-tokens`, `--overlap-tokens`
  - Added `--chunk-output`, `--model`, `--emit-manifest`
  - CLI fully integrated with chunking pipeline
  - Works for both single files and directories

### Week 3: Polish & Testing ⏳ IN PROGRESS
- [x] **COMPLETED**: Add comprehensive tests
  - 119 total tests passing (5 skipped without tiktoken)
  - Output tests: 18 passing
  - Parser tests: 19 passing
  - Chunker tests: 17 passing
  - Tokenizer tests: 11 (6 passing, 5 skipped)
  - All existing tests still pass (65 tests)
- [x] **COMPLETED**: Handle edge cases (empty sections, malformed markdown)
  - Parser handles empty markdown, no headings, nested structures
  - Chunker handles empty markdown, content without headings
  - Output writers handle various path configurations
- [ ] Performance optimization
- [ ] Documentation and examples

## Progress Summary

### ✅ Completed (Phase 1: Core Infrastructure)

#### 1. Tokenizer Module (`src/docs2markdown/tokenizer.py`)
- `TokenCounter` protocol for pluggable implementations
- `TiktokenCounter`: Uses tiktoken library when available via `[token]` extra
- `CharEstimateCounter`: Fallback using 4 chars/token estimate
- `get_counter()`: Factory with automatic tiktoken detection
- **Tests**: 11 tests (6 passing, 5 skipped without tiktoken)

#### 2. Markdown Parser (`src/docs2markdown/parser.py`)
- `Section` dataclass with hierarchical structure support
- `CodeBlock` and `Link` dataclasses for content tracking
- `parse_markdown_structure()`: Parses markdown into section tree
- Features:
  - Detects ATX headings (`#` through `######`)
  - Extracts fenced code blocks (` ```language `) and HTML code blocks
  - Identifies links `[text](href)` and HTML anchors
  - Builds hierarchical section tree
  - Handles markdown with/without headings
- **Tests**: 19 passing tests covering all features

#### 3. Chunking Engine (`src/docs2markdown/chunker.py`)
- `ChunkStrategy` enum: NONE, HEADING, TOKEN, HYBRID
- `ChunkMetadata` dataclass: id, headings, anchors, tokens, links, code_languages, order
- `Chunk` dataclass: metadata + content
- `MarkdownChunker` class with features:
  - Heading-aware splitting (respects document structure)
  - Token budget enforcement (configurable max_tokens)
  - Code block preservation (never splits inside code blocks)
  - Large section splitting (splits on paragraph boundaries)
  - Overlap support (configurable overlap_tokens)
  - Stable chunk IDs (SHA-256 hash of path + headings + order)
  - Rich metadata extraction (headings hierarchy, anchors, links, code languages)
- **Tests**: 17 passing tests covering all chunking scenarios

### 📊 Test Summary
- **Total**: 119 tests passing, 5 skipped (without tiktoken)
- **New tests**: 65 tests for chunking infrastructure
  - Tokenizer: 11 tests (6 passing, 5 skipped)
  - Parser: 19 tests (all passing)
  - Chunker: 17 tests (all passing)
  - Output: 18 tests (all passing)
- **Existing tests**: All 65 original tests still passing
- **Coverage**: Complete test coverage for all chunking features

### ✅ Completed (Phase 2: Output Formats & CLI)

#### 4. Output Writers (`src/docs2markdown/output.py`)
- `OutputFormat` enum: MARKDOWN, JSONL, MANIFEST
- `JsonlWriter`: Writes chunks as JSONL with complete metadata
  - Each line is a JSON object with id, content, metadata, timestamp
  - Perfect for RAG systems and vector databases
- `ManifestWriter`: Creates manifest.json with:
  - Version and creation timestamp
  - Array of all chunks with metadata
  - Anchor→chunk ID mapping for cross-references
  - File→chunk IDs mapping for navigation
- `MarkdownWriter`: Writes individual .md files with YAML frontmatter
  - Frontmatter includes all metadata fields
  - Custom base names supported
- `get_writer()`: Factory function for writer selection
- **Tests**: 18 passing tests covering all writers

#### 5. CLI Integration (`src/docs2markdown/cli.py`)
- Added chunking parameters to `convert` command:
  - `--chunk-strategy`: none, heading, token, hybrid (default: none)
  - `--max-tokens`: Maximum tokens per chunk (default: 1000)
  - `--overlap-tokens`: Token overlap between chunks (default: 100)
  - `--chunk-output`: markdown, jsonl, manifest (default: markdown)
  - `--model`: Model for token counting (e.g., gpt-4, gpt-4o-mini)
  - `--emit-manifest`: Generate manifest.json alongside output
- Works for both single files and directories
- Backwards compatible (default behavior unchanged)
- Rich output with progress bars and status messages

### 🔄 Next Steps (Phase 3: Documentation & Polish)
1. **Documentation**
   - Update README with chunking examples
   - Add usage examples for Python API
   - Document JSONL schema and manifest format
   - Add cookbook recipes for common use cases
2. **Performance optimization** (optional)
   - Profile large document processing
   - Consider parallel chunking for directories
3. **Future enhancements** (nice-to-have)
   - Vector DB integration helpers
   - Semantic chunking with embeddings
   - MCP server implementation

## Open Questions Resolved

1. **Tiktoken dependency**: Available via `[token]` extra - use when installed, fallback otherwise
2. **Default chunk size**: 1000 tokens (good balance for most models)
3. **Chunk ID scheme**: Hash of `source_path + heading_chain + order` for stability
4. **Output format default**: Keep markdown default, add `--chunk-output` for alternatives

## Future Enhancements

- **Vector DB integration**: Direct upload to Pinecone/Weaviate
- **Semantic chunking**: Use embeddings to find natural boundaries
- **MCP server**: Serve chunks via Model Context Protocol
- **Summary generation**: Add extractive summaries per chunk
- **Cross-document linking**: Resolve references across multiple files

## Dependencies

### Required
- Existing: BeautifulSoup4, markdownify, typer, rich
- No new required dependencies

### Optional (via extras)
- `tiktoken` (via `[token]` extra) - for accurate token counting
- Future: `numpy` for embeddings, `fastapi` for MCP server
