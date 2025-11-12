from __future__ import annotations

import re
from typing import Any
from typing import final
from urllib.parse import ParseResult
from urllib.parse import urlparse

from bs4 import Tag
from markdownify import MarkdownConverter


def extract_language(el: Tag):
    code = el.find("code")
    if not code:
        return ""

    classes = code.get("class", "")
    if not classes:
        return ""

    for class_name in classes:
        if class_name.startswith("language-"):
            return class_name.replace("language-", "")

    return ""


class Docs2MarkdownConverter(MarkdownConverter):
    @final
    class Options:
        bs4_options = "lxml"
        bullets = "-"
        code_language_callback = extract_language
        heading_style = "ATX"

    def convert_a(self, el: Tag, text: str, **kwargs: Any) -> str:
        href = el.get("href")
        if href:
            modified_href = re.sub(r"\.html(#|$)", r".md\1", href)
            el["href"] = modified_href

        return super().convert_a(el, text, **kwargs)


class GhfmConverter(Docs2MarkdownConverter):
    def convert_a(self, el: Tag, text: str, **kwargs: Any) -> str:
        a = super().convert_a(el, text, **kwargs)

        parent_tags = kwargs.get("parent_tags", set())

        # Only keep as HTML if inside a dd within a raw dl
        if "dd" in parent_tags and "pre" not in parent_tags:
            dl_parent = el.find_parent("dl")
            if dl_parent and dl_parent.has_attr("data-markdownify-raw"):
                if el.has_attr("class"):
                    del el["class"]
                return str(el)

        return a

    def convert_blockquote(self, el: Tag, text: str, **kwargs: Any) -> str:
        alert_type = el.get("data-markdownify-alert-type")
        title = el.get("data-markdownify-title")

        if alert_type or title:
            lines = []

            if alert_type:
                lines.append(f"[!{alert_type}]")

            if title:
                lines.append(f"**{title}**")

            if lines:
                text = "\n\n".join(lines) + text

        return super().convert_blockquote(el, text, **kwargs)

    def convert_code(self, el: Tag, text: str, **kwargs: Any) -> Any:
        parent_tags = kwargs.get("parent_tags", set())

        # Only keep as HTML if inside a dd within a raw dl
        if "dd" in parent_tags and "pre" not in parent_tags:
            dl_parent = el.find_parent("dl")
            if dl_parent and dl_parent.has_attr("data-markdownify-raw"):
                return f"<code>{text}</code>"

        return super().convert_code(el, text, **kwargs)

    def convert_ul(self, el: Tag, text: str, **kwargs: Any) -> Any:
        parent_tags = kwargs.get("parent_tags", set())

        if "dd" in parent_tags:
            dl_parent = el.find_parent("dl")
            if dl_parent and dl_parent.has_attr("data-markdownify-raw"):
                return str(el)

        return super().convert_ul(el, text, **kwargs)

    def convert_li(self, el: Tag, text: str, **kwargs: Any) -> Any:
        parent_tags = kwargs.get("parent_tags", set())

        if "dd" in parent_tags and "ul" in parent_tags:
            dl_parent = el.find_parent("dl")
            if dl_parent and dl_parent.has_attr("data-markdownify-raw"):
                return str(el)

        return super().convert_li(el, text, **kwargs)

    def convert_dl(self, el: Tag, text: str, **kwargs: Any) -> Any:
        if el.has_attr("data-markdownify-raw"):
            dt = el.find("dt")
            dd = el.find("dd")

            if dd and dd.get_text(strip=True):
                parent_tags_for_dd = kwargs.get("parent_tags", set()) | {"dl", "dd"}
                dd_parts = []

                for child in dd.children:
                    if hasattr(child, "name") and child.name:
                        child_md = self.process_tag(
                            child, parent_tags=parent_tags_for_dd
                        )
                        dd_parts.append(child_md)
                    else:
                        dd_parts.append(str(child))

                dd_markdown = "".join(dd_parts).strip()
                dd_markdown = re.sub(r"\n{3,}", "\n\n", dd_markdown)
            else:
                dd_markdown = ""

            return f"<dl>\n{str(dt)}\n<dd>\n{dd_markdown}\n</dd>\n</dl>\n\n"

        return super().convert_dl(el, text, **kwargs)

    def convert_p(self, el: Tag, text: str, **kwargs: Any) -> Any:
        text = re.sub(r"\s+", " ", text.strip())
        return super().convert_p(el, text, **kwargs)

    def convert_span(self, el: Tag, text: str, **kwargs: Any) -> str:
        if el.has_attr("data-markdownify-raw"):
            del el["data-markdownify-raw"]
            return str(el)
        return text


