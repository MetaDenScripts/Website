# MetaDen Skills Changelog

All notable changes to this project are documented in this file.

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
