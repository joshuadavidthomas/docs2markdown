# Detailed Implementation Plan: CommonMark, Obsidian, and Typst Converters

## Architecture Overview

Your codebase follows a clean, extensible architecture:

```
HTML Input → Preprocessor → Converter → Markdown Output
```

**Key Components:**
- `html.py` (355 lines): HTML preprocessing with `BaseHtmlPreprocessor` and `SphinxHtmlPreprocessor`
- `markdown.py` (136 lines): Converter classes extending `markdownify.MarkdownConverter`
- `convert.py` (74 lines): Enum-based system tying preprocessors to converters
- `cli.py` (126 lines): Typer-based CLI with format selection

**Current Formats:**
- `Format.GHFM` → `GhfmConverter` (handles alerts, raw dl elements, custom blockquotes)
- `Format.LLMSTXT` → `LlmsTxtConverter` (simplified, plain-text friendly)

---

## 1. CommonMark Converter

### What is CommonMark?
CommonMark is the strict baseline specification that GHFM extends. The key difference is **removing GHFM-specific extensions**:
- ❌ No GitHub alerts (`> [!NOTE]`)
- ❌ No task lists (`- [ ]`)
- ❌ No strikethrough (`~~text~~`)
- ❌ No autolinks (bare URLs must use `<>`)
- ❌ No tables with alignment
- ✅ Keep: basic markdown syntax (headings, lists, links, code blocks, blockquotes)

### Implementation Strategy

**Difficulty:** ⭐ Easy (1-2 hours)

**Approach:** Create a minimal converter that strips GHFM-specific features. This is essentially `LlmsTxtConverter` but keeping proper markdown structure.

### Files to Modify:

#### 1. `src/docs2markdown/markdown.py`
Add new converter class after `LlmsTxtConverter`:

```python
class CommonMarkConverter(Docs2MarkdownConverter):
    """
    CommonMark compliant converter.
    Removes GHFM-specific extensions like alerts, task lists, and strikethrough.
    """
    
    def convert_blockquote(self, el: Tag, text: str, **kwargs: Any) -> str:
        # Strip GHFM alert syntax completely
        # GitHub alerts are not part of CommonMark
        # Just return plain blockquote without [!NOTE] syntax
        return super().convert_blockquote(el, text, **kwargs)
    
    # Note: Tables are supported in CommonMark (via markdownify's default behavior)
    # Strikethrough, task lists, autolinks are handled by markdownify's options
    # We just need to ensure we don't add GHFM-specific syntax
```

**Key Points:**
- The `Docs2MarkdownConverter` base class already handles CommonMark basics properly
- We just need to **not add** GHFM extensions that `GhfmConverter` adds
- `markdownify` library defaults to CommonMark-compliant output
- Main change: blockquotes should be plain, not GHFM alerts

#### 2. `src/docs2markdown/convert.py`
Add `COMMONMARK` to the `Format` enum:

```python
class Format(Enum):
    GHFM = "ghfm"
    LLMSTXT = "llmstxt"
    COMMONMARK = "commonmark"  # NEW

    def get_converter(self) -> type[Docs2MarkdownConverter]:
        match self:
            case self.GHFM:
                return GhfmConverter
            case self.LLMSTXT:
                return LlmsTxtConverter
            case self.COMMONMARK:
                return CommonMarkConverter  # NEW
```

#### 3. `src/docs2markdown/cli.py`
Update help text (line 52):

```python
format: Annotated[
    Format,
    typer.Option(
        "--format",
        help="Output format: ghfm (GitHub-flavored), commonmark (strict CommonMark), or llmstxt (LLM-friendly)",
    ),
] = Format.GHFM,
```

### Testing Requirements:
- Create snapshot tests in `tests/test_convert.py` for `Format.COMMONMARK`
- Verify alerts become plain blockquotes
- Verify links, code blocks, lists work correctly
- Ensure no GHFM extensions leak through

---

## 2. Obsidian Converter

### What is Obsidian Markdown?
Obsidian extends markdown with **personal knowledge management** features:

