# CLI Implementation Plan

> **For Claude:** Use `${SUPERPOWERS_SKILLS_ROOT}/skills/collaboration/executing-plans/SKILL.md` to implement this plan task-by-task.

**Goal:** Implement the CLI convert command to process HTML files to GitHub-flavored Markdown with Rich progress UI.

**Architecture:** The CLI accepts a file or directory as input, optionally an output location, and a doc type flag. Single files without output go to stdout. Directories without output default to `./dist/`. Processing uses existing preprocessor classes and markdown converter, with Rich Console for all output and Progress bars for directory conversions.

**Tech Stack:** Typer for CLI, Rich for output/progress, existing BeautifulSoup/markdownify pipeline

---

## Task 1: Add Rich Console and update CLI convert command signature

**Files:**
- Modify: `src/docs2md/cli.py`

**Step 1: Add Rich imports and console instance**

Add after existing imports:

```python
from rich.console import Console
from rich.progress import Progress

console = Console()
```

**Step 2: Update convert command signature to make output optional and add type option**

Replace the `convert` function signature (lines 16-36):

```python
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
```

**Step 3: Replace existing convert function body with routing logic**

Replace lines 46-65 with:

```python
if input.is_file():
    convert_single_file(input, output, type)
else:
    convert_directory(input, output or Path("./dist"), type)
```

**Step 4: Verify code compiles**

Run: `python -m py_compile src/docs2md/cli.py`
Expected: No output (successful compilation)

**Step 5: Commit**

```bash
git add src/docs2md/cli.py
git commit -m "feat: update CLI signature for flexible input/output handling"
```

---

## Task 2: Implement core file processing function

**Files:**
- Modify: `src/docs2md/cli.py`

**Step 1: Add imports for preprocessors and markdown converter**

Add after existing imports (around line 6):

```python
from docs2md.html import BaseHtmlPreprocessor
from docs2md.html import SphinxHtmlPreprocessor
from docs2md.markdown import md
```

**Step 2: Implement process_file helper function**

Add before the `convert` function (around line 15):

```python
def process_file(html_file: Path, doc_type: str) -> str:
    html = html_file.read_text()
    PreprocessorClass = (
        SphinxHtmlPreprocessor if doc_type == "sphinx" else BaseHtmlPreprocessor
    )
    preprocessed = PreprocessorClass(html).process()
    return md(preprocessed)
```

**Step 3: Verify code compiles**

Run: `python -m py_compile src/docs2md/cli.py`
Expected: No output (successful compilation)

**Step 4: Commit**

```bash
git add src/docs2md/cli.py
git commit -m "feat: add core file processing function"
```

---

## Task 3: Implement single file conversion handler

**Files:**
- Modify: `src/docs2md/cli.py`

**Step 1: Implement convert_single_file function**

Add after the `process_file` function:

```python
def convert_single_file(input_file: Path, output: Path | None, doc_type: str) -> None:
    markdown = process_file(input_file, doc_type)

    if output is None:
        console.print(markdown)
    else:
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(markdown)
        console.print(f"[green]✓[/green] Converted {input_file} → {output}")
```

**Step 2: Verify code compiles**

Run: `python -m py_compile src/docs2md/cli.py`
Expected: No output (successful compilation)

**Step 3: Test manually with single file to stdout**

Run: `uv run docs2md convert tests/fixtures/sphinx/django__5_2__ref__checks.html | head -20`
Expected: Markdown output to stdout (first 20 lines)

**Step 4: Test manually with single file to output file**

Run: `uv run docs2md convert tests/fixtures/sphinx/django__5_2__ref__checks.html /tmp/test-output.md`
Expected: Green checkmark message with file paths

**Step 5: Verify output file was created**

Run: `head -20 /tmp/test-output.md`
Expected: Markdown content matching stdout test

**Step 6: Commit**

```bash
git add src/docs2md/cli.py
git commit -m "feat: implement single file conversion with stdout support"
```

