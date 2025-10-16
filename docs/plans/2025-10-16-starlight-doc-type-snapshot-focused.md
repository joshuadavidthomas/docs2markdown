# Starlight Doc Type Implementation Plan (Snapshot-Focused)

> **For Claude:** Use `${SUPERPOWERS_SKILLS_ROOT}/skills/collaboration/executing-plans/SKILL.md` to implement this plan task-by-task.

**Goal:** Add support for converting Starlight/Astro documentation HTML to properly formatted GitHub-flavored Markdown with correct code block languages, indentation, and titles.

**Architecture:** Create a new `StarlightHtmlPreprocessor` class that extends `BaseHtmlPreprocessor` to handle Starlight's specific HTML structure (expressive-code blocks with `data-language` attributes, `<span class="indent">` elements, `<figcaption>` titles, and `<starlight-tabs>` components). Add a comment injection system to insert filenames as comments at the top of code blocks using language-appropriate comment syntax. Use snapshot testing with representative fixtures to validate all functionality.

**Tech Stack:** Python 3.10+, BeautifulSoup4, pytest with syrupy snapshots

---

## Task 1: Create Comment Style System

**Files:**
- Modify: `src/docs2md/html.py:1-10` (add imports and enums)
- Modify: `src/docs2md/html.py:152` (add helper functions after `get_language_from_class`)

**Step 1: Add CommentStyle enum and language mapping**

Add after existing imports in `src/docs2md/html.py`:

```python
from enum import Enum


class CommentStyle(Enum):
    HASH = "#"  # Python, Ruby, Shell, YAML, etc.
    DOUBLE_SLASH = "//"  # JavaScript, TypeScript, Java, C++, etc.
    C_STYLE = ("/*", "*/")  # CSS, C, etc.
    HTML_STYLE = ("<!--", "-->")  # HTML, XML
    SQL_STYLE = "--"  # SQL
    LUA_STYLE = "--"  # Lua
    NONE = None  # Plain text, unknown
```

**Step 2: Add language to comment style mapping and helper function**

Add after `get_language_from_class` function (around line 152):

