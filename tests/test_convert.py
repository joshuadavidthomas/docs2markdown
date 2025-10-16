from __future__ import annotations

import tempfile
from pathlib import Path

from docs2md.convert import Format
from docs2md.markdown import Docs2MdConverter
from docs2md.markdown import LlmsTxtConverter


def test_format_enum_values():
    assert Format.GHFM.value == "ghfm"
    assert Format.LLMSTXT.value == "llmstxt"


def test_format_get_converter():
    assert Format.GHFM.get_converter() == Docs2MdConverter
    assert Format.LLMSTXT.get_converter() == LlmsTxtConverter


def test_format_get_extension():
    assert Format.GHFM.get_extension() == ".md"
    assert Format.LLMSTXT.get_extension() == ".txt"


def test_convert_file_with_format():
    with tempfile.NamedTemporaryFile(mode="w", suffix=".html", delete=False) as f:
        f.write("<p>Test content</p>")
        html_path = Path(f.name)

    try:
        from docs2md.convert import DocType
        from docs2md.convert import Format
        from docs2md.convert import convert_file

        result_ghfm = convert_file(html_path, DocType.DEFAULT, Format.GHFM)
        assert "Test content" in result_ghfm

        result_llms = convert_file(html_path, DocType.DEFAULT, Format.LLMSTXT)
        assert "Test content" in result_llms
    finally:
        html_path.unlink()


def test_convert_directory_with_format():
    with tempfile.TemporaryDirectory() as tmpdir:
        input_dir = Path(tmpdir) / "input"
        output_dir = Path(tmpdir) / "output"
        input_dir.mkdir()

        (input_dir / "test.html").write_text("<p>Test content</p>")

        from docs2md.convert import DocType
        from docs2md.convert import Format
        from docs2md.convert import convert_directory

        results = list(
            convert_directory(input_dir, output_dir, DocType.DEFAULT, Format.LLMSTXT)
        )

        assert len(results) == 1
        _, output_file = results[0]
        assert output_file.suffix == ".txt"
        assert output_file.exists()
