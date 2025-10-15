from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer
from rich.console import Console
from rich.progress import Progress

console = Console()

app = typer.Typer(
    help="Convert HTML documentation to GitHub-flavored Markdown",
    no_args_is_help=True,
    rich_markup_mode="markdown",
)


@app.command()
def convert(
    input: Annotated[
        Path,
        typer.Argument(
            help="File or directory containing HTML documentation",
            exists=True,
            resolve_path=True,
        ),
    ],
    output: Annotated[
        Path | None,
        typer.Argument(
            help="Output file or directory (default: stdout for files, ./dist/ for directories)",
            resolve_path=True,
        ),
    ] = None,
    type: Annotated[
        str,
        typer.Option(
            help="Documentation type (default uses BaseHtmlPreprocessor, sphinx uses SphinxHtmlPreprocessor)",
        ),
    ] = "default",
) -> None:
    """Convert HTML documentation to GitHub-flavored Markdown.

    ## Examples

    ```bash
    # Single file to stdout
    docs2md convert docs/index.html

    # Single file to specific output
    docs2md convert docs/index.html output.md

    # Directory with default output location
    docs2md convert docs/_build/html

    # Directory with custom output
    docs2md convert docs/_build/html markdown/

    # Sphinx documentation
    docs2md convert docs/_build/html --type sphinx
    ```
    """

    if input.is_file():
        convert_single_file(input, output, type)
    else:
        convert_directory(input, output or Path("./dist"), type)
