# Outdoors Changelog

All notable changes to this project are documented in this file.

## [1.1.0] - 2026-02-22

### Added

- Data-driven searchable interactions via `Config.Lootables` (props + interaction + rewards in config).
- Weighted loot table support with per-lootable roll modes (`single`/`multi`) and roll counts.
- Per-lootable required-item modes: `check`, `consume_on_success`, `consume_on_attempt`.
- Optional per-lootable minigame export hook before reward submission.
- Player-selectable search animations with `/outdoorsanim <setName>`.
- Per-lootable animation defaults with optional player override control.
- Bonus reward pools configurable per lootable with independent chance and weighted table.

### Changed

- Material searching now resolves rewards server-side from `Config.Lootables` instead of hardcoded rock/wood logic.
- `metaden-outdoors:server:searchForMaterial` now accepts a lootable id/key and uses data-driven config.
- Legacy rock/wood config values remain supported through compatibility defaults.

## [1.0.0] - 2026-02-16

### Added

- Initial public release of `metaden-outdoors`.
- Campfire cooking with recipe requirements and configurable skill-gated progression.
- Material collection from rocks/wood with configurable reward pools and chances.
- River-aware bottle filling flow with nearby water detection heuristics.
- Animal gutting flows for snakes and lizards with configurable reward amounts.
- Camp interaction targets for sleeping bags, tents, bins, and yoga mats.
- Event-based nonce protection and server-side cooldown checks for sensitive actions.
- MetaBridge-based inventory/target/notify/callback integration.
- Optional MetaDen Skills integration for XP rewards and skill-based item amount bonuses.
- Direct native animation handling for interaction actions.