---

## Task 4: Implement directory conversion handler with Rich progress

**Files:**
- Modify: `src/docs2md/cli.py`

**Step 1: Implement convert_directory function**

Add after the `convert_single_file` function:

```python
def convert_directory(input_dir: Path, output_dir: Path, doc_type: str) -> None:
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
        task = progress.add_task("[cyan]Converting files...", total=len(html_files))

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
```

**Step 2: Verify code compiles**

Run: `python -m py_compile src/docs2md/cli.py`
Expected: No output (successful compilation)

**Step 3: Test manually with directory default output**

Run: `uv run docs2md convert tests/fixtures/sphinx/`
Expected: Progress bar, then success message showing files converted to ./dist/

**Step 4: Verify output structure preserved**

Run: `ls -la dist/`
Expected: HTML files converted to .md with same structure as tests/fixtures/sphinx/

**Step 5: Clean up test output**

Run: `rm -rf dist/ /tmp/test-output.md`

**Step 6: Commit**

```bash
git add src/docs2md/cli.py
git commit -m "feat: implement directory conversion with Rich progress UI"
```

---

## Task 5: Add type validation and improve error messages

**Files:**
- Modify: `src/docs2md/cli.py`

**Step 1: Update type option to use Typer choices**

In the `convert` function signature, replace the `type` parameter definition:

```python
type: Annotated[
    str,
    typer.Option(
        help="Documentation type",
    ),
] = ("default",)
```

With:

```python
doc_type: Annotated[
    str,
    typer.Option(
        "--type",
        help="Documentation type (default=BaseHtmlPreprocessor, sphinx=SphinxHtmlPreprocessor)",
    ),
] = ("default",)
```

**Step 2: Update routing logic to use new parameter name**

Update the convert function body to use `doc_type` instead of `type`:

```python
if input.is_file():
    convert_single_file(input, output, doc_type)
else:
    convert_directory(input, output or Path("./dist"), doc_type)
```

**Step 3: Add validation at start of convert function**

Add after the docstring and before the routing logic:

```python
if doc_type not in ("default", "sphinx"):
    console.print(
        f"[red]Error:[/red] Invalid type '{doc_type}'. Must be 'default' or 'sphinx'.",
    )
    raise typer.Exit(1)
```

**Step 4: Verify code compiles**

Run: `python -m py_compile src/docs2md/cli.py`
Expected: No output (successful compilation)

**Step 5: Test invalid type**

Run: `uv run docs2md convert tests/fixtures/sphinx/ --type invalid`
Expected: Red error message, exit code 1

**Step 6: Test valid types still work**

Run: `uv run docs2md convert tests/fixtures/sphinx/ --type sphinx && rm -rf dist/`
Expected: Success

**Step 7: Commit**

```bash
git add src/docs2md/cli.py
git commit -m "feat: add type validation and improve parameter naming"
```

---

## Task 6: Write CLI tests

**Files:**
- Create: `tests/test_cli.py`

**Step 1: Create test file with imports and fixtures**

