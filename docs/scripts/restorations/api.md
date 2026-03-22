# MetaDen Restorations API Reference

### Server Callbacks

All callbacks are registered via `MetaBridge.registerCallback` and invoked from the client with `MetaBridgeClient.requestCallbackAwait`.

---

#### `metaden-restoration:server:getPlayerRankingStats`

Returns ranking stats for a player.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| `targetCitizenId` | string | No | Target citizen ID. Omit to return the caller's own stats. |

**Returns**

```lua
{
    summary = { citizenId, totalWrecksRestored, totalResourcesAdded, updatedAt },
    byType  = { { wreckType, totalWrecksRestored, totalResourcesAdded }, ... },
}
```

---

#### `metaden-restoration:server:getRankingLeaderboard`

Returns a ranked leaderboard.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| `wreckType` | string | No | Filter by type (`car`, `bike`, `pickup`, `van`). Omit for global. |
| `limit` | number | No | Number of entries (default `10`, clamped 1–100). |

**Returns** — array of player stat rows ordered by total wrecks restored descending.

---

#### `metaden-restoration:server:getWrecksForSale`

Returns all model-pool entries currently available for purchase (price > 0).

**Returns**

```lua
{ { id, wreckType, model, price, currency }, ... }
```

---

#### `metaden-restoration:server:buyWreck`

Purchases a wreck from the model pool, deducts payment, and delivers the prop to `TraderPed.WreckDeliveryCoords`.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `poolId` | number | Row ID from `veh_restoration_model_pool` |

**Returns**

```lua
{ success = boolean, reason = string? }
```

---

#### `metaden-restoration:server:requestRestorationMission`

Assigns a random restoration mission from `TraderPed.Skills.Missions` to the requesting player via `metaden-skills`.

**Returns**

```lua
{ success = boolean, missionId = string?, missionTitle = string?, reason = string? }
```

---

#### `metaden-restoration:server:hasRestorationInProgress`

Returns `true` if the player has already reached their active wreck limit.

**Returns** — `boolean`

---

#### `metaden-restoration:server:beginRestoration`

Registers a new wreck restoration for the calling player. Called automatically when a player interacts with a wreck prop.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `wreckType` | string | `Car` \| `Bike` \| `Pickup` \| `Van` |
| `wreckName` | string | Prop model name of the wreck entity |
| `coords` | table | `{ x, y, z }` world position |
| `rotation` | table | `{ pitch, roll, yaw }` |

**Returns** — full wreck data table, or `{ error = 'limit_reached', current, max }` if capped.

---

#### `metaden-restoration:server:addMaterialToWreck`

Adds a material or part from the player's inventory to a wreck. Enforces condition requirements for parts (Condition = 100%), updates progress, and triggers stage-transition prop swaps.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `material` | string | Inventory item name |
| `wreckId` | string | Target wreck ID |

**Returns** — updated wreck record, or `false` on failure.

---

#### `metaden-restoration:server:completeRestoration`

Finalises a fully completed restoration. Creates the owned vehicle record, spawns it in the world, grants keys to the player, and deletes the wreck from the database.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `coords` | table | (unused, resolved from DB) |
| `wreckId` | string | Target wreck ID |

**Returns**

```lua
{ success = boolean, spawned = boolean, plate = string? }
```

---

#### `metaden-restoration:server:getRestorationData`

Fetches a wreck record by lookup key.

**Parameters**

| Name | Type | Description |
|---|---|---|
| `lookup` | table\|string | `{ id }`, `{ wreckKey, wreckKeyNormalized }`, or raw wreck key string |

**Returns** — decoded wreck record, or `nil`.

---

#### `metaden-restoration:server:getRestorationZones`

Returns all zone records from `veh_restoration_zones`. Used by the client on resource start to register sphere zones.

**Returns** — array of zone rows `{ id, x, y, z, wreckId }`.

---

### Admin Callbacks

All admin callbacks require ACE permission `metaden.restoration.admin`.

