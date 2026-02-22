# MetaDen Skills API Reference

## Client exports

#### `exports['metaden-skills']:GetNonce()`

- Returns: `string|nil`

#### `exports['metaden-skills']:RequestNonce()`

- Triggers server nonce generation.
- Returns: `string|nil` (may be stale until `metaden-skills:nonce` arrives).

## Server exports

For `sourceOrIdentifier`, accepted forms are:

- `number` (player source)
- `string` (resolved identifier/citizenid)

When a `number` source is used and nonce protection is enabled, a valid nonce is required unless `Config.Security.AllowServerMissingNonce = true`.

#### XP and levels

#### `exports['metaden-skills']:AddExperience(sourceOrIdentifier, skill, amount, nonce)`

- Adds XP (`amount > 0`).
- Returns: `number|nil` (new XP)

#### `exports['metaden-skills']:RemoveExperience(sourceOrIdentifier, skill, amount, nonce)`

- Removes XP (`amount > 0`).
- Returns: `number|nil` (new XP)

#### `exports['metaden-skills']:SetExperience(sourceOrIdentifier, skill, amount, nonce)`

- Sets XP directly (clamped to `>= 0`).
- Returns: `number|nil` (new XP)

#### `exports['metaden-skills']:GetExperience(sourceOrIdentifier, skill, nonce)`

- Returns XP for a skill.
- Returns: `number|nil`

#### `exports['metaden-skills']:GetTotalExperience(sourceOrIdentifier, nonce)`

- Returns total cached XP across all skills.
- Returns: `number|nil`

#### `exports['metaden-skills']:GetAllReputation()`

- Returns leaderboard-like totals sorted descending.
- Returns: `table[]` as `{ identifier = string, total = number }`

#### `exports['metaden-skills']:GetPlayerLevel(experience)`

- Converts raw XP to level info.
- Returns: `level:number, nextLevelExp:number`

#### Milestones payload exports

#### `exports['metaden-skills']:GetMilestonesLevels(sourceOrIdentifier)`

- Returns levels payload from bridge config/hooks.

#### `exports['metaden-skills']:GetMilestonesReputation(sourceOrIdentifier)`

- Returns reputation payload from bridge config/hooks.

#### `exports['metaden-skills']:GetMilestonesData(sourceOrIdentifier)`

- Returns: `{ levels = table, reputation = table }`

#### Mission/reputation exports

#### `exports['metaden-skills']:GetAllReputationsForPlayer(playerSourceOrPlayer)`

- Returns merged reputation table for a player.

#### `exports['metaden-skills']:CompleteMission(playerSource, missionId)`

- Completes an active mission when requirements are satisfied.
- Returns: `boolean success, string message`

#### `exports['metaden-skills']:SetMissionForPlayer(target, missionId)`

- Assigns or re-activates a mission.
- Returns: `boolean success, string message`

#### `exports['metaden-skills']:AssignMissionToPlayer(target, missionId)`

- Alias of `SetMissionForPlayer`.
- Returns: `boolean success, string message`

## Events and RPC

### Client -> server events

#### `metaden-skills:requestNonce`

- Generates/stores a nonce for the calling player.

#### `metaden-skills:getExperience(skill, nonce)`

- Requests single-skill payload push to client.

#### `metaden-skills:server:SetMissionForPlayer(target, missionId)`

- Assigns/re-activates a mission for a target.

#### `metaden-skills:server:IncreaseRep(category, amount, passedSource, system)`

- Public integration event for reputation/skill increments.

#### `metaden-skills:server:rpc:request(requestId, name, args)`

- Internal RPC bus used by milestones UI callbacks.

### Server -> client events

#### `metaden-skills:nonce(nonce)`

- Nonce response event.

#### `metaden-skills:experience(data)`

- XP payload event.
- Payload:

```lua
{
  identifier = string,
  skill = string,
  experience = number,
  level = number,
  nextLevelExp = number
}
```

#### `metaden-skills:client:rpc:response(requestId, payload)`

- RPC response for client-side request promises.

### Registered RPC handlers (name)

- `metadenSkills:server:getPlayerTasks`
- `taskApp:server:getPlayerReputation`
- `taskApp:server:getPlayerLevels`
- `metaden-skills:server:completeMission`

## NUI callback contract

Callbacks are registered in `client/milestones.lua` and consumed by the React app.

### `getPlayerTasks`

- Request body: `{}`
- Response: `Mission[]`

### `getPlayerReputation`

- Request body: `{}`
- Response: `table`

### `getPlayerLevels`

- Request body: `{}`
- Response: `table`

### `setMissionWaypoint`

- Request body: `{ x: number, y: number }`
- Response: empty/ack

### `completeMission`

- Request body: `{ missionId: string }`
- Response: `{ success: boolean, message?: string }`

### `closeMilestones`

- Request body: `{}`
- Response: `{ ok: true }`

## Commands and permissions

### XP command

`/<Config.AdminCommand.Name> add|remove|set <skill> <amount> <playerId|citizenid>`

Examples:

```text
/skillexp add fishing 100 23
/skillexp set cooking 1500 CITIZEN123
```

### Mission assignment command

`/<Config.MissionSystem.AdminAssignCommandName> <missionId> <playerId|identifier(optional)>`

Examples:

```text
/missionassign gather_wood 23
/missionassign collect_rocks license:xxxxxxxxxxxxxxxx
```

If target is omitted, the caller is used.

### Standalone milestones command

`/<Config.MilestonesUi.StandaloneCommandName>`

Disable if needed:

```lua
Config.MilestonesUi = {
  EnableStandaloneCommand = false,
  StandaloneCommandName = 'milestones'
}
```