```python
from __future__ import annotations

from pathlib import Path

from typer.testing import CliRunner

from docs2md.cli import app

runner = CliRunner()


def test_single_file_to_stdout(tmp_path):
    html_file = Path("tests/fixtures/sphinx/django__5_2__ref__checks.html")

    result = runner.invoke(app, ["convert", str(html_file)])

    assert result.exit_code == 0
    assert "# System check framework" in result.stdout
    assert "[!NOTE]" in result.stdout


def test_single_file_to_file(tmp_path):
    html_file = Path("tests/fixtures/sphinx/django__5_2__ref__checks.html")
    output_file = tmp_path / "output.md"

    result = runner.invoke(app, ["convert", str(html_file), str(output_file)])

    assert result.exit_code == 0
    assert "✓" in result.stdout
    assert output_file.exists()
    assert "# System check framework" in output_file.read_text()


def test_directory_to_default_dist(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    html_dir = Path("tests/fixtures/sphinx/")

    result = runner.invoke(app, ["convert", str(html_dir)])

    assert result.exit_code == 0
    assert "✓" in result.stdout
    assert "Converted 3 files" in result.stdout

    dist_dir = tmp_path / "dist"
    assert dist_dir.exists()
    assert (dist_dir / "django__5_2__ref__checks.md").exists()


def test_directory_to_custom_output(tmp_path):
    html_dir = Path("tests/fixtures/sphinx/")
    output_dir = tmp_path / "custom-output"

    result = runner.invoke(app, ["convert", str(html_dir), str(output_dir)])

    assert result.exit_code == 0
    assert "✓" in result.stdout
    assert output_dir.exists()
    assert (output_dir / "django__5_2__ref__checks.md").exists()


def test_sphinx_type_flag(tmp_path):
    html_file = Path("tests/fixtures/sphinx/django__5_2__ref__checks.html")
    output_file = tmp_path / "output.md"

    result = runner.invoke(
        app, ["convert", str(html_file), str(output_file), "--type", "sphinx"]
    )

    assert result.exit_code == 0
    assert output_file.exists()


def test_invalid_type(tmp_path):
    html_file = Path("tests/fixtures/sphinx/django__5_2__ref__checks.html")

    result = runner.invoke(app, ["convert", str(html_file), "--type", "invalid"])

    assert result.exit_code == 1
    assert "Invalid type" in result.stdout


def test_empty_directory(tmp_path):
    empty_dir = tmp_path / "empty"
    empty_dir.mkdir()

    result = runner.invoke(app, ["convert", str(empty_dir)])

    assert result.exit_code == 0
    assert "No HTML files found" in result.stdout
```

**Step 2: Run tests**

Run: `pytest tests/test_cli.py -v`
Expected: All tests pass

**Step 3: Run full test suite**

Run: `pytest`
Expected: All tests pass

**Step 4: Commit**

```bash
git add tests/test_cli.py
git commit -m "test: add comprehensive CLI tests"
```

---

## Task 7: Final verification and documentation

**Files:**
- Read: `pyproject.toml`

**Step 1: Run type checker**

Run: `uv run mypy src/docs2md/`
Expected: No type errors (or existing baseline errors only)

**Step 2: Run linter**

Run: `uv run ruff check src/docs2md/`
Expected: No linting errors

**Step 3: Run formatter check**

Run: `uv run ruff format --check src/docs2md/`
Expected: No formatting issues

**Step 4: Run full test suite with coverage**

Run: `pytest --cov=docs2md --cov-report=term-missing`
Expected: All tests pass, coverage report shows new code is covered

**Step 5: Manual smoke test - complete workflow**

```bash
# Test single file to stdout
uv run docs2md convert tests/fixtures/sphinx/django__5_2__ref__checks.html | head -20

# Test directory conversion
uv run docs2md convert tests/fixtures/sphinx/ /tmp/cli-test-output

# Verify output
ls -la /tmp/cli-test-output/
head -20 /tmp/cli-test-output/django__5_2__ref__checks.md

# Test with type flag
uv run docs2md convert tests/fixtures/sphinx/ /tmp/cli-test-sphinx --type sphinx

# Clean up
rm -rf /tmp/cli-test-output /tmp/cli-test-sphinx
```

Expected: All commands work as designed

**Step 6: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: address type/lint issues in CLI implementation"
```

---

## Completion Checklist

- [ ] CLI accepts file or directory input
- [ ] Output is optional (stdout for files, ./dist/ for directories)
- [ ] --type flag supports "default" and "sphinx"
- [ ] Single file mode prints to stdout or writes to file
- [ ] Directory mode shows Rich progress bar
- [ ] Directory mode preserves file structure
- [ ] Error handling with colored output
- [ ] All tests pass
- [ ] Type checking passes
- [ ] Linting passes
