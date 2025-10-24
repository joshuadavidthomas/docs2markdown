from __future__ import annotations

import tempfile
from pathlib import Path

import pytest

from docs2markdown.convert import DocType
from docs2markdown.convert import Format
from docs2markdown.convert import convert_directory
from docs2markdown.convert import convert_file
from docs2markdown.convert import convert_html


@pytest.mark.parametrize(
    "format",
    [Format.GHFM, Format.LLMSTXT, Format.COMMONMARK],
)
def test_convert_file(format, doc_file, snapshot_md):
    doc_type = DocType.SPHINX if "sphinx" in str(doc_file.parent) else DocType.DEFAULT
    output = convert_file(doc_file, doc_type=doc_type, format=format)
    assert output == snapshot_md


@pytest.mark.parametrize(
    "format",
    [Format.GHFM, Format.LLMSTXT, Format.COMMONMARK],
)
def test_convert_html(format, doc_file, snapshot_md):
    doc_type = DocType.SPHINX if "sphinx" in str(doc_file.parent) else DocType.DEFAULT
    html = doc_file.read_text()
    output = convert_html(html, doc_type=doc_type, format=format)
    assert output == snapshot_md


@pytest.mark.parametrize(
    "format",
    [Format.GHFM, Format.LLMSTXT, Format.COMMONMARK],
)
def test_convert_directory(format):
    with tempfile.TemporaryDirectory() as tmpdir:
        input_dir = Path(tmpdir) / "input"
        output_dir = Path(tmpdir) / "output"
        input_dir.mkdir()

        (input_dir / "test.html").write_text("<p>Test content</p>")

        results = list(
            convert_directory(
                input_dir, output_dir, doc_type=DocType.DEFAULT, format=format
            )
        )

        assert len(results) == 1
        _, output_file = results[0]
        assert output_file.exists()


CONSOLE_BLOCK_HTML = """<!DOCTYPE html>
<html>
<body>
<article>
<h1>Installation</h1>
<p>To verify Django is installed, run:</p>
<div class="console-block">
  <input class="c-tab-unix" type="radio" checked>
  <label for="c-tab-unix-0">&#xf17c;/&#xf179;</label>
  <input class="c-tab-win" type="radio">
  <label for="c-tab-win-0">&#xf17a;</label>
  <section class="c-content-unix">
    <pre>$ python -m django --version</pre>
  </section>
  <section class="c-content-win">
    <pre>...\\> py -m django --version</pre>
  </section>
</div>
<p>This should output the version number.</p>
</article>
</body>
</html>"""


@pytest.mark.parametrize(
    "format",
    [Format.GHFM, Format.LLMSTXT, Format.COMMONMARK],
)
def test_console_block_tabs_edge_case(format):
    result = convert_html(CONSOLE_BLOCK_HTML, DocType.SPHINX, format)

    assert (
        result
        == """\
# Installation

To verify Django is installed, run:

/

```
$ python -m django --version
```



```
...\\> py -m django --version
```

This should output the version number."""
    )