```python
LANGUAGE_COMMENT_MAP = {
    # Hash-style comments
    "python": CommentStyle.HASH,
    "ruby": CommentStyle.HASH,
    "bash": CommentStyle.HASH,
    "shell": CommentStyle.HASH,
    "sh": CommentStyle.HASH,
    "yaml": CommentStyle.HASH,
    "yml": CommentStyle.HASH,
    "perl": CommentStyle.HASH,
    "r": CommentStyle.HASH,
    "make": CommentStyle.HASH,
    "makefile": CommentStyle.HASH,
    "dockerfile": CommentStyle.HASH,
    "toml": CommentStyle.HASH,
    "ini": CommentStyle.HASH,
    "conf": CommentStyle.HASH,
    "properties": CommentStyle.HASH,
    # Double-slash comments
    "javascript": CommentStyle.DOUBLE_SLASH,
    "js": CommentStyle.DOUBLE_SLASH,
    "typescript": CommentStyle.DOUBLE_SLASH,
    "ts": CommentStyle.DOUBLE_SLASH,
    "jsx": CommentStyle.DOUBLE_SLASH,
    "tsx": CommentStyle.DOUBLE_SLASH,
    "java": CommentStyle.DOUBLE_SLASH,
    "c": CommentStyle.DOUBLE_SLASH,
    "cpp": CommentStyle.DOUBLE_SLASH,
    "cxx": CommentStyle.DOUBLE_SLASH,
    "c++": CommentStyle.DOUBLE_SLASH,
    "cs": CommentStyle.DOUBLE_SLASH,
    "csharp": CommentStyle.DOUBLE_SLASH,
    "go": CommentStyle.DOUBLE_SLASH,
    "rust": CommentStyle.DOUBLE_SLASH,
    "rs": CommentStyle.DOUBLE_SLASH,
    "swift": CommentStyle.DOUBLE_SLASH,
    "kotlin": CommentStyle.DOUBLE_SLASH,
    "scala": CommentStyle.DOUBLE_SLASH,
    "php": CommentStyle.DOUBLE_SLASH,
    "dart": CommentStyle.DOUBLE_SLASH,
    # C-style comments
    "css": CommentStyle.C_STYLE,
    "scss": CommentStyle.C_STYLE,
    "sass": CommentStyle.C_STYLE,
    "less": CommentStyle.C_STYLE,
    # HTML-style comments
    "html": CommentStyle.HTML_STYLE,
    "xml": CommentStyle.HTML_STYLE,
    "svg": CommentStyle.HTML_STYLE,
    "markdown": CommentStyle.HTML_STYLE,
    "md": CommentStyle.HTML_STYLE,
    # SQL comments
    "sql": CommentStyle.SQL_STYLE,
    "mysql": CommentStyle.SQL_STYLE,
    "postgresql": CommentStyle.SQL_STYLE,
    "sqlite": CommentStyle.SQL_STYLE,
    # Lua comments
    "lua": CommentStyle.LUA_STYLE,
    # Plain text / unknown
    "text": CommentStyle.NONE,
    "txt": CommentStyle.NONE,
    "": CommentStyle.NONE,
}


def get_comment_for_language(language: str, text: str) -> str:
    """Generate a comment for the given language containing text."""
    style = LANGUAGE_COMMENT_MAP.get(language.lower(), CommentStyle.NONE)

    if style == CommentStyle.NONE:
        return ""
    elif style == CommentStyle.HASH:
        return f"# {text}"
    elif style == CommentStyle.DOUBLE_SLASH:
        return f"// {text}"
    elif style == CommentStyle.C_STYLE:
        return f"/* {text} */"
    elif style == CommentStyle.HTML_STYLE:
        return f"<!-- {text} -->"
    elif style == CommentStyle.SQL_STYLE:
        return f"-- {text}"
    elif style == CommentStyle.LUA_STYLE:
        return f"-- {text}"

    return ""
```

**Step 3: Commit**

```bash
git add src/docs2md/html.py
git commit -m "feat: add comment style system for code blocks"
```

---

## Task 2: Create StarlightHtmlPreprocessor with Core Processing

**Files:**
- Modify: `src/docs2md/html.py:375` (add new class after `SphinxHtmlPreprocessor`)

**Step 1: Create StarlightHtmlPreprocessor class**

Add to `src/docs2md/html.py` after `SphinxHtmlPreprocessor` (around line 375):

