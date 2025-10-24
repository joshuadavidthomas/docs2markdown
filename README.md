# docs2markdown

[![PyPI - docs2markdown](https://img.shields.io/pypi/v/docs2markdown?label=docs2markdown)](https://pypi.org/project/docs2markdown/)
![PyPI - Python Version](https://img.shields.io/pypi/pyversions/docs2markdown)

Convert HTML documentation to Markdown with support for multiple output formats and documentation types.

`docs2markdown` transforms HTML documentation into clean, readable Markdown. It works as both a CLI tool for quick conversions and a Python library for integration into your projects.

## Requirements

<!-- [[[cog
import cog

from noxfile import PY_DEFAULT_NOGIL
from noxfile import PY_GIL_VERSIONS
from noxfile import PY_NOGIL_VERSIONS
from noxfile import display_version

version_strs = [display_version(v) for v in PY_GIL_VERSIONS]
cog.outl(f"- Python {', '.join(version_strs)}")
if PY_NOGIL_VERSIONS:
    cog.outl("")
    cog.outl(f"*\\* Versions with free-threading support (e.g., {PY_DEFAULT_NOGIL})*")
]]] -->
- Python 3.10, 3.11, 3.12, 3.13*, 3.14*

*\* Versions with free-threading support (e.g., 3.13t)*
<!-- [[[end]]] -->

`docs2markdown` uses BeautifulSoup4 with the `lxml` parser. If prebuilt wheels aren't available for your Python version or platform, you'll need:

**Ubuntu/Debian:**
```bash
sudo apt-get install libxml2-dev libxslt-dev
```

For other platforms, see the [`lxml` installation documentation](https://lxml.de/installation.html#requirements).

## Installation

For quick one-off usage without installation, use `uvx`:

```bash
uvx docs2markdown docs/index.html
```

To install as a CLI tool:

```bash
uv tool install docs2markdown

# or using pipx
pipx install docs2markdown
```

To use as a Python library in your projects:

```bash
pip install docs2markdown

# or with uv
uv add docs2markdown
```

## Getting Started

The simplest way to use `docs2markdown` is to convert a single HTML file to Markdown. By default, output goes to stdout:

```bash
docs2markdown docs/index.html
```

This reads `docs/index.html`, converts it to GitHub-flavored Markdown, and prints the result. You can redirect this to a file or pipe it to other commands.

For batch conversions, point `docs2markdown` at a directory to recursively find and convert all HTML files:

```bash
docs2markdown docs/_build/html
```

By default, this creates a `./dist` directory with the converted Markdown files, preserving the original directory structure.

## Features

### Output Formats

`docs2markdown` supports four output formats for different applications.

**GitHub-flavored Markdown (ghfm)** is the default format. It produces standard Markdown that renders well on GitHub, GitLab, and other platforms. It supports tables, syntax-highlighted code blocks, task lists, GitHub alerts, and other GitHub-specific extensions.

**CommonMark (commonmark)** is the strict baseline Markdown specification. This format ensures maximum compatibility across different Markdown parsers and platforms by maintaining strict CommonMark compliance. Tables are rendered as HTML since they're not part of the CommonMark spec (HTML is explicitly allowed per section 6.6). Use this when you need portable, standards-compliant Markdown that will work everywhere.

**Obsidian (obsidian)** produces Obsidian-flavored Markdown optimized for personal knowledge management in Obsidian vaults. This format uses wikilinks (`[[page]]`) for internal references, embed syntax (`![[image.png]]`) for images, and lowercase callouts (`[!note]`, `[!warning]`) for admonitions. Links are automatically normalized by extracting just the filename from paths, making them work seamlessly with Obsidian's link resolution. Use this when converting documentation for import into an Obsidian vault or other PKM tools that support wikilink syntax.

**LLM-friendly text (llmstxt)** is optimized for AI models. This format strips unnecessary formatting and structures content for language models to parse and understand. This is useful for feeding documentation to AI assistants, building RAG (Retrieval-Augmented Generation) systems, creating training data, or preparing documentation for AI analysis tools.

### Documentation Types

Different documentation generators produce HTML with different structures and conventions. `docs2markdown` applies preprocessing based on the documentation type to produce cleaner output.

**Default** mode works with generic HTML documentation. It applies basic preprocessing to clean up common HTML patterns and prepare the content for Markdown conversion.

**Sphinx** mode is specifically designed for Sphinx-generated documentation. Sphinx adds specific CSS classes, navigation elements, headerlinks (the ¶ symbols), code-block wrappers, and other structural markup that need specialized handling. This mode identifies and removes these Sphinx-specific elements before conversion, producing cleaner Markdown output.

## Usage

### CLI

Basic command structure:

```bash
docs2markdown <input> [output] [--format FORMAT] [--type TYPE]
```

Examples:

```bash
# Single file to stdout
docs2markdown docs/index.html

# Single file to output file
docs2markdown docs/index.html output.md

# Directory to ./dist (default)
docs2markdown docs/_build/html

# Directory to custom output with options
docs2markdown docs/_build/html markdown/ --type sphinx --format obsidian
```

Run `docs2markdown --help` to see all available options.

See the [Features](#features) section above for details on output formats and documentation types.

### Library

While `docs2markdown` works great as a CLI tool, you can also use it as a Python library in your own projects.

#### `convert_file`

The `convert_file` function takes an HTML file path and returns the converted Markdown as a string. This gives you full control over what to do with the output.

**`convert_file(html_file: Path, doc_type: DocType = DocType.DEFAULT, format: Format = Format.GHFM) -> str`**

Parameters:
- `html_file`: Path to the HTML file to convert
- `doc_type`: Documentation type for preprocessing (default: `DocType.DEFAULT`)
  - `DocType.DEFAULT` - Generic HTML documentation
  - `DocType.SPHINX` - Sphinx-generated documentation
- `format`: Output format (default: `Format.GHFM`)
  - `Format.GHFM` - GitHub-flavored Markdown
  - `Format.COMMONMARK` - CommonMark (strict baseline)
  - `Format.LLMSTXT` - LLM-friendly text format
  - `Format.OBSIDIAN` - Obsidian with wikilinks and embeds

Returns: Converted Markdown as a string

##### Examples

```python
from pathlib import Path

from docs2markdown import convert_file
from docs2markdown import DocType
from docs2markdown import Format


html_file = Path("docs/index.html")

# Convert with defaults (GHFM format, default preprocessing)
markdown = convert_file(html_file)

# Or specify format and documentation type
markdown = convert_file(html_file, doc_type=DocType.SPHINX, format=Format.LLMSTXT)
```

#### `convert_html`

The `convert_html` function takes a raw HTML string and returns the converted Markdown as a string. This is useful when you already have HTML in memory from an API response, web scraping, or other sources.

**`convert_html(html: str, doc_type: DocType = DocType.DEFAULT, format: Format = Format.GHFM) -> str`**

Parameters:
- `html`: HTML string to convert
- `doc_type`: Documentation type for preprocessing (default: `DocType.DEFAULT`)
  - `DocType.DEFAULT` - Generic HTML documentation
  - `DocType.SPHINX` - Sphinx-generated documentation
- `format`: Output format (default: `Format.GHFM`)
  - `Format.GHFM` - GitHub-flavored Markdown
  - `Format.COMMONMARK` - CommonMark (strict baseline)
  - `Format.LLMSTXT` - LLM-friendly text format
  - `Format.OBSIDIAN` - Obsidian with wikilinks and embeds

Returns: Converted Markdown as a string

##### Examples

```python
from docs2markdown import convert_html
from docs2markdown import DocType
from docs2markdown import Format


# Convert HTML from an API response
html_content = "<h1>API Documentation</h1><p>Content here</p>"
markdown = convert_html(html_content)

# Convert with specific format and type
html_from_scraper = get_documentation_html()
markdown = convert_html(
    html_from_scraper, doc_type=DocType.SPHINX, format=Format.LLMSTXT
)

# Convert Sphinx docs to Obsidian format for a knowledge base
sphinx_html = Path("docs/_build/html/index.html").read_text()
obsidian_md = convert_html(sphinx_html, doc_type=DocType.SPHINX, format=Format.OBSIDIAN)
Path("vault/Django Docs/index.md").write_text(obsidian_md)
```

#### `convert_directory`

The `convert_directory` function recursively finds all HTML files in a directory and converts them to Markdown. It yields `(input_file, result)` tuples as it processes files. The function preserves the directory structure - if you have `docs/api/functions.html`, it will be written to `output/api/functions.md`.

**`convert_directory(input_dir: Path, output_dir: Path, doc_type: DocType = DocType.DEFAULT, format: Format = Format.GHFM) -> Generator[tuple[Path, Path | Exception], None, None]`**

Parameters:
- `input_dir`: Directory with HTML files to convert
- `output_dir`: Directory where Markdown files will be written
- `doc_type`: Documentation type for preprocessing (default: `DocType.DEFAULT`)
- `format`: Output format (default: `Format.GHFM`)

Yields: `(input_file, result)` tuples where `result` is either the output file path (on success) or an Exception (on failure)

##### Examples

```python
from pathlib import Path

from docs2markdown import convert_directory
from docs2markdown import DocType
from docs2markdown import Format


for input_file, result in convert_directory(
    Path("docs/_build/html"),
    Path("markdown/"),
    doc_type=DocType.SPHINX,
    format=Format.LLMSTXT,
):
    if isinstance(result, Exception):
        print(f"Error converting {input_file}: {result}")
    else:
        print(f"Converted {input_file} → {result}")
```

## Development

For detailed instructions on setting up a development environment and contributing to this project, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

docs2markdown is licensed under the MIT license. See the [LICENSE](LICENSE) file for more information.
