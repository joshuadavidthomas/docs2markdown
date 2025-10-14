from __future__ import annotations

import pytest
from syrupy.extensions.amber import AmberSnapshotExtension

SNAPSHOTS_DIRECTORY = "snapshots"


class SnapshotsDirectoryExtension(AmberSnapshotExtension):
    snapshot_dirname = SNAPSHOTS_DIRECTORY


@pytest.fixture
def snapshot(snapshot):
    return snapshot.use_extension(SnapshotsDirectoryExtension)
