from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer
from rich.console import Console
from rich.progress import Progress

from docs2markdown.chunker import ChunkStrategy
from docs2markdown.chunker import MarkdownChunker
from docs2markdown.convert import DocType
from docs2markdown.convert import Format
from docs2markdown.convert import convert_directory
from docs2markdown.convert import convert_file
from docs2markdown.output import JsonlWriter
from docs2markdown.output import ManifestWriter
from docs2markdown.output import MarkdownWriter
from docs2markdown.output import OutputFormat
from docs2markdown.tokenizer import get_counter

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
            help="Output format: ghfm (GitHub-flavored Markdown) or llmstxt (LLM-friendly text)",
        ),
    ] = Format.GHFM,
    chunk_strategy: Annotated[
        ChunkStrategy,
        typer.Option(
            "--chunk-strategy",
            help="Chunking strategy: none, heading, token, or hybrid",
        ),
    ] = ChunkStrategy.NONE,
    max_tokens: Annotated[
        int,
        typer.Option(
            "--max-tokens",
            help="Maximum tokens per chunk",
        ),
    ] = 1000,
    overlap_tokens: Annotated[
        int,
        typer.Option(
            "--overlap-tokens",
            help="Token overlap between chunks",
        ),
    ] = 100,
    chunk_output: Annotated[
        OutputFormat,
        typer.Option(
            "--chunk-output",
            help="Output format for chunks: markdown, jsonl, or manifest",
        ),
    ] = OutputFormat.MARKDOWN,
    model: Annotated[
        str | None,
        typer.Option(
            "--model",
            help="Model for token counting (e.g., gpt-4, gpt-4o-mini)",
        ),
    ] = None,
    emit_manifest: Annotated[
        bool,
        typer.Option(
            "--emit-manifest",
            help="Generate manifest.json for cross-references",
        ),
    ] = False,
) -> None:
    """Convert HTML documentation to Markdown with optional LLM-friendly chunking.

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

    # With chunking for LLM consumption
    docs2markdown docs/ output/ --chunk-strategy heading --max-tokens 1000

    # Generate JSONL for RAG systems
    docs2markdown docs/ chunks.jsonl --chunk-strategy heading --chunk-output jsonl

    # With manifest for cross-references
    docs2markdown docs/ output/ --chunk-strategy heading --emit-manifest
    ```
    """

    if input.is_file():
        markdown = convert_file(input, doc_type, format)

        if chunk_strategy != ChunkStrategy.NONE:
            counter = get_counter(model)
            chunker = MarkdownChunker(
                max_tokens=max_tokens,
                overlap_tokens=overlap_tokens,
                strategy=chunk_strategy,
                counter=counter,
            )
            chunks = chunker.chunk(markdown, input)

            if output is None:
                console.print(
                    "[yellow]Warning:[/yellow] Chunking requires an output path"
                )
                raise typer.Exit(1)

            if chunk_output == OutputFormat.JSONL:
                writer = JsonlWriter()
                writer.write(chunks, output)
                console.print(
                    f"[green]✓[/green] Converted and chunked {input} → {output} ({len(chunks)} chunks)"
                )
            elif chunk_output == OutputFormat.MANIFEST:
                writer = ManifestWriter()
                writer.write(chunks, output)
                console.print(
                    f"[green]✓[/green] Generated manifest {output} ({len(chunks)} chunks)"
                )
            else:
                writer = MarkdownWriter()
                writer.write(chunks, output)
                console.print(
                    f"[green]✓[/green] Converted and chunked {input} → {output}/ ({len(chunks)} chunks)"
                )

            if emit_manifest:
                manifest_path = (
                    output.parent / "manifest.json"
                    if output.is_file()
                    else output / "manifest.json"
                )
                ManifestWriter().write(chunks, manifest_path)
                console.print(f"[green]✓[/green] Generated manifest {manifest_path}")
        else:
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

        if chunk_strategy != ChunkStrategy.NONE:
            counter = get_counter(model)
            chunker = MarkdownChunker(
                max_tokens=max_tokens,
                overlap_tokens=overlap_tokens,
                strategy=chunk_strategy,
                counter=counter,
            )

            all_chunks = []
            successes = []
            failures = []

            with Progress(console=console) as progress:
                task = progress.add_task(
                    "[cyan]Converting and chunking files...", total=len(html_files)
                )

                for input_file, result in convert_directory(
                    input, output_dir, doc_type, format
                ):
                    if isinstance(result, Exception):
                        failures.append((input_file, result))
                    else:
                        successes.append(result)
                        try:
                            markdown = result.read_text()
                            chunks = chunker.chunk(markdown, input_file)
                            all_chunks.extend(chunks)
                        except Exception as e:
                            failures.append((input_file, e))
                    progress.update(task, advance=1)

            if failures:
                console.print("\n[red]Failed conversions/chunking:[/red]")
                for file, error in failures:
                    console.print(f"  [red]✗[/red] {file}: {error}")
                raise typer.Exit(1)

            if chunk_output == OutputFormat.JSONL:
                jsonl_path = output_dir / "chunks.jsonl"
                JsonlWriter().write(all_chunks, jsonl_path)
                console.print(
                    f"\n[green]✓[/green] Converted {len(successes)} files into {len(all_chunks)} chunks"
                )
                console.print(f"JSONL written to: {jsonl_path}")
            elif chunk_output == OutputFormat.MANIFEST:
                manifest_path = output_dir / "manifest.json"
                ManifestWriter().write(all_chunks, manifest_path)
                console.print(
                    f"\n[green]✓[/green] Generated manifest for {len(all_chunks)} chunks"
                )
                console.print(f"Manifest written to: {manifest_path}")
            else:
                console.print(
                    f"\n[green]✓[/green] Converted {len(successes)} files into {len(all_chunks)} chunks"
                )
                console.print(f"Output written to: {output_dir}")

            if emit_manifest:
                manifest_path = output_dir / "manifest.json"
                ManifestWriter().write(all_chunks, manifest_path)
                console.print(f"[green]✓[/green] Generated manifest {manifest_path}")
        else:
            successes = []
            failures = []

            with Progress(console=console) as progress:
                task = progress.add_task(
                    "[cyan]Converting files...", total=len(html_files)
                )

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
