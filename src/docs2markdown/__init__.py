from __future__ import annotations

import importlib.metadata

from docs2markdown.convert import DocType
from docs2markdown.convert import Format
from docs2markdown.convert import convert_directory
from docs2markdown.convert import convert_file
from docs2markdown.convert import convert_html

try:
    __version__ = importlib.metadata.version(__name__)
except importlib.metadata.PackageNotFoundError:  # pragma: no cover
    # editable install
    __version__ = "0.0.0"

__all__ = [
    "DocType",
    "Format",
    "convert_directory",
    "convert_file",
    "convert_html",
]
