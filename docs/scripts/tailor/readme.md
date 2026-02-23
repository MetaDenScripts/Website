# MetaDen Tailor System

A premium tailor-job experience for FiveM servers, combining progression-based clothing crafting, configurable delivery contracts, and seamless wearable metadata integration for crafted apparel.


## Overview

- Crafting categories: `Tops`, `Bottoms`, `Accessories`, `Materials`.
- Tailor progression using `Config.Levels` thresholds.
- Delivery order loop with configurable pickup/dropoff/payment behavior.
- Optional item-driven clothing equip/unequip using recipe `clothing` metadata.
- Framework bridge pattern via `metabridge`.

## Requirements

- FXServer (`cerulean`, `lua54`).
- `metabridge`.
- `ox_lib`.
- `oxmysql`.

## Installation

1. Import `database.sql` into your server database.
2. Place resource folder as `metaden-tailor`.
3. Ensure dependency order:

   ```cfg
   ensure ox_lib
   ensure oxmysql
   ensure metabridge
   ensure metaden-tailor
   ```

4. Configure `config.lua` for your recipes, levels, interactions, and delivery payment routing.

## Configuration

### Top-level keys

| Key | Type | Default | Notes |
|---|---|---|---|
| `Config.debug` | `boolean` | `false` | Extra logging where implemented. |
| `Config.EnableClothingCommands` | `boolean` | `false` | Enables `/tailor_toggle_cloth`, `/tailor_dump`, `/tailor_capture_cloth`. |
| `Config.UseCustomInteractionUI` | `boolean` | `true` | `true`: custom proximity + NUI flow. `false`: target-wrapper fallback flow. |
| `Config.UseTargetInteractionUI` | `boolean` | `true` | When target zones are active, toggles target->NUI behavior. |
| `Config.VanModel` | `string` | `'speedo'` | Delivery van model spawn name. |
| `Config.TailorRecipes` | `table<string, Recipe[]>` | n/a | Recipe catalog keyed by category. |
| `Config.Levels` | `table<number, number>` | n/a | XP threshold map by level index. |
| `Config.Materials` | `MaterialPrice[]` | n/a | Material menu/shop pricing list. |
| `Config.OrderPickupLocation` | `vector4[]` | n/a | Random pickup points for order materials. |
| `Config.VanSpawnLocation` | `vector4` | n/a | Spawn location for delivery van. |
| `Config.ReturnSpawnLocation` | `vector3` | n/a | Return/check-in location. |
| `Config.DeliveryLocations` | `vector4[]` | n/a | Random delivery destinations. |
| `Config.DeliveryAmountMin/Max` | `number` | `5 / 30` | Crafted item amount range per delivery order. |
| `Config.DeliveryRewardMin/Max` | `number` | `70 / 180` | XP reward range per delivery completion. |
| `Config.DeliveryRep.maxRep` | `number` | `1000` | Upper bound used for payout scaling. |
| `Config.DeliveryPayment` | `DeliveryPaymentConfig` | n/a | Payout routing (`event`, `bank`, `item`). |

### `Recipe` schema

```lua
---@class Recipe
---@field name string
---@field title string
---@field price number
---@field level number
---@field duration number -- ms
---@field required { item: string, amount: number }[]
---@field reward { item: string, amount: number, experience: number }[]
---@field clothing? ClothingEntry[]
```

### `ClothingEntry` schema

```lua
---@class ClothingVariant
---@field drawable number
---@field texture? number

---@class ClothingEntry
---@field type 'component'|'prop'
---@field component? number -- required when type='component'
---@field prop? number      -- required when type='prop'
---@field male? ClothingVariant
---@field female? ClothingVariant
---@field drawable? number  -- fallback when male/female not provided
---@field texture? number
```

### `DeliveryPaymentConfig` schema

```lua
---@class DeliveryEventConfig
---@field name string
---@field args? any[] -- supports templates: '{playerId}', '{amount}', '{reason}', '{business}', '{citizenId}'

---@class DeliveryPaymentConfig
---@field method 'event'|'bank'|'item'
---@field reason string
---@field itemName string
---@field business string
---@field event DeliveryEventConfig
---@field extraEvents? DeliveryEventConfig[]
```

## Troubleshooting

- Clothing does not apply:
  - Verify ped model slot/drawable/texture values.
  - Use `/tailor_dump` and `/tailor_capture_cloth` to capture correct values.
- Missing notifications:
  - Ensure `metabridge` is started and notify path is available.
- Delivery payout not received:
  - Re-check `Config.DeliveryPayment.method` and event target names/args.
