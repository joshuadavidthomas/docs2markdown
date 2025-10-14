from __future__ import annotations

import pytest

from docs2md.markdown import normalize_whitespace


@pytest.mark.parametrize(
    "input,expected",
    [
        (
            """<p>This is a paragraph
with line breaks
in the HTML source.</p>""",
            "<p>This is a paragraph with line breaks in the HTML source.</p>",
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
    ],
)
def test_normalize_whitespace(input, expected):
    assert normalize_whitespace(input) == expected
