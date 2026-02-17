## Notepad API Reference

### NUI → Client (`RegisterNUICallback`)

#### `SaveNote`

- **Direction:** NUI → Client → Server event
- **Payload:**

```json
{
	"fileName": "string",
	"content": { "ops": [] }
}
```

- **Behavior:** Triggers `notepad:server:SaveNote`.
- **Client callback response:** `"ok"`

#### `GetNotes`

- **Direction:** NUI → Client → Server callback
- **Payload:** none
- **Behavior:** Awaits `notepad:server:GetNotes`.
- **Client callback response:**

```json
[
	{ "file_name": "shopping" },
	{ "file_name": "todo" }
]
```

#### `GetNoteByName`

- **Direction:** NUI → Client → Server callback
- **Payload:**

```json
{
	"fileName": "string"
}
```

- **Behavior:** Awaits `notepad:server:GetNoteByName` and decodes JSON note contents.
- **Client callback response:**

```json
{
	"content": { "ops": [] }
}
```

#### `DeleteNote`

- **Direction:** NUI → Client → Server event
- **Payload:**

```json
{
	"fileName": "string"
}
```

- **Behavior:** Triggers `notepad:server:DeleteNote`.
- **Client callback response:** `"ok"`

### Server Events

#### `notepad:server:SaveNote`

- **Source:** client event
- **Parameters:** `data` table with `fileName` and `content`
- **Behavior:** Upserts into `laptop_files` with `file_type = 'txt'`.

#### `notepad:server:DeleteNote`

- **Source:** client event
- **Parameters:** `fileName` string
- **Behavior:** Deletes a note from `laptop_files` for the current laptop id.

### ox_lib Callbacks

#### `notepad:server:GetNotes`

- **Source:** `lib.callback.await`
- **Parameters:** none
- **Returns:** array of note names (`file_name`) for current laptop id.

#### `notepad:server:GetNoteByName`

- **Source:** `lib.callback.await`
- **Parameters:** `fileName` string
- **Returns:** single row containing `contents` JSON.

### Exports

- No public exports are currently provided by this resource.

