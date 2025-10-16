from __future__ import annotations

from collections.abc import Generator
from enum import Enum
from pathlib import Path

from docs2md.html import BaseHtmlPreprocessor
from docs2md.html import SphinxHtmlPreprocessor
from docs2md.markdown import GhfmConverter
from docs2md.markdown import LlmsTxtConverter


class DocType(Enum):
    DEFAULT = "default"
    SPHINX = "sphinx"

    def preprocessor(self, html: str) -> BaseHtmlPreprocessor:
        match self:
            case self.SPHINX:
                cls = SphinxHtmlPreprocessor
            case _:
                cls = BaseHtmlPreprocessor
        return cls(html)


class Format(Enum):
    GHFM = "ghfm"
    LLMSTXT = "llmstxt"

    def get_converter(self):
        match self:
            case self.GHFM:
                return GhfmConverter
            case self.LLMSTXT:
                return LlmsTxtConverter

    def get_extension(self):
        match self:
            case self.GHFM:
                return ".md"
            case self.LLMSTXT:
                return ".txt"


def convert_file(
    html_file: Path, doc_type: DocType, format: Format = Format.GHFM
) -> str:
    html = html_file.read_text()
    preprocessed = doc_type.preprocessor(html).process()
    converter_class = format.get_converter()
    converter = converter_class()
    return converter.convert(preprocessed)


def convert_directory(
    input_dir: Path, output_dir: Path, doc_type: DocType, format: Format = Format.GHFM
) -> Generator[tuple[Path, Path | Exception], None, None]:
    """Yields (input_file, output_file_or_exception) for each HTML file."""
    html_files = list(input_dir.rglob("*.html"))

    output_dir.mkdir(parents=True, exist_ok=True)

    for html_file in html_files:
        try:
            relative_path = html_file.relative_to(input_dir)
            output_file = output_dir / relative_path.with_suffix(format.get_extension())

            markdown = convert_file(html_file, doc_type, format)

            output_file.parent.mkdir(parents=True, exist_ok=True)
            output_file.write_text(markdown)

            yield (html_file, output_file)
        except (OSError, ValueError, UnicodeDecodeError) as e:
            yield (html_file, e)