```python
class StarlightHtmlPreprocessor(BaseHtmlPreprocessor):
    """Preprocessor for Starlight/Astro documentation HTML.

    Handles Starlight-specific structures:
    - Expressive code blocks with data-language attributes
    - Code block titles in figcaptions
    - <span class="indent"> elements
    - <starlight-tabs> custom elements
    """

    @override
    def get_generic_chrome_selectors(self) -> list[str]:
        base_selectors = super().get_generic_chrome_selectors()
        starlight_selectors = [
            ".header",
            ".sidebar",
            ".right-sidebar",
            ".mobile-preferences",
            "starlight-menu-button",
            "starlight-theme-select",
            "site-search",
            ".not-content",
            ".copy",  # Copy button
        ]
        return base_selectors + starlight_selectors

    def process_elements(self, container: Tag) -> None:
        """Override to handle custom elements before standard processing."""
        # Process starlight-tabs first
        for tabs in container.find_all("starlight-tabs"):
            self._process_starlight_tabs(tabs)

        # Then continue with standard processing
        super().process_elements(container)

    def _process_starlight_tabs(self, tabs_element: Tag) -> None:
        """Convert starlight-tabs to sequential content sections."""
        # Extract tab labels
        tab_labels = []
        tablist = tabs_element.find("ul", role="tablist")
        if tablist:
            for tab in tablist.find_all("a", role="tab"):
                label = tab.get_text(strip=True)
                if label:
                    tab_labels.append(label)

        # Extract tab panels
        panels = tabs_element.find_all("div", role="tabpanel")

        # Create new container for sequential content
        container = self.soup.new_tag("div")

        # Add each tab's content with its label as a list item
        for i, panel in enumerate(panels):
            # Add label as a list item if we have it
            if i < len(tab_labels):
                li = self.soup.new_tag("li")
                strong = self.soup.new_tag("strong")
                strong.string = tab_labels[i]
                li.append(strong)
                container.append(li)

            # Add panel content
            for child in list(panel.children):
                container.append(child)

        # Replace tabs element with the container
        tabs_element.replace_with(container)

    def process_figure(self, figure: Tag) -> None:
        """Process Starlight expressive-code figure blocks."""
        # Check if this is an expressive-code block
        parent = figure.parent
        if not parent or "expressive-code" not in parent.get("class", []):
            return

        # Check if this is a terminal block
        is_terminal = "is-terminal" in figure.get("class", [])

        # Extract title from figcaption if present
        title = None
        figcaption = figure.find("figcaption", class_="header")
        if figcaption:
            title_span = figcaption.find("span", class_="title")
            if title_span:
                title = title_span.get_text(strip=True)
            figcaption.decompose()

        # Find the pre tag
        pre = figure.find("pre")
        if not pre:
            return

        # Extract language from data-language attribute
        language = pre.get("data-language", "")

        # Default to bash for terminal blocks if no language specified
        if is_terminal and not language:
            language = "bash"

        # Find or create code tag
        code = pre.find("code")
        if not code:
            code = self.soup.new_tag("code")
            code.extend(list(pre.children))
            pre.clear()
            pre.append(code)

        # Clean up Starlight's code structure
        # Remove ec-line and code wrapper divs
        for div in code.find_all("div", class_=["ec-line", "code"]):
            div.unwrap()

        # Unwrap indent spans (preserves their text content)
        for span in code.find_all("span", class_="indent"):
            span.unwrap()

        # Unwrap all remaining spans (color/style spans)
        for span in code.find_all("span"):
            span.unwrap()

        # Inject title as comment if present (but not for generic terminal labels)
        if title and language and title.lower() not in ["terminal window", ""]:
            comment = get_comment_for_language(language, title)
            if comment:
                code_text = code.get_text()
                code.clear()
                code.string = f"{comment}\n{code_text}"

        # Set language class on code tag
        if language:
            code["class"] = f"language-{language}"

        # Replace figure with just the pre tag
        figure.replace_with(pre)
```

**Step 2: Commit**

```bash
git add src/docs2md/html.py
git commit -m "feat: add StarlightHtmlPreprocessor with code block and tab processing"
```

---

## Task 3: Integrate StarlightHtmlPreprocessor with DocType

**Files:**
- Modify: `src/docs2md/convert.py:13-24` (add STARLIGHT to DocType enum)

**Step 1: Add STARLIGHT to DocType enum**

Update `src/docs2md/convert.py`:

```python
from docs2md.html import BaseHtmlPreprocessor
from docs2md.html import SphinxHtmlPreprocessor
from docs2md.html import StarlightHtmlPreprocessor


class DocType(Enum):
    DEFAULT = "default"
    SPHINX = "sphinx"
    STARLIGHT = "starlight"

    def preprocessor(self, html: str) -> BaseHtmlPreprocessor:
        match self:
            case self.SPHINX:
                cls = SphinxHtmlPreprocessor
            case self.STARLIGHT:
                cls = StarlightHtmlPreprocessor
            case _:
                cls = BaseHtmlPreprocessor
        return cls(html)
```

**Step 2: Commit**

```bash
git add src/docs2md/convert.py
git commit -m "feat: add STARLIGHT DocType to enum"
```

---

