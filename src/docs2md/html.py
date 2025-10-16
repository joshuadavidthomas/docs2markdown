from __future__ import annotations

from enum import Enum

from bs4 import BeautifulSoup
from bs4 import Tag
from typing_extensions import override

DEFAULT_CONTENT_SELECTORS = [
    "article#docs-content",
    "div[role='main']",
    "main article",
    "article",
    "main",
]
DEFAULT_CONTENT_MIN_LEN = 100


class BaseHtmlPreprocessor:
    def __init__(
        self,
        html: str,
        *,
        content_selectors: list[str] | None = None,
        content_min_len: int | None = None,
    ) -> None:
        self.soup: BeautifulSoup = BeautifulSoup(html, "lxml")
        self.content_selectors: list[str] = (
            content_selectors or DEFAULT_CONTENT_SELECTORS
        )
        self.content_min_len: int = content_min_len or DEFAULT_CONTENT_MIN_LEN
        self.generic_chrome_selectors: list[str] = self.get_generic_chrome_selectors()

    def get_generic_chrome_selectors(self) -> list[str]:
        return [
            "head",
            "nav",
            ".nav",
            "header",
            "footer",
            "#ft",
            "aside",
            "script",
            "style",
            "noscript",
            "[role='navigation']",
            "[role='banner']",
            ".sidebar",
            "#sidebar",
            "#global-nav",
            ".toc",
        ]

    def process(self) -> str:
        content = self.soup.body or self.soup

        for selector in self.content_selectors:
            node = self.soup.select_one(selector)
            if node and len(node.get_text(strip=True)) > self.content_min_len:
                content = node
                break

        for selector in self.generic_chrome_selectors:
            for element in content.select(selector):
                element.decompose()

        self.process_elements(content)

        return str(content)

    def process_elements(self, container: Tag) -> None:
        elements = list(container.find_all(True))

        for element in elements:
            if element.parent is None:
                continue

            method_name = f"process_{element.name}"
            if hasattr(self, method_name):
                method = getattr(self, method_name)
                method(element)


class Admonition(Enum):
    CAUTION = "caution"
    IMPORTANT = "important"
    NOTE = "note"
    TIP = "tip"
    WARNING = "warning"

    @classmethod
    def from_class_name(cls, class_name: str) -> Admonition:
        return SPHINX_ADMONITION_MAP.get(class_name.lower(), cls.NOTE)

    @classmethod
    def from_title(cls, title: str) -> Admonition | None:
        try:
            admon_type = cls[title.upper()]
            return admon_type
        except KeyError:
            return None


SPHINX_ADMONITION_MAP = {
    "attention": Admonition.WARNING,
    "danger": Admonition.WARNING,
    "caution": Admonition.CAUTION,
    "error": Admonition.CAUTION,
    "hint": Admonition.TIP,
    "important": Admonition.IMPORTANT,
    "note": Admonition.NOTE,
    "seealso": Admonition.NOTE,
    "tip": Admonition.TIP,
    "warning": Admonition.WARNING,
}

SPHINX_VERSION_DIRECTIVE_MAP = {
    "versionadded": Admonition.NOTE,
    "version-added": Admonition.NOTE,
    "versionchanged": Admonition.NOTE,
    "version-changed": Admonition.NOTE,
    "versionmodified": Admonition.NOTE,
    "version-modified": Admonition.NOTE,
    "deprecated": Admonition.WARNING,
    "version-deprecated": Admonition.WARNING,
    "versionremoved": Admonition.WARNING,
    "version-removed": Admonition.WARNING,
}

SPHINX_LANGUAGE_OVERRIDES = {
    "highlight-default": "python",
    "highlight-pycon": "python",
    "highlight-py3": "python",
    "highlight-console": "bash",
    "highlight-shell": "bash",
    "highlight-doscon": "batch",
    "highlight-none": "text",
    "highlight-pytb": "python",
    "highlight-po": "gettext",
    "highlight-psql": "postgresql",
}


def get_language_from_class(class_name: str) -> str:
    if class_name in SPHINX_LANGUAGE_OVERRIDES:
        return SPHINX_LANGUAGE_OVERRIDES[class_name]

    if class_name.startswith("highlight-"):
        return class_name.replace("highlight-", "")

    return ""


class CommentStyle(Enum):
    HASH = "#"  # Python, Ruby, Shell, YAML, etc.
    DOUBLE_SLASH = "//"  # JavaScript, TypeScript, Java, C++, etc.
    C_STYLE = ("/*", "*/")  # CSS, C, etc.
    HTML_STYLE = ("<!--", "-->")  # HTML, XML
    SQL_STYLE = "--"  # SQL
    LUA_STYLE = "--"  # Lua
    NONE = None  # Plain text, unknown


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
    "json": CommentStyle.DOUBLE_SLASH,
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


