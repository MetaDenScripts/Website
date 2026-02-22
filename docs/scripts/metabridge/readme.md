# Metabridge

Framework, inventory, callback, target/UI, and dispatch bridge for FiveM resources.

`metabridge` gives you one stable API (`MetaBridge` server, `MetaBridgeClient` client) and routes calls to the active framework/inventory/dispatch adapters.

## Architecture

- Core server runtime: `resource/bridge.lua`
- Core client runtime: `resource/client.lua`
- Dispatch client extension: `links/dispatch/client.lua`
- Export surfaces: `exports/server.lua`, `exports/client.lua`
- Global loader: `init.lua`

## Requirements

- `ox_lib` (dependency in `fxmanifest.lua`)
- One supported framework adapter (auto-detected or configured via `BridgeConfig.framework`)
- Optional inventory/dispatch systems (auto-detected or configured)

## Setup

### Style 1: Use exports (recommended)

Add dependency order in your resource manifest, then call bridge exports directly.

```lua
dependency 'metabridge'
```

Server example:

```lua
local Bridge = exports['metabridge']
local framework = Bridge:getFramework()
```

Client example:

```lua
local Bridge = exports['metabridge']
Bridge:notify({ type = 'success', description = 'Bridge ready' })
```

### Style 2: Import globals with `@metabridge/init.lua`

In your manifest:

```lua
shared_scripts {
  '@metabridge/init.lua'
}
```

This exposes globals:

- Server: `MetaBridge`
- Client: `MetaBridgeClient`

Important: `init.lua` force-sets `BridgeConfig.debug = true`.

## Typing Notes

- Signatures use lightweight Lua-friendly hints: `name:type` and `-> returnType`.
- Common scalar aliases used in this README: `source:number`, `itemName:string`, `plate:string`.
- Adapter-specific payloads/results are intentionally typed as `table`, `table|nil`, or `any`.
- `nil` in a return type indicates the method can fail or the adapter may not provide data.