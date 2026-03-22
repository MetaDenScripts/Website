# MetaDen Restorations Changelog

All notable changes to this project are documented in this file.

## [0.4.5] - 2026-03-22

### Added
- **Admin "Move to me" action** (`server/admin.lua`, `client/admin.lua`, `client/restoration.lua`, `ui/src/pages/ActiveWrecksPage.tsx`):
  - New **Move** button on each row of the Active Wrecks admin page teleports a wreck to the admin's current position.
  - Server callback `metaden-restoration:admin:moveWreck` updates DB coordinates (wrecks + zones) and broadcasts the change.
  - New `metaden-restoration:client:RelocateWreck` event cleans up the old entity/zone and creates a fresh streaming zone at the new location.
- **Styled CSS tooltips on admin action buttons** (`ui/src/pages/ActiveWrecksPage.tsx`):
  - Replaced native `title` attributes with themed hover tooltips using Tailwind `group`/`group-hover` pattern.

### Changed
- **Crafting bench access logic** (`client/client.lua`, `server/server.lua`):
  - Empty or nil `JobWhitelist` now means unrestricted access (previously blocked everyone).
  - Server returns `-1` sentinel for scrapping level when `metaden-skills` is unavailable, allowing the client to skip the skill gate entirely.
- **Entity tracking sync on hoist movement** (`client/restoration.lua`):
  - `updateWreckLocation` now detects when `CreatePropIfNeeded` has replaced the entity handle and syncs `loadedWrecks`/`OwnedWrecks` tracking tables accordingly, deleting the old underground entity.

### Fixed
- **Hoist wreck not visible after placement** (`client/restoration.lua`):
  - Hoist move updated the entity position but never recreated the streaming zone; the wreck was invisible until relog. `RelocateWreck` now handles full zone lifecycle.
- **Wreck collision after hoist release** (`client/client.lua`):
  - Corrected `ReleaseWreckFromHoist` to apply `SetEntityCollision` before `FreezeEntityPosition` to prevent the prop falling through the ground.
- **`utils` nil global error** (`client/client.lua`):
  - Fixed case mismatch — `utils.materialNameToItemName` → `Utils.materialNameToItemName` (shared export uses capital `U`).
- **`buildLegacyWreckKey` nil in admin.lua** (`server/admin.lua`):
  - Added local copies of `normalizeCoord`, `buildLegacyWreckKey`, and `buildNormalizedWreckKey` since `admin.lua` loads alphabetically before `server.lua`.
- **Admin move wreck not spawning** (`client/restoration.lua`):
  - `RemoveWreck` deleted both entity and zone but nothing recreated them. Replaced with `RelocateWreck` which cleans up and creates a fresh streaming zone.
- **Duplicate wreck after hoist + admin move** (`client/restoration.lua`):
  - Fixed Lua type mismatch: NUI sends `wreckId` as string but `OwnedWrecks` stores numbers — `tonumber()` normalization added.
  - Removed if/else short-circuit that skipped `OwnedWrecks` sweep when `loadedWrecks` entry was found.

### Removed
- **`AdminModelCommand` config and `/restoration_addmodel` chat command** (`config.lua`, `server/server.lua`, `server/admin.lua`, `client/admin.lua`):
  - Fully superseded by the Model Pool page in the admin UI.

---

## [0.4.4] - 2026-03-06

### Added
- **Trader Store** (`config.lua`, `server/server.lua`, `server/admin.lua`, `client/trader.lua`, `client/admin.lua`, `ui/`):
  - New **Browse Store** target option on the trader ped — players can purchase parts and materials directly from the trader.
  - Store items are stored in a new `veh_restoration_store_items` database table.
  - Stock tracking with optional maximum stock and lazy restock: stock is topped up automatically the next time the store is opened (no background polling loop).
  - Optional `condition` metadata — if set, sold items receive a `Condition` metadata tag (e.g. `condition = 75` → `{ Condition = '75%' }`).
  - Seed items seeded on resource start from `Config.TraderPed.Store.Items` via `INSERT IGNORE` (item name is the unique key); all live values are managed in-game via the admin panel.
  - `Store.Enabled` config flag — set `false` to completely hide the target option.
  - Five new admin callbacks (`admin:getStoreItems`, `admin:addStoreItem`, `admin:updateStoreItem`, `admin:removeStoreItem`, `admin:restockStoreItem`) backed by the admin ACE check.
  - New **Store** page in the admin NUI panel: summary stats (total items, unlimited-stock count, out-of-stock count), paginated table with stock badges, and per-row edit / manual-restock / delete actions.
  - Migration SQL (`migrations/2026-03-06-store-items.sql`): `CREATE TABLE IF NOT EXISTS veh_restoration_store_items`.
