from __future__ import annotations

import pytest
from bs4 import BeautifulSoup
from bs4 import Tag

from docs2markdown.html import BaseHtmlPreprocessor
from docs2markdown.html import SphinxHtmlPreprocessor
from docs2markdown.html import get_language_from_class


def test_base_html_preprocessor(doc_file, snapshot_html):
    assert BaseHtmlPreprocessor(doc_file.read_text()).process() == snapshot_html


@pytest.mark.fixture_tags(["sphinx"])
def test_sphinx_html_preprocessor(doc_file, snapshot_html):
    assert SphinxHtmlPreprocessor(doc_file.read_text()).process() == snapshot_html


@pytest.mark.parametrize(
    "class_name,expected",
    [
        ("highlight-javascript", "javascript"),
        ("highlight-default", "python"),
        ("some-other-class", ""),
        ("", ""),
    ],
)
def test_get_language_from_class(class_name, expected):
    assert get_language_from_class(class_name) == expected


@pytest.fixture
def soup():
    # Dummy BeautifulSoup `soup` for unit testing specific processor methods
    return BeautifulSoup("<html></html>", "lxml")


def test_sphinx_process_code_with_non_language_classes(soup):
    code = soup.new_tag("code")
    code["class"] = ["notranslate", "other-class", "language-python"]

    processor = SphinxHtmlPreprocessor(str(soup))
    processor.process_code(code)

    assert code.get("class") == ["language-python"]


def test_sphinx_process_dl_no_dt(soup):
    dl = soup.new_tag("dl")
    dl["class"] = ["py", "function"]
    dd = soup.new_tag("dd")
    dd.string = "Description"
    dl.append(dd)

    processor = SphinxHtmlPreprocessor(str(soup))
    processor.process_dl(dl)

    # Should return early without crashing, leaving dl unchanged (except class removal)
    assert dl.find("dt") is None
    assert dl.find("dd") is not None
    assert not dl.has_attr("class")


def test_sphinx_process_dl_with_dd_class(soup):
    dl = soup.new_tag("dl")
    dl["class"] = ["py", "function"]

    dt = soup.new_tag("dt")
    dt["id"] = "test"
    dt.string = "Term"
    dl.append(dt)

    dd = soup.new_tag("dd")
    dd["class"] = ["some-class"]
    dd.string = "Description"
    dl.append(dd)

    processor = SphinxHtmlPreprocessor(str(soup))
    processor.process_dl(dl)

    assert not dd.has_attr("class")


def test_sphinx_process_dl_with_span(soup):
    dl = soup.new_tag("dl")
    dl["class"] = ["py", "function"]

    dt = soup.new_tag("dt")
    dt["id"] = "test"
    dt.string = "Term"
    dl.append(dt)

    dd = soup.new_tag("dd")
    span = soup.new_tag("span")
    span["id"] = "anchor"
    dd.append(span)
    p = soup.new_tag("p")
    p.string = "Text"
    dd.append(p)
    dl.append(dd)

    processor = SphinxHtmlPreprocessor(str(soup))
    processor.process_dl(dl)

    assert dd.find("span") is None


def test_sphinx_process_highlight_div_no_pre(soup):
    div = soup.new_tag("div")
    div["class"] = ["highlight-python"]
    code = soup.new_tag("code")
    code.string = "code"
    div.append(code)

    processor = SphinxHtmlPreprocessor(str(soup))
    processor.process_div(div)

    # Should return early without crashing, leaving div unchanged
    assert div.find("pre") is None
    assert div.find("code") is not None


def test_base_process_a_wraps_heading_anchor_structure():
    html = """
<html>
<body>
    <a id="let-they-who-are-without-syn" href="#let-they-who-are-without-syn" class="anchor">
        <h2>Let they who are without syn…</h2>
    </a>
</body>
</html>
"""

    processor = BaseHtmlPreprocessor(html.replace("\n", ""))
    body = processor.soup.body

    anchor = body.find("a")

    processor.process_a(anchor)

    tag_children = [child for child in body.contents if isinstance(child, Tag)]

    assert len(tag_children) == 1

    heading = tag_children[0]

    assert isinstance(heading, Tag)
    assert heading.name == "h2"
    assert len(heading.contents) == 1

    inner_anchor = heading.contents[0]

    assert isinstance(inner_anchor, Tag)
    assert inner_anchor.name == "a"
    assert inner_anchor.get("href") == "#let-they-who-are-without-syn"
    assert inner_anchor.get("id") == "let-they-who-are-without-syn"
    assert inner_anchor.get_text(strip=True) == "Let they who are without syn…"
