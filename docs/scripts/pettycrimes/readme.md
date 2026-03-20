# Petty Crimes


> Crime does not need to be grand to be profitable. **metaden-pettycrimes** adds a broad set of low-stakes street crimes for FiveM servers, covering parking meters, coin-fed machines, mailboxes, shoplifting, traffic signs, and vehicle vandalism. The resource uses persistent world-state tracking, configurable skill checks, configurable loot tables, and optional crime XP progression through `metaden-skills`.

---

## Features

- **Parking meter interactions** — pay parking with coins, check whether a meter is already paid, or steal the coins inside with a crowbar.
- **Coin-fed machine theft** — steal coins from parking meters, payphones, newspaper dispensers, and train ticket machines using configurable success chances.
- **Shoplifting targets** — steal clothes, hats, glasses, fruit, convenience-store items, and liquor from configured prop models and liquor-store zones.
- **Mailbox theft** — break into post boxes, steal letters, and route letter rewards into configurable junk or cash drops.
- **Traffic sign theft** — steal supported road signs with an angle grinder and receive the matching item reward.
- **Vehicle vandalism** — slash tires, smash vehicle windows, and cut brake lines through third-eye vehicle options.
- **NPC consequence system** — nearby peds either flee or attack after a crime, with configurable aggro radius and optional random melee weapons.
- **Skill checks per crime type** — parking meters, shoplifting, mailbox theft, traffic sign theft, and brake-line cutting each use dedicated difficulty presets.
- **Persistent location state** — robbery, breakage, payment, and coin-storage data are stored per world location in SQL using deterministic location keys.
- **Automatic cooldown recovery** — robbed or broken locations become usable again after `Config.StealCooldown`; paid parking expires using configurable durations.
- **Crime XP integration** — successful crimes can award 1 point of `crime` XP through `metaden-skills` when that resource is running.
- **Bridge-based integration** — framework access, inventory actions, notifications, progress bars, metadata display, and target registration are routed through `metabridge`.

---

## Requirements

### Dependencies

| Resource | Role |
|---|---|
| [`metabridge`](https://github.com/metadenscripts/metabridge) | Framework, inventory, target, progress-bar, metadata, and notification bridge |
| [`ox_lib`](https://github.com/overextended/ox_lib) | Module loader, skill checks, and required support library |
| [`ox_target`](https://github.com/overextended/ox_target) | Third-eye targeting backend |
| [`oxmysql`](https://github.com/overextended/oxmysql) | SQL access for persistent petty-crime state |
| `scully_emotemenu` | Client emotes used during several crime interactions |

### Optional Integrations

| Resource | Role |
|---|---|
| `metaden-skills` | Awards `crime` XP on successful crimes |
| `bl_ui` | Optional alternative skill-check provider if you do not want to use ox_lib skill checks |

---

## Installation

### 1. Database

Import [pettycrimes.sql](pettycrimes.sql) into your server database:

```sql
CREATE TABLE IF NOT EXISTS petty_crimes (
    id VARCHAR(150) PRIMARY KEY,
    isPaid BOOLEAN DEFAULT FALSE,
    vehiclePlate VARCHAR(20),
    timePaid INT DEFAULT 0,
    coinsInside INT DEFAULT 0,
    isBroken BOOLEAN DEFAULT FALSE,
    wasStolen BOOLEAN DEFAULT FALSE,
    timeStolen INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

This table is used for persistent world state such as broken parking meters, robbed locations, stored coin values, and paid parking durations.

### 2. Inventory Items

Merge the entries from [inventory/ox_inventory.lua](inventory/ox_inventory.lua) into your `ox_inventory` item list.

The bundled file includes these petty-crimes items:

- `discount_coupon_25`
- `handwritten_letter`
- `parking_ticket`
- `turd`
- `certificate`
- `parking_receipt`
- `cap`
- `knitcap`
- `aviators`
- `wine`
- `grapes`
- `coin`

Copy the matching images from [inventory/images](inventory/images) into your `ox_inventory` image folder.

### 3. Required Existing Items

This resource also expects several items to already exist in your inventory setup or other resources:

- `letter`
- `crowbar`
- `anglegrinder`
- `weapon_knife`
- `weapon_switchblade`
- `WEAPON_STOPSIGN`
- `no_parking_sign`
- `yield_sign`
- `walking_sign`
- convenience-store items such as `sprunk`, `mustard`, and `water`
- any extra clothing or loot items you add to the config tables

If these items are missing, the related interactions may succeed logically but fail to reward or validate inventory correctly.

### 4. Load Order (`server.cfg`)

```cfg
ensure oxmysql
ensure ox_lib
ensure ox_target
ensure metabridge
ensure scully_emotemenu
ensure metaden-pettycrimes
```

If you use `metaden-skills`, load it before `metaden-pettycrimes` as well.

### 5. Optional Letter Opening Hook

The server includes a `pettycrimes:server:openletter` event for opening stolen letters, but this resource does not ship a dedicated item-use registration for `letter`.

If you want letters to be usable directly from inventory, wire your inventory item use to call that server event with the relevant slot.


---

## Gameplay Notes

### Skill Checks

The resource supports both `ox_lib` and `bl_ui` for skill checks.

Built-in presets exist for:

- `parking_meter`
- `shoplifting`
- `steal_post`
- `traffic_sign`
- `brake_lines`

If `ox_lib` is available, it is used first by default. If not, the resource falls back to `bl_ui` when it is running.

### Persistent State

Each interaction location is keyed using a deterministic string built from crime category, model, and rounded coordinates. This allows the script to:

- remember whether a location was robbed
- remember whether a parking meter is broken
- remember whether parking is paid and for which plate
- restore availability automatically after cooldown or payment expiry

### Vehicle Vandalism

Vehicle interactions are global third-eye options and include:

- slashing each tire individually
- smashing each side window and windscreen individually
- cutting brake lines when the vehicle is empty

These interactions use `metabridge` target wrappers and are registered only after a supported target backend is ready.

---

## Known Integration Notes

- `metaden-skills` is optional. If it is missing, the script logs a warning once and continues without XP awards.
- `parking_receipt` metadata uses `plate` and `time`, and the client registers metadata labels for both.
- Shoplifting adds `stolen = 'Stolen'` metadata to stolen store items and registers a display label for that metadata.
- The server validates config values on startup and will fail fast on invalid chance ranges, empty loot lists, or malformed parking duration tables.

---

## Support

If you extend the crime pools or reward items, keep the config tables and inventory definitions in sync. Most startup and runtime issues in this resource come from missing inventory items, malformed config tables, or missing SQL setup.
