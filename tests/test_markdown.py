from __future__ import annotations

import pytest
from bs4 import BeautifulSoup

from docs2md.markdown import GhfmConverter
from docs2md.markdown import LlmsTxtConverter
from docs2md.markdown import extract_language
from docs2md.markdown import normalize_whitespace


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


@pytest.mark.parametrize(
    "converter_class",
    [LlmsTxtConverter, GhfmConverter],
)
def test_converter(converter_class, doc_file, snapshot_md):
    output = converter_class().convert(doc_file.read_text())
    assert output == snapshot_md
