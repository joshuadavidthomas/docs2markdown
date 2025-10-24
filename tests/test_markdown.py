from __future__ import annotations

import pytest
from bs4 import BeautifulSoup

from docs2markdown.markdown import CommonMarkConverter
from docs2markdown.markdown import GhfmConverter
from docs2markdown.markdown import LlmsTxtConverter
from docs2markdown.markdown import extract_language


@pytest.mark.parametrize(
    "html,expected",
    [
        ('<pre><code class="language-python">code</code></pre>', "python"),
        (
            '<pre><code class="language-javascript">code</code></pre>',
            "javascript",
        ),
        ('<pre><code class="language-python">code</code></pre>', "python"),
        ('<pre><code class="other-class">code</code></pre>', ""),
        ("<pre><code>code</code></pre>", ""),
    ],
)
def test_extract_language(html, expected):
    soup = BeautifulSoup(html, features="lxml")
    assert soup.pre is not None
    assert extract_language(soup.pre) == expected


@pytest.mark.parametrize(
    "converter_class",
    [LlmsTxtConverter, GhfmConverter, CommonMarkConverter],
)
def test_converter(converter_class, doc_file, snapshot_md):
    output = converter_class().convert(doc_file.read_text())
    assert output == snapshot_md
