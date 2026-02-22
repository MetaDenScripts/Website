# MetaDen Skills System

`metaden-skills` is a complete progression framework that adds long-term player growth through skills, levels, missions, and reputation — all backed by persistent storage and a polished milestones UI.

Built for production communities, it gives you a server-authoritative XP system, configurable progression logic, and clean integration points so you can plug it into your existing gameplay loops without rewriting your core.

## What this resource provides

- Server-authoritative XP mutations and level calculation.
- Persistent, character-based progression with MySQL-backed data.
- Milestones bridge payloads (levels + reputation) for NUI/phone apps.
- Mission assignment and completion flow with configurable rewards.
- Standalone milestones UI command and lb-phone custom app registration.
- Configurable integration hooks via `shared/milestones_bridge.lua` and `config.lua`.

## Why use `metaden-skills`?

- Increases retention by giving players meaningful long-term progression goals.
- Easy to adapt: skill list, thresholds, rewards, and bridge output are config-driven.
- Safe runtime model: server-side authority, nonce-protected flows, and explicit admin controls.
- Integration-ready API: exports, events, and NUI callbacks for custom content expansion.

## Requirements

- `oxmysql`
- `metabridge`

## Installation

1. Place `metaden-skills` in your resources folder.
2. Start dependencies before this resource.
3. Add to `server.cfg`:

```cfg
ensure oxmysql
ensure metabridge
ensure metaden-skills
```

`lb-phone` is optional and only needed if you want the milestones app icon inside the phone.
Without `lb-phone`, players can still use the standalone milestones command.

## Configuration reference

### Core

- `Config.Skills`: skill key -> label map.
- `Config.Levels`: ascending XP thresholds by level index.
- `Config.Security.RequireNonce`: requires nonce for source-based XP calls.
- `Config.Security.NonceLength`: nonce generation length.
- `Config.Security.AllowServerMissingNonce`: allows `nil` nonce for server-side source calls when enabled.
- `Config.DatabaseSync.Enabled`: toggles DB-to-cache synchronization safety checks.
- `Config.DatabaseSync.OnMutation`: sync from DB before `Add/Remove/Set`.
- `Config.DatabaseSync.OnRead`: sync from DB before `GetExperience` reads.

### Commands

- `Config.AdminCommand.Name`: XP admin command name.
- `Config.AdminCommand.Ace`: intended ace label for operators (see permission caveat below).
- `Config.MissionSystem.AdminAssignCommandName`: mission assignment command name.
- `Config.MilestonesUi.EnableStandaloneCommand`: enables standalone UI command.
- `Config.MilestonesUi.StandaloneCommandName`: standalone command name (default `milestones`).

### Milestones bridge

- `Config.MilestonesBridge.Levels`: level payload shaping/custom merge options.
- `Config.MilestonesBridge.Reputation`: reputation payload shaping/custom merge options.
- `CustomFunction`: inline Lua hook for custom payload logic.
- `CustomExport`: external resource export hook, optional context passing.

### Mission system

- `GoldCoinChance`, `MaxGoldCoinsPerSession`, `GoldCoinRewardItem`: chance-based bonus tuning.
- `ReputationChance`: per-category reward thresholds.
- `ReputationDefaults`: fallback reputation values.
- `ReputationMetadataKeys`: metadata keys merged into reputation payload.
- `Missions`: mission definitions loaded from `server/missions_config.lua`.

### Levels format

```lua
Config.Levels = {
 [1] = 100,
 [2] = 250,
 [3] = 500,
 -- ...
}
```

When a player reaches the highest configured level, `nextLevelExp` is `0`.

### Permission caveat (important)

- Both admin commands are registered with FiveM restricted command mode.
- XP command requires `command.<Config.AdminCommand.Name>` and, when configured, `Config.AdminCommand.Ace`.
- Mission assignment command uses `command.<Config.MissionSystem.AdminAssignCommandName>`.

Example ACE grants (defaults):

```cfg
add_ace group.admin command.skillexp allow
add_ace group.admin metaden-skills.admin allow
add_ace group.admin command.missionassign allow
```

## Mission behavior notes

- Mission assignments are stored in `metaden_player_missions`.
- On first task access, missions are seeded if player has no assignments.
- Only active assigned missions are returned to the UI.
- Completion requires active assignment and required item checks.
- Rewards can include items, money, reputation, and chance-based bonus items.

## Troubleshooting

- UI opens but no data: verify `metabridge` is running and RPC events are not blocked.
- Missing phone app icon: ensure `lb-phone` is started and `ui/dist` assets exist.
- XP calls returning `nil` for source input: verify nonce flow and `Config.Security` settings.
- Inconsistent DB/manual edits: enable `Config.DatabaseSync.Enabled` and relevant sync flags.

## Non-escrow extension points

- `config.lua`
- `shared/milestones_bridge.lua`

These are the supported customization surfaces for payload shaping and integration hooks.
