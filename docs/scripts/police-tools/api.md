# Police Tools API

## Events

### `police-tools:server:setDuty`

Updates a police player's duty state.

#### Set Duty Payload

- `playerId` (number): Target player id.
- `onDuty` (boolean): Duty state.

### `police-tools:server:createIncident`

Creates an incident entry with linked officers.

#### Create Incident Payload

- `title` (string): Incident title.
- `description` (string): Incident details.
- `officers` (number[]): Officer ids.

## Exports

### `IsOfficerOnDuty(playerId)`

Returns current duty state.