class SphinxHtmlPreprocessor(BaseHtmlPreprocessor):
    @override
    def get_generic_chrome_selectors(self) -> list[str]:
        base_selectors = super().get_generic_chrome_selectors()
        sphinx_selectors = [
            ".sphinxsidebar",
            ".related",
            ".rst-versions",
            "[aria-label='breadcrumb']",
            "ul[aria-label='Languages']",
            "ul[aria-label='Versions']",
            "#hd",
        ]
        return base_selectors + sphinx_selectors

    def process_a(self, tag: Tag) -> None:
        if tag.has_attr("title"):
            del tag["title"]

        if "headerlink" in tag.get("class", []):
            tag.decompose()

    def process_code(self, code: Tag) -> None:
        classes = code.get("class", [])
        if classes:
            keep = [c for c in classes if c.startswith("language-")]
            if keep:
                code["class"] = keep
            elif code.has_attr("class"):
                del code["class"]

    def process_dl(self, dl: Tag) -> None:
        classes = dl.get("class", [])
        if "py" in classes:
            self._process_api_doc(dl)
        elif "simple" in classes:
            self._process_simple_dl(dl)

    def _process_api_doc(self, dl: Tag) -> None:
        if dl.has_attr("class"):
            del dl["class"]

        dt = dl.find("dt")
        if not dt:
            return

        if dt.has_attr("class"):
            del dt["class"]

        for a in dt.select("a.headerlink"):
            a.decompose()

        source_link = dt.find("a", class_="reference external")
        if source_link:
            source_link = source_link.extract()
            for span in source_link.find_all("span"):
                span.unwrap()
            if source_link.has_attr("class"):
                del source_link["class"]

        sig_text = dt.get_text("", strip=True)

        dt_id = dt.get("id")
        dt.clear()
        if dt_id:
            dt["id"] = dt_id

        code = self.soup.new_tag("code")
        code.string = sig_text
        dt.append(code)

        if source_link:
            dt.append(source_link)

        dd = dl.find("dd")
        if dd:
            if dd.has_attr("class"):
                del dd["class"]

            self.process_elements(dd)

            for span in dd.find_all("span"):
                span.unwrap()

        dl["data-markdownify-raw"] = ""

    def _process_simple_dl(self, dl: Tag) -> None:
        div = self.soup.new_tag("div")

        for dt in dl.find_all("dt", recursive=False):
            p = self.soup.new_tag("p")
            strong = self.soup.new_tag("strong")

            strong.extend(list(dt.children))
            p.append(strong)
            div.append(p)

            dd = dt.find_next_sibling("dd")
            if dd:
                for child in list(dd.children):
                    div.append(child)

        dl.replace_with(div)

    def process_div(self, div: Tag) -> None:
        classes = div.get("class", [])

        if "admonition" in classes:
            self._process_admonition(div)
            return

        for cls in classes:
            if cls in SPHINX_VERSION_DIRECTIVE_MAP:
                alert_type = SPHINX_VERSION_DIRECTIVE_MAP[cls]
                self._process_version_directive(div, alert_type)
                return

            if cls.startswith("highlight-"):
                self._process_code_block(div, cls)
                return

    def _process_admonition(self, div: Tag) -> None:
        admonition_classes = div.get("class", [])

        title_p = div.find("p", class_="admonition-title")
        title = title_p.get_text(strip=True) if title_p else "Note"
        if title_p:
            title_p.decompose()

        alert_type = Admonition.NOTE
        for cls in admonition_classes:
            alert_type = Admonition.from_class_name(cls)
            if alert_type != Admonition.NOTE:
                break

        title_type = Admonition.from_title(title)
        if title_type:
            alert_type = title_type

        blockquote = self.soup.new_tag("blockquote")

        blockquote["data-markdownify-alert-type"] = alert_type.name

        blockquote.extend(list(div.children))

        div.replace_with(blockquote)

    def _process_version_directive(self, div: Tag, alert_type: Admonition) -> None:
        title_span = div.find("span", class_="title")
        title = title_span.get_text(strip=True) if title_span else ""
        if title_span:
            title_span.decompose()

        blockquote = self.soup.new_tag("blockquote")

        blockquote["data-markdownify-alert-type"] = alert_type.name
        if title:
            blockquote["data-markdownify-title"] = title

        blockquote.extend(list(div.children))
        div.replace_with(blockquote)

    def _process_code_block(self, div: Tag, highlight_class: str) -> None:
        """Sphinx code block to standard HTML code block

        Transforms:
            <div class="highlight-{lang}">
                <div class="highlight">
                    <pre>code</pre>
                </div>
            </div>

        To:
            <pre><code class="language-{lang}">code</code></pre>
        """

        pre = div.find("pre")
        if not pre:
            return

        new_pre = self.soup.new_tag("pre")
        code = self.soup.new_tag("code")

        language = get_language_from_class(highlight_class)
        if language:
            code["class"] = f"language-{language}"

        code.extend(list(pre.children))

        new_pre.append(code)
        div.replace_with(new_pre)

    def process_section(self, section: Tag) -> None:
        if section.has_attr("id"):
            span_anchor = self.soup.new_tag("span")
            span_anchor["id"] = section["id"]
            span_anchor["data-markdownify-raw"] = ""
            section.insert(0, span_anchor)

            del section["id"]

    def process_span(self, span: Tag) -> None:
        if not span.has_attr("id"):
            span.unwrap()
            return

        next_heading = span.find_next_sibling(["h1", "h2", "h3", "h4", "h5", "h6"])

        if next_heading:
            heading_text = next_heading.get_text(" ", strip=True)
            if heading_text.endswith("¶"):
                heading_text = heading_text[:-1].strip()

            slug = heading_text.lower().replace(" ", "-")
            slug = "".join(c for c in slug if c.isalnum() or c == "-")

            if span["id"] == slug:
                span.decompose()
                return

        span["data-markdownify-raw"] = ""


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
            "div.header, header.header",
            ".sidebar",
            ".right-sidebar",
            ".mobile-preferences",
            "starlight-menu-button",
            "starlight-theme-select",
            "site-search",
            "div.copy, button.copy",
        ]
        return base_selectors + starlight_selectors

    def process_elements(self, container: Tag) -> None:
        """Override to handle custom elements before standard processing."""
        for tabs in container.find_all("starlight-tabs"):
            self._process_starlight_tabs(tabs)

        for figure in list(container.find_all("figure")):
            if figure.parent is not None:
                parent = figure.parent
                classes = parent.get("class", [])  # type: ignore
                if classes and "expressive-code" in classes:  # type: ignore
                    self.process_figure(figure)

        super().process_elements(container)

    def _process_starlight_tabs(self, tabs_element: Tag) -> None:
        """Convert starlight-tabs to sequential content sections."""
        tab_labels = []
        tablist = tabs_element.find("ul", role="tablist")
        if tablist:
            for tab in tablist.find_all("a", role="tab"):
                label = tab.get_text(strip=True)
                if label:
                    tab_labels.append(label)

        panels = tabs_element.find_all("div", role="tabpanel")

        container = self.soup.new_tag("div")

        for i, panel in enumerate(panels):
            if i < len(tab_labels):
                li = self.soup.new_tag("li")
                strong = self.soup.new_tag("strong")
                strong.string = tab_labels[i]
                li.append(strong)
                container.append(li)

            for child in list(panel.children):
                container.append(child)

        tabs_element.replace_with(container)

    def process_figure(self, figure: Tag) -> None:
        """Process Starlight expressive-code figure blocks."""
        # Skip if already processed
        if figure.has_attr("data-markdownify-raw"):
            return
            
        parent = figure.parent
        if not parent or "expressive-code" not in parent.get("class", []):
            return

        is_terminal = "is-terminal" in figure.get("class", [])

        pre = figure.find("pre")
        if not pre:
            return

        language = str(pre.get("data-language", ""))

        if is_terminal and not language:
            language = "bash"

        code = pre.find("code")
        if not code:
            code = self.soup.new_tag("code")
            code.extend(list(pre.children))
            pre.clear()
            pre.append(code)

        ec_lines = list(code.find_all("div", class_="ec-line"))
        for i, ec_line in enumerate(ec_lines):
            for span in ec_line.find_all("span", class_="indent"):
                span.unwrap()
            for span in ec_line.find_all("span"):
                span.unwrap()
            for inner_div in ec_line.find_all("div", class_="code"):
                inner_div.unwrap()
            if i < len(ec_lines) - 1:
                ec_line.insert_after(self.soup.new_string("\n"))
            ec_line.unwrap()

        if language:
            code["class"] = f"language-{language}"

        # Mark figure to preserve HTML structure but allow content conversion
        figure["data-markdownify-raw"] = ""
        
        # Remove not-content class so figure doesn't get filtered out
        if "not-content" in figure.get("class", []):
            classes = [c for c in figure.get("class", []) if c != "not-content"]
            if classes:
                figure["class"] = classes
            else:
                del figure["class"]

        # Simplify figcaption - just keep the title text
        figcaption = figure.find("figcaption")
        if figcaption:
            title_span = figcaption.find("span", class_="title")
            if title_span:
                title_text = title_span.get_text(strip=True)
                if title_text and title_text.lower() not in ["terminal window", ""]:
                    # Replace all contents with just the title text
                    for child in list(figcaption.children):
                        child.extract()
                    figcaption.string = title_text
                else:
                    figcaption.decompose()
            else:
                figcaption.decompose()
