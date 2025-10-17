from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

import pytest
from syrupy.extensions.base import AbstractSyrupyExtension
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
    if "doc_file" not in metafunc.fixturenames:
        return

    fixtures_dir = Path(metafunc.module.__file__).parent / "fixtures"

    marker = metafunc.definition.get_closest_marker("fixture_tags")

    if marker:
        tags = marker.args[0] if marker.args else []
        doc_files = []
        for tag in tags:
            doc_files.extend(sorted((fixtures_dir / tag).glob("*.html")))
    else:
        doc_files = sorted(fixtures_dir.glob("*.html"))
        for subdir in sorted(fixtures_dir.iterdir()):
            if subdir.is_dir():
                doc_files.extend(sorted(subdir.glob("*.html")))

    ids = [f.stem for f in doc_files]
    metafunc.parametrize("doc_file", doc_files, ids=ids)


class Docs2MarkdownSnapshotExtension(SingleFileSnapshotExtension):
    _write_mode = WriteMode.TEXT

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
        return str(data).rstrip() + "\n"


class HtmlSnapshotExtension(Docs2MarkdownSnapshotExtension):
    file_extension = "html"


class MarkdownSnapshotExtension(Docs2MarkdownSnapshotExtension):
    file_extension = "md"


class SnapshotWithGoal:
    def __init__(self, snapshot_ext: AbstractSyrupyExtension):
        self.snapshot = snapshot_ext

    def __eq__(self, other):
        result = self.snapshot.__eq__(other)

        snapshot_location = self.snapshot.extension_class.get_location(
            test_location=self.snapshot.test_location, index=0
        )
        ext = self.snapshot.extension_class.file_extension
        goal_file = Path(str(snapshot_location).replace(f".{ext}", f".GOAL.{ext}"))

        if goal_file.exists():
            goal = goal_file.read_text()
            assert other != goal, f"Output matches GOAL! Delete {goal_file.name}"

        return result

    def __getattr__(self, name):
        return getattr(self.snapshot, name)


@pytest.fixture
def snapshot_html(snapshot):
    extension = snapshot.use_extension(HtmlSnapshotExtension)
    return SnapshotWithGoal(extension)


@pytest.fixture
def snapshot_md(snapshot):
    extention = snapshot.use_extension(MarkdownSnapshotExtension)
    return SnapshotWithGoal(extention)
