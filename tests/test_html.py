from __future__ import annotations

import pytest

from docs2md.html import BaseHtmlPreprocessor
from docs2md.html import SphinxHtmlPreprocessor


def test_base_html_preprocessor(doc_file, snapshot_html):
    assert BaseHtmlPreprocessor(doc_file.read_text()).process() == snapshot_html


@pytest.mark.fixture_tags(["sphinx"])
def test_sphinx_html_preprocessor(doc_file, snapshot_html):
    assert SphinxHtmlPreprocessor(doc_file.read_text()).process() == snapshot_html
