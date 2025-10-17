# docs2markdown

[![PyPI - docs2markdown](https://img.shields.io/pypi/v/docs2markdown?label=docs2markdown)](https://pypi.org/project/docs2markdown/)
![PyPI - Python Version](https://img.shields.io/pypi/pyversions/docs2markdown)

Convert HTML documentation to Markdown with support for multiple output formats and documentation types.

`docs2markdown` transforms HTML documentation into clean, readable Markdown. Whether you're working with Sphinx-generated documentation, generic HTML docs, or need AI-friendly text output, `docs2markdown` handles the conversion while preserving structure and formatting. It works as both a CLI tool for quick conversions and a Python library for integration into your projects.

## Requirements

<!-- [[[cog
import subprocess
import cog

from noxfile import PY_VERSIONS

cog.outl(f"- Python {', '.join(PY_VERSIONS)}")
]]] -->
- Python 3.10, 3.11, 3.12, 3.13, 3.14
<!-- [[[end]]] -->

## Installation

For quick one-off usage without installation, use `uvx`:

```bash
uvx docs2markdown docs/index.html
```

To install as a persistent CLI tool:

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

For batch conversions, point `docs2markdown` at a directory and it will recursively find all HTML files and convert them:

```bash
docs2markdown docs/_build/html
```

By default, this creates a `./dist` directory with the converted Markdown files, preserving the original directory structure.

## Features

### Output Formats

`docs2markdown` supports two output formats to suit different use cases.

**GitHub-flavored Markdown (ghfm)** is the default format. It produces standard Markdown that renders beautifully on GitHub, GitLab, and other platforms. This format includes support for tables, code blocks with syntax highlighting, task lists, and other GitHub-specific extensions. Use this when you want documentation that's readable by humans and renders nicely on documentation sites, README files, and general-purpose documentation.

**LLM-friendly text (llmstxt)** is optimized for consumption by AI models. This format strips away unnecessary formatting and structures content in a way that's easier for language models to parse and understand. The output uses consistent patterns for structure and organizes content to maximize comprehension by AI systems. This is particularly useful when feeding documentation to AI assistants, building RAG (Retrieval-Augmented Generation) systems, creating training data for models, or preparing documentation for AI-powered analysis tools.

### Documentation Types

Different documentation generators produce HTML with different structures and conventions. `docs2markdown` can apply specialized preprocessing based on the documentation type to produce cleaner output.

**Default** mode works with generic HTML documentation. It applies basic preprocessing to clean up common HTML patterns and prepare the content for Markdown conversion. Use this for manually-written HTML, MkDocs output, and other generic documentation formats.

**Sphinx** mode is specifically designed for Sphinx-generated documentation. Sphinx adds specific CSS classes, navigation elements, headerlinks (the ¶ symbols), code-block wrappers, and other structural markup that need specialized handling. This mode knows how to identify and remove these Sphinx-specific elements before conversion, producing cleaner Markdown output without the navigation artifacts and structural markup that Sphinx adds.

### Batch Processing

`docs2markdown` can convert entire directories of HTML files while preserving the directory structure. When converting a directory, it recursively finds all HTML files and converts them to Markdown, maintaining the same folder hierarchy in the output directory. For example, if you have `docs/api/functions.html`, it will be written to `output/api/functions.md`.

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
docs2markdown docs/_build/html markdown/ --type sphinx --format llmstxt
```

Run `docs2markdown --help` to see all available options.

See the [Features](#features) section above for details on output formats and documentation types.

### Library

While `docs2markdown` works great as a CLI tool, you can also use it as a Python library in your own projects. This is useful when you need to integrate HTML-to-Markdown conversion into a larger workflow, build custom processing pipelines, or programmatically convert documentation as part of your build process.

#### `convert_file`

The `convert_file` function takes a path to an HTML file and returns the converted Markdown as a string. This gives you full control over what to do with the output - write it to a file, process it further, or use it directly in your application.

**`convert_file(html_file: Path, doc_type: DocType = DocType.DEFAULT, format: Format = Format.GHFM) -> str`**

Parameters:
- `html_file`: Path to the HTML file to convert
- `doc_type`: Documentation type for preprocessing (default: `DocType.DEFAULT`)
  - `DocType.DEFAULT` - Generic HTML documentation
  - `DocType.SPHINX` - Sphinx-generated documentation
- `format`: Output format (default: `Format.GHFM`)
  - `Format.GHFM` - GitHub-flavored Markdown
  - `Format.LLMSTXT` - LLM-friendly text format

Returns: Converted Markdown as a string

##### Examples

```python
from pathlib import Path

from docs2markdown.convert import convert_file
from docs2markdown.convert import DocType
from docs2markdown.convert import Format


html_file = Path("docs/index.html")

# Convert with defaults (GHFM format, default preprocessing)
markdown = convert_file(html_file)

# Or specify format and documentation type
markdown = convert_file(
    html_file,
    doc_type=DocType.SPHINX,
    format=Format.LLMSTXT
)
```

#### `convert_directory`

The `convert_directory` function recursively finds all HTML files in a directory and converts them to Markdown. It yields `(input_file, result)` tuples as it processes files, making it easy to track progress, handle errors, and provide feedback during long-running conversions. The function preserves the directory structure - if you have `docs/api/functions.html`, it will be written to `output/api/functions.md`.

**`convert_directory(input_dir: Path, output_dir: Path, doc_type: DocType = DocType.DEFAULT, format: Format = Format.GHFM) -> Generator[tuple[Path, Path | Exception], None, None]`**

Parameters:
- `input_dir`: Directory containing HTML files to convert
- `output_dir`: Directory where Markdown files will be written
- `doc_type`: Documentation type for preprocessing (default: `DocType.DEFAULT`)
- `format`: Output format (default: `Format.GHFM`)

Yields: `(input_file, result)` tuples where `result` is either the output file path (on success) or an Exception (on failure)

##### Examples

```python
from pathlib import Path

from docs2markdown.convert import convert_directory
from docs2markdown.convert import DocType
from docs2markdown.convert import Format


for input_file, result in convert_directory(
    Path("docs/_build/html"),
    Path("markdown/"),
    doc_type=DocType.SPHINX,
    format=Format.LLMSTXT
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