class LlmsTxtConverter(Docs2MarkdownConverter):
    def convert_blockquote(self, el: Tag, text: str, **kwargs: Any) -> str:
        title = el.get("data-markdownify-title")
        alert_type = el.get("data-markdownify-alert-type")

        header_text = title or (f"{alert_type}:" if alert_type else None)

        if header_text:
            text = f"**{header_text}**" + text

        return super().convert_blockquote(el, text, **kwargs)


class CommonMarkConverter(LlmsTxtConverter):
    """
    Strict CommonMark compliant converter with semantic markers.

    Extends LLMSTXT to maintain semantic markers (like **NOTE:**) while
    ensuring CommonMark compliance by outputting tables as HTML.
    Tables are not part of the CommonMark spec, so they are rendered
    as raw HTML which CommonMark explicitly allows.
    """

    def convert_table(self, el: Tag, text: str, **kwargs: Any) -> str:
        for p in el.find_all("p"):
            p.unwrap()

        result = []

        def process_tag(tag, indent):
            if isinstance(tag, str):
                return

            is_simple = all(
                isinstance(child, str) or child.name in ["code", "a", "em", "strong"]
                for child in tag.children
            )

            if is_simple:
                result.append("  " * indent + str(tag))
            else:
                result.append("  " * indent + f"<{tag.name}>")
                for child in tag.children:
                    if hasattr(child, "name"):
                        process_tag(child, indent + 1)
                result.append("  " * indent + f"</{tag.name}>")

        process_tag(el, 0)
        return "\n".join(result) + "\n\n"


class ObsidianConverter(Docs2MarkdownConverter):
    def convert_a(self, el: Tag, text: str, **kwargs: Any) -> str:
        href = el.get("href")

        if not href or not isinstance(href, str):
            return text

        parsed_href = urlparse(href)

        # if not an internal href, format as obsidian-style wikilink
        if (
            not parsed_href.scheme
            and not parsed_href.netloc
            and not href.startswith("#")
        ):
            return self._format_wikilink(parsed_href, text)

        return super().convert_a(el, text, **kwargs)

    def convert_img(self, el: Tag, text: str, **kwargs: Any) -> str:
        src = el.get("src", "")
        alt = el.get("alt", "")

        if alt:
            return f"![[{src}|{alt}]]"
        return f"![[{src}]]"

    def convert_blockquote(self, el: Tag, text: str, **kwargs: Any) -> str:
        alert_type = el.get("data-markdownify-alert-type")
        title = el.get("data-markdownify-title")

        if alert_type:
            callout_header = f"[!{str(alert_type).lower()}]"
            if title:
                callout_header += f" {title}"
            text = callout_header + text

        return super().convert_blockquote(el, text, **kwargs)

    def _format_wikilink(self, parsed_href: ParseResult, text: str) -> str:
        path = parsed_href.path or ""
        page = path.split("/")[-1] if path else ""
        page = re.sub(r"\.(html|md)$", "", page)

        anchor = parsed_href.fragment or None

        target = f"{page}#{anchor}" if anchor else page

        if text:
            expected = target
            text_normalized = text.lower().strip()
            expected_normalized = expected.lower().strip()
            page_normalized = page.lower().strip()

            if (
                text_normalized != page_normalized
                and text_normalized != expected_normalized
            ):
                return f"[[{target}|{text}]]"

        return f"[[{target}]]"
