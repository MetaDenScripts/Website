# Outdoors API Reference

## Callbacks (server)

- `metaden-outdoors:server:requestNonce`
 	- Registered through bridge callback support when available.
 	- Params: `(action: string)`
 	- Returns: `nonce: string | nil`
 	- Allowed actions: `cookMeat`, `searchForMaterial`, `fillBottle`, `gutSnake`, `gutLizard`.

### Network events (server)

- `metaden-outdoors:server:requestNonceEvent`
 	- Event-based fallback for nonce retrieval when callback helpers are unavailable.
 	- Params: `(action: string, requestId: string)`
 	- Response transport is internal and not part of the public contract.

- `metaden-outdoors:server:requestCookingSkillData`
 	- Params: `(requestId: string)`
 	- Responds via an internal client response event and returns current cooking skill data used by the cooking menu when `Config.UseMetaDenSkills = true`.
 	- Returns `nil` when skills integration is disabled or unavailable.

- `metaden-outdoors:server:cookMeat`
 	- Params: `(name: string, nonce: string)`
 	- Validates nonce + cooldown + required recipe items.
 	- Removes required ingredients and gives cooked item.

- `metaden-outdoors:server:searchForMaterial`
 	- Params: `(lootableId: string, nonce: string)`
 	- `lootableId` must be a canonical `Config.Lootables[*].id`.
 	- Validates nonce + cooldown.
 	- Uses the matching `Config.Lootables` entry for required-item checks, weighted rewards, and optional bonus pools.

- `metaden-outdoors:server:GutSnake`
 	- Params: `(slot: number, nonce: string)`
 	- Validates nonce + cooldown.
 	- Requires a knife item in inventory.
 	- Removes source item from slot and gives `snakemeat` + `snakeskin`.

- `metaden-outdoors:server:GutLizard`
 	- Params: `(slot: number, nonce: string)`
 	- Validates nonce + cooldown.
 	- Requires a knife item in inventory.
 	- Removes source item from slot and gives `lizardmeat` + `lizardskin`.

- `metaden-outdoors:server:fillBottle`
 	- Params: `(slot: number, nonce: string)`
 	- Validates nonce + cooldown.
 	- Removes empty bottle from slot and gives `dirtywater`.

### Network events (client)

- `metaden-outdoors:client:FillBottle`
 	- Params: `(slot: number)`
 	- Performs nearby-water and river-like checks client-side.
 	- Requests nonce and triggers server bottle fill event on success.

- `metaden-outdoors:client:GutSnake`
 	- Params: `(slot: number)`
 	- Handles local gut flow and requests nonce before triggering server gut event.

- `metaden-outdoors:client:GutLizard`
 	- Params: `(slot: number)`
 	- Handles local gut flow and requests nonce before triggering server gut event.

### Commands

- `/<Config.PlayerAnimationCommand> [setName]`
 	- No args: lists available animation sets.
 	- With `setName`: selects that search animation set for the player.
 	- Falls back to `Config.DefaultSearchAnimationSet` when no player override is set.

### Integration examples

#### 1) `ox_lib` callback nonce → `searchForMaterial` (`rock_pile`)

```lua
local lootableId = "rock_pile"

lib.callback('metaden-outdoors:server:requestNonce', false, function(nonce)
    if not nonce then return end
    TriggerServerEvent('metaden-outdoors:server:searchForMaterial', lootableId, nonce)
end, 'searchForMaterial')
```

#### 2) MetaBridge callback nonce → `cookMeat`

```lua
local recipeName = "cookedsnake"

MetaBridgeClient.requestCallback('metaden-outdoors:server:requestNonce', function(nonce)
    if not nonce then return end
    TriggerServerEvent('metaden-outdoors:server:cookMeat', recipeName, nonce)
end, 'cookMeat')
```

#### 3) `requestNonceEvent` fallback example

```lua
local pending = {}

RegisterNetEvent('metaden-outdoors:client:receiveNonce', function(requestId, nonce)
    local resume = pending[requestId]
    if not resume then return end
    pending[requestId] = nil
    resume(nonce)
end)

local function requestNonceFallback(action, cb)
    local requestId = ('%s:%d'):format(action, GetGameTimer())
    pending[requestId] = cb
    TriggerServerEvent('metaden-outdoors:server:requestNonceEvent', action, requestId)
end

requestNonceFallback('searchForMaterial', function(nonce)
    if not nonce then return end
    TriggerServerEvent('metaden-outdoors:server:searchForMaterial', 'rock_pile', nonce)
end)
```

#### 4) Canonical `Config.Lootables` id usage

```lua
Config.Lootables = {
    {
        id = "rock_pile",
        enabled = true,
        props = { "prop_rock_1_a" }
    },
    {
        id = "fallen_log",
        enabled = true,
        props = { "prop_log_01" }
    }
}

local chosenLootableId = "rock_pile"
TriggerServerEvent('metaden-outdoors:server:searchForMaterial', chosenLootableId, nonce)
```

#### 5) `ox_inventory` item action → client `FillBottle`

```lua
exports('empty_bottle', function(event, item, inventory, slot)
    if event ~= 'usingItem' then return end
    TriggerEvent('metaden-outdoors:client:FillBottle', slot)
end)
```

### Lifecycle hooks

- `QBCore:Client:OnPlayerLoaded` → initializes all target interactions.
- `playerSpawned` (client) → primes skill state.
- `onResourceStart` (current resource) → initializes targets and primes skill state.
- `onResourceStart` (`metaden-skills`) → re-primes skill state.
- `playerDropped` (server) → clears cooldown and nonce state.

### External events triggered by this resource

- `ian-health:server:IncreaseDirty` (after cooking)
- `ian-health:server:increaseStress` (after yoga)

### Skills integration

- Cooking XP is granted through `exports['metaden-skills']:AddExperience(identifier, 'cooking', amount)` on successful cooking.
- When `Config.UseMetaDenSkills = true`, cooking menu progression reads current cooking XP through `metaden-outdoors:server:requestCookingSkillData` and unlocks recipes by `recipe.cooking` threshold.

## External APIs Used

### metabridge

Used through `MetaBridge`/`MetaBridgeClient` or fallback exports:

- `requestCallback`
- `registerCallback`
- `addTargetModel`
- `getItemImage`
- `getItemLabel`
- `getItemCount`
- `removeItem`
- `addItem`
- `getItemFromSlot`
- `notify`
- `progressBar`
- `registerContext`
- `showContext`

### GTA natives (direct animation)

- `TaskStartScenarioInPlace`
- `TaskPlayAnim`
- `ClearPedTasks`
- `ClearPedSecondaryTask`
- `ClearPedTasksImmediately`
