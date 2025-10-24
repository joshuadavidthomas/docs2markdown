from __future__ import annotations

import pytest
from bs4 import BeautifulSoup

from docs2markdown.markdown import CommonMarkConverter
from docs2markdown.markdown import GhfmConverter
from docs2markdown.markdown import LlmsTxtConverter
from docs2markdown.markdown import ObsidianConverter
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
    [LlmsTxtConverter, GhfmConverter, CommonMarkConverter, ObsidianConverter],
)
def test_converter(converter_class, doc_file, snapshot_md):
    output = converter_class().convert(doc_file.read_text())
    assert output == snapshot_md


def test_ghfm_converter_removes_class_from_links_in_raw_dl():
    html = """
    <dl data-markdownify-raw="">
    <dt><code>function(param)</code></dt>
    <dd>
    Description with <a href="link.html" class="reference external">link</a>
    </dd>
    </dl>
    """
    converter = GhfmConverter()
    result = converter.convert(html)

    assert 'class="reference external"' not in result
    assert '<a href="link.md">link</a>' in result


def test_obsidian_wikilinks():
    html = """
    <p>
    <a href="page.html">page</a>
    <a href="other.html">Different Text</a>
    <a href="doc.html#section">doc#section</a>
    <a href="https://example.com">External</a>
    </p>
    """

    converter = ObsidianConverter()
    result = converter.convert(html)

    assert "[[page]]" in result
    assert "[[other|Different Text]]" in result
    assert "[[doc#section]]" in result
    assert "[External](https://example.com)" in result


def test_obsidian_embeds():
    html = '<p><img src="test.png" alt="Test Image"></p>'

    converter = ObsidianConverter()
    result = converter.convert(html)

    assert "![[test.png|Test Image]]" in result


def test_obsidian_callouts():
    html = '<blockquote data-markdownify-alert-type="NOTE"><p>Note text</p></blockquote>'

    converter = ObsidianConverter()
    result = converter.convert(html)

    assert "[!note]" in result


def test_obsidian_link_without_href():
    html = '<p><a>No href</a></p>'

    converter = ObsidianConverter()
    result = converter.convert(html)

    assert "No href" in result
    assert "[[" not in result


def test_obsidian_image_without_alt():
    html = '<p><img src="test.png"></p>'

    converter = ObsidianConverter()
    result = converter.convert(html)

    assert "![[test.png]]" in result
    assert "|" not in result


def test_obsidian_empty_link_text():
    html = '<p><a href="page.html"></a></p>'

    converter = ObsidianConverter()
    result = converter.convert(html)

    assert "[[page]]" in result
