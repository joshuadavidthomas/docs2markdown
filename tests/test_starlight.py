from __future__ import annotations

import pytest

from docs2md.convert import DocType
from docs2md.convert import Format
from docs2md.convert import convert_file
from docs2md.html import StarlightHtmlPreprocessor


@pytest.mark.fixture_tags(["starlight"])
def test_starlight_html_preprocessing(doc_file, snapshot_html):
    """Test Starlight HTML preprocessing with real documentation.

    This validates:
    - Code block language extraction from data-language
    - Proper indentation (no excessive blank lines)
    - Title extraction from figcaptions
    - Tab conversion to sequential sections
    - Chrome removal (navigation, headers, etc.)
    """
    assert StarlightHtmlPreprocessor(doc_file.read_text()).process() == snapshot_html


@pytest.mark.fixture_tags(["starlight"])
def test_starlight_markdown_conversion(doc_file, snapshot_md):
    """Test full Starlight to Markdown conversion with real documentation.

    This validates:
    - Code blocks have proper language identifiers (```json, ```bash, etc.)
    - Code blocks have titles as comments (// filename, /* filename */, etc.)
    - Indentation is correct (2 spaces, no excessive blank lines)
    - Tabs are converted to readable sequential sections
    - Overall markdown formatting is clean
    """
    result = convert_file(doc_file, DocType.STARLIGHT, Format.GHFM)
    assert result == snapshot_md
