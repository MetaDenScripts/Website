# Outdoors API Reference

## Callbacks (server)

- `metaden-outdoors:server:requestNonce`
 	- Registered through bridge callback support when available.
 	- Params: `(action: string)`
 	- Returns: `nonce: string | nil`
 	- Allowed actions: `cookMeat`, `searchForMaterial`, `fillBottle`, `gutSnake`, `gutLizard`.

- `metaden-outdoors:server:requestNonceEvent`
 	- Event-based nonce fallback path.
 	- Params: `(action: string, requestId: string)`
 	- Responds to client event: `metaden-outdoors:client:receiveNonce`

## Network events (server)

- `metaden-outdoors:server:cookMeat`
 	- Params: `(name: string, nonce: string)`
 	- Validates nonce + cooldown + required recipe items.
 	- Removes required ingredients and gives cooked item.

- `metaden-outdoors:server:searchForMaterial`
 	- Params: `(materialType: 'rocks' | 'wood', nonce: string)`
 	- Validates nonce + cooldown.
 	- Gives base reward and optional mushroom/animal bonus rewards.

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

## Network events (client)

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

## Lifecycle hooks

- `QBCore:Client:OnPlayerLoaded` → initializes all target interactions.
- `onResourceStart` (current resource) → initializes all target interactions.
- `playerDropped` (server) → clears cooldown and nonce state.
