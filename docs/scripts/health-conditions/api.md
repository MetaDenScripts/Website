# Health Conditions API Reference


## Server Integration API

Trusted server-side integrations can add or delete conditions without going through the player/job permission checks used by the UI callbacks.

### Export: `exports['metaden-health-conditions']:AddCondition(data)`

Server-only export for creating a condition directly.

Required fields:
- `targetCitizenId` as a string
- `conditionKey` as a string

Optional fields:
- `bodyLocation` as a string
- `description` as a string
- `customLabel` as a string when `conditionKey = 'other'`
- `severity` as `minor`, `moderate`, or `severe`
- `expiryHours` as a number
- `setBy` as a string used for auditing
- `setByJob` as a string used for auditing

Returns:
- Error: `{ success = false, message = "..." }`
- Success: `{ success = true, id = number }`

Example:

```lua
local result = exports['metaden-health-conditions']:AddCondition({
   targetCitizenId = citizenId,
   conditionKey = 'burn_marks',
   bodyLocation = 'left_arm',
   severity = 'moderate',
   expiryHours = 6,
   description = 'Fresh burn damage.',
   setBy = 'my-resource',
   setByJob = 'system',
})
```

### Event: `metaden-health-conditions:server:addCondition`

Server-only event variant of the trusted add API. This event is registered with `AddEventHandler`, not `RegisterNetEvent`, so clients cannot trigger it.

Arguments:
- `data` table with the same shape as the `AddCondition` export
- optional `responseCb(result)` callback function

Example:

```lua
TriggerEvent('metaden-health-conditions:server:addCondition', {
   targetCitizenId = citizenId,
   conditionKey = 'laceration',
   bodyLocation = 'right_hand',
   severity = 'minor',
   expiryHours = 4,
   setBy = 'my-resource',
}, function(result)
   print(json.encode(result))
end)
```

### Event: `metaden-health-conditions:server:deleteCondition`

Server-only event for deleting a condition by id. This also uses `AddEventHandler`, so it is not client-triggerable.

Arguments:
- `conditionId` as a number
- optional `responseCb(result)` callback function

Returns through callback:
- Error: `{ success = false, message = "..." }`
- Success: `{ success = true, record = table }`

Example:

```lua
TriggerEvent('metaden-health-conditions:server:deleteCondition', 42, function(result)
   print(json.encode(result))
end)
```