from __future__ import annotations

import json
from enum import Enum
from pathlib import Path
from typing import Protocol

from docs2markdown.chunker import Chunk


class OutputWriter(Protocol):
    def write(self, chunks: list[Chunk], output_path: Path) -> None: ...


class OutputFormat(Enum):
    MARKDOWN = "markdown"
    JSONL = "jsonl"
    MANIFEST = "manifest"


class JsonlWriter:
    def write(self, chunks: list[Chunk], output_path: Path) -> None:
        output_path.parent.mkdir(parents=True, exist_ok=True)

        with open(output_path, "w") as f:
            for chunk in chunks:
                record = chunk.to_dict()
                if "code_languages" in record:
                    record["code_languages"] = sorted(record["code_languages"])
                f.write(json.dumps(record) + "\n")


class ManifestWriter:
    def write(self, chunks: list[Chunk], output_path: Path) -> None:
        output_path.parent.mkdir(parents=True, exist_ok=True)

        source_files: dict[str, list[str]] = {}
        chunk_list: list[dict[str, object]] = []

        for chunk in chunks:
            chunk_dict = chunk.to_dict(include_content=False)
            chunk_list.append(chunk_dict)

            source = chunk.source_file_id
            if source not in source_files:
                source_files[source] = []
            source_files[source].append(chunk.id)

        manifest = {
            "version": "1.0",
            "total_chunks": len(chunks),
            "chunks": chunk_list,
            "files": source_files,
        }

        with open(output_path, "w") as f:
            json.dump(manifest, f, indent=2)


class MarkdownWriter:
    def write(self, chunks: list[Chunk], output_path: Path) -> None:
        if output_path.suffix == ".md":
            output_dir = output_path.parent
            base_name = output_path.stem
        else:
            output_dir = output_path
            base_name = "chunk"

        output_dir.mkdir(parents=True, exist_ok=True)

        for i, chunk in enumerate(chunks):
            chunk_file = output_dir / f"{base_name}_{i:04d}.md"

            frontmatter = self._create_frontmatter(chunk)
            content = frontmatter + chunk.content

            chunk_file.write_text(content)

    def _create_frontmatter(self, chunk: Chunk) -> str:
        lines = [
            "---",
            f"id: {chunk.id}",
            f"source_file_id: {chunk.source_file_id}",
        ]

        if chunk.headings:
            headings_yaml = json.dumps(chunk.headings)
            lines.append(f"headings: {headings_yaml}")

        lines.extend(
            [
                f"level: {chunk.level}",
                f"order: {chunk.order}",
                f"tokens: {chunk.tokens}",
                f"char_count: {chunk.char_count}",
            ]
        )

        if chunk.code_languages:
            languages_yaml = json.dumps(sorted(chunk.code_languages))
            lines.append(f"code_languages: {languages_yaml}")

        lines.append("---")
        lines.append("")

        return "\n".join(lines)


def get_writer(format: OutputFormat) -> OutputWriter:
    match format:
        case OutputFormat.JSONL:
            return JsonlWriter()
        case OutputFormat.MANIFEST:
            return ManifestWriter()
        case OutputFormat.MARKDOWN:
            return MarkdownWriter()
