# Notepad Changelog

All notable changes to this project will be documented in this file.

## [0.0.1] - 2026-02-17

### First Steps

Initial project foundation for the Notepad app.

### Added

- Resource scaffold with client, server, shared, and web layers
- `fd_laptop` custom app registration and UI embedding
- Rich text note editor UI using Quill
- NUI callbacks for save, list, read, and delete note actions
- MySQL persistence for notes through `laptop_files`
- Per-laptop note ownership via laptop item metadata id

### Notes

- This is the very first changelog entry and baseline release.
- Version aligned with [fxmanifest.lua](fxmanifest.lua) as `0.0.1`.
