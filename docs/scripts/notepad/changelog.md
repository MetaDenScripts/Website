# Notepad Changelog

All notable changes to this project will be documented in this file.

## [0.0.2] - 2026-02-22

### Fixed

- Prevented nil/malformed note payload crashes in `GetNoteByName` by adding safe decode + fallback delta handling.
- Added server-side max note-size validation (10,000 bytes) before database writes.
- Improved laptop resolution to prefer current `fd_laptop` device id and validate ownership against inventory metadata.
- Aligned single-note fetch query with the rest of the resource by filtering `GetNoteByName` with `file_type = 'txt'`.
- Added defensive client-side handling when opening note content to avoid UI errors on invalid responses.

### Changed

- Updated API documentation in [README.md](README.md) with explicit endpoint references and usage examples.
- Updated runtime behavior notes and caveats in docs to reflect current implementation.

### Version

- Bumped resource version to `0.0.2` in [fxmanifest.lua](fxmanifest.lua).

## [0.0.1] - 2026-02-17

### Added

- Resource scaffold with client, server, shared, and web layers
- `fd_laptop` custom app registration and UI embedding
- Rich text note editor UI using Quill
- NUI callbacks for save, list, read, and delete note actions
- MySQL persistence for notes through `laptop_files`
- Per-laptop note ownership via laptop item metadata id
