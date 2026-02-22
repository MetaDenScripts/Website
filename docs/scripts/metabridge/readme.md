# Notepad

Lightweight notes app for `fd_laptop`, backed by MySQL and integrated with Qbox player/inventory data.

## Features

- Create new notes
- Save and update notes by file name
- Open existing notes from a list
- Delete notes
- Notes are tied to the current laptop item metadata id
- Rich text editor (Quill) with JSON content storage

## Requirements

- `ox_lib`
- `oxmysql`
- `qbx_core`
- `ox_inventory`
- `fd_laptop`

## Installation

1. Place this resource in your server resources folder.
2. Import [database.sql](database.sql) into your server database.
3. Ensure dependencies are started before this resource.
4. Add `ensure notepad` to your server config.

Example start order:

```cfg
ensure oxmysql
ensure ox_lib
ensure ox_inventory
ensure qbx_core
ensure fd_laptop
ensure notepad
```

## Notes about resource name

The NUI callbacks in [web/script.js](web/script.js) use `https://notepad/...`.
Keep the resource folder name as `notepad`, or update callback URLs if you rename it.

## Database

This resource uses the `laptop_files` table with a unique key on:

- `laptop_id`
- `file_name`
- `file_type`

That allows save operations to upsert existing files for the same laptop and file type.

## How it works

- Server reads the player laptop item from `ox_inventory`.
- Laptop metadata id is used as the per-device file owner.
- Save requests upsert JSON note contents into MySQL.
- List/read/delete actions are scoped to the same laptop id.
