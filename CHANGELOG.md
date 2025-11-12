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

## [0.4.1]

### Fixed

- Fixed nested definition list indentation in Sphinx API documentation to prevent nested `<dl>` elements from being incorrectly indented as part of parent definitions
- Fixed transitional paragraphs before nested definition lists being rendered as code blocks by extracting them to column 0
- Fixed signature text whitespace preservation to prevent spaces from being collapsed (e.g., "class CharField" instead of "classCharField")
- Fixed GHFM list rendering inside definition lists by keeping them as HTML `<ul><li>` tags instead of markdown syntax

## [0.4.0]

### Added

- Added Obsidian output format (`Format.OBSIDIAN`) with wikilinks, embeds, and callouts for personal knowledge management

## [0.3.0]

### Added

- Added CommonMark output format (`Format.COMMONMARK`) for strict CommonMark specification compliance with HTML tables

### Fixed

- Fixed Django console-block pattern conversion to properly interleave platform-specific labels with their corresponding code blocks, preserving Font Awesome icon content

## [0.2.0]

### Added

- Added `convert_html()` function for converting raw HTML strings directly
- Exported public API (`convert_file`, `convert_html`, `convert_directory`, `DocType`, `Format`) from `docs2markdown` module for cleaner imports
- Added support for Python 3.13t and 3.14t (free-threading builds)

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

[unreleased]: https://github.com/joshuadavidthomas/docs2markdown/compare/v0.4.1...HEAD
[0.1.0]: https://github.com/joshuadavidthomas/docs2markdown/releases/tag/v0.1.0
[0.1.1]: https://github.com/joshuadavidthomas/docs2markdown/releases/tag/v0.1.1
[0.2.0]: https://github.com/joshuadavidthomas/docs2markdown/releases/tag/v0.2.0
[0.3.0]: https://github.com/joshuadavidthomas/docs2markdown/releases/tag/v0.3.0
[0.4.0]: https://github.com/joshuadavidthomas/docs2markdown/releases/tag/v0.4.0
[0.4.1]: https://github.com/joshuadavidthomas/docs2markdown/releases/tag/v0.4.1
