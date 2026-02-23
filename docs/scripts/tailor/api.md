# MetaDen Tailor API Reference


### Type Notes

- `source` / `playerId`: server ID (`number`).
- `citizenId` / identifier: unique persistent player ID (`string`).
- `vector3`/`vector4`: FiveM vectors, but many callbacks also return plain `{x,y,z,w}` tables.
- Callback signatures below are shown from **consumer callsite** perspective; `source` is provided internally by metabridge.

### Client Exports

| Export | Signature | Returns | Side effects |
|---|---|---|---|
| `ToggleClothing` | `ToggleClothing(a?: string|table, b?: string|table, c?: string|table)` | `boolean` | Equips/unequips recipe clothing; stores/restores previous ped components/props; sends notify. |
| `EquipClothing` | `EquipClothing(itemName: string)` | `boolean` | Applies configured clothing variants for `itemName`; sends notify. |
| `UnequipClothing` | `UnequipClothing(itemName: string)` | `boolean` | Restores previously stored ped appearance for `itemName`; sends notify. |
| `GetCraftAmount` | `GetCraftAmount()` | `integer` | Read-only; current local craft amount (`1..50`). |

`ToggleClothing` resolves item name from several payload shapes (direct name, `item`, `itemName`, `item_name`, nested `data.name`, `metadata.name`), including ox-style item use payloads.

### Server Exports

| Export | Signature | Returns | Side effects |
|---|---|---|---|
| `GetExperienceData` | `GetExperienceData(source: number)` | `{ level: number, experience: number, experienceToNextLevel: number }` | Reads/creates `tailorjob` row for player identifier. |
| `GetActiveDeliveryMission` | `GetActiveDeliveryMission(sourceOrIdentifier: number|string)` | `DeliveryMission|nil` | Reads mission data and computes progress from live inventory when `source` is provided. |

`DeliveryMission` shape:

```lua
---@class DeliveryMission
---@field item string
---@field itemName string
---@field amount number
---@field progress number
---@field reward number
---@field payment number
---@field location { x:number, y:number, z:number, w:number }
```

### Metabridge Callbacks

| Callback | Signature (consumer callsite) | Returns | Notes |
|---|---|---|---|
| `tailor:server:getPlayerExperience` | `requestCallbackAwait('tailor:server:getPlayerExperience')` | `{ level:number, experience:number, experienceToNextLevel:number }` | Mirrors `GetExperienceData`. |
| `tailor:server:ensurePlayerCanCraft` | `requestCallbackAwait('tailor:server:ensurePlayerCanCraft', item:string, itemType:string, quantity:number)` | `boolean` | Validates recipe, inventory weight/slot, and required item counts. |
| `tailor:server:getPlayerJob` | `requestCallbackAwait('tailor:server:getPlayerJob')` | `string|nil` | Returns job name/type depending on bridge player object. |
| `tailor:server:giveOrderItems` | `requestCallbackAwait('tailor:server:giveOrderItems')` | `boolean` | Attempts to hand all ordered materials; may partially deliver and return `false`. |
| `tailor:server:chargeForOrder` | `requestCallbackAwait('tailor:server:chargeForOrder', cost:number, order:table<string,number>, location:vector4|table)` | `boolean` | Removes bank money and inserts `tailorjob_order`. |
| `tailor:server:completeOrder` | `requestCallbackAwait('tailor:server:completeOrder', order:string)` | `boolean` | Deletes order row by `id` + `orderDetails`; legacy/rarely used path. |
| `tailor:server:getPlayerOrders` | `requestCallbackAwait('tailor:server:getPlayerOrders')` | `table|nil` | Returns DB row + decoded `orderDetails` and normalized `location`. |
| `tailor:server:getDeliveryOrder` | `requestCallbackAwait('tailor:server:getDeliveryOrder')` | `table|nil` | Returns active mission row + `location = {x,y,z}`. |
| `tailor:server:requestDeliveryOrder` | `requestCallbackAwait('tailor:server:requestDeliveryOrder')` | `table|nil` | Creates new delivery mission if available for player level. |
| `tailor:server:deliverOrder` | `requestCallbackAwait('tailor:server:deliverOrder')` | `boolean|nil` | Validates location/items, rewards payout, deletes mission, adds XP/reputation. |

### Client Events

