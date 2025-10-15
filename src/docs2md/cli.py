from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer
from rich.console import Console
from rich.progress import Progress

from docs2md.html import BaseHtmlPreprocessor
from docs2md.html import SphinxHtmlPreprocessor
from docs2md.markdown import md

console = Console()

app = typer.Typer(
    help="Convert HTML documentation to GitHub-flavored Markdown",
    no_args_is_help=True,
    rich_markup_mode="markdown",
)


def process_file(html_file: Path, doc_type: str) -> str:
    html = html_file.read_text()
    PreprocessorClass = (
        SphinxHtmlPreprocessor if doc_type == "sphinx" else BaseHtmlPreprocessor
    )
    preprocessed = PreprocessorClass(html).process()
    return md(preprocessed)


def convert_single_file(input_file: Path, output: Path | None, doc_type: str) -> None:
    markdown = process_file(input_file, doc_type)

    if output is None:
        console.print(markdown)
    else:
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(markdown)
        console.print(f"[green]✓[/green] Converted {input_file} → {output}")


def convert_directory(
    input_dir: Path, output_dir: Path, doc_type: str
) -> None:
    html_files = list(input_dir.rglob("*.html"))

    if not html_files:
        console.print(
            "[yellow]Warning:[/yellow] No HTML files found in {0}".format(input_dir),
            style="yellow",
        )
        console.print("Nothing to convert.")
        return

    output_dir.mkdir(parents=True, exist_ok=True)

    failed_files: list[tuple[Path, str]] = []

    with Progress(console=console) as progress:
        task = progress.add_task(
            "[cyan]Converting files...", total=len(html_files)
        )

        for html_file in html_files:
            try:
                relative_path = html_file.relative_to(input_dir)
                output_file = output_dir / relative_path.with_suffix(".md")

                markdown = process_file(html_file, doc_type)

                output_file.parent.mkdir(parents=True, exist_ok=True)
                output_file.write_text(markdown)

                progress.update(task, advance=1)
            except Exception as e:
                failed_files.append((html_file, str(e)))
                progress.update(task, advance=1)

    if failed_files:
        console.print("\n[red]Failed conversions:[/red]")
        for file, error in failed_files:
            console.print(f"  [red]✗[/red] {file}: {error}")
        raise typer.Exit(1)

    console.print(
        f"\n[green]✓[/green] Converted {len(html_files) - len(failed_files)} files"
    )
    console.print(f"Output written to: {output_dir}")


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
