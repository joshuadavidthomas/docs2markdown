# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project attempts to adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!--
## [${version}]
### Added - for new features
### Changed - for changes in existing functionality
### Deprecated - for soon-to-be removed features
### Removed - for now removed features
### Fixed - for any bug fixes
### Security - in case of vulnerabilities
[${version}]: https://github.com/joshuadavidthomas/docs2markdown/releases/tag/v${version}
-->

## [Unreleased]

## [0.1.1]

### Added

- Added `py.typed`

## [0.1.0]

### Added

- Initial release of `docs2markdown`
- Support for converting HTML documentation to Markdown with multiple output formats:
    - GitHub-flavored Markdown (GHFM) for standard Markdown rendering
    - LLM-friendly text (llmstxt) optimized for AI model consumption
- Support for multiple documentation types:
  - Default mode for generic HTML documentation
  - Sphinx-generated documentation with specialized preprocessing
- Single file processing or batch processing of directories
- CLI tool and Python library API

### New Contributors

- Josh Thomas <josh@joshthomas.dev> (maintainer)

[unreleased]: https://github.com/joshuadavidthomas/docs2markdown/compare/v0.1.1...HEAD
[0.1.0]: https://github.com/joshuadavidthomas/docs2markdown/releases/tag/v0.1.0
[0.1.1]: https://github.com/joshuadavidthomas/docs2markdown/releases/tag/v0.1.1
