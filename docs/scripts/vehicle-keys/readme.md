# Vehicle Keys

Vehicle Keys provides key ownership and lock management for players.

## Features

- Persistent key ownership tracking
- Temporary key sharing
- Admin override tools

## Installation

1. Copy the resource into your server resources folder.
2. Add `ensure vehicle-keys` in `server.cfg`.
3. Restart your server.

## Commands

| Command | Description | Permission |
| --- | --- | --- |
| `/givekey <id>` | Share your current vehicle key with another player | Player |
| `/takekey <id>` | Revoke a key previously shared | Player |
| `/keyadmin <plate>` | Admin override for emergency support | Admin |

## Example Callback

```lua
RegisterNetEvent('vehicle-keys:client:giveKey', function(vehicleId)
  print(('Key received for vehicle %s'):format(vehicleId))
end)
```

For endpoint details, see [API documentation](/scripts/vehicle-keys/api).
