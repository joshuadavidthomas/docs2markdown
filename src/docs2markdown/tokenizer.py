from __future__ import annotations

from typing import Any
from typing import Protocol


class TokenCounter(Protocol):
    def count(self, text: str) -> int: ...


class TiktokenCounter:
    encoder: Any

    def __init__(self, model: str = "gpt-4") -> None:
        import tiktoken  # type: ignore[import-not-found]

        try:
            self.encoder = tiktoken.encoding_for_model(model)
        except KeyError:
            self.encoder = tiktoken.get_encoding("cl100k_base")

    def count(self, text: str) -> int:
        return len(self.encoder.encode(text))


class CharEstimateCounter:
    def __init__(self, chars_per_token: float = 4.0) -> None:
        self.chars_per_token = chars_per_token

    def count(self, text: str) -> int:
        return int(len(text) / self.chars_per_token)


def get_counter(model: str | None = None) -> TokenCounter:
    try:
        return TiktokenCounter(model or "gpt-4")
    except ImportError:
        return CharEstimateCounter()
