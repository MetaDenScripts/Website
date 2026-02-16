# Vehicle Keys API

## Events

### `vehicle-keys:client:giveKey`

Grants a key to a player for a vehicle.

#### Give Key Payload

- `vehicleId` (string): Script vehicle identifier.
- `ownerId` (number): Server player id of owner.

### `vehicle-keys:server:revokeKey`

Revokes key access from a target player.

#### Revoke Key Payload

- `targetId` (number): Server player id.
- `plate` (string): Vehicle plate.

## Exports

### `HasVehicleKey(playerId, plate)`

Returns whether a player has an active key.
