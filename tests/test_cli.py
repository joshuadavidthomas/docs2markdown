from __future__ import annotations

from pathlib import Path

from typer.testing import CliRunner

from docs2md.cli import app

runner = CliRunner()


def test_single_file_to_stdout(tmp_path):
    html_file = Path("tests/fixtures/sphinx/django__5_2__ref__checks.html")

    result = runner.invoke(app, [str(html_file)])

    assert result.exit_code == 0
    assert "# System check framework" in result.stdout
    assert "CheckMessage" in result.stdout


def test_single_file_to_file(tmp_path):
    html_file = Path("tests/fixtures/sphinx/django__5_2__ref__checks.html")
    output_file = tmp_path / "output.md"

    result = runner.invoke(app, [str(html_file), str(output_file)])

    assert result.exit_code == 0
    assert "✓" in result.stdout
    assert output_file.exists()
    assert "# System check framework" in output_file.read_text()


def test_directory_to_default_dist(tmp_path, monkeypatch):
    html_dir = Path("tests/fixtures/sphinx/").absolute()

    monkeypatch.chdir(tmp_path)

    result = runner.invoke(app, [str(html_dir)])

    assert result.exit_code == 0
    assert "✓" in result.stdout
    assert "Converted 3 files" in result.stdout

    output_dir = tmp_path / "dist"
    assert output_dir.exists()
    assert (output_dir / "django__5_2__ref__checks.md").exists()


def test_directory_to_custom_output(tmp_path):
    html_dir = Path("tests/fixtures/sphinx/")
    output_dir = tmp_path / "custom-output"

    result = runner.invoke(app, [str(html_dir), str(output_dir)])

    assert result.exit_code == 0
    assert "✓" in result.stdout
    assert output_dir.exists()
    assert (output_dir / "django__5_2__ref__checks.md").exists()


def test_sphinx_type_flag(tmp_path):
    html_file = Path("tests/fixtures/sphinx/django__5_2__ref__checks.html")
    output_file = tmp_path / "output.md"

    result = runner.invoke(app, [str(html_file), str(output_file), "--type", "sphinx"])

    assert result.exit_code == 0
    assert output_file.exists()


def test_invalid_type(tmp_path):
    html_file = Path("tests/fixtures/sphinx/django__5_2__ref__checks.html")

    result = runner.invoke(app, [str(html_file), "--type", "invalid"])

    assert result.exit_code == 2
    assert "Invalid value" in result.output


def test_empty_directory(tmp_path):
    empty_dir = tmp_path / "empty"
    empty_dir.mkdir()

    result = runner.invoke(app, [str(empty_dir)])

    assert result.exit_code == 0
    assert "No HTML files found" in result.stdout


def test_directory_with_file_processing_error(tmp_path, monkeypatch):
    html_dir = tmp_path / "html"
    html_dir.mkdir()

    bad_html = html_dir / "bad.html"
    bad_html.write_text("<html><body>Test</body></html>")

    from docs2md import convert

    def mock_convert_file(html_file, doc_type):
        raise ValueError("Simulated processing error")

    monkeypatch.setattr(convert, "convert_file", mock_convert_file)

    result = runner.invoke(app, [str(html_dir)])

    assert result.exit_code == 1
    assert "Failed conversions:" in result.stdout
    assert "html" in result.stdout
    assert "Simulated processing error" in result.stdout


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
    assert "Failed conversions:" in result.stdout
    assert "Simulated I/O error" in result.stdout
