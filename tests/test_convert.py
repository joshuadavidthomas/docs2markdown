from __future__ import annotations

import pytest
from docs2md.convert import Format
from docs2md.markdown import Docs2MdConverter, LlmsTxtConverter


def test_format_enum_values():
    assert Format.GHFM.value == "ghfm"
    assert Format.LLMSTXT.value == "llmstxt"


def test_format_get_converter():
    assert Format.GHFM.get_converter() == Docs2MdConverter
    assert Format.LLMSTXT.get_converter() == LlmsTxtConverter


def test_format_get_extension():
    assert Format.GHFM.get_extension() == ".md"
    assert Format.LLMSTXT.get_extension() == ".txt"
