## MetaDen Skills API Reference

### Client Exports

#### `exports['metaden-skills']:GetNonce()`

Returns the currently cached nonce.

- **Returns:** `string|nil`

#### `exports['metaden-skills']:RequestNonce()`

Requests a fresh nonce from server and returns the current local nonce value.

- **Returns:** `string|nil`
- **Note:** the returned value may still be the previous nonce until the server response event arrives.

### Server Exports

`sourceOrIdentifier` accepts either:

- `number` player source
- `string` resolved identifier/citizenid

If a `number` source is passed and nonce protection is enabled, a valid `nonce` is required unless `Config.Security.AllowServerMissingNonce = true`.

#### `exports['metaden-skills']:AddExperience(sourceOrIdentifier, skill, amount, nonce)`

Adds XP to a skill.

- `skill`: `string`
- `amount`: must be positive (`> 0`)
- **Returns:** `number|nil` new XP value

#### `exports['metaden-skills']:RemoveExperience(sourceOrIdentifier, skill, amount, nonce)`

Removes XP from a skill.

- `skill`: `string`
- `amount`: must be positive (`> 0`)
- **Returns:** `number|nil` new XP value

#### `exports['metaden-skills']:SetExperience(sourceOrIdentifier, skill, amount, nonce)`

Sets a skill XP value directly (clamped to `>= 0`).

- `skill`: `string`
- `amount`: `number`
- **Returns:** `number|nil` new XP value

#### `exports['metaden-skills']:GetExperience(sourceOrIdentifier, skill, nonce)`

Gets XP for one skill.

- `skill`: `string`
- **Returns:** `number|nil`

#### `exports['metaden-skills']:GetTotalExperience(sourceOrIdentifier, nonce)`

Gets total XP across all skills for a player identifier.

- **Returns:** `number|nil`

#### `exports['metaden-skills']:GetAllReputation()`

Returns all identifiers with total XP sorted descending.

- **Returns:** `table[]` with entries `{ identifier = string, total = number }`

#### `exports['metaden-skills']:GetPlayerLevel(experience)`

Computes level and next threshold from raw XP.

- `experience`: `number`
- **Returns:** `level:number, nextLevelExp:number`

#### `exports['metaden-skills']:GetMilestonesLevels(sourceOrIdentifier)`

Returns config-driven levels payload.

- **Returns:** `table`

#### `exports['metaden-skills']:GetMilestonesReputation(sourceOrIdentifier)`

Returns config-driven reputation payload.

- **Returns:** `table`

#### `exports['metaden-skills']:GetMilestonesData(sourceOrIdentifier)`

Returns both levels and reputation payload.

- **Returns:** `table` with `{ levels = table, reputation = table }`

#### `exports['metaden-skills']:SetMissionForPlayer(target, missionId)`

Assigns (or re-activates) a mission for a player.

- `target`: `number|string` player source or identifier
- `missionId`: `string`
- **Returns:** `boolean success, string message`

#### `exports['metaden-skills']:AssignMissionToPlayer(target, missionId)`

Alias for `SetMissionForPlayer`.

- **Returns:** `boolean success, string message`

## Custom integration (non-escrow)

- `config.lua` is editable and non-escrow.
- `shared/milestones_bridge.lua` is editable and non-escrow.
- You can set `CustomFunction` for levels/reputation in `Config.MilestonesBridge`.
- You can also set `CustomExport = { resource = 'resource_name', export = 'ExportName', passContext = true }`.

### Network Events

#### Client -> Server

#### `metaden-skills:requestNonce`

Requests nonce generation for the calling client.

#### `metaden-skills:getExperience(skill, nonce)`

Requests a fresh payload for one skill.

#### `metaden-skills:server:SetMissionForPlayer(target, missionId)`

Server event to assign/re-activate a mission for a player.

- `target`: `number|string` player source or identifier
- `missionId`: `string`

> XP mutation events are intentionally not exposed to clients.
> Use server exports (`AddExperience`, `RemoveExperience`, `SetExperience`) from trusted server code.

#### Server -> Client

#### `metaden-skills:nonce(nonce)`

Sent in response to nonce request.

#### `metaden-skills:experience(data)`

Sent after XP read/write operations.

Payload shape:

```lua
{
 identifier = string,
 skill = string,
 experience = number,
 level = number,
 nextLevelExp = number
}
```

## Admin Command

`/<Config.AdminCommand.Name> add|remove|set <skill> <amount> <playerId|citizenid>`

Examples:

```text
/skillexp add fishing 100 23
/skillexp set cooking 1500 CITIZEN123
```

For `add` and `remove`, `amount` must be positive.

### Mission Assignment Command

`/<Config.MissionSystem.AdminAssignCommandName> <missionId> <playerId|identifier(optional)>`

Examples:

```text
/missionassign gather_wood 23
/missionassign collect_rocks license:xxxxxxxxxxxxxxxx
```

If target is omitted, the command assigns to the caller.

This command is registered as restricted and requires ACE permission.

Example `server.cfg` ACE grant:

```cfg
add_ace group.admin command.missionassign allow
```

### Standalone Milestones Command

`/<Config.MilestonesUi.StandaloneCommandName>`

Defaults to `/milestones`.

To disable the command entirely:

```lua
Config.MilestonesUi = {
 EnableStandaloneCommand = false,
 StandaloneCommandName = 'milestones'
}
```