**Core Features to Implement:**
1. **Wikilinks:** `[[page name]]` or `[[page#heading]]` instead of `[text](page.md)`
2. **Embeds:** `![[image.png]]` instead of `![alt](image.png)`
3. **Callouts:** `> [!note]` (similar to GHFM alerts but with more types)
4. **Tags:** `#tag` and `#tag/subtag` (mostly handled by preserving text)
5. **Internal link conversion:** `.html` → no extension or `.md` depending on preference

**Obsidian Callout Types:**
```
[!note], [!abstract], [!info], [!todo], [!tip], [!success], [!question], 
[!warning], [!failure], [!danger], [!bug], [!example], [!quote]
```

### Implementation Strategy

**Difficulty:** ⭐⭐⭐ Moderate (4-6 hours)

**Challenges:**
- Wikilinks require changing link conversion logic
- Need to track internal vs external links
- Callouts need mapping from GHFM alerts to Obsidian syntax
- Embeds need special handling for images vs document links

### Files to Modify:

#### 1. `src/docs2markdown/markdown.py`
Add new converter class:

```python
class ObsidianConverter(Docs2MarkdownConverter):
    """
    Obsidian Markdown converter with wikilinks, embeds, and callouts.
    Designed for use with Obsidian vaults.
    """
    
    def convert_a(self, el: Tag, text: str, **kwargs: Any) -> str:
        """Convert links to wikilinks for internal references."""
        href = el.get("href")
        
        if not href:
            return text
        
        # Check if internal link (relative path, not starting with http/https/mailto)
        is_internal = (
            not href.startswith(("http://", "https://", "mailto:", "#"))
            and not href.startswith("//")
        )
        
        if is_internal:
            # Convert to wikilink format
            # Remove .html/.md extension
            clean_href = re.sub(r'\.(html|md)$', '', href)
            
            # Handle anchors: page.html#section → [[page#section]]
            if '#' in clean_href:
                page, anchor = clean_href.split('#', 1)
                return f"[[{page}#{anchor}|{text}]]" if text != page else f"[[{page}#{anchor}]]"
            
            # Simple wikilink: [[page]] or [[page|display text]]
            if text == clean_href or not text:
                return f"[[{clean_href}]]"
            return f"[[{clean_href}|{text}]]"
        
        # External links remain as markdown
        return super().convert_a(el, text, **kwargs)
    
    def convert_img(self, el: Tag, alt: str, **kwargs: Any) -> str:
        """Convert images to embed syntax."""
        src = el.get("src", "")
        title = el.get("title", "")
        
        # Clean the src path
        clean_src = re.sub(r'\.(html|md)$', '', src)
        
        # Obsidian embed syntax: ![[image.png]]
        # With alt text: ![[image.png|alt text]]
        if alt:
            return f"![[{clean_src}|{alt}]]"
        return f"![[{clean_src}]]"
    
    def convert_blockquote(self, el: Tag, text: str, **kwargs: Any) -> str:
        """Convert to Obsidian callout format."""
        alert_type = el.get("data-markdownify-alert-type")
        title = el.get("data-markdownify-title")
        
        if alert_type:
            # Map GHFM alert types to Obsidian callouts
            # GHFM uses: NOTE, TIP, IMPORTANT, WARNING, CAUTION
            # Obsidian has more types, we map to closest equivalents
            callout_map = {
                "NOTE": "note",
                "TIP": "tip",
                "IMPORTANT": "important",
                "WARNING": "warning",
                "CAUTION": "warning",
            }
            
            callout_type = callout_map.get(alert_type, "note").lower()
            
            # Obsidian callout syntax: > [!note] Title
            lines = []
            if title:
                lines.append(f"[!{callout_type}] {title}")
            else:
                lines.append(f"[!{callout_type}]")
            
            lines.append(text)
            text = "\n".join(lines)
        
        return super().convert_blockquote(el, text, **kwargs)
```

#### 2. `src/docs2markdown/convert.py`
Add to `Format` enum:

```python
class Format(Enum):
    GHFM = "ghfm"
    LLMSTXT = "llmstxt"
    COMMONMARK = "commonmark"
    OBSIDIAN = "obsidian"  # NEW

    def get_converter(self) -> type[Docs2MarkdownConverter]:
        match self:
            case self.GHFM:
                return GhfmConverter
            case self.LLMSTXT:
                return LlmsTxtConverter
            case self.COMMONMARK:
                return CommonMarkConverter
            case self.OBSIDIAN:
                return ObsidianConverter  # NEW
```

