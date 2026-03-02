# MetaDen Restorations Changelog

All notable changes to this project are documented in this file.

## [0.4.0] - 2026-02-27

### Added
- **Trader Ped** (`client/trader.lua`):
  - Spawns via a metabridge proximity point — only created when the player is within `Config.TraderPed.SpawnRadius` (default 30 m, actual spawn at 15 m).
  - Configured entirely in `Config.TraderPed` (model, coords, spawn radius, delivery coords, skills settings).
  - **Browse Wrecks** target option — opens a context menu of purchasable wrecks from the model pool with price display.
  - **Request Mission** target option — assigns a random restoration mission via `metaden-skills` (shown only when `Config.TraderPed.Skills.Enabled = true` and the resource is running).
- **Wreck purchase system** (`server/server.lua`):
  - New server callback `metaden-restoration:server:getWrecksForSale` — returns pool entries where `price > 0`.
  - New server callback `metaden-restoration:server:buyWreck` — validates limits, deducts payment, consumes the pool row, inserts the wreck/zone records, and fires `loadWreck` directly to the buyer.
  - Payment resolves through `Config.CurrencyMap` — supports ox_inventory items (e.g. `money`) and framework money accounts (e.g. `bank`) configured per currency label.
  - Initial wreck prop is derived from `wreckType` at purchase time, not from the vehicle model name.
- **Mission assignment callback** (`metaden-restoration:server:requestRestorationMission`) — picks randomly from `Config.TraderPed.Skills.Missions` and calls `exports['metaden-skills']:AssignMissionToPlayer`.
- **Admin NUI panel** (`client/admin.lua`, `server/admin.lua`, `ui/`):
  - **Model Pool page** — view, add, and remove entries from `veh_restoration_model_pool` with wreck type, model, price, and currency fields.
  - **Missions page** — assign a `metaden-skills` mission to any player by citizen ID.
  - **Player Stats page** — per-player lookup and global leaderboard with dual animated progress bars (wrecks + resources), by-type bar chart, and character name display.
  - **Active Wrecks page** — view all live wrecks with restoration progress, set waypoint to any wreck, and force-delete wrecks.
  - Leaderboard rows show character first and last name (resolved via `players.charinfo`) alongside citizen ID.
  - Rank colouring: gold `#1`, silver `#2`, bronze `#3`.
  - Themed to MetaDen brand: cyan `#00d4ff`, purple `#7c5cff`, pink `#ff4fd8`.

### Changed
- **Full metabridge abstraction** — `ox_lib` and `ox_target` are no longer hard dependencies of this resource. Every previously direct `lib.*` and `exports.ox_target:*` call now goes through `MetaBridgeClient.*`:
  - Progress bars, context menus, and alert dialogs → `MetaBridgeClient.progressBar / registerContext / showContext / alertDialog`.
  - Entity targets (local entity add/remove, model add/remove, box zones) → `MetaBridgeClient.addTargetLocalEntity / removeTargetLocalEntity / addTargetModel / removeTargetModel / addTargetBoxZone`.
  - Proximity sphere zones (wreck streaming) → `MetaBridgeClient.addZoneSphere`.
  - Proximity points (trader ped spawn) → `MetaBridgeClient.addPoint`.
  - Model loading in trader ped spawn → `MetaBridgeClient.requestModel`.
- `fxmanifest.lua` updated: `@ox_lib/init.lua` removed from `shared_scripts`; `ox_lib` and `ox_target` removed from `dependencies`. Only `metabridge` (and `oxmysql`) remain as explicit dependencies.
- `Config.CurrencyMap` introduced — maps currency labels used in the model pool to the actual framework money type and whether it is an inventory item:
  - `cash = { value = 'money', item = true }` — routes to ox_inventory `money` item balance.
  - `bank = { value = 'bank', item = false }` — routes to framework bank account.
- `WreckedBikes` pool cleaned up — removed `bkr_int_01_bike` (interior mesh, not a valid world prop). Only `prop_rub_bike_03` is valid for spawnable bike wrecks.
- Admin callbacks enforce ACE checks server-side only; `IsPlayerAceAllowed` is no longer called from the client.

### Database
- `veh_restoration_model_pool` — added `price INT UNSIGNED DEFAULT 0` and `currency VARCHAR(50) DEFAULT 'cash'` columns.
- Added index `idx_veh_restoration_model_pool_price`.
- `admin:getPlayerStats` and `admin:getAllPlayerStats` now JOIN `players` on `citizenid` to return `firstName` and `lastName` from `charinfo`.

---

## [0.3.0] - 2026-02-23

### Added
- Weighted progress configuration via `Config.ProgressWeights`:
  - raw materials contribution (default `20%`)
  - parts contribution (default `80%`)
- Admin rare-model injection command:
  - `/restoration_addmodel <car|bike|pickup|van> <modelName>`
  - ACE permission configurable via `Config.AdminModelCommand.AcePermission`.
- Consumable rare-model queue table: `veh_restoration_model_pool`.
- Persistent restoration ranking tables:
  - `veh_restoration_player_stats`
  - `veh_restoration_player_type_stats`.
- Ranking callbacks:
  - `metaden-restoration:server:getPlayerRankingStats(targetCitizenId?)`
  - `metaden-restoration:server:getRankingLeaderboard(wreckType?, limit?)`.
- Mission stat publishing hooks for `metaden-skills` integration:
  - search totals/by type
  - materials added totals/by key
  - restoration completions totals/by type.

### Changed
- Server-side progress calculation now uses weighted group progress instead of pure amount totals.
- Client-side displayed progress now matches the server weighted calculation.
- New restorations now consume a queued rare model first (if available), then fallback to config model lists.

### Database
- Added `veh_restoration_model_pool` table and index.
- Added `veh_restoration_player_stats` and `veh_restoration_player_type_stats` tables with leaderboard indexes.

## [0.2.0] - 2026-02-21

### Added
- Configurable active restoration limits:
  - `MaxWrecksPerPlayer`
  - `MaxWrecksByRole`
- Restoration expiration cleanup on resource start via `ExpirationDays`.
- Multi-wreck ownership model with `ownerCitizenId` and unique wreck IDs.
- Normalized wreck key tracking (`wreckKeyNormalized`) to stabilize moved-wreck lookups.
- Config-driven restoration sections with `MaterialMenuSectionsByType` (`Default`, `Car`, `Bike`, `Pickup`, `Van`).

### Changed
- Removed direct framework coupling from restorations flow and aligned player/job/identifier handling to bridge APIs.
- Removed direct inventory coupling from restorations flow and migrated item checks/removals/metadata handling through bridge methods.
- Completion flow now uses bridge vehicle ownership/spawn APIs.
- Wreck ownership checks now validate against `ownerCitizenId` and wreck ID references.

### Database
- Added/used `ownerCitizenId` on `veh_restoration_wrecks`.
- Added/used `wreckKeyNormalized` on `veh_restoration_wrecks`.
- Added owner/key/timestamp indexes for restoration lookup and cleanup performance.
- Updated zone relation/indexing to use wreck IDs consistently.

### Breaking
- `MaterialMenuSections` is replaced by `MaterialMenuSectionsByType`.
- Existing configs must be updated to the new menu section format.
- This release assumes bridge-based inventory methods are available for active inventory adapter.
