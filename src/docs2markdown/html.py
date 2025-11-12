from __future__ import annotations

import re
from enum import Enum

from bs4 import BeautifulSoup
from bs4 import Tag
from typing_extensions import override

DEFAULT_CONTENT_MIN_LEN = 100


class BaseHtmlPreprocessor:
    def __init__(self, html: str) -> None:
        self.soup: BeautifulSoup = BeautifulSoup(html, "lxml")
        self.content_selectors: list[str] = self.get_content_selectors()
        self.generic_chrome_selectors: list[str] = self.get_generic_chrome_selectors()

    def get_content_selectors(self) -> list[str]:
        return [
            "article#docs-content",
            "div[role='main']",
            "main article",
            "article",
            "main",
        ]

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
            if node and len(node.get_text(strip=True)) > DEFAULT_CONTENT_MIN_LEN:
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

            element_name = element.name.replace("-", "_")
            method_name = f"process_{element_name}"
            if hasattr(self, method_name):
                method = getattr(self, method_name)
                method(element)

        for element in container.find_all(True):
            if element.name != "code" and element.has_attr("class"):
                del element["class"]


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

        sig_text = re.sub(r"\s+", " ", dt.get_text().strip())

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

            nested_dls = dd.find_all(
                "dl", recursive=False, attrs={"data-markdownify-raw": ""}
            )
            if nested_dls:
                first_nested_dl = nested_dls[0]
                elements_to_extract = []

                for sibling in first_nested_dl.previous_siblings:
                    if not sibling or (
                        isinstance(sibling, str) and not sibling.strip()
                    ):
                        continue
                    if hasattr(sibling, "name") and sibling.name == "p":
                        elements_to_extract.insert(0, sibling)
                    else:
                        break

                all_elements = elements_to_extract + list(nested_dls)
                for element in reversed(all_elements):
                    element.extract()
                    dl.insert_after(element)

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

        if "console-block" in classes:
            self._process_console_block(div)
            return

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

    def _process_console_block(self, div: Tag) -> None:
        labels = list(div.find_all("label"))
        sections = list(div.find_all("section"))

        pairs = []
        for label in labels:
            for_attr = label.get("for", "")
            if not for_attr:
                continue

            best_match = None
            best_score = 0

            for section in sections:
                section_classes = section.get("class", [])

                common_tokens = self._find_common_meaningful_tokens(
                    for_attr, section_classes
                )
                score = len(common_tokens)

                if score > best_score:
                    best_score = score
                    best_match = section

            if best_match and best_score > 0:
                pairs.append((label, best_match))

        div.clear()
        for label, section in pairs:
            div.append(label)
            div.append(section)

    def _find_common_meaningful_tokens(
        self, for_attr: str, section_classes: list[str]
    ) -> set[str]:
        for_tokens = set(re.split(r"[-_\s]", for_attr.lower()))

        section_tokens = set()
        for cls in section_classes:
            section_tokens.update(re.split(r"[-_\s]", cls.lower()))

        common = for_tokens & section_tokens

        meaningful = {
            t
            for t in common
            if len(t) > 1 and not t.isdigit() and t not in {"c", "tab", "content"}
        }

        return meaningful

    def _process_code_block(self, div: Tag, highlight_class: str) -> None:
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

        if not span.get_text(strip=True) and str(span.get("id", "")).startswith(
            "index-"
        ):
            span.decompose()
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
