from __future__ import annotations

from docs2md.html import BaseHtmlPreprocessor


def test_base_html_preprocessor(doc_file, snapshot_html):
    assert BaseHtmlPreprocessor(doc_file.read_text()).process() == snapshot_html