- **Data migration SQL** (`migrations/2026-03-06-material-keys-item-names.sql`):
  - Converts legacy `veh_restoration_wrecks.state.materials` keys to new direct item-name keys.
  - Covers legacy keys including `seats`, `axle`, `tires`, `sparkPlugs`, `oilPump`, `driveShaft`, `cylinderHead`, `batteryCables`, `fuelTank`, and `metal`.

### Changed
- **Hard cutover to direct item-name material keys** (`config.lua`, `shared/utils.lua`, `server/*.lua`, `client/restoration.lua`):
  - Removed `MaterialToItemMap` indirection from restoration flow.
  - Material keys now directly match inventory item names (for example `tire`, `sparkplugs`, `axleparts`, `oil_pump`, `metalscrap`).
  - `ITEM_CONTRACT.Materials`, per-type requirement tables, stage transitions, and restoration section dependencies now use direct item keys.
- **Currency picker simplified in admin UI** (`ui/src/pages/ModelPoolPage.tsx`, `ui/src/pages/StorePage.tsx`):
  - Removed the hardcoded `Gold Coin (item)` preset from the currency selector.
  - The three options are now: **Cash**, **Bank**, and **Item…** (free-text input for any inventory item name).

### Breaking
- Servers upgrading from pre-`0.4.4` must run the migration SQL before going live if they want to preserve active restoration progress.

---

## [0.4.3] - 2026-03-06

### Added
- **Trader Tips & FAQ menu** (`shared/trader_tips.lua`, `client/trader.lua`):
  - Added a dedicated `Tips & FAQ` trader target option.
  - Added a config-backed FAQ source file (`shared/trader_tips.lua`) exposed as `Config.TraderPed.Tips`.
  - Tips are shown in a context menu and open into per-topic dialogs for readability.
  - Seeded with guidance for:
    - where to get an `engine_hoist`
    - how to grab/move wrecks (tow truck + hoist flows)
    - why adding materials can fail (missing item, unmet dependencies, item condition expectations)
- **Context-aware restoration blocker hints** (`client/restoration.lua`):
  - Material menu entries now show dynamic blocker hints (for example `Complete first: ...` or `Missing item: ...`).
  - Selecting a blocked material now explains the exact reason instead of failing with a generic message.

### Changed
- **Item setup discoverability and contract centralization** (`config.lua`, `shared/utils.lua`, `server/server.lua`, `README.md`):
  - Introduced `ITEM_CONTRACT` as the single naming contract for restoration materials/items.
  - `Config.Materials`, `Config.MaterialToItemMap`, and `Config.RawMaterials` now derive from that contract.
  - Added `Config.RequiredInventoryItems` and startup validation logging to detect config/inventory drift early.
  - Documented item setup entrypoint and compatibility mapping (`tires` material -> `tire` inventory item).
- **Flatbed release configuration surface** (`config.lua`, `README.md`):
  - Added tunables for flatbed drop behavior and occupancy checks:
    - `FlatbedDropDistanceBehind`
    - `FlatbedDropClearanceRadius`
    - `FlatbedDropCheckVehicles`
    - `FlatbedDropCheckObjects`

### Fixed
- **Missing restoration-related inventory items** (`inventory/ox_inventory.lua`):
  - Added missing `fiber` and `carbon` entries expected by config reward/crafting flows.
  - Removed orphaned `iron` from this resource inventory set.
- **Flatbed release false-positive blocking** (`client/client.lua`):
  - Removed unreliable native occupancy call path that produced blocked releases in clear spaces.
  - Reworked clearance checks to use deterministic nearby entity scans.
- **Flatbed drop spawning under/inside tow truck** (`client/client.lua`):
  - Drop position now uses a model-aware minimum behind-distance based on flatbed dimensions.
  - Uses entity-relative world offset placement so drop consistently resolves behind the bed.
- **Flatbed occupancy checks missing real collisions** (`client/client.lua`):
  - Clearance now uses entity footprint radius from model dimensions (not just entity origin point distance).
  - Object checks now evaluate all nearby objects instead of networked/mission-only filtering.

### Upgrade Notes
- **New config keys available**:
  - `FlatbedDropDistanceBehind`
  - `FlatbedDropClearanceRadius`
  - `FlatbedDropCheckVehicles`
  - `FlatbedDropCheckObjects`
- **Trader FAQ content now lives in** `shared/trader_tips.lua` and is read as `Config.TraderPed.Tips`.
- **Behavior change**: blocked restoration materials are now selectable to show precise guidance (dependencies/missing item) instead of silently appearing unavailable.
- **Behavior change**: flatbed release now enforces occupancy checks and uses a model-aware drop point behind the truck.
- **Recommended post-update check**: restart the resource and verify startup logs for item contract validation output.

