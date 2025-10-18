from __future__ import annotations

import sys

import pytest

from docs2markdown.tokenizer import CharEstimateCounter
from docs2markdown.tokenizer import TiktokenCounter
from docs2markdown.tokenizer import get_counter


class TestCharEstimateCounter:
    @pytest.mark.parametrize(
        "text,expected",
        [
            ("hello", 1),
            ("hello world", 2),
            ("a" * 100, 25),
            ("", 0),
        ],
    )
    def test_count(self, text, expected):
        counter = CharEstimateCounter(chars_per_token=4.0)
        assert counter.count(text) == expected


class TestTiktokenCounter:
    def test_count(self):
        counter = TiktokenCounter("gpt-4")
        assert counter.count("Hello world") > 0

    def test_requires_tiktoken(self, monkeypatch):
        monkeypatch.setitem(sys.modules, "tiktoken", None)

        with pytest.raises(ImportError):
            TiktokenCounter()


class TestGetCounter:
    def test_fallback_without_tiktoken(self, monkeypatch):
        monkeypatch.setitem(sys.modules, "tiktoken", None)
        counter = get_counter()
        assert isinstance(counter, CharEstimateCounter)

    def test_uses_tiktoken_when_available(self):
        counter = get_counter()
        assert isinstance(counter, TiktokenCounter)
