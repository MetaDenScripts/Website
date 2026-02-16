# Police Tools

Police Tools adds quality-of-life commands and workflows for police roleplay.

## Features

- Fast incident logging shortcuts
- Tow and impound command helpers
- Shared duty status notifications

## Installation

1. Add resource folder to server resources.
2. Ensure in `server.cfg` with `ensure police-tools`.
3. Configure permissions for command groups.

## Command Reference

| Command | Description | Access |
| --- | --- | --- |
| `/duty` | Toggle police duty status | Police |
| `/impound <plate>` | Mark a vehicle as impounded | Police |
| `/incident` | Open quick incident flow | Police |

## Integration Example

```lua
exports['police-tools']:RegisterDutyHook(function(playerId, isOnDuty)
  print(('Duty changed for %s -> %s'):format(playerId, tostring(isOnDuty)))
end)
```

## Troubleshooting

- If duty updates lag, ensure your framework event hooks are enabled.
- If commands do not appear, verify ACE or framework permissions.
