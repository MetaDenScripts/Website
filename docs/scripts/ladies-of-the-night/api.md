# MetaDen Ladies of the Night API Reference

## Configuration Highlights

| Setting | Default | Description |
|---|---|---|
| `MaxRecruits` | 5 | Starting max recruit slots (increases with player level) |
| `MaxFollowers` | 3 | Max peds that can follow you at once |
| `RecruitCost` | $2,500 | One-time recruitment cost |
| `PassiveIncomePerHour` | $500 | Base hourly income per stationed ped |
| `MaxPendingEarnings` | $5,000 | Cap on uncollected earnings per ped |
| `IncomeTickMinutes` | 10 | Server income calculation interval |
| `ActiveHoursStart / End` | 20:00 / 06:00 | In-game hours when peds earn income |
| `StationZoneRadius` | 50 | Exclusion radius around stationed peds (meters) |
| `CareInteractionDistance` | 2.0 | Max distance for using care items on a ped |
| `TaskCooldown` | 1,800s | Cooldown between task offers per ped |
| `StatDecayIntervalHours` | 8 | Hours between passive stat decay ticks |
| `HospitalHealCost` | $500 | Cost to fully heal a ped at a hospital |
| `GymTrainingCost` | $50 | Cost per gym training session |
| `ArrestAutoRelease` | 4h | Hours before an arrested ped is auto-released |
| `AmbushChance` | 25% | Chance of ambush when collecting $500+ earnings |

## Commands

| Command | Description |
|---|---|
| `/ladiesofthenight` | Open/close the management NUI panel |
| `/claimterritory` | Claim the district you're standing in (requires enough stationed peds and reputation) |
| `/lotnzones` | Toggle district zone blips on the map (color-coded by tier) |

## Server Exports

```lua
-- Add reputation to a player in a specific district
exports['metaden-ladiesofthenight']:AddZoneReputation(citizenId, districtId, amount)

-- Get a player's current reputation in a district
exports['metaden-ladiesofthenight']:GetZoneReputation(citizenId, districtId)

-- Get a player's reputation tier name in a district (Unknown, Newcomer, Known, Established, Dominant, Kingpin)
exports['metaden-ladiesofthenight']:GetZoneReputationTier(citizenId, districtId)
```
