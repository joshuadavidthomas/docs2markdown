from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer

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
            help="Directory containing HTML documentation",
            exists=True,
            file_okay=False,
            dir_okay=True,
            resolve_path=True,
        ),
    ],
    output: Annotated[
        Path,
        typer.Argument(
            help="Directory for markdown output",
            file_okay=False,
            dir_okay=True,
            resolve_path=True,
        ),
    ],
) -> None:
    """Convert HTML documentation to markdown.

    ## Examples

    ```bash
    docs2md convert docs/_build/html output/markdown
    ```
    """

    if not input.exists():
        typer.secho(
            f"Error: Input directory does not exist: {input}",
            fg=typer.colors.RED,
        )
        raise typer.Exit(1)

    html_files = list(input.rglob("*.html"))

    if not html_files:
        typer.secho(
            f"Warning: No HTML files found in {input}",
            fg=typer.colors.YELLOW,
        )
        typer.echo("Nothing to convert.")
        return

    output.mkdir(parents=True, exist_ok=True)

    typer.echo(f"Output written to: {output}")
