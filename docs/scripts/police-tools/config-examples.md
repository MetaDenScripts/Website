# Police Tools Config Examples

## Basic Setup

```lua
Config.DutyStations = {
  vec3(442.1, -981.9, 30.7)
}
Config.EnableIncidentLogs = true
Config.RequireOnDutyForCommands = true
```

## Multi-Station Setup

```lua
Config.DutyStations = {
  vec3(442.1, -981.9, 30.7),
  vec3(1852.6, 3689.8, 34.2),
  vec3(-449.6, 6013.2, 31.7)
}
Config.EnableIncidentLogs = true
Config.RequireOnDutyForCommands = true
Config.MaxIncidentOfficers = 8
```
