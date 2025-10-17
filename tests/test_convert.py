from __future__ import annotations

import tempfile
from pathlib import Path

import pytest

from docs2markdown.convert import DocType
from docs2markdown.convert import Format
from docs2markdown.convert import convert_directory
from docs2markdown.convert import convert_file


@pytest.mark.parametrize(
    "format",
    [Format.GHFM, Format.LLMSTXT],
)
def test_convert_file(format, doc_file, snapshot_md):
    doc_type = DocType.SPHINX if "sphinx" in str(doc_file.parent) else DocType.DEFAULT
    output = convert_file(doc_file, doc_type=doc_type, format=format)
    assert output == snapshot_md


@pytest.mark.parametrize(
    "format",
    [Format.GHFM, Format.LLMSTXT],
)
def test_convert_directory(format):
    with tempfile.TemporaryDirectory() as tmpdir:
        input_dir = Path(tmpdir) / "input"
        output_dir = Path(tmpdir) / "output"
        input_dir.mkdir()

        (input_dir / "test.html").write_text("<p>Test content</p>")

        results = list(
            convert_directory(
                input_dir, output_dir, doc_type=DocType.DEFAULT, format=format
            )
        )

        assert len(results) == 1
        _, output_file = results[0]
        assert output_file.exists()