| Event | Signature | Purpose |
|---|---|---|
| `tailor:client:openLaptopMenu` | `()` | Open laptop station flow. |
| `tailor:client:openOrderMaterialsMenu` | `()` | Open order-materials flow (implemented in laptop client). |
| `tailor:client:openDeliverOrderMenu` | `()` | Open active delivery flow UI (implemented in laptop client). |
| `tailor:client:openTailorMenu` | `()` | Open tailoring recipe menu/station. |
| `tailor:client:openCraftingMenu` | `()` | Open materials crafting station. |
| `tailor:client:craftItem` | `(data: { item:string, type:string, duration:number, title:string, amount?:number })` | Trigger craft progress and server craft event. |
| `tailor:client:selectCraftingAmount` | `(data: { previousMenu:string })` | Opens amount input dialog (`1..50`). |
| `tailor:client:setCraftAmount` | `(value:number|string)` | Sets local craft amount (clamped to `1..50`). |
| `tailor:client:submitOrderMaterials` | `(order:table<string,number>)` | Submit material order payload (laptop client). |
| `tailor:client:resumeOrderMaterials` | `()` | Resume existing material order flow. |
| `tailor:client:requestDeliveryOrderUi` | `()` | Request delivery order from UI flow. |
| `tailor:client:startDeliveryOrderUi` | `()` | Begin active delivery route. |
| `tailor:client:cancelDeliveryOrderUi` | `()` | Cancel active delivery route/UI state. |
| `tailor:ui:openStation` | `(station: 'laptop'|'sewing'|'materials'|string)` | Open custom NUI station panel. |

### Server Events

| Event | Signature | Side effects |
|---|---|---|
| `tailor:server:startCrafting` | `(item:string, itemType:string, quantity:number)` | Removes required inputs, adds crafted output, grants XP. |
| `tailor:server:restoreSeat` | `(playerId:number)` | Restores `seat` metadata condition, consumes fixed materials. |
| `tailor:server:becomeTailor` | `()` | Assigns tailor job and initializes job reputation metadata. |
| `tailor:server:cancelOrder` | `()` | Deletes active `tailorjob_missions` row for source player. |

### Client Commands

Enabled only when `Config.EnableClothingCommands ~= false`.

| Command | Signature | Description |
|---|---|---|
| `/tailor_toggle_cloth` | `/tailor_toggle_cloth <item_name>` | Calls clothing toggle flow for an item name. |
| `/tailor_dump` | `/tailor_dump` | Prints current ped component/prop values to client console. |
| `/tailor_capture_cloth` | `/tailor_capture_cloth <item_name>` | Prints copy/paste-ready `clothing = { ... }` snippet from current ped state. |

## Data Model

### `tailorjob`

- Primary key: `id` (`citizenId` / identifier).
- Progress fields: `level`, `experience`, `unlockedCounterfeit`.
- Created automatically on first XP access when missing.

### `tailorjob_order`

- One active order row per player (`id` as PK).
- Stores ordered material payload JSON in `orderDetails`.
- Stores pickup coordinates in `orderCoordX/Y/Z/W`.

### `tailorjob_missions`

- One active mission row per player (`id` as PK).
- Stores mission item, amount, reward/payment, and destination coordinates.

## Integration Examples

### Use item with ox_inventory export

```lua
-- item definition example
client = {
  export = 'metaden-tailor.ToggleClothing'
}

-- direct invocation example
local ok = exports['metaden-tailor']:ToggleClothing('basic_shirt')
```

### Craft validation + server craft

```lua
local Bridge = exports['metabridge']

local canCraft = Bridge:requestCallbackAwait('tailor:server:ensurePlayerCanCraft', 'basic_shirt', 'Tops', 1)
if canCraft then
    TriggerServerEvent('tailor:server:startCrafting', 'basic_shirt', 'Tops', 1)
end
```

### Delivery payment event templating

```lua
Config.DeliveryPayment = {
    method = 'event',
    reason = 'Tailor Delivery',
    business = 'tailor',
    event = {
        name = 'payckecks:addToPaycheck',
        args = { '{playerId}', '{amount}', '{reason}' }
    }
}
```

Supported template placeholders in event args:

- `{playerId}`
- `{amount}`
- `{reason}`
- `{business}`
- `{citizenId}`