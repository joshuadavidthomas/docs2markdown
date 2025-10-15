from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer
from rich.console import Console
from rich.progress import Progress

from docs2md.convert import DocType
from docs2md.convert import convert_directory
from docs2md.convert import convert_file

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
    doc_type: Annotated[
        DocType,
        typer.Option(
            "--type",
            help="Documentation type",
        ),
    ] = DocType.DEFAULT,
) -> None:
    """Convert HTML documentation to GitHub-flavored Markdown.

    ## Examples

    ```bash
    # Single file to stdout
    docs2md docs/index.html

    # Single file to specific output
    docs2md docs/index.html output.md

    # Directory with default output location
    docs2md docs/_build/html

    # Directory with custom output
    docs2md docs/_build/html markdown/

    # Sphinx documentation
    docs2md docs/_build/html --type sphinx
    ```
    """

    if input.is_file():
        markdown = convert_file(input, doc_type)

        if output is None:
            console.print(markdown)
        else:
            output.parent.mkdir(parents=True, exist_ok=True)
            output.write_text(markdown)
            console.print(f"[green]✓[/green] Converted {input} → {output}")
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

            for input_file, result in convert_directory(input, output_dir, doc_type):
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

        console.print(f"\n[green]✓[/green] Converted {len(successes)} files")
        console.print(f"Output written to: {output_dir}")
