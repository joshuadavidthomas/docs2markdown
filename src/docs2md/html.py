from __future__ import annotations

from enum import Enum

from bs4 import BeautifulSoup
from bs4 import Tag

DEFAULT_CONTENT_SELECTORS = [
    "article#docs-content",
    "div[role='main']",
    "main article",
    "article",
    "main",
]
DEFAULT_CONTENT_MIN_LEN = 100

DEFAULT_GENERIC_CHROME_SELECTORS = [
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


class BaseHtmlPreprocessor:
    def __init__(
        self,
        html: str,
        *,
        content_selectors: list[str] | None = None,
        content_min_len: int | None = None,
        generic_chrome_selectors: list[str] | None = None,
    ) -> None:
        self.soup: BeautifulSoup = BeautifulSoup(html, "lxml")
        self.content_selectors: list[str] = (
            content_selectors or DEFAULT_CONTENT_SELECTORS
        )
        self.content_min_len: int = content_min_len or DEFAULT_CONTENT_MIN_LEN
        self.generic_chrome_selectors: list[str] = (
            generic_chrome_selectors or DEFAULT_GENERIC_CHROME_SELECTORS
        )

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

        elements = list(content.find_all(True))

        for element in elements:
            if element.parent is None:
                continue

            method_name = f"process_{element.name}"
            if hasattr(self, method_name):
                method = getattr(self, method_name)
                method(element)

        return str(content)


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


class SphinxHtmlPreprocessor(BaseHtmlPreprocessor):
    def process_a(self, tag: Tag) -> None:
        if "headerlink" in tag.get("class", []):
            tag.decompose()

    def process_div(self, tag: Tag) -> None:
        classes = tag.get("class")
        if classes is None:
            return

        if not isinstance(classes, list):
            classes = [classes]

        if "admonition" in classes:
            self._process_admonition(tag)
            return

        for cls in classes:
            if cls.startswith("highlight-"):
                self._process_code_block(tag, cls)
                return

    def _process_admonition(self, tag: Tag) -> None:
        admonition_classes = tag.get("class", [])
        if not isinstance(admonition_classes, list):
            admonition_classes = [admonition_classes]

        title_elem = tag.find("p", class_="admonition-title")
        title = title_elem.get_text(strip=True) if title_elem else "Note"
        if title_elem:
            title_elem.decompose()

        alert_type = Admonition.NOTE
        for cls in admonition_classes:
            alert_type = Admonition.from_class_name(cls)
            if alert_type != Admonition.NOTE:
                break

        title_type = Admonition.from_title(title)
        if title_type:
            alert_type = title_type

        blockquote = self.soup.new_tag("blockquote")

        marker = self.soup.new_tag("p")
        marker.string = f"[!{alert_type.name}]"
        blockquote.append(marker)

        for child in list(tag.children):
            blockquote.append(child)

        tag.replace_with(blockquote)

    def _process_code_block(self, tag: Tag, highlight_class: str) -> None:
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

        pre_tag = tag.find("pre")
        if not pre_tag:
            return

        new_pre = self.soup.new_tag("pre")
        code_tag = self.soup.new_tag("code")

        language = get_language_from_class(highlight_class)
        if language:
            code_tag["class"] = f"language-{language}"

        for child in list(pre_tag.children):
            code_tag.append(child)

        new_pre.append(code_tag)
        tag.replace_with(new_pre)
