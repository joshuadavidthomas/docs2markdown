from __future__ import annotations

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


class SphinxHtmlPreprocessor(BaseHtmlPreprocessor):
    def process_a(self, tag: Tag) -> None:
        if "headerlink" in tag.get("class", []):
            tag.decompose()