#### 3. `src/docs2markdown/cli.py`
Update help text:

```python
help="Output format: ghfm, commonmark, obsidian (wikilinks), or llmstxt"
```

### Testing Requirements:
- Test internal link → wikilink conversion
- Test external link preservation
- Test image → embed conversion
- Test callout mapping from GHFM alerts
- Test anchor links: `[[page#section]]`
- Test display text: `[[page|custom text]]`

### Edge Cases to Handle:
- Links with no href
- Links to anchors only (`#section`)
- Image paths with special characters
- Links inside code blocks (should not convert)

---

## 3. Typst Converter (Future Consideration)

### What is Typst?
Typst is a **modern typesetting system** (think LaTeX alternative) that compiles to PDF. It uses:
- `= Heading` for sections (not `#`)
- `*bold*` and `_italic_` (similar to markdown)
- `#code` for scripting
- `@label` for references
- Much richer layout and styling system

### Why It's Compelling:
- **HTML docs → Typst → Beautiful PDFs** without LaTeX complexity
- Growing academic/scientific community
- Fast compilation
- Modern, clean syntax

### Why It's a Big Lift:

**Difficulty:** ⭐⭐⭐⭐⭐ Hard (15-20 hours+)

**Challenges:**
1. **Completely different syntax:**
   - Headings: `= Title`, `== Subtitle`, `=== Section`
   - Code blocks: ` ```lang ... ``` ` (similar) but styling is different
   - Lists: `-` and `+` for ordered (different from markdown)
   - Links: `#link("url")[text]` (function-based, not markdown syntax)
   
2. **Semantic richness:**
   - Typst has more semantic elements (figures, tables, references)
   - HTML often lacks this semantic information
   - Need to infer structure from HTML classes/patterns
   
3. **Layout system:**
   - Typst has `#set page`, `#set text`, etc. for configuration
   - Need decisions on default styling
   - Page breaks, margins, fonts all configurable
   
4. **Math support:**
   - Typst has excellent math: `$ x^2 $` for inline, `$ ... $` for block
   - Need to detect math in HTML (MathJax/KaTeX) and convert
   
5. **No existing HTML → Typst converters:**
   - You'd be pioneering this
   - No reference implementation to learn from
   - Need to understand Typst's semantics deeply

### Implementation Strategy

**Approach:** Build incrementally

**Phase 1 - Basic Structure (5-6 hours):**
- Heading conversion (`#` → `=`)
- Paragraph handling
- Bold/italic/code inline formatting
- Lists (unordered and ordered)
- Basic links (external only, as function calls)

**Phase 2 - Rich Content (4-5 hours):**
- Code blocks with syntax highlighting
- Images as figures: `#figure(image("path.png"), caption: [...])`
- Tables: Typst has `#table(...)` with columns/rows
- Blockquotes/callouts as Typst's `#quote(...)` or custom styling

**Phase 3 - Advanced (6-8 hours):**
- Math equation detection and conversion
- Internal references with `@labels`
- Custom styling with `#set` rules
- Bibliography if detected
- Nested structures (lists in blockquotes, etc.)

### Files to Create:

```python
# src/docs2markdown/typst.py (NEW FILE)

class TypstConverter:
    """
    Convert HTML to Typst markup for typesetting.
    Not using markdownify since Typst syntax is fundamentally different.
    """
    
    def __init__(self, html: str):
        self.soup = BeautifulSoup(html, "lxml")
        self.output = []
        
    def convert(self) -> str:
        # Walk DOM tree and convert elements
        pass
    
    def convert_heading(self, tag: Tag) -> str:
        level = int(tag.name[1])  # h1 → 1, h2 → 2, etc.
        equals = "=" * level
        text = tag.get_text(strip=True)
        return f"{equals} {text}\n\n"
    
    def convert_paragraph(self, tag: Tag) -> str:
        # Process inline elements
        pass
    
    def convert_link(self, tag: Tag) -> str:
        href = tag.get("href", "")
        text = tag.get_text(strip=True)
        return f'#link("{href}")[{text}]'
    
    def convert_code_block(self, tag: Tag) -> str:
        language = extract_language(tag)
        code = tag.get_text()
        return f"```{language}\n{code}\n```\n\n"
    
    def convert_image(self, tag: Tag) -> str:
        src = tag.get("src", "")
        alt = tag.get("alt", "")
        if alt:
            return f'#figure(\n  image("{src}"),\n  caption: [{alt}]\n)\n\n'
        return f'#image("{src}")\n\n'
    
    # ... many more converter methods
```

