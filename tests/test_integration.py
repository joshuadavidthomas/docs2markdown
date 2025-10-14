from __future__ import annotations

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
