# Petty Crimes API Reference


## Configuration Reference

All options live in [config.lua](config.lua) under the global `Config` table.

### Core Chances

| Key | Type | Default | Description |
|---|---|---|---|
| `DropChance` | number | `60` | Success threshold for coin theft from parking meters. |
| `NonMeterDropChance` | number | `30` | Success threshold for other coin-fed props such as payphones and dispensers. |
| `ChanceOfStealPost` | number | `70` | Success threshold for mailbox theft. |
| `ChanceOfStealWearables` | number | `80` | Success threshold for shoplifting-style thefts. |
| `ChanceOfPedUsingWeapon` | number | `15` | Chance that hostile peds pull a configured weapon. |
| `ReputationChance` | number | `45` | Chance to award `crime` XP on a successful crime. |
| `NightBonus` | number | `15` | Bonus added to some theft rolls during night hours. |

### Money, Loot, and Durations

| Key | Type | Default | Description |
|---|---|---|---|
| `MinCoinsAmount` | number | `1` | Minimum coin reward from successful coin theft. |
| `MaxCoinsAmount` | number | `10` | Maximum coin reward from successful coin theft. |
| `ParkingFee` | number | `2` | Coin cost to pay a parking meter. |
| `StealCooldown` | number | `300` | Cooldown in seconds before a robbed location recovers. |
| `ParkingDurations.meter` | number | `3600` | Payment duration for a standard parking meter. |
| `ParkingDurations.car_park` | number | `86400` | Payment duration for a car park ticket machine. |
| `LocationKeyPrecision` | number | `2` | Decimal precision used when generating deterministic world location IDs. |

### Loot Pools

These config tables must contain at least one entry because server startup validates them strictly.

- `RandomItemsFromLetters`
- `ClothingItems`
- `HatItems`
- `GlassesItems`
- `SevenElevenItems`
- `LiquorShopItems`
- `FruitStandItems`
- `RandomAngryPedWeapon`

### World Locations and NPC Reactions

| Key | Type | Description |
|---|---|---|
| `LiquorStoreZones` | `vec3[]` | Sphere-zone locations for liquor theft targets. |
| `AggroRadius` | number | Radius used when selecting nearby peds to flee or attack. |
| `RandomAngryPedWeapon` | `string[]` | Weapon pool used when hostile peds escalate after a crime. |
