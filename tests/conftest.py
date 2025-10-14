from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

import pytest
from syrupy.extensions.single_file import SingleFileSnapshotExtension
from syrupy.extensions.single_file import WriteMode
from typing_extensions import override

if TYPE_CHECKING:
    from syrupy.location import PyTestLocation
    from syrupy.types import PropertyFilter
    from syrupy.types import PropertyMatcher
    from syrupy.types import SerializableData
    from syrupy.types import SerializedData


def pytest_generate_tests(metafunc):
    if "doc_file" in metafunc.fixturenames:
        fixtures_dir = Path(metafunc.module.__file__).parent / "fixtures"
        doc_files = sorted(fixtures_dir.glob("*.html"))
        metafunc.parametrize("doc_file", doc_files, ids=[f.stem for f in doc_files])


class MarkdownSnapshotExtension(SingleFileSnapshotExtension):
    _write_mode = WriteMode.TEXT
    file_extension = "md"

    @classmethod
    @override
    def dirname(cls, *, test_location: PyTestLocation) -> str:
        test_dir = Path(test_location.filepath).parent
        return str(test_dir / "snapshots" / test_location.basename)

    @override
    def serialize(
        self,
        data: SerializableData,
        *,
        exclude: PropertyFilter | None = None,
        include: PropertyFilter | None = None,
        matcher: PropertyMatcher | None = None,
    ) -> SerializedData:
        return str(data)


@pytest.fixture
def snapshot(snapshot):
    return snapshot.use_extension(MarkdownSnapshotExtension)
