from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer
from rich.console import Console
from rich.progress import Progress

from docs2markdown.convert import DocType
from docs2markdown.convert import Format
from docs2markdown.convert import convert_directory
from docs2markdown.convert import convert_file

console = Console()

app = typer.Typer(
    help="Convert HTML documentation to Markdown",
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
    doc_type: Annotated[
        DocType,
        typer.Option(
            "--type",
            help="Documentation type",
        ),
    ] = DocType.DEFAULT,
    format: Annotated[
        Format,
        typer.Option(
            "--format",
            help="Output format: ghfm (GitHub-flavored), commonmark (strict CommonMark), llmstxt (LLM-friendly) or obsidian (Obsidian)",
        ),
    ] = Format.GHFM,
) -> None:
    """Convert HTML documentation to Markdown.

    ## Examples

    ```bash
    # Single file to stdout (default GitHub-flavored)
    docs2markdown docs/index.html

    # Single file with LLM-friendly format
    docs2markdown docs/index.html output.txt --format llmstxt

    # Directory with default output location
    docs2markdown docs/_build/html

    # Directory with custom output and format
    docs2markdown docs/_build/html markdown/ --format llmstxt

    # Sphinx documentation
    docs2markdown docs/_build/html --type sphinx
    ```
    """

    if input.is_file():
        markdown = convert_file(input, doc_type, format)

        if output is None:
            console.print(markdown)
        else:
            output.parent.mkdir(parents=True, exist_ok=True)
            output.write_text(markdown)
            console.print(
                f"[green]✓[/green] Converted {input} → {output} (format: {format.value})"
            )
    else:
        output_dir = output or Path("./dist")

        html_files = list(input.rglob("*.html"))

        if not html_files:
            console.print(
                f"[yellow]Warning:[/yellow] No HTML files found in {input}",
                style="yellow",
            )
            console.print("Nothing to convert.")
            raise typer.Exit(0)

        successes = []
        failures = []

        with Progress(console=console) as progress:
            task = progress.add_task("[cyan]Converting files...", total=len(html_files))

            for input_file, result in convert_directory(
                input, output_dir, doc_type, format
            ):
                if isinstance(result, Exception):
                    failures.append((input_file, result))
                else:
                    successes.append(result)
                progress.update(task, advance=1)

        if failures:
            console.print("\n[red]Failed conversions:[/red]")
            for file, error in failures:
                console.print(f"  [red]✗[/red] {file}: {error}")
            raise typer.Exit(1)

        console.print(
            f"\n[green]✓[/green] Converted {len(successes)} files (format: {format.value})"
        )
        console.print(f"Output written to: {output_dir}")