## Task 4: Add Snapshot Tests with Representative Fixtures

**Files:**
- Create: `tests/fixtures/starlight/opencode__agents.html` (copy from existing)
- Create: `tests/fixtures/starlight/opencode__cli.html` (copy from existing)
- Create: `tests/test_starlight.py` (snapshot tests)

**Step 1: Copy representative Starlight HTML fixtures**

```bash
mkdir -p tests/fixtures/starlight
cp opencode/docs/agents/index.html tests/fixtures/starlight/opencode__agents.html
cp opencode/docs/cli/index.html tests/fixtures/starlight/opencode__cli.html
```

These two files should demonstrate:
- Code blocks with various languages (json, bash, markdown)
- Code blocks with titles (opencode.json, config files)
- Indentation issues with nested JSON
- Tab components (npm/yarn/pnpm installation options)
- Terminal blocks

**Step 2: Create snapshot test file**

Create `tests/test_starlight.py`:

```python
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
```

**Step 3: Run tests to generate snapshots**

```bash
pytest tests/test_starlight.py --snapshot-update -v
```

Expected: Tests create snapshots in:
- `tests/snapshots/test_starlight/test_starlight_html_preprocessing[opencode__agents].html`
- `tests/snapshots/test_starlight/test_starlight_html_preprocessing[opencode__cli].html`
- `tests/snapshots/test_starlight/test_starlight_markdown_conversion[opencode__agents].md`
- `tests/snapshots/test_starlight/test_starlight_markdown_conversion[opencode__cli].md`

**Step 4: Review generated snapshots**

Manually inspect the markdown snapshots to verify:

```bash
cat tests/snapshots/test_starlight/test_starlight_markdown_conversion[opencode__agents].md | less
cat tests/snapshots/test_starlight/test_starlight_markdown_conversion[opencode__cli].md | less
```

Check for:
- ✓ Code blocks have language: ` ```json `, ` ```bash `, etc.
- ✓ Titles appear as comments: `// opencode.json`, `/* config.json */`
- ✓ Indentation looks correct (2 spaces for JSON)
- ✓ No excessive blank lines in code blocks
- ✓ Tabs converted to list items with content

**Step 5: If snapshots look wrong, iterate on implementation**

If the snapshots show issues:
1. Identify which part of `StarlightHtmlPreprocessor` needs adjustment
2. Update the implementation
3. Re-run tests with `--snapshot-update`
4. Review again

Common issues and fixes:
- **Language not showing**: Check `process_figure` extracts `data-language` correctly
- **Bad indentation**: Check that `<span class="indent">` is being unwrapped properly
- **Missing titles**: Check that `figcaption` extraction is working
- **Titles not as comments**: Check `get_comment_for_language` logic

**Step 6: Commit tests and snapshots**

```bash
git add tests/fixtures/starlight/ tests/snapshots/ tests/test_starlight.py
git commit -m "test: add snapshot tests for Starlight conversion"
```

---

## Task 5: Add CLI Support for Starlight Doc Type

**Files:**
- Modify: `src/docs2md/cli.py` (update doc-type parameter)

**Step 1: Find and update doc_type parameter**

Look for the `doc_type` parameter definition in `src/docs2md/cli.py`. It should be using the `DocType` enum. Ensure it includes all values including the new `STARLIGHT`.

If the CLI uses string literals instead of the enum, update to include `"starlight"` as a valid choice.

**Step 2: Test CLI help**

```bash
python -m docs2md convert --help
```

Expected: Help text shows `starlight` as a valid doc-type option

**Step 3: Test CLI with starlight**

```bash
python -m docs2md convert opencode/docs/agents/index.html /tmp/test_output.md --doc-type starlight
cat /tmp/test_output.md | head -100
```

Expected:
- Command succeeds
- Output shows proper code block formatting
- Language identifiers present
- Indentation looks correct

**Step 4: Commit**

