from __future__ import annotations

import re


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
