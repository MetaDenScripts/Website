# MetaDen Skills System

Player skills, milestones UI, and reputation/levels.

## Features

- Character-based skill XP storage (via MetaBridge identifier resolution).
- Configurable skill list and XP level thresholds.
- Server-authoritative XP mutations via server exports/admin command.
- Admin command for add/remove/set XP.
- Debounced DB writes with flush on resource stop.
- Config-driven bridge for milestones levels and reputation.
- Non-escrow integration hooks in `shared/milestones_bridge.lua`.
- Built-in milestones UI (LB Phone, NPWD wrapper, and command fallback support).
- Persistent player mission assignments stored in DB (`metaden_player_missions`).
- Mission assignment interfaces via server exports, server event, and admin command.
- Mission progress updates on app open and manual in-app refresh (no background polling).
- Internal client↔server RPC for milestones NUI requests, with notifications routed through MetaBridge.

## Requirements

- `oxmysql`
- `metabridge`

## Installation

1. Place `metaden-skills` in your resources folder.
2. Ensure dependencies are started before this resource.
3. Add to your `server.cfg`:

```cfg
ensure oxmysql
ensure metabridge
ensure metaden-skills
```

If using NPWD app-tile wrapper:

```cfg
ensure npwd_metaden_milestones
ensure npwd
```

## Configuration

Edit `config.lua`:

- `Config.Skills`: available skill keys and labels.
- `Config.Levels`: level thresholds by explicit level key.
- `Config.Security.RequireNonce`: require nonce for XP operations.
- `Config.Security.NonceLength`: generated nonce length.
- `Config.Security.AllowServerMissingNonce`: permit nil nonce for server-side callers when enabled.
- `Config.DatabaseSync.Enabled`: enable DB-to-cache synchronization safeguards.
- `Config.DatabaseSync.OnMutation`: refresh from DB before Add/Remove mutations.
- `Config.DatabaseSync.OnRead`: refresh from DB before GetExperience reads.
- `Config.AdminCommand.Name`: admin command name.
- `Config.AdminCommand.Ace`: ace permission to allow command usage.
- `Config.MilestonesBridge`: drives levels/reputation output for consumers such as `metaden-milestones`.
- `Config.MilestonesUi.EnableStandaloneCommand`: enable/disable standalone milestones command registration.
- `Config.MilestonesUi.StandaloneCommandName`: command name for standalone UI (default `milestones`).
- `Config.MissionSystem.AdminAssignCommandName`: admin command name for assigning missions.

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
