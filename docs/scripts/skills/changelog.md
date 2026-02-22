# MetaDen Skills Changelog

All notable changes to this project are documented in this file.

## [1.1.1] - 2026-02-22

### Changed

- XP admin command now enforces `Config.AdminCommand.Ace` at runtime in addition to restricted command ACE checks.
- README permission examples updated to include both `command.skillexp` and `metaden-skills.admin` grants.
- Reworked README structure for operators and developers (setup, config map, troubleshooting).
- Expanded API reference to include all public exports, events, RPC handlers, and NUI callbacks.
- Removed NPWD references from documentation and standardized integration guidance to lb-phone + standalone command modes.
- Added permission caveat documentation for command ACE behavior (`command.<name>` restricted command semantics).

## [1.1.0] - 2026-02-16

### Added

- New milestone app for lb phone and command access to see levels, missions and reputation.
- Persistent mission assignment storage in `metaden_player_missions`.
- Mission assignment server exports: `SetMissionForPlayer` and `AssignMissionToPlayer`.
- Mission assignment server event: `metaden-skills:server:SetMissionForPlayer`.
- Configurable admin mission assignment command via `Config.MissionSystem.AdminAssignCommandName` (default: `missionassign`).

### Changed

- Task list callback now returns only active assigned missions for each player.
- Mission completion now validates active assignment and persists completion status in DB.
- Milestones UI mission refresh flow now updates on app open and manual refresh (background polling removed).

## [1.0.0] - 2026-02-16

### Added

- Initial public release of `metaden-skills`.
- Character-based skill XP storage using MetaBridge identifier resolution.
- Configurable skills list and level thresholds.
- Server-authoritative XP API via exports (`AddExperience`, `RemoveExperience`, `SetExperience`, `GetExperience`, `GetTotalExperience`, `GetAllReputation`, `GetPlayerLevel`).
- Nonce-protected client request flow for skill reads.
- Admin command for add/remove/set XP.
- Database schema auto-creation on startup.
- Debounced XP persistence queue with periodic flush and flush on resource stop.
- Configurable DB-to-cache synchronization safeguards (`Config.DatabaseSync`) for SQL/manual edit consistency.