| Callback | Parameters | Description |
|---|---|---|
| `metaden-restoration:admin:getModelPool` | — | Returns all `veh_restoration_model_pool` entries. |
| `metaden-restoration:admin:addToModelPool` | `{ wreckType, model, price, currency }` | Inserts a new model into the pool (upserts on duplicate). |
| `metaden-restoration:admin:removeFromModelPool` | `{ id }` | Removes an entry by its row ID. |
| `metaden-restoration:admin:getAllActiveWrecks` | — | Returns all live wrecks with owner, type, state, and coordinates. |
| `metaden-restoration:admin:forceDeleteWreck` | `{ id }` | Force-deletes a wreck and its zone record. |
| `metaden-restoration:admin:getPlayerStats` | `{ citizenId }` | Returns ranking stats for a specific citizen ID. |
| `metaden-restoration:admin:getLeaderboard` | — | Returns the global leaderboard. |
| `metaden-restoration:admin:assignMission` | `{ citizenId, missionId }` | Assigns a specific mission to a player. |
| `metaden-restoration:admin:getStoreItems` | — | Returns all `veh_restoration_store_items` rows (runs lazy restock first). |
| `metaden-restoration:admin:addStoreItem` | `{ item, label, price, currency, condition, stock, restockAmount, restockInterval }` | Inserts a new store item. |
| `metaden-restoration:admin:updateStoreItem` | `{ id, label, price, currency, condition, maxStock, restockAmount, restockInterval }` | Updates an existing store item. |
| `metaden-restoration:admin:removeStoreItem` | `{ id }` | Deletes a store item by row ID. |
| `metaden-restoration:admin:restockStoreItem` | `{ id }` | Manually restocks a single item to its `maxStock` value. |
| `metaden-restoration:admin:moveWreck` | `{ wreckId }` | Moves a wreck to the admin's current position, updating DB and broadcasting to all clients. |

---

### Server Events

| Event | Direction | Description |
|---|---|---|
| `metaden-restoration:server:requestLoadWreck` | Client → Server | Requests the full wreck record for a given zone ID; server triggers `loadWreck` back. |
| `metaden-restoration:server:cancelRestoration` | Client → Server | Deletes a wreck and its zone record (owner-only). |
| `metaden-restoration:server:updateWreckLocation` | Client → Server | Persists a new wreck position after hoist/tow movement (owner-only). |
| `metaden-restoration:server:searchScrap` | Client → Server | Processes a scrap-search action; awards parts or materials. |
| `metaden-restoration:server:getEngineHoist` | Client → Server | Gives the player one `engine_hoist` item if they have space. |
| `metaden-restoration:server:restorePart` | Client → Server | Repairs a broken part at a crafting bench, consuming raw materials. |

### Client Events

| Event | Direction | Description |
|---|---|---|
| `metaden-restoration:client:loadWreck` | Server → Client | Fires after a wreck is created or purchased; client spawns the prop and registers zones. |
| `metaden-restoration:client:RemoveWreck` | Server → Client (broadcast) | Instructs all clients to delete a completed/cancelled wreck entity and zone. |
| `metaden-restoration:client:RelocateWreck` | Server → Client (broadcast) | Cleans up the old entity/zone and creates a fresh streaming zone at new coordinates (used by admin move). |

---

## Admin UI

Open with `/restoration_admin`. Requires ACE `metaden.restoration.admin`.

> **Build required before first use:** `cd ui && npm install && npm run build`

| Page | Description |
|---|---|
| **Model Pool** | Add or remove purchasable wreck entries with type, model, price, and currency. |
| **Store** | Manage trader store items: add, edit, delete, manually restock, and monitor stock levels. |
| **Missions** | Assign a `metaden-skills` mission to any player by citizen ID. |
| **Player Stats** | Per-player lookup and global leaderboard with character names, dual progress bars, and a by-type breakdown chart. |
| **Active Wrecks** | Monitor all live wrecks, set a map waypoint to their location, move a wreck to the admin's position, or force-delete entries. |

---

## Skills Integration (`metaden-skills`)

### Mission Stat Hooks

When `metaden-skills` is running, this resource automatically increments the following mission stat counters:

| Stat Key | Trigger |
|---|---|
| `restoration.search.total` | Any scrap search |
| `restoration.search.type.<scrapType>` | Search on a specific prop type (e.g. `vehicle`, `door`) |
| `restoration.material.total` | Any material or part added to a wreck |
| `restoration.material.<materialKey>` | Specific material added (e.g. `restoration.material.engine`) |
| `restoration.restore.total` | Any restoration completed |
| `restoration.restore.type.<car\|bike\|pickup\|van>` | Restoration completed by type |

Use these as `requiredStatsAndAmount` entries in `metaden-skills` mission definitions.

### Search Reward Tuning Examples

**Conservative**
```lua
Skills      = { { name = 'scrapping', multiplier = 0.8 }, { name = 'education_engineering', multiplier = 0.2 } },
ItemBonuses = { WEAPON_WRENCH = 0.25, anglegrinder = 0.75 },
MaxBonus    = 4,
```

**Generous**
```lua
Skills      = { { name = 'scrapping', multiplier = 1.0 }, { name = 'education_engineering', multiplier = 0.35 } },
ItemBonuses = { WEAPON_WRENCH = 1, anglegrinder = 5 },
MaxBonus    = 8,
```

---

## Database Schema

### `veh_restoration_wrecks`

