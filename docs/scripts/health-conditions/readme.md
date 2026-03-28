# Health Conditions

metaden-health-conditions gives your server a structured way to roleplay visible injuries, ailments, and physical status effects without relying on players to remember everything in chat. It creates a clean examine flow for EMS, police, and civilians, while still letting players report their own condition state when it helps drive the scene forward.

For medical roleplay, this means staff can quickly see what is wrong, where the condition is located, how severe it is, and whether it was player-reported or automatically detected from damage. For the broader server, it means better continuity between the initial incident, treatment, follow-up RP, and any notes players want to move into their MDT or records workflow.

## Features

- **Player-Driven Condition Reporting** — Players can set their own visible conditions to support ongoing roleplay, injury continuity, and scene-to-scene consistency
- **Staff-Controlled Medical Oversight** — Authorized jobs can add, update, and remove conditions on other players, including clearing outdated or incorrect entries
- **Injury Cause, Location, and Severity Tracking** — Store the condition type, body location, custom notes, and severity level in one structured record that is easy to read during treatment or investigation RP
- **Automatic Damage Detection** — Convert incoming game damage into visible conditions automatically with configurable weapon grouping, severity handling, and expiry rules
- **Expiry-Based Condition Lifecycle** — Conditions are not permanent clutter; every entry expires automatically and old records are cleaned up on the server side
- **MDT-Friendly Injury Summaries** — Condition entries are stored in a structured, readable format that makes it easier to relay or transfer injury details into MDT and documentation workflows
- **Third-Eye Examine UI** — Inspect another player through MetaBridge targeting and view their active conditions in a dedicated UI flow
- **Self-Inspection Command** — Use `/healthconditions` to open your own record, review active conditions, and manage self-reported entries
- **Anatomical Body Mapping** — Place conditions on specific body zones such as head, chest, back, arms, hands, legs, and feet for clearer medical RP
- **Custom and Preset Conditions** — Mix predefined condition types with freeform custom descriptions when the scene needs something more specific
- **Single-Request Examine Flow** — The server resolves the full examine payload in one callback for a cleaner and more reliable open flow

## Why Getting it

- **It gives every injury scene lasting value** instead of letting important details disappear once the immediate emote exchange is over
- **It helps EMS and police roleplay faster** with a clear, shared source of truth for visible conditions
- **It supports both realism and flexibility** by combining self-reported conditions, job-managed edits, and automatic damage-based entries
- **It improves continuity across scenes** because injuries can persist for a configurable time instead of being forgotten after one interaction
- **It reduces friction for recordkeeping** by keeping injury details organized enough to move into MDTs, reports, or case notes
- **It is easy to deploy** because the resource creates its own database table on startup and exposes trusted server-side hooks for integrations
- **It's free!** All features are available without any cost, and the resource is designed to be a plug-and-play addition to your server's RP toolkit

## Dependencies

| Resource | Required |
|----------|----------|
| [oxmysql](https://github.com/overextended/oxmysql) | Yes |
| [metabridge](https://store.metadenscripts.com) | Yes |

## Installation

1. Place `metaden-health-conditions` in your resources folder
2. Ensure `oxmysql` is started before this resource. The server creates the `metaden_health_conditions` table automatically on startup.
3. Add to your `server.cfg`:
   ```
   ensure metaden-health-conditions
   ```
4. (Optional) Edit `config.lua` to adjust condition types, authorized jobs, expiry limits, and damage detection behavior



## Configuration

All settings are in `config.lua`:

| Setting | Default | Description |
|---------|---------|-------------|
| `Config.Command` | `healthconditions` | Chat command to open self-inspection |
| `Config.TargetDistance` | `3.0` | Max distance for third-eye targeting |
| `Config.DefaultExpiryHours` | `24` | Default condition expiry for self-reports |
| `Config.MaxSelfExpiryHours` | `72` | Maximum expiry civilians can set |
| `Config.MaxSelfConditions` | `10` | Max active self-reported conditions |
| `Config.AuthorizedJobs` | `{ ambulance = 0, police = 0 }` | Jobs allowed to set conditions on others |
| `Config.DamageDetection.Enabled` | `true` | Enable automatic damage-to-condition detection |
| `Config.DamageDetection.Cooldown` | `30` | Cooldown in seconds per body location before another auto-condition |
| `Config.DamageDetection.MaxAutoConditions` | `8` | Max active auto-detected conditions per player |
| `Config.DamageDetection.WeaponGroupToCategory` | See config | Maps weapon group hashes to categories such as melee, pistol, rifle, or explosion |
| `Config.DamageDetection.SharpMeleeWeapons` | See config | Marks specific melee weapons as `sharp_melee` instead of generic melee |
| `Config.DamageDetection.SeverityExpiry` | See config | Expiry hours per severity for auto-detected conditions |
| `Config.DamageTypeMap` | See config | Maps damage categories to condition presets, severity, and description |

## Damage Detection

Damage detection can be tuned without editing client logic. Use `Config.DamageDetection.WeaponGroupToCategory` to control how weapon groups are categorized, `Config.DamageDetection.SharpMeleeWeapons` to promote specific melee weapons into `sharp_melee`, and `Config.DamageTypeMap` to decide which condition gets created for each category.

Example:

```lua
Config.DamageDetection.WeaponGroupToCategory[`GROUP_PISTOL`] = 'pistol'
Config.DamageDetection.SharpMeleeWeapons[`WEAPON_KNIFE`] = true

Config.DamageTypeMap.pistol = {
   condition = 'gunshot_wound',
   severity = 'severe',
   description = 'Gunshot wound from a pistol.'
}
```

## Permissions

| Action | Self | Other (Civilian) | Other (EMS/Police) |
|--------|------|-------------------|--------------------|
| View conditions | Yes | Yes | Yes |
| Add condition | Yes (capped) | No | Yes |
| Remove condition | Yes (own only) | No | Yes |
| Update condition | Yes (own only) | No | Yes |
| Set custom expiry | Limited | N/A | Unlimited |

## Commands

| Command | Description |
|---------|-------------|
| `/healthconditions` | Open the self-inspection UI to view and manage your own conditions |
