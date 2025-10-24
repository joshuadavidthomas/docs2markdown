from __future__ import annotations

from collections.abc import Generator
from enum import Enum
from pathlib import Path

from docs2markdown.html import BaseHtmlPreprocessor
from docs2markdown.html import SphinxHtmlPreprocessor
from docs2markdown.markdown import CommonMarkConverter
from docs2markdown.markdown import Docs2MarkdownConverter
from docs2markdown.markdown import GhfmConverter
from docs2markdown.markdown import LlmsTxtConverter
from docs2markdown.markdown import ObsidianConverter


class DocType(Enum):
    DEFAULT = "default"
    SPHINX = "sphinx"

    def get_preprocessor(self) -> type[BaseHtmlPreprocessor]:
        match self:
            case self.SPHINX:
                return SphinxHtmlPreprocessor
            case _:
                return BaseHtmlPreprocessor


class Format(Enum):
    COMMONMARK = "commonmark"
    GHFM = "ghfm"
    LLMSTXT = "llmstxt"
    OBSIDIAN = "obsidian"

    def get_converter(self) -> type[Docs2MarkdownConverter]:
        match self:
            case self.COMMONMARK:
                return CommonMarkConverter
            case self.GHFM:
                return GhfmConverter
            case self.LLMSTXT:
                return LlmsTxtConverter
            case self.OBSIDIAN:
                return ObsidianConverter


def convert_html(html: str, doc_type: DocType, format: Format = Format.GHFM) -> str:
    preprocessor_class = doc_type.get_preprocessor()
    preprocessed = preprocessor_class(html).process()

    converter_class = format.get_converter()
    converter = converter_class()

    return converter.convert(preprocessed)


def convert_file(
    html_file: Path, doc_type: DocType, format: Format = Format.GHFM
) -> str:
    html = html_file.read_text()
    return convert_html(html, doc_type, format)


def convert_directory(
    input_dir: Path, output_dir: Path, doc_type: DocType, format: Format = Format.GHFM
) -> Generator[tuple[Path, Path | Exception], None, None]:
    html_files = list(input_dir.rglob("*.html"))

    output_dir.mkdir(parents=True, exist_ok=True)

    for html_file in html_files:
        try:
            relative_path = html_file.relative_to(input_dir)
            output_file = output_dir / relative_path.with_suffix(".md")

            markdown = convert_file(html_file, doc_type, format)

            output_file.parent.mkdir(parents=True, exist_ok=True)
            output_file.write_text(markdown)

            yield (html_file, output_file)
        except (OSError, ValueError, UnicodeDecodeError) as e:
            yield (html_file, e)
