from __future__ import annotations

from pathlib import Path

import pytest
from typer.testing import CliRunner

from docs2markdown.cli import app
from docs2markdown.convert import Format

runner = CliRunner()


TEST_FIXTURE_DIR = Path("tests/fixtures/sphinx/")
TEST_FIXTURE_FILE = TEST_FIXTURE_DIR / "django__5_2__ref__checks.html"


def test_single_file_to_stdout(tmp_path):
    result = runner.invoke(app, [str(TEST_FIXTURE_FILE)])

    assert result.exit_code == 0
    assert "# System check framework" in result.stdout
    assert "CheckMessage" in result.stdout


def test_single_file_to_file(tmp_path):
    output_file = tmp_path / "output.md"

    result = runner.invoke(app, [str(TEST_FIXTURE_FILE), str(output_file)])

    assert result.exit_code == 0
    assert output_file.exists()
    assert "# System check framework" in output_file.read_text()


def test_directory_to_default_dist(tmp_path, monkeypatch):
    html_dir = TEST_FIXTURE_DIR.absolute()

    monkeypatch.chdir(tmp_path)

    result = runner.invoke(app, [str(html_dir)])

    assert result.exit_code == 0

    output_dir = tmp_path / "dist"
    assert output_dir.exists()
    assert (output_dir / "django__5_2__ref__checks.md").exists()


def test_directory_to_custom_output(tmp_path):
    output_dir = tmp_path / "custom-output"

    result = runner.invoke(app, [str(TEST_FIXTURE_DIR), str(output_dir)])

    assert result.exit_code == 0
    assert output_dir.exists()
    assert (output_dir / "django__5_2__ref__checks.md").exists()


def test_sphinx_type_flag(tmp_path):
    output_file = tmp_path / "output.md"

    result = runner.invoke(
        app, [str(TEST_FIXTURE_FILE), str(output_file), "--type", "sphinx"]
    )

    assert result.exit_code == 0
    assert output_file.exists()


def test_invalid_type():
    result = runner.invoke(app, [str(TEST_FIXTURE_FILE), "--type", "invalid"])

    assert result.exit_code == 2
    assert "Invalid value" in result.output


def test_empty_directory(tmp_path):
    empty_dir = tmp_path / "empty"
    empty_dir.mkdir()

    result = runner.invoke(app, [str(empty_dir)])

    assert result.exit_code == 0
    assert "No HTML files found" in result.stdout


def test_directory_with_file_processing_error(tmp_path, monkeypatch):
    from docs2markdown import convert

    def mock_convert_file(html_file, doc_type):
        raise ValueError("Simulated processing error")

    monkeypatch.setattr(convert, "convert_file", mock_convert_file)

    html_dir = tmp_path / "html"
    html_dir.mkdir()

    bad_html = html_dir / "bad.html"
    bad_html.write_text("<html><body>Test</body></html>")

    result = runner.invoke(app, [str(html_dir)])

    assert result.exit_code == 1


def test_directory_with_io_error(tmp_path, monkeypatch):
    html_dir = tmp_path / "html"
    html_dir.mkdir()

    html_file = html_dir / "test.html"
    html_file.write_text("<html><body>Test</body></html>")

    original_write_text = Path.write_text

    def mock_write_text(self, data, *args, **kwargs):
        if self.suffix == ".md":
            raise OSError("Simulated I/O error")
        return original_write_text(self, data, *args, **kwargs)

    monkeypatch.setattr(Path, "write_text", mock_write_text)

    result = runner.invoke(app, [str(html_dir)])

    assert result.exit_code == 1


@pytest.mark.parametrize(
    "format,should_contain_html",
    [
        (Format.GHFM, True),
        (Format.LLMSTXT, False),
    ],
)
def test_convert_with_format_option(format, should_contain_html, tmp_path):
    html_file = Path("tests/fixtures/format_test.html")
    output_file = tmp_path / "output.md"

    result = runner.invoke(
        app, [str(html_file), str(output_file), "--format", format.value]
    )

    assert result.exit_code == 0
    assert output_file.exists()

    content = output_file.read_text()
    if should_contain_html:
        assert "<dl>" in content
        assert "<span" in content
    else:
        assert "<dl>" not in content
        assert "<span" not in content


@pytest.mark.parametrize(
    "format",
    [Format.GHFM, Format.LLMSTXT],
)
def test_convert_directory_with_format(format, tmp_path):
    input_dir = tmp_path / "input"
    input_dir.mkdir()
    (input_dir / "test.html").write_text("<p>Test content</p>")

    output_dir = tmp_path / "output"

    result = runner.invoke(
        app, [str(input_dir), str(output_dir), "--format", format.value]
    )

    assert result.exit_code == 0
    output_files = list(output_dir.glob("*.md"))
    assert len(output_files) == 1