```bash
git add src/docs2md/cli.py
git commit -m "feat: add starlight to CLI doc-type options"
```

---

## Task 6: Run Full Test Suite and Validate

**Files:**
- Various (based on any issues found)

**Step 1: Run all tests**

```bash
pytest tests/ -v
```

Expected: All tests PASS

**Step 2: Check test coverage**

```bash
pytest tests/ -v --cov=src/docs2md --cov-report=term-missing
```

Expected: Coverage at or near 100%. If there are missing lines in `StarlightHtmlPreprocessor`, consider if they need unit tests or if they're tested via snapshots.

**Step 3: Run linting and formatting**

```bash
ruff check src/ tests/
ruff format src/ tests/
```

Expected: No errors

**Step 4: Run type checking**

```bash
mypy src/
```

Expected: No errors (note: mypy excludes tests/ per pyproject.toml)

**Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: address linting and type checking issues"
```

---

## Task 7: Manual Validation with Full Documentation

**Files:**
- N/A (manual testing)

**Step 1: Convert all Starlight docs to test directory**

```bash
rm -rf dist_starlight_test
python -m docs2md convert opencode/docs/ dist_starlight_test/ --doc-type starlight
```

**Step 2: Spot check multiple converted files**

```bash
# Check main index
less dist_starlight_test/docs/index.md

# Check agents page (has complex JSON with indentation)
less dist_starlight_test/docs/agents/index.md

# Check CLI page (has tabs and terminal blocks)
less dist_starlight_test/docs/cli/index.md

# Check a few more pages
less dist_starlight_test/docs/config/index.md
less dist_starlight_test/docs/models/index.md
```

For each file, verify:
- ✓ Code blocks have language identifiers
- ✓ Indentation looks correct (no excessive blank lines)
- ✓ Titles appear as comments where appropriate
- ✓ Overall markdown is readable and well-formatted
- ✓ No weird artifacts from the conversion

**Step 3: Compare with old default conversion**

```bash
# Look at differences (expect improvements in Starlight version)
diff dist/docs/agents/index.md dist_starlight_test/docs/agents/index.md | head -100
```

**Step 4: Document any remaining issues**

If there are edge cases or minor issues:
- Document them in a comment or issue
- Decide if they're blockers or can be addressed later
- Update the implementation if critical

**Step 5: Clean up test directory**

```bash
rm -rf dist_starlight_test
```

**Step 6: Final commit**

```bash
git add -A
git commit -m "docs: validate Starlight conversion against full documentation"
```

---

## Completion Checklist

- [ ] Comment style system implemented with language mapping
- [ ] StarlightHtmlPreprocessor class created with all processing methods
- [ ] STARLIGHT DocType integrated
- [ ] Representative Starlight HTML fixtures copied (2 files)
- [ ] Snapshot tests created and passing
- [ ] CLI supports starlight option
- [ ] All tests passing with good coverage
- [ ] Code formatted and type-checked
- [ ] Full documentation conversion validated manually
- [ ] No critical formatting issues remaining

## Notes on Approach

This plan uses **snapshot testing as the primary validation strategy** because:

1. **Representative fixtures**: Two carefully chosen HTML files (`agents` and `cli`) demonstrate all the issues we're trying to fix
2. **Holistic validation**: Snapshots validate the entire transformation pipeline, not just individual methods
3. **Easy review**: Human review of markdown snapshots is the best way to verify formatting looks correct
4. **Fast iteration**: Update implementation, re-run `--snapshot-update`, review diffs
5. **Regression protection**: Once snapshots are correct, they prevent regressions

We only need unit tests if:
- Snapshot coverage misses specific code paths
- We need to test edge cases not present in real fixtures
- Coverage reports show untested lines that matter

## Next Steps After Completion

1. Consider updating README.md to mention Starlight support
2. Test with other Starlight documentation sites if available
3. Add more Starlight-specific features if needed:
   - Aside/callout blocks
   - Card components
   - Badge components
