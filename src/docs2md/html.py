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

        sig_text = dt.get_text("", strip=True)
        if sig_text.endswith("¶"):
            sig_text = sig_text[:-1]

        dt_id = dt.get("id")
        dt.clear()
        if dt_id:
            dt["id"] = dt_id

        code = self.soup.new_tag("code")
        code.string = sig_text
        dt.append(code)

        dd = dl.find("dd")
        if dd:
            if dd.has_attr("class"):
                del dd["class"]

            self.process_elements(dd)

            for span in dd.find_all("span"):
                span.unwrap()

        dl["data-markdownify-raw"] = ""

    def process_div(self, div: Tag) -> None:
        classes = div.get("class", [])

        if "admonition" in classes:
            self._process_admonition(div)
            return

        for cls in classes:
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

        marker = self.soup.new_tag("p")
        marker.string = f"[!{alert_type.name}]"
        blockquote.append(marker)

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
