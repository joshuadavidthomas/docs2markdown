from __future__ import annotations

from pathlib import Path

from docs2md.convert import Format
from docs2md.html import BaseHtmlPreprocessor
from docs2md.html import SphinxHtmlPreprocessor
from docs2md.markdown import md


def test_html_to_markdown_pipeline(doc_file, snapshot_md):
    PreprocessorClass = (
        SphinxHtmlPreprocessor
        if "sphinx" in str(doc_file.parent)
        else BaseHtmlPreprocessor
    )

    preprocessed = PreprocessorClass(doc_file.read_text()).process()
    output = md(preprocessed)

    assert output == snapshot_md


def test_format_differences():
    from docs2md.convert import DocType
    from docs2md.convert import convert_file

    fixture_path = Path("tests/fixtures/format_test.html")

    ghfm_output = convert_file(fixture_path, DocType.DEFAULT, Format.GHFM)

    llms_output = convert_file(fixture_path, DocType.DEFAULT, Format.LLMSTXT)

    assert "<dl>" in ghfm_output
    assert "<dd>" in ghfm_output
    assert '<span id="anchor-id"' in ghfm_output
    assert "[!NOTE]" in ghfm_output

    assert "<dl>" not in llms_output
    assert "<dd>" not in llms_output
    assert "<span" not in llms_output
    assert "[!NOTE]" not in llms_output
    assert "**NOTE:**" in llms_output or "Note:" in llms_output

    assert "Test Document" in ghfm_output
    assert "Test Document" in llms_output
    assert "inline code" in ghfm_output
    assert "inline code" in llms_output


def test_sphinx_with_formats():
    from docs2md.convert import DocType
    from docs2md.convert import convert_file

    fixture_files = Path("tests/fixtures/sphinx").glob("*.html")

    for fixture_path in fixture_files:
        ghfm_output = convert_file(fixture_path, DocType.SPHINX, Format.GHFM)
        llms_output = convert_file(fixture_path, DocType.SPHINX, Format.LLMSTXT)

        assert len(ghfm_output) > 0
        assert len(llms_output) > 0

        assert llms_output.count("<") < ghfm_output.count("<")
