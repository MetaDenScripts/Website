# MetaDen Restorations System


> Transform rusted-out scrap heaps into roaring machines. **metaden-restorations** is a deep, multi-stage vehicle restoration gameplay resource for FiveM servers — complete with scrap searching, part crafting, skill progression, a trader NPC, engine hoisting, tow-truck transport, an in-game admin panel, and a global leaderboard. Every wrench turn matters.


## Features

- **Multi-type wreck restorations** — cars, bikes, pickups, and vans each have their own material requirements and staged prop transitions.
- **Scrap searching** — interact with world wreck props to find parts or raw materials with configurable drop chances and per-player cooldowns.
- **Dependency-ordered restoration menu** — parts and materials unlock in logical order: engine before spark plugs, axles before suspension.
- **Weighted progress system** — raw materials count for 20% and parts for 80% of total completion (fully configurable).
- **Visual stage transitions** — the wreck prop swaps to a less-destroyed model as key milestones are hit (doors → glass → final covered vehicle).
- **Engine hoist workflow** — pick up a wreck with an `engine_hoist` item, carry it, and place it anywhere — position is persisted in the database.
- **Tow-truck transport** — use a flatbed or slam truck to haul wrecks between locations.
- **Part-repair crafting benches** — restore broken parts to 100% condition at pre-configured world zones using raw materials.
- **Trader NPC** — a world-placed ped lets players browse and purchase wrecks from the model pool for cash or bank.
- **Mission assignment** — the trader can randomly assign `metaden-skills` restoration missions to players.
- **Rare model pool** — admins can queue one-time vehicle models per wreck type; the next restoration of that type consumes the queued model before falling back to the random pool.
- **Multi-wreck ownership** — configurable per-player cap and per-role overrides so mechanics can hold more active wrecks than civilians.
- **Skill integration** (`metaden-skills`) — scrapping and engineering skill levels boost scrap-search rewards; reputation categories earn XP on material adds.
- **Item tool bonuses** — holding a wrench, screwdriver, angle grinder, etc. adds flat bonuses to scrap-search material yield.
- **Persistent ranking stats** — total wrecks restored, total resources contributed, and per-type (Car/Bike/Pickup/Van) breakdowns stored in MySQL.
- **Global leaderboard** — query overall or per-type rankings with configurable limits.
- **Discord webhook logging** — optional embed logs for completions and errors.
- **Expiration cleanup** — stale restorations older than `ExpirationDays` are deleted automatically on resource start.
- **In-game admin panel** (`/restoration_admin`) — full NUI panel with four management pages (Model Pool, Missions, Player Stats, Active Wrecks).
- **metabridge abstraction** — all framework and inventory calls go through `metabridge`; no hard QBX/ox_inventory references in gameplay code.

---

## Requirements