---

## [0.4.2] - 2026-03-03

### Fixed
- **`CancelRestoration` wreck not deleted from world** (`client/restoration.lua`):
  - The entity reference passed from the ox_target `onSelect` closure became stale after the 15-second `alertDialog` + `progressBar` await chain. The function now resolves the authoritative entity from `loadedWrecks[wreckId]` first, falling back to the closure-captured handle only if the table entry is absent.
  - `loadedWrecks[wreckId]` was never set to `nil` after `DeleteEntity`, allowing zone re-entry to bypass the duplicate-spawn guard in `loadWreck` and recreate the prop. Now explicitly nilled.
  - `OwnedWrecks[entity]` was never cleared, leaving a dead handle that could allow zone re-entry to queue another `requestLoadWreck`. Now explicitly nilled.
  - `loadedZones[wreckId]` was removed via `:remove()` but not nilled, causing the `RemoveWreck` server event handler to call `:remove()` a second time on the already-dead zone object. Now nilled immediately after removal.
  - `restorationData` was not cleared after cancellation, leaving stale ownership/progress state visible in `SetupTargetOptions` and `calculateProgress`. Now reset to `{}`.
  - The server event was incorrectly referencing `restorationData.id` (outer upvalue, potentially stale at time of execution) instead of the `wreckId` parameter captured at call time.
- **`CancelRestoration` animation hung indefinitely** (`client/restoration.lua`):
  - The previous animation dict (`anim@melee@large_wpn@streamed@attack`) is a streamed dict that cannot be loaded in a normal `RequestAnimDict` loop. The `while not HasAnimDictLoaded do Wait(0) end` loop hung forever, blocking `TaskPlayAnim` and the `progressBar` call that follows, making the destroy flow appear completely unresponsive.
  - Replaced with `mini@repair` / `fixing_a_ped` (the same reliable dict used elsewhere in this file).
  - Added a 5-second timeout to the anim dict load loop, consistent with the model-loading pattern used throughout the file. `TaskPlayAnim` is now guarded on `HasAnimDictLoaded` so a timeout does not error.
- **Metabridge callback race condition** (`fxmanifest.lua`):
  - `@ox_lib/init.lua` and `ox_lib` dependency were removed in 0.4.0 as part of the full metabridge abstraction. However, without `lib` available in this resource's Lua state, `MetaBridgeClient.requestCallbackAwait` could not use the `lib.callback.await` fast path and fell through to `TriggerServerEvent('MetaBridge:invokeCallback', ...)`. Combined with the metabridge 1.0.4 fix (invokeCallback now silently returns on missing callbacks), callbacks now resolve correctly via the fallback path.
  - Restored `'@ox_lib/init.lua'` as the first entry in `shared_scripts` and `'ox_lib'` to `dependencies` so `lib.callback.await / lib.callback.register` are used on both the client and server, bypassing the bridge event bus entirely for all callbacks.

---

## [0.4.1] - 2026-03-03

### Added
- **Pre-completion system** (`config.lua`, `server/server.lua`):
  - When a new wreck is created, a random percentage of its required material/part slots are pre-filled with a random partial amount (between 1 and the required count for that slot).
  - Trader-purchased wrecks use a higher configured percentage range than world wrecks, so bought wrecks feel more complete from the start.
  - The slot selection always guarantees at least one raw-material slot **and** at least one part slot are included when enough slots are being pre-filled and both categories exist for the wreck type.
  - Configured via `Config.PreCompletion`:
    - `Enabled` — set to `false` to disable entirely.
    - `WorldWreck  = { MinPercent = 0,  MaxPercent = 20 }` — wrecks started in the open world.
    - `TraderWreck = { MinPercent = 20, MaxPercent = 50 }` — wrecks purchased from the trader.
  - New internal helper `generatePrecompletedState(wreckType, minPercent, maxPercent)` on the server (not exported).
- **Mission shortcut in Browse Wrecks menu** (`client/trader.lua`):
  - A **Request Mission** entry is injected at the top of the Browse Wrecks context menu so players can request a mission without needing a separate ped interaction.
  - Visibility is gated at menu-open time via `GetResourceState('metaden-skills') == 'started'` (in addition to `Config.TraderPed.Skills.Enabled`), so the option disappears automatically if the resource is not running.
- **Mission deduplication** (`server/server.lua`):
  - Before assigning a mission the server queries `metaden_player_missions` for all missions the player already has `active`.
  - The candidate pool is shuffled and the first mission the player does **not** already hold is selected.
  - If every configured mission is already active, the callback returns `{ success = false, reason = 'You already have all available missions active.' }` and the player is notified accordingly.

---

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