| Column | Type | Description |
|---|---|---|
| `id` | VARCHAR(255) PK | Unique wreck ID (`citizenId:timestamp:random`) |
| `ownerCitizenId` | VARCHAR(255) | Owning player's citizen ID |
| `model` | VARCHAR(255) | Target vehicle model to restore towards |
| `wreckType` | VARCHAR(50) | `Car` \| `Bike` \| `Pickup` \| `Van` |
| `wreckProp` | VARCHAR(50) | Current prop model displayed in world |
| `wreckKey` | VARCHAR(250) | Raw coord string key (legacy) |
| `wreckKeyNormalized` | VARCHAR(255) | Rounded coord key for stable post-move lookups |
| `location` | JSON | World position `{ x, y, z }` |
| `rotation` | JSON | World rotation `{ pitch, roll, yaw }` |
| `state` | JSON | Material/part progress state + overall `progress` percentage |
| `createdAt` | TIMESTAMP | Record creation time |
| `updatedAt` | TIMESTAMP | Auto-updated on any change |

### `veh_restoration_zones`

| Column | Type | Description |
|---|---|---|
| `id` | VARCHAR(255) PK | Zone ID (matches wreck ID) |
| `x, y, z` | FLOAT | Zone world position |
| `wreckId` | VARCHAR(255) FK | References `veh_restoration_wrecks.id` |
| `createdAt` | TIMESTAMP | Creation time |
| `updatedAt` | TIMESTAMP | Auto-updated on change |

### `veh_restoration_model_pool`

| Column | Type | Description |
|---|---|---|
| `id` | INT UNSIGNED AI PK | Auto-increment row ID |
| `wreckType` | VARCHAR(50) | `Car` \| `Bike` \| `Pickup` \| `Van` |
| `model` | VARCHAR(255) | Vehicle model name |
| `price` | INT | Purchase price (0 = not for sale) |
| `currency` | VARCHAR(50) | Currency key resolved via `CurrencyMap` |
| `createdBy` | VARCHAR(255) | Citizen ID or `'console'` of the admin who added the entry |
| `createdAt` | TIMESTAMP | Insertion time |

### `veh_restoration_player_stats`

Per-player aggregate totals.

| Column | Description |
|---|---|
| `citizenId` | PK — player citizen ID |
| `totalWrecksRestored` | Cumulative wrecks completed |
| `totalResourcesAdded` | Cumulative material units contributed |
| `updatedAt` | Last stat update time |

### `veh_restoration_player_type_stats`

Per-player, per-type breakdown used for leaderboards and profile charts.

| Column | Description |
|---|---|
| `citizenId` + `wreckType` | Composite PK |
| `totalWrecksRestored` | Wrecks completed for this type |
| `totalResourcesAdded` | Resources contributed for this type |
| `updatedAt` | Last stat update time |

### `veh_restoration_store_items`

Trader store inventory. Seeded from `Config.TraderPed.Store.Items` on resource start.

| Column | Type | Description |
|---|---|---|
| `id` | INT UNSIGNED AI PK | Auto-increment row ID |
| `item` | VARCHAR(255) UNIQUE | Inventory item name (unique — seed uses `INSERT IGNORE`) |
| `label` | VARCHAR(255) | Display name shown to players |
| `price` | INT UNSIGNED | Cost per unit |
| `currency` | VARCHAR(50) | `cash`, `bank`, or any item name, resolved via `CurrencyMap` |
| `condition` | TINYINT UNSIGNED NULL | If set (0–100), sold item receives `{ Condition = 'N%' }` metadata |
| `maxStock` | INT | Maximum stock count; `-1` = unlimited |
| `currentStock` | INT | Units currently available |
| `restockAmount` | INT UNSIGNED | Units added per restock cycle (`0` = auto-restock disabled) |
| `restockInterval` | INT UNSIGNED | Seconds between auto-restock cycles (`0` = disabled) |
| `lastRestockAt` | TIMESTAMP NULL | Timestamp of the last restock; `NULL` while never restocked |
| `createdBy` | VARCHAR(255) | Citizen ID or `'seed'` / `'console'` of the creator |
| `createdAt` | TIMESTAMP | Insertion time |

**Restock behaviour:** Stock is replenished lazily — the `UPDATE` runs once when the store is opened, topping up every overdue interval in a single SQL statement. No background polling loop runs.

---

## Inventory Integration

All inventory operations are routed through `metabridge`:

- Item count checks
- Metadata display registration
- Slot-aware metadata updates
- Slot-targeted item removal (for condition-based parts)
- Item definition and weight lookups
- Create-item metadata hook registration (auto-sets `Condition = "100%"` on new parts)

No direct `exports.ox_inventory:*` calls are used in gameplay code.
