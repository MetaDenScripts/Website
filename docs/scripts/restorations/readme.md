# MetaDen Restorations System


> Transform rusted-out scrap heaps into roaring machines. **metaden-restorations** is a deep, multi-stage vehicle restoration gameplay resource for FiveM servers — complete with scrap searching, part crafting, skill progression, a trader NPC, engine hoisting, tow-truck transport, an in-game admin panel, and a global leaderboard. Every wrench turn matters.

---

## Features

- **Multi-type wreck restorations** — cars, bikes, pickups, and vans each have their own material requirements and staged prop transitions.
- **Scrap searching** — interact with world wreck props to find parts or raw materials with configurable drop chances and per-player cooldowns.
- **Dependency-ordered restoration menu** — parts and materials unlock in logical order: engine before spark plugs, axles before suspension.
- **Weighted progress system** — raw materials count for 20% and parts for 80% of total completion (fully configurable).
- **Pre-completion head start** — configurable percentage of required slots are randomly pre-filled when a wreck is created. Trader-bought wrecks start with more progress than world wrecks; the selection always mixes at least one raw material and one part.
- **Visual stage transitions** — the wreck prop swaps to a less-destroyed model as key milestones are hit (doors → glass → final covered vehicle).
- **Engine hoist workflow** — pick up a wreck with an `engine_hoist` item, carry it, and place it anywhere — position is persisted in the database.
- **Tow-truck transport** — use a flatbed or slam truck to haul wrecks between locations.
- **Part-repair crafting benches** — restore broken parts to 100% condition at pre-configured world zones using raw materials.
- **Trader NPC** — a world-placed ped lets players browse and purchase wrecks from the model pool for cash or bank.
- **Mission assignment** — the trader can randomly assign `metaden-skills` restoration missions to players. Missions the player already holds are skipped; if all configured missions are active the player is told so instead of receiving a duplicate.
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
| [`ox_lib`](https://github.com/overextended/ox_lib) | Required — callback system (`lib.callback`), progress bars, alert dialogs, zones |
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

`ox_lib` is a direct dependency and must be ensured before `metabridge`. If you also use `ox_target`, ensure it between `ox_lib` and `metabridge`:

```
ensure oxmysql
ensure ox_lib
ensure ox_target        # if used
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

### Pre-Completion

When a new wreck is created the server randomly pre-fills a subset of its required material/part slots, giving the player a head start. Each pre-filled slot receives a random amount between 1 and its required count (partial fill, not instant completion).

```lua
PreCompletion = {
    Enabled = true,
    -- Wrecks discovered and started in the open world (beginRestoration).
    WorldWreck  = { MinPercent = 0,  MaxPercent = 20 },
    -- Wrecks purchased from the trader (buyWreck).
    TraderWreck = { MinPercent = 20, MaxPercent = 50 },
}
```

| Field | Description |
|---|---|
| `Enabled` | Set to `false` to disable pre-completion entirely. |
| `WorldWreck.MinPercent` | Minimum % of required slots pre-filled for world wrecks. |
| `WorldWreck.MaxPercent` | Maximum % of required slots pre-filled for world wrecks. |
| `TraderWreck.MinPercent` | Minimum % of required slots pre-filled for trader wrecks. |
| `TraderWreck.MaxPercent` | Maximum % of required slots pre-filled for trader wrecks. |

**Notes:**
- A random integer percentage is picked in `[MinPercent, MaxPercent]` for each wreck individually.
- When enough slots are being pre-filled and both raw-material and part slots exist for the wreck type, the selection guarantees **at least one raw-material slot and at least one part slot**.
- Setting `MinPercent = MaxPercent = 0` for a type disables pre-filling for that wreck source without touching `Enabled`.

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
| `Skills.Enabled` | boolean | Show "Request Mission" options when `metaden-skills` is running |
| `Skills.Missions` | table | Pool of `{ id, title }` entries randomly assigned via the trader |

**Trader interactions:**

The trader ped exposes two ox_target actions:

1. **Browse Wrecks** — opens a context menu listing purchasable wrecks from the model pool. When `Skills.Enabled = true` and `metaden-skills` is started, a **Request Mission** shortcut is also shown at the top of this menu.
2. **Request Mission** — dedicated ped target option (also only shown when `Skills.Enabled = true` and `metaden-skills` is started).

**Mission assignment behaviour:**

- The server shuffles the `Skills.Missions` pool and selects the first mission the player does **not** already have active (checked against `metaden_player_missions` with `status = 'active'`).
- If the player already holds every configured mission, they receive a notification and no duplicate is assigned.
- The `Skills.Enabled` flag controls config-level visibility; actual runtime availability is always verified via `GetResourceState('metaden-skills')`.

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
