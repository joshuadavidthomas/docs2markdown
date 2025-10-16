from __future__ import annotations

import pytest
from bs4 import BeautifulSoup

from docs2md.markdown import extract_language
from docs2md.markdown import md
from docs2md.markdown import normalize_whitespace


def test_md(doc_file, snapshot_md):
    output = md(doc_file.read_text())
    assert output == snapshot_md


@pytest.mark.parametrize(
    "html,expected",
    [
        ('<pre><code class="language-python">def foo(): pass</code></pre>', "python"),
        (
            '<pre><code class="language-javascript">console.log("world")</code></pre>',
            "javascript",
        ),
        ("<pre><code>plain code</code></pre>", ""),
        ('<pre><code class="language-python">code</code></pre>', "python"),
    ],
)
def test_converter_code_blocks(html, expected):
    soup = BeautifulSoup(html, features="lxml")
    assert soup.pre is not None
    assert extract_language(soup.pre) == expected


def test_extract_language_string_class():
    soup = BeautifulSoup('<pre><code class="language-python">code</code></pre>', features="lxml")
    assert soup.pre is not None
    code = soup.find("code")
    assert code is not None
    code["class"] = "language-python"
    assert extract_language(soup.pre) == "python"


def test_extract_language_no_match():
    soup = BeautifulSoup('<pre><code class="other-class">code</code></pre>', features="lxml")
    assert soup.pre is not None
    assert extract_language(soup.pre) == ""


@pytest.mark.parametrize(
    "text,expected",
    [
        (
            """This is a paragraph
with line breaks

in the text.""",
            "This is a paragraph with line breaks in the text.",
        ),
        (
            """<ul>
<li>First item with
line breaks</li>
<li>Second item
also broken</li>
</ul>""",
            "<ul> <li>First item with line breaks</li> <li>Second item also broken</li> </ul>",
        ),
        (
            """<table>
<tr>
<th>Header with
breaks</th>
</tr>
<tr>
<td>Cell with
line breaks</td>
</tr>
</table>""",
            "<table> <tr> <th>Header with breaks</th> </tr> <tr> <td>Cell with line breaks</td> </tr> </table>",
        ),
        (None, None),
        ("", ""),
    ],
)
def test_normalize_whitespace(text, expected):
    assert normalize_whitespace(text) == expected
