# Notepad

Lightweight Quill-based notes app for `fd_laptop`, persisted in MySQL per laptop metadata id.

## Dependencies

- `ox_lib`
- `oxmysql`
- `qbx_core`
- `ox_inventory`
- `fd_laptop`

## Installation

1. Place this resource in your server resources folder as `notepad`.
2. Import [database.sql](database.sql) into your DB.
3. Start dependencies before this resource.
4. Add `ensure notepad` to your server config.

Suggested order:

```cfg
ensure oxmysql
ensure ox_lib
ensure ox_inventory
ensure qbx_core
ensure fd_laptop
ensure notepad
```

## Runtime Behavior

- Web UI (`web/script.js`) sends NUI fetch calls to client callbacks.
- Client (`client/client.lua`) forwards save/delete to server events and reads data via `lib.callback.await`.
- Server (`server/server.lua`) resolves laptop id via shared inventory validation (prefers client-provided current `fd_laptop` id, with fallback to first owned laptop).
- Notes are stored in `laptop_files` with `file_type = 'txt'` and upserted by unique key.


## Notes about resource name

The NUI callbacks in [web/script.js](web/script.js) use `https://notepad/...`.
Keep the resource folder name as `notepad`, or update callback URLs if you rename it.

## Database

This resource uses the `laptop_files` table with a unique key on:

- `laptop_id`
- `file_name`
- `file_type`
- `contents`

That allows save operations to upsert existing files for the same laptop and file type.

## How it works

- Server reads the player laptop item from `ox_inventory`.
- Laptop metadata id is used as the per-device file owner.
- Save requests upsert JSON note contents into MySQL.
- List/read/delete actions are scoped to the same laptop id.
