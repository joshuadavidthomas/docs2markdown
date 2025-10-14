from __future__ import annotations

import re
from typing import Any
from typing import final

from bs4 import Tag
from markdownify import MarkdownConverter


def md(html: str):
    return Docs2MdConverter().convert(html)


def extract_language(el: Tag):
    """Extract language from code element's class attribute.

    Looks for <code class="language-{lang}"> pattern within <pre> blocks.

    Args:
        el: The <pre> element being converted

    Returns:
        Language string or empty string if no language found
    """
    code = el.find("code")
    if not code:
        return ""

    classes = code.get("class", "")
    if not classes:
        return ""

    if isinstance(classes, str):
        classes = [classes]

    for class_name in classes:
        if class_name.startswith("language-"):
            return class_name.replace("language-", "")

    return ""


def normalize_whitespace(text: str):
    """Normalize whitespace in converted text.

    Replaces sequences of whitespace (spaces, tabs, newlines) with single spaces.
    This removes hard line breaks from HTML source formatting while preserving
    semantic structure (paragraph breaks, list items, etc.).

    Args:
        text: Text content to normalize

    Returns:
        Normalized text with single spaces, or original if text is None/empty
    """
    if text:
        return re.sub(r"\s+", " ", text.strip())
    return text


class Docs2MdConverter(MarkdownConverter):
    @final
    class Options:
        bs4_options = "lxml"
        bullets = "-"
        code_language_callback = extract_language
        heading_style = "ATX"

    def convert_p(self, el: Tag, text: str, **kwargs: Any) -> Any:
        text = normalize_whitespace(text)
        return super().convert_p(el, text, **kwargs)