### Files to Modify:

#### `src/docs2markdown/convert.py`
```python
class Format(Enum):
    GHFM = "ghfm"
    LLMSTXT = "llmstxt"
    COMMONMARK = "commonmark"
    OBSIDIAN = "obsidian"
    TYPST = "typst"  # NEW - but note: different architecture
    
    def get_converter(self):
        # ... existing cases
        case self.TYPST:
            # Typst uses a different converter architecture
            # Not MarkdownConverter-based
            from docs2markdown.typst import TypstConverter
            return TypstConverter
```

### Testing Requirements:
- Comprehensive snapshot tests for all Typst syntax
- Verify PDF compilation (need Typst CLI installed)
- Test math equations if present
- Test nested structures
- Test escaping of special Typst characters

### Why Consider It Later:
- **No existing converters:** You'd be first, which is risky but could be high-impact
- **Different paradigm:** Typst is for typesetting, not just "another markdown flavor"
- **Niche but growing:** Academic/scientific community adoption is accelerating
- **PDF output:** Unique value proposition - HTML → Beautiful Print Documents

**Recommendation:** Wait for user demand. If people start asking "Can I convert my docs to Typst?" then it's worth the effort.

---

## Summary: Implementation Priority

### Ship v1 (Easy Wins):

| Format | Effort | Value | Priority |
|--------|--------|-------|----------|
| **CommonMark** | ⭐ Easy (1-2h) | High (compatibility) | 🔥 Do First |
| **Obsidian** | ⭐⭐⭐ Moderate (4-6h) | Very High (PKM users) | 🔥 Do Second |

**Total Effort:** ~6-8 hours

### Future (If Demanded):

| Format | Effort | Value | Priority |
|--------|--------|-------|----------|
| **Typst** | ⭐⭐⭐⭐⭐ Hard (15-20h) | High (PDF output) | ⏰ Wait for demand |

---

## File Change Summary

### New Files to Create:
- None for CommonMark/Obsidian (all fit in existing architecture)
- `src/docs2markdown/typst.py` if/when Typst is implemented

### Files to Modify:

#### For CommonMark + Obsidian:
1. **`src/docs2markdown/markdown.py`** (+80 lines)
   - Add `CommonMarkConverter` class (~15 lines)
   - Add `ObsidianConverter` class (~65 lines)

2. **`src/docs2markdown/convert.py`** (+2 lines)
   - Add `COMMONMARK` and `OBSIDIAN` to `Format` enum
   - Add cases in `get_converter()` method

3. **`src/docs2markdown/cli.py`** (1 line change)
   - Update help text for `--format` option

4. **`tests/test_convert.py`** (add test cases)
   - Parameterize existing tests to include new formats
   - Add format-specific edge case tests

5. **`tests/test_markdown.py`** (add test cases)
   - Test CommonMarkConverter specifically
   - Test ObsidianConverter wikilink/embed logic

6. **`tests/snapshots/`** (new snapshot files)
   - Create snapshots for CommonMark output
   - Create snapshots for Obsidian output

### Dependencies:
- No new dependencies needed (leverages existing `markdownify` + `beautifulsoup4`)
- For Typst (future): Would need no Python deps, but users need Typst CLI for PDF generation

---

## Next Steps

1. **Implement CommonMark** (quick win, 1-2 hours)
2. **Implement Obsidian** (high value, 4-6 hours)
3. **Write tests** for both (2-3 hours)
4. **Update README** with new formats and examples
5. **Ship v0.3.0** with CommonMark + Obsidian support
6. **Gauge interest** in Typst via GitHub issues/discussions
7. **If demanded:** Implement Typst in v0.4.0+

This gives you two immediately useful formats while keeping the door open for the ambitious Typst converter if there's community interest.