| Resource | Role |
|---|---|
| [`metabridge`](https://github.com/metaden/metabridge) | Free bridge for framework, inventory, UI, target, and zone abstraction |
| [`oxmysql`](https://github.com/overextended/oxmysql) | Async MySQL queries |
| [`metaden-skills`](https://github.com/metaden/metaden-skills) | Optional — skill bonuses, missions, reputation |

---

## Installation

### 1. Database

Run `database.sql` against your server database. It creates and migrates:

- `veh_restoration_wrecks`
- `veh_restoration_zones`
- `veh_restoration_model_pool`
- `veh_restoration_player_stats`
- `veh_restoration_player_type_stats`

### 2. Admin UI

Build the NUI assets before first use:

```bash
cd ui
npm install
npm run build
```

### 3. Load Order (`server.cfg`)

```
ensure oxmysql
ensure metabridge
ensure metaden-skills   # optional
ensure metaden-restorations
```

If you are using `ox_lib` and/or `ox_target` (recommended), ensure them **before** `metabridge`:

```
ensure oxmysql
ensure ox_lib
ensure ox_target
ensure metabridge
ensure metaden-skills   # optional
ensure metaden-restorations
```

### 4. ACE Permissions

Grant the admin ACE to staff groups so they can access the admin panel:

```
add_ace group.admin metaden.restoration.admin allow
```

---

## Configuration Reference

All options live in `config.lua` under the global `Config` table.

### General

| Key | Type | Default | Description |
|---|---|---|---|
| `ZoneRadius` | number | `20` | Sphere radius for client restoration streaming zones. |
| `Debug` | boolean | `false` | Enables extra client-side debug visuals and logging. |
| `WorkDuration` | number | `60000` | Default timed-action duration in milliseconds. |
| `MaxWrecksPerPlayer` | number | `1` | Global cap on simultaneous active restorations per player. |
| `MaxWrecksByRole` | table | `{}` | Per-job-role overrides, e.g. `mechanic = 3`. Keys are normalised to lowercase. |
| `ExpirationDays` | number | `0` | Deletes restorations older than N days on resource start. `0` disables cleanup. |

### Logging

```lua
Logging = {
    Discord = {
        Enabled = false,
        Webhook = '',   -- Discord webhook URL
    },
}
```

Sends embed messages to Discord when a restoration completes or errors.

### Reputation Awards

```lua
ReputationAwards = {
    Enabled    = true,
    Chance     = 30,      -- % chance to award rep per material add
    Amount     = 1,
    System     = 'skills',
    Categories = { 'education_engineering', 'scrapping' },
}
```

### Progress Weights

```lua
ProgressWeights = {
    RawMaterials = 0.20,  -- bulk materials contribute 20% of completion
    Parts        = 0.80,  -- parts contribute 80% of completion
}
```

### Vehicle Model Lists

| Key | Description |
|---|---|
| `CarModels` | Models used for random Car restorations |
| `BikeModels` | Models used for random Bike restorations |
| `PickupModels` | Models used for random Pickup restorations |
| `VanModels` | Models used for random Van restorations |
| `TowTruckModels` | Vehicle hashes that can transport wrecks (flatbed, slam truck) |

### Wreck Prop Lists

| Key | Description |
|---|---|
| `WreckedVehicles` | Prop hashes treated as interactable car wreck targets |
| `WreckedBikes` | Prop hashes treated as interactable bike wreck targets |
| `ScrapDoors` | Prop hashes for door scrap search targets |
| `ScrapExhaust` | Prop hashes for exhaust scrap search targets |
| `ScrapSeats` | Prop hashes for seat scrap search targets |
| `ScrapTires` | Prop hashes for tire scrap search targets |

### Hoist & Tow

| Key | Default | Description |
|---|---|---|
| `EngineHoistModel` | `prop_engine_hoist` | Prop model spawned for hoist interaction |
| `HoistCarryPlacement` | `pos/rot` | Hoist position/rotation when carried by the player |
| `HoistWreckPlacement` | `pos/rot` | Wreck attachment offset from hoist entity |
| `HoistReleasePlacement` | `pos/rot` | World offset used when dropping the wreck |
| `HoistReleaseNoCollisionMs` | `650` | Collision-disable window (ms) after release to prevent physics shoves |
| `HoistTargetDistance` | `2.5` | ox_target interaction distance for hoist actions |
| `FlatbedReleaseDistance` | `3.0` | ox_target interaction distance for flatbed release |

### Stage Transitions

`StageTransitions` maps from wreck type to milestone → prop swap rules. Each entry has:

| Field | Description |
|---|---|
| `stage` | Logical stage label (`doors`, `glass`, `last`) |
| `model` | New prop hash to swap to, or `'__current__'` to update progress without a visual swap |

Example (Car):
```lua
Car = {
    cardoor = { stage = 'doors', model = `prop_rub_carwreck_11` },
    glass   = { stage = 'glass', model = `prop_rub_carwreck_14` },
    tires   = { stage = 'last',  model = `imp_prop_covered_vehicle_03a` },
},
```

### Restoration Menu Sections (`MaterialMenuSectionsByType`)

Menu sections are resolved in this order:
1. `MaterialMenuSectionsByType[wreckType]` — e.g. `Car`, `Bike`, `Pickup`, `Van`
2. `MaterialMenuSectionsByType.Default`
3. Auto-generated fallback from required materials

Each section entry:

```lua
{
    id          = 'section_id',
    title       = 'Display Title',
    icon        = 'fa-solid fa-tools',
    definitions = {
        {
            material       = 'engine',      -- material key
            workType       = 'engine',      -- 'body' | 'engine' | 'under'
            checkInventory = true,          -- show inventory count in UI
            dependencies   = { 'engine' }, -- materials that must be completed first
            inventoryItem  = 'steel',       -- optional item name override for inventory check
        },
    },
}
```

### Required Materials Per Type

Each wreck type (`Car`, `Bike`, `Pickup`, `Van`) has a table defining exactly how many units of each raw material and each part are needed. Set any value to `0` to exclude that material/part from a type's restoration.

Example (partial Car):
```lua
Car = {
    glass = 2000, plastic = 4000, rubber = 6000,
    engine = 1, tires = 4, transmission = 1,
    -- ...
}
```

### Scrap Search

| Key | Default | Description |
|---|---|---|
| `MinAmount` | `1` | Minimum raw material units found per search |
| `MaxAmount` | `8` | Maximum raw material units found per search |
| `CarPartChance` | `2` | % chance of finding a part instead of materials |
| `SearchTimeout` | `60000` | Per-player cooldown between searches (ms) |

`ScrapSearchRewards` maps each scrap prop type (`vehicle`, `exhaust`, `seats`, `tires`, `door`) to a `parts` and `materials` list controlling what can drop.

### Search Reward Modifiers (`SearchRewardModifiers`)

Skill and item bonuses applied to scrap search results.

| Key | Description |
|---|---|
| `Resource` | Skills resource name (default: `metaden-skills`); if not running, skill bonus = 0 |
| `FlatBonus` | Fixed bonus added after skill contributions |
| `MaxBonus` | Maximum cap on the extra material amount |
| `Skills` | List of `{ name, multiplier }` entries; bonus = `level * multiplier` |
| `ItemBonuses` | Map of `itemName = bonus`; each item the player carries adds that bonus |

**Calculation flow:**

1. `itemModifier` = sum of bonuses for items the player has at quantity > 0
2. `skillModifier` = sum of `level(skill) * multiplier` for each skill entry
3. Part-find roll: `CarPartChance + itemModifier + skillModifier`
4. If part roll fails (material path):
   - `baseAmount = random(MinAmount, MaxAmount)`
   - `extra = min(itemModifier + skillModifier, MaxBonus)`
   - `finalAmount = floor(baseAmount + extra)`

### Part-Repair Crafting Benches (`MaterialsNeededForRenovateParts`)

Defines which raw materials (and how many) are consumed to repair a broken part at a crafting zone. One entry per part key:

```lua
engine = { steel = 20, aluminum = 20, carbon = 10, rubber = 5 }
```

### Crafting Zones

`CraftingZones` is a list of `vec4` + dimension entries. Players standing in these zones can interact with the part-repair bench. Pre-configured locations include LSC, Hayes Autos, Route 68, airport, PitStop, and Riley's.

```lua
{ coords = vec4(x, y, z, heading), w = 1.4, d = 2.2 }
```

### Trader NPC (`TraderPed`)

| Key | Type | Description |
|---|---|---|
| `Enabled` | boolean | Spawn the trader ped |
| `Model` | string | GTA ped model hash string |
| `Coords` | vec4 | World position + heading |
| `SpawnRadius` | number | `lib.point` distance at which the ped is tracked/spawned |
| `WreckDeliveryCoords` | vec4 | Where purchased wrecks are placed in the world |
| `Skills.Enabled` | boolean | Show "Request Mission" option when `metaden-skills` is running |
| `Skills.Missions` | table | Pool of mission IDs randomly assigned via the trader |

### Currency Map (`CurrencyMap`)

Controls how `currency` values stored in `veh_restoration_model_pool` are resolved at payment time.

```lua
CurrencyMap = {
    cash = { value = 'money', item = true  },  -- deducted via ox_inventory item removal
    bank = { value = 'bank',  item = false },   -- deducted via framework money account
}
```

- `value` — the actual money type or item name passed to balance/deduct functions.
- `item = true` — uses inventory item count and remove (wallet cash via ox_inventory).
- `item = false` — uses framework money account (bank balance).

### Admin Commands

| Key | Default | Description |
|---|---|---|
| `AdminModelCommand.Name` | `restoration_addmodel` | Chat command to add a queued rare model |
| `AdminModelCommand.AcePermission` | `metaden.restoration.admin` | Required ACE |
| `AdminUiCommand.Name` | `restoration_admin` | Chat command to open the NUI admin panel |
| `AdminUiCommand.AcePermission` | `metaden.restoration.admin` | Required ACE |

---


## Configuration Notes

`MaterialMenuSectionsByType` is the **only** section source for restoration menus.

Required shape:
- `Default = { ...sections }` — fallback for any type without an explicit override
- Optional type overrides: `Car`, `Bike`, `Pickup`, `Van` (leave empty `{}` to inherit Default)

Optional Skills Integration
---------------------------
Scrap-search rewards can use `metaden-skills` and inventory tools/items to increase both:
- chance to find a part
- amount of material found when a part is not found

Config path
- `Config.SearchRewardModifiers`

Fields
- `Resource`:
  - skills resource used for reads (default: `metaden-skills`)
  - if not started, skill modifier becomes `0`
- `Skills` (preferred):
  - list of skill entries used for bonus calculation
  - entry shape: `{ name = 'skill_key', multiplier = number }`
  - each entry contributes `level(skill) * multiplier`
  - supports multiple skills (for example `scrapping` + `education_engineering`)
- `FlatBonus`:
  - fixed value added after skill contributions
- `ItemBonuses`:
  - map of `itemName = bonus`
  - supports decimal bonuses (for example `0.25`, `0.5`, `1.0`)
  - each configured item adds bonus when player has at least one in inventory
  - intended for small tool boosts like wrench/screwdriver
- `MaxBonus`:
  - cap for extra materials only (does not clamp part-find chance directly)

Calculation flow
1. Compute `itemModifier` from `ItemBonuses`.
2. Compute `skillModifier` from `Skills`.
3. Part-find roll uses:
   - `CarPartChance + itemModifier + skillModifier`
4. If the roll fails (material reward path):
   - `baseAmount = random(MinAmount, MaxAmount)`
   - `extra = min(itemModifier + skillModifier, SearchRewardModifiers.MaxBonus)`
   - `finalAmount = floor(baseAmount + extra)`

Behavior guarantees
- `Skills` is the only skill-source config for search modifiers.
- If `Resource` is unavailable, skill contribution is `0` and only item/base values apply.
- No hard dependency on `noego-disassembling` is required.

Example tuning
- Conservative:
  - `scrapping` multiplier `0.8`
  - `education_engineering` multiplier `0.2`
  - small item bonuses (`0.25` to `0.75` each)
  - lower `MaxBonus` (`4`-`6`)
- Generous:
  - `scrapping` multiplier `1.0`
  - `education_engineering` multiplier `0.35`
  - stronger tool bonus for rare tools
  - higher `MaxBonus` (`8`)


Core Features
-------------
- Multiple active restorations per player using:
  - `MaxWrecksPerPlayer`
  - `MaxWrecksByRole`
- Weighted completion calculation:
  - raw materials contribute `20%` (configurable via `ProgressWeights.RawMaterials`)
  - parts contribute `80%` (configurable via `ProgressWeights.Parts`)
- Engine hoist workflow can hook a wreck with required `engine_hoist`, spawn a visible hoist prop, move the wreck, and persist the wreck position on release.
- Per-resource-start expiration cleanup using:
  - `ExpirationDays`
- Ownership is tracked by `ownerCitizenId` and unique wreck IDs.
- Wreck lookup uses normalized coordinate keys for stable matching after movement.
- Completion flow stores owned vehicle data through bridge vehicle APIs and then attempts world spawn.
- Material/part logic enforces dependency order and progress-gated completion.
- Optional rare model pool per wreck type:
  - admins can add one-time models
  - next restoration of that type consumes one queued model before fallback to `*Models` config lists
- Persistent ranking stats:
  - per-player total wrecks restored
  - per-player total resource units added
  - per-player, per-type (Car/Bike/Pickup/Van) breakdown for leaderboards
- Mission stat integration with `metaden-skills`:
  - publishes restoration activity counters usable in skill missions
  - supports search, material-add, and completion-by-type mission tracking

Admin UI
--------
An in-game admin panel is available via `/restoration_admin`. Requires ACE permission `metaden.restoration.admin`.

Build the UI before first use:
```
cd ui && npm install && npm run build
```

Pages:
- **Model Pool** — manage purchasable wrecks: add/remove entries with wreck type, vehicle model, price, and currency.
- **Missions** — assign a `metaden-skills` mission to a player by citizen ID.
- **Player Stats** — per-player lookup and global leaderboard showing character names, dual progress bars, and a by-type breakdown chart.
- **Active Wrecks** — monitor live wrecks, set map waypoints, and force-delete entries.

Admin Command
-------------
- Command: `/restoration_addmodel <car|bike|pickup|van> <modelName>`
- Permission: ACE `metaden.restoration.admin` (configurable in `Config.AdminModelCommand.AcePermission`)
- Behavior:
  - inserts model into `veh_restoration_model_pool`
  - model is unique per type while queued
  - model is consumed (deleted) when selected for a new restoration

Currency Map
------------
`Config.CurrencyMap` controls how the `currency` column in `veh_restoration_model_pool` is resolved at payment time:

```lua
CurrencyMap = {
    cash = { value = 'money', item = true  },  -- ox_inventory item
    bank = { value = 'bank',  item = false },   -- framework money account
}
```

- `value` — the actual money type or item name passed to balance/deduct functions.
- `item = true` — uses inventory item count and remove (for ox_inventory wallet cash).
- `item = false` — uses framework money account (for bank balance).


Inventory Integration
---------------------
This resource now routes inventory operations through `metabridge`:
- item count checks
- metadata display registration
- slot-aware metadata updates
- slot-targeted item removal
- item definition/weight lookups
- create-item metadata hook registration

No direct `exports.ox_inventory:*` calls are used in gameplay flow.

Database
--------
Use `database.sql` to create/update:
- `veh_restoration_wrecks`
- `veh_restoration_zones`
- `veh_restoration_model_pool`
- `veh_restoration_player_stats`
- `veh_restoration_player_type_stats`

Ranking Callbacks
-----------------
- `metaden-restoration:server:getPlayerRankingStats(targetCitizenId?)`
  - If `targetCitizenId` is omitted, returns caller stats.
  - Returns:
    - `summary` (total wrecks + total resources)
    - `byType` (per-type breakdown)
- `metaden-restoration:server:getRankingLeaderboard(wreckType?, limit?)`
  - `wreckType` optional (`car|bike|pickup|van`); omitted returns global leaderboard.
  - `limit` optional (defaults to 10, clamped 1-100).

Mission Stat Hooks (`metaden-skills`)
-------------------------------------
When `metaden-skills` is running, this resource increments mission stats:

- `restoration.search.total`
- `restoration.search.type.<scrapType>`
- `restoration.material.total`
- `restoration.material.<materialKey>`
- `restoration.restore.total`
- `restoration.restore.type.<car|bike|pickup|van>`

These map directly to `requiredStatsAndAmount` entries in `metaden-skills` mission definitions.

Schema includes:
- `ownerCitizenId`
- `wreckKeyNormalized`
- indexes for owner/key/updated timestamps

Load Order
----------
Ensure the resource starts after `metabridge`, and `oxmysql`.

