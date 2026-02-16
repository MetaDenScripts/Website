# Vehicle Keys Config Examples

## Minimal Setup

```lua
Config.LockOnEngineOff = true
Config.AllowSharedKeys = true
Config.MaxSharesPerVehicle = 3
```

## Strict Roleplay Setup

```lua
Config.LockOnEngineOff = true
Config.AllowSharedKeys = false
Config.MaxSharesPerVehicle = 1
Config.PoliceBypass = true
```

## Notes

- Keep `MaxSharesPerVehicle` low for better key security.
- Set `PoliceBypass` only if police tools integration is installed.
