# MetaDen Restorations Configuration

```lua
Config = {
    -- Radius for restoration streaming zones (client creates sphere zones per wreck).
    ZoneRadius = 20,
    -- Enables extra debug visuals/logging in supported client-side systems.
    Debug = true,
    -- Optional reputation gain when adding materials.
    ReputationAwards = {
        Enabled = true,
        Chance = 30,
        Amount = 1,
        System = 'skills',
        Categories = {
            'education_engineering',
            'scrapping',
        },
    },
    -- Default work duration for timed restoration actions (milliseconds).
    WorkDuration = 60000,
    -- Progress weighting between material groups.
    -- Raw materials are treated as bulk resources and contribute less to total completion.
    ProgressWeights = {
        RawMaterials = 0.20,
        Parts = 0.80,
    },
    -- Pre-completion: randomly pre-fill a percentage of the required material/part slots
    -- when a new wreck is created, giving the player a head start.
    --
    --   Enabled       – set to false to disable pre-completion entirely.
    --   MinPercent    – minimum percentage of required slots that will be pre-filled (0–100).
    --   MaxPercent    – maximum percentage of required slots that will be pre-filled (0–100).
    --
    -- A random percentage is picked between Min and Max and applied to the slot count for
    -- that wreck type.  Each chosen slot is filled with a random amount between 1 and its
    -- required count (partial fill). The selection always guarantees at least one raw-material
    -- slot AND at least one part slot when enough slots are being pre-filled and both
    -- categories exist for the wreck type.
    --
    -- TraderWreck values should be higher than WorldWreck values so bought wrecks feel more
    -- complete from the start.
    PreCompletion = {
        Enabled = true,
        -- Wrecks discovered and started in the open world (beginRestoration).
        WorldWreck = {
            MinPercent = 0,
            MaxPercent = 5,
        },
        -- Wrecks purchased from the trader (buyWreck).
        TraderWreck = {
            MinPercent = 10,
            MaxPercent = 30,
        },
    },
    -- Global cap for active restorations per player.
    MaxWrecksPerPlayer = 1,
    -- Per-role override for MaxWrecksPerPlayer (role name keys are normalized to lowercase).
    -- Example: mechanic = 3
    MaxWrecksByRole = {
        -- mechanic = 3,
    },
    -- Admin command for adding one-time model entries consumed by future restorations.
    AdminModelCommand = {
        Name = 'restoration_addmodel',
        AcePermission = 'metaden.restoration.admin',
    },
    -- Command to open the admin NUI panel.
    AdminUiCommand = {
        Name = 'restoration_admin',
        AcePermission = 'metaden.restoration.admin',
    },
    -- Maps the currency labels stored in the DB to how payment is actually processed.
    --   value  = the real money-type or item name your framework uses
    --   item   = true  → deduct via ox_inventory item removal
    --            false → deduct via framework money account (GetMoney/RemoveMoney)
    -- Example for QBX + ox_inventory where wallet cash is the 'money' item:
    --   cash = { value = 'money', item = true }
    --   bank = { value = 'bank',  item = false }
    CurrencyMap = {
        cash = { value = 'money', item = true  },
        bank = { value = 'bank',  item = false },
    },
    -- Deletes stale restorations on resource start when > 0 (age measured from updatedAt).
    -- Set to 0 to disable expiration cleanup.
    ExpirationDays = 0,
    -- Bike Models
    BikeModels = {
        'zombieb',
        'nemesis',
        'hexer',
        'avarus',
        'enduro',
        'wolfsbane',
        'akuma',
        'carbonrs',
        'chimera',
    },
    -- Car Models
    CarModels = {
        'banshee2',
        'nero2',
        'furia',
        'stafford',
        'superd',
        'f620',
        'blade',
        'chino2',
        'buccaneer2',
        'eudora',
        'hermes',
        'gauntlet3',
        'impaler2',
        'btype',
        'mamba',
        'coquette'


    },
    PickupModels = {
        'rebel',
        'yosemite3',
        'driftyosemite',
        'slamvan3',
        'picador',
        'bison',
        'bobcatxl'

    },
    VanModels = {
        'boxville',
        'burrito3',
        'journey2',
        'gburrito2',
        'speedo5',
        'youga2'

    },
    -- Tow truck models that can hook/winch wrecks. Need to 
    -- have a bed so the wreck can be attached to it.
    TowTruckModels = {
        `flatbed`,
        `slamtruck`,
    },
    -- Engine hoist prop model used when moving wrecks via hoist.
    EngineHoistModel = `prop_engine_hoist`,
    -- Hoist placement when carried by the player.
    HoistCarryPlacement = {
        pos = vector3(0.0, 0.5, 1.2),
        rot = vector3(0.0, -215.0, -100.0),
    },
    -- Wreck placement when attached to the hoist.
    HoistWreckPlacement = {
        -- pos = vector3(0.0, 1.35, -0.65),
        -- rot = vector3(0.0, 0.0, 0.0),
        pos = vector3(0.0, -2.35, 0.15),
        rot = vector3(0.0, 0.0, 0.0),
    },
    -- Wreck placement when released from the hoist (world offset from hoist entity).
    HoistReleasePlacement = {
        pos = vector3(0.0, 2.4, -0.35),
        rot = vector3(0.0, 0.0, 0.0),
    },
    -- Prevent ped/wreck physics shove immediately after release.
    HoistReleaseNoCollisionMs = 650,
    -- Target interaction distances for hoist/flatbed actions.
    HoistTargetDistance = 2.5,
    FlatbedReleaseDistance = 3.0,
    -- Wreck/prop models used for interaction targets.
    WreckedVehicles = {
        `prop_rub_carwreck_2`,
        `prop_rub_carwreck_5`,
        `prop_rub_carwreck_7`,
        `prop_rub_carwreck_8`,
        `prop_rub_carwreck_11`,
        `prop_rub_carwreck_12`,
        `prop_rub_carwreck_13`,
        `prop_rub_carwreck_14`,
        `prop_rub_carwreck_15`,
        `prop_rub_carwreck_16`,
        `prop_rub_carwreck_17`,
    },
    WreckedBikes = {
        `prop_rub_bike_03`,
    },
    ScrapDoors = {
        `prop_car_door_01`,
        `prop_car_door_04`,
        `prop_rub_carpart_02`,
        `prop_rub_carpart_03`,
        `prop_car_door_03`,
    },
    ScrapExhaust = {
        `prop_rub_carpart_04`,
    },
    ScrapHoist = {
        `prop_engine_hoist`,
    },
    ScrapSeats = {
        `prop_rub_carpart_05`,
    },
    ScrapTires = {
        `prop_rub_tyre_02`,
        `prop_rub_tyre_03`,
        `v_ind_cm_tyre02`,
        `prop_rub_tyre_01`,
    },
    -- Target interaction labels, icons, and enabled flags.
    -- Set enabled = false to completely skip registering that target.
    Targets = {
        ScrapDoor           = { enabled = true, label = 'Search Door',          icon = 'fa-solid fa-search'        },
        ScrapExhaust        = { enabled = true, label = 'Search Exhaust',       icon = 'fa-solid fa-search'        },
        ScrapHoist          = { enabled = true, label = 'Take Engine Hoist',    icon = 'fa-solid fa-search'        },
        ScrapSeat           = { enabled = true, label = 'Search Seat',          icon = 'fa-solid fa-search'        },
        ScrapTire           = { enabled = true, label = 'Search Tire',          icon = 'fa-solid fa-search'        },
        SearchWreck         = { enabled = true, label = 'Search Wreck',         icon = 'fa-solid fa-search'        },
        HookWreck           = { enabled = true, label = 'Hook Wreck',           icon = 'fa-solid fa-chain'         },
        HookEngineHoist     = { enabled = true, label = 'Hook Engine Hoist',    icon = 'fa-solid fa-chain'         },
        ReleaseHoistWreck   = { enabled = true, label = 'Release Wreck',        icon = 'fa-solid fa-chain-broken'  },
        WinchWreck          = { enabled = true, label = 'Winch Wreck',          icon = 'fa-solid fa-car-crash'     },
        ReleaseFlatbedWreck = { enabled = true, label = 'Release Wreck',        icon = 'fa-solid fa-chain-broken'  },
        BeginRestoration    = { enabled = true, label = 'Begin Restoration',    icon = 'fa-solid fa-chain'         },
        RestorePart         = { enabled = true, label = 'Restore Part',         icon = 'fa-solid fa-tools'         },
    },
    -- Base material state template used when a new restoration starts.
    -- Keep keys in sync with each vehicle type table below (Bike/Car/Pickup/Van).
    Materials = {
        glass = 0,
        plastic = 0,
        rubber = 0,
        aluminum = 0,
        steel = 0,
        metal = 0,
        carbon = 0,
        -- Parts
        seats = 0,
        engine = 0,
        sparkPlugs = 0,
        battery = 0,
        axle = 0,
        tires = 0,
        oil = 0,
        turbo = 0,
        transmission = 0,
        brakes = 0,
        suspension = 0,
        oilPump = 0,
        driveShaft = 0,
        cylinderHead = 0,
        batteryCables = 0,
        fuelTank = 0,
        hood = 0,
        roof = 0,
        bumper = 0,
        exhaust = 0,
        horn = 0,
        rims = 0,
        cardoor = 0,
    },
    -- Maps logical material keys to inventory item names.
    -- Used both for consuming materials and displaying progress labels.
    MaterialToItemMap = {
        seats = 'seat',
        sparkPlugs = 'sparkplugs',
        axle = 'axleparts',
        tires = 'tire',
        oil = 'oil',
        transmission = 'transmission',
        brakes = 'brakes',
        suspension = 'suspension',
        oilPump = 'oil_pump',
        driveShaft = 'drive_shaft',
        cylinderHead = 'cylinder_head',
        batteryCables = 'battery_cables',
        fuelTank = 'fuel_tank',
        metal = 'metalscrap',
        battery = 'battery',
    },
    -- Optional reverse-map overrides when itemName->material resolution is ambiguous.
    ItemToMaterialOverrides = {},
    -- Items treated as raw materials (no Condition metadata required for consumption).
    RawMaterials = {
        metalscrap = true,
        aluminum = true,
        steel = true,
        glass = true,
        plastic = true,
        rubber = true,
        fiber = true,
        wires = true,
        copper = true,
        carbon = true,
        oil = true,
        sparkplugs = true,
        battery = true,
    },
    -- Model swap rules when specific material milestones complete.
    -- `model = '__current__'` means "do not swap model at this milestone".
    -- For those types, progression updates state/progress only until a later milestone swaps the prop.
    StageTransitions = {
        Car = {
            cardoor = { stage = 'doors', model = `prop_rub_carwreck_11` },
            glass = { stage = 'glass', model = `prop_rub_carwreck_14` },
            tires = { stage = 'last', model = `imp_prop_covered_vehicle_03a` },
        },
        Pickup = {
            cardoor = { stage = 'doors', model = '__current__' },
            glass = { stage = 'glass', model = '__current__' },
            tires = { stage = 'last', model = `imp_prop_covered_vehicle_04a` },
        },
        Van = {
            cardoor = { stage = 'doors', model = '__current__' },
            glass = { stage = 'glass', model = '__current__' },
            tires = { stage = 'last', model = `imp_prop_covered_vehicle_07a` },
        },
        Bike = {
            cardoor = { stage = 'doors', model = '__current__' },
            glass = { stage = 'glass', model = `ratbike` },
            tires = { stage = 'last', model = `prop_box_wood04a` },
        },
    },
    -- Optional UI label overrides for material names.
    MaterialLabelOverrides = {
        cardoor = 'Car Door',
        metal = 'Metal Scrap',
    },
    -- Restoration menu sections by wreck type.
    -- Resolution order in client menu builder:
    -- 1) MaterialMenuSectionsByType[wreckType]
    -- 2) MaterialMenuSectionsByType.Default
    -- 3) Auto-generated fallback section
    -- Keep per-type tables empty to inherit `Default`.
    MaterialMenuSectionsByType = {
        Default = {
            {
                id = 'raw_materials',
                title = 'Raw Materials',
                icon = 'fa-solid fa-box-open',
                definitions = {
                    { material = 'glass', workType = 'body', checkInventory = true, dependencies = { 'cardoor' } },
                    { material = 'plastic', workType = 'body', checkInventory = true },
                    { material = 'rubber', workType = 'body', checkInventory = true },
                    { material = 'aluminum', workType = 'body', checkInventory = true },
                    { material = 'steel', workType = 'body', checkInventory = true, inventoryItem = 'steel' },
                    { material = 'metal', workType = 'body', checkInventory = true },
                    { material = 'carbon', workType = 'body', checkInventory = true },
                },
            },
            {
                id = 'section_hood',
                title = 'Work Under the Hood',
                icon = 'fa-solid fa-tools',
                definitions = {
                    { material = 'engine', workType = 'engine' },
                    { material = 'cylinderHead', workType = 'engine', dependencies = { 'engine' } },
                    { material = 'oilPump', workType = 'engine', dependencies = { 'engine' } },
                    { material = 'transmission', workType = 'engine', dependencies = { 'engine' } },
                    { material = 'sparkPlugs', workType = 'engine', dependencies = { 'engine' } },
                    { material = 'turbo', workType = 'engine', dependencies = { 'engine' } },
                    { material = 'battery', workType = 'engine', dependencies = { 'engine' } },
                    { material = 'oil', workType = 'engine', dependencies = { 'oilPump' } },
                },
            },
            {
                id = 'section_undercarriage',
                title = 'Work on the Undercarriage',
                icon = 'fa-solid fa-car',
                definitions = {
                    { material = 'axle', workType = 'under', checkInventory = true },
                    { material = 'tires', workType = 'under', checkInventory = true, dependencies = { 'rims' } },
                    { material = 'suspension', workType = 'under', checkInventory = true, dependencies = { 'axle' } },
                    { material = 'driveShaft', workType = 'under', checkInventory = true, dependencies = { 'suspension', 'transmission' } },
                    { material = 'exhaust', workType = 'under', checkInventory = true },
                    { material = 'fuelTank', workType = 'under', checkInventory = true },
                    { material = 'brakes', workType = 'under', checkInventory = true, dependencies = { 'suspension' } },
                    { material = 'batteryCables', workType = 'engine', checkInventory = true, dependencies = { 'battery' } },
                },
            },
            {
                id = 'section_bodywork',
                title = 'Work on the Bodywork',
                icon = 'fa-solid fa-paint-roller',
                definitions = {
                    { material = 'hood', workType = 'body', checkInventory = true },
                    { material = 'roof', workType = 'body', checkInventory = true },
                    { material = 'bumper', workType = 'body', checkInventory = true },
                    { material = 'rims', workType = 'body', checkInventory = true, dependencies = { 'suspension' } },
                    { material = 'cardoor', workType = 'body', checkInventory = true },
                },
            },
            {
                id = 'section_interior',
                title = 'Work on the Interior',
                icon = 'fa-solid fa-couch',
                definitions = {
                    { material = 'seats', workType = 'body', checkInventory = true },
                    { material = 'horn', workType = 'body', checkInventory = true },
                },
            },
        },
        Car = {
            {
                id = 'section_undercarriage',
                title = 'Work on the Undercarriage',
                icon = 'fa-solid fa-car',
                definitions = {
                    { material = 'axle', workType = 'under', checkInventory = true },
                    { material = 'tires', workType = 'under', checkInventory = true, dependencies = { 'rims', 'cardoor', 'glass' } },
                    { material = 'suspension', workType = 'under', checkInventory = true, dependencies = { 'axle' } },
                    { material = 'driveShaft', workType = 'under', checkInventory = true, dependencies = { 'suspension', 'transmission' } },
                    { material = 'exhaust', workType = 'under', checkInventory = true },
                    { material = 'fuelTank', workType = 'under', checkInventory = true },
                    { material = 'brakes', workType = 'under', checkInventory = true, dependencies = { 'suspension' } },
                    { material = 'batteryCables', workType = 'engine', checkInventory = true, dependencies = { 'battery' } },
                },
            },
        },
        Bike = {},
        Pickup = {},
        Van = {},
    },
    -- Total required materials/parts for Bike restorations.
    Bike = {
        glass = 0,
        plastic = 1000,
        rubber = 500,
        aluminum = 200,
        steel = 200,
        metal = 200,
        carbon = 100,
        -- Parts
        rims = 2,
        seats = 2,
        engine = 1,
        sparkPlugs = 4,
        battery = 1,
        axle = 1,
        tires = 2,
        oil = 1,
        turbo = 1,
        transmission = 1,
        brakes = 2,
        suspension = 2,
        oilPump = 1,
        driveShaft = 2,
        cylinderHead = 1,
        batteryCables = 1,
        fuelTank = 1,
        hood = 0,
        roof = 0,
        bumper = 0,
        exhaust = 1,
        horn = 1,
        cardoor = 0,
    },
    -- Total required materials/parts for Car restorations.
    Car = {
        glass = 2000,
        plastic = 4000,
        rubber = 6000,
        aluminum = 500,
        steel = 1000,
        metal = 3000,
        carbon = 500,
        -- Parts
        rims = 4,
        seats = 4,
        engine = 1,
        sparkPlugs = 4,
        battery = 1,
        axle = 2,
        tires = 4,
        oil = 1,
        turbo = 1,
        transmission = 1,
        brakes = 4,
        suspension = 4,
        oilPump = 1,
        driveShaft = 2,
        cylinderHead = 1,
        batteryCables = 1,
        fuelTank = 1,
        hood = 1,
        roof = 1,
        bumper = 2,
        exhaust = 1,
        horn = 1,
        cardoor = 4,
    },
    -- Total required materials/parts for Pickup restorations.
    Pickup = {
        glass = 2000,
        plastic = 4000,
        rubber = 6000,
        aluminum = 500,
        steel = 1000,
        metal = 3000,
        carbon = 500,
        -- Parts
        rims = 4,
        seats = 4,
        engine = 1,
        sparkPlugs = 4,
        battery = 1,
        axle = 2,
        tires = 4,
        oil = 1,
        turbo = 1,
        transmission = 1,
        brakes = 2,
        suspension = 2,
        oilPump = 1,
        driveShaft = 2,
        cylinderHead = 1,
        batteryCables = 1,
        fuelTank = 1,
        hood = 1,
        roof = 1,
        bumper = 2,
        exhaust = 1,
        horn = 1,
        cardoor = 2,
    },
    -- Total required materials/parts for Van restorations.
    Van = {
        glass = 3000,
        plastic = 5000,
        rubber = 7000,
        aluminum = 1000,
        steel = 2000,
        metal = 4000,
        carbon = 1000,
        -- Parts
        rims = 4,
        seats = 4,
        engine = 1,
        sparkPlugs = 4,
        battery = 1,
        axle = 2,
        tires = 4,
        oil = 1,
        turbo = 1,
        transmission = 1,
        brakes = 2,
        suspension = 2,
        oilPump = 1,
        driveShaft = 2,
        cylinderHead = 1,
        batteryCables = 1,
        fuelTank = 1,
        hood = 1,
        roof = 1,
        bumper = 2,
        exhaust = 1,
        horn = 1,
        cardoor = 4,
    },
    MinAmount = 1,         -- Minium amount of materials the player gets when searching stuff
    MaxAmount = 8,         -- Maximum amount of materials the player gets when searching stuff
    CarPartChance = 2,     -- Chance of getting a car part when searching a car % chance
    SearchTimeout = 60000, -- Time in ms before the player can search again (1min)
    -- Optional skill-based bonus for scrap search rewards.
    -- Relies on `metaden-skills` script, if unavailable, rewards use base values only.
    SearchRewardModifiers = {
        Resource = 'metaden-skills',
        FlatBonus = 0,
        MaxBonus = 8,
        -- Multi-skill modifiers.
        -- Each entry adds: level * multiplier
        Skills = {
            { name = 'scrapping', multiplier = 1.0 },
            { name = 'education_engineering', multiplier = 0.35 },
        },
        -- Inventory item bonus modifiers.
        -- If the player has an item count > 0, its bonus is added.
        -- Supports fractional values (for example 0.25, 0.5).
        ItemBonuses = {
            WEAPON_SCREWDRIVER = 1,
            WEAPON_WRENCH = 1,
            WEAPON_HAMMER = 1,
            anglegrinder = 5,
            screwdriverset = 1,
        },
    },
    -- Scrap search rewards per scrap type.
    -- Parts list is used when the part drop chance hits.
    -- Materials list is used otherwise.
    ScrapSearchRewards = {
        vehicle = {
            parts = {
                'hood',
                'bumper',
                'rims',
                'axleparts',
                'engine',
                'sparkplugs',
                'drive_shaft',
                'cylinder_head',
                'fuel_tank',
                'roof',
                'horn',
                'suspension',
                'transmission',
            },
            materials = { 'aluminum', 'steel', 'glass', 'plastic', 'rubber', 'fiber', 'wires', 'copper' },
        },
        exhaust = {
            parts = { 'exhaust' },
            materials = { 'steel', 'aluminum' },
        },
        seats = {
            parts = { 'seat' },
            materials = { 'fiber', 'plastic', 'rubber' },
        },
        tires = {
            parts = { 'tire' },
            materials = { 'rubber', 'plastic', 'wires' },
        },
        door = {
            parts = { 'cardoor' },
            materials = { 'aluminum', 'steel', 'glass', 'plastic' },
        },
    },
    -- Controls who can interact with the part-restoration bench.
    -- Set OpenToAll = true to bypass job and skill checks entirely.
    CraftingBenchAccess = {
        OpenToAll         = false,
        -- Job type/name values allowed to use the bench.
        JobWhitelist      = { 'mechanic' },
        -- Minimum scrapping level required (0 = no skill requirement).
        -- Uses the level number as reported by metaden-skills, not raw XP.
        MinScrappingLevel = 5,
    },
    -- Part-restoration bench zones (used for repairing broken parts to Condition=100%).
    CraftingZones = {
        -- LSC Zones
        { coords = vec4(-314.61, -157.33, 39.04 - 0.4, 253.75),   w = 1.4, d = 2.2, },
        { coords = vec4(-310.28, -145.19, 39.12 - 0.4, 255.76),   w = 1.4, d = 2.2, },
        { coords = vec4(-306.29, -135.03, 39.11 - 0.4, 258.35),   w = 1.4, d = 2.2, },
        { coords = vec4(-319.82, -119.97, 38.81 - 0.4, 335.43),   w = 1.4, d = 2.2, },
        -- HAYES AUTOS
        { coords = vec4(472.54, -1313.22, 29.21, 30.0),           w = 3.2, d = 1.0, },
        { coords = vec4(277.6436, -1817.0757, 26.8480, 240.1176), w = 3.2, d = 1.0, },
        -- ROUTE 68
        { coords = vec4(1176.69, 2635.44, 37.75, 270.0),          w = 3.2, d = 1.0 },
        -- Airport
        { coords = vec4(-1158.71, -2002.37, 13.18, 45.0),         w = 0.6, d = 3.8 },
        -- PitStop
        { coords = vec4(947.2392, -1552.2246, 30.7377, 354.1109), w = 1.4, d = 2.2, },
        { coords = vec4(943.3618, -1565.8771, 30.7377, 266.6957), w = 1.4, d = 2.2, },

    },
    MaterialsNeededForRenovateParts = {
        engine = {
            steel = 20,
            aluminum = 20,
            carbon = 10,
            rubber = 5,
        },
        axle = {
            steel = 20,
            metalscrap = 10,
            rubber = 30,
        },
        transmission = {
            steel = 20,
            aluminum = 20,
            rubber = 10,
        },
        turbo = {
            steel = 20,
            aluminum = 20,
            metalscrap = 35,
            carbon = 5,
        },
        brakes = {
            steel = 45,
            aluminum = 20,
            rubber = 20,
            metalscrap = 10,
        },
        suspension = {
            steel = 20,
            aluminum = 20,
            rubber = 20,
            metalscrap = 20,
        },
        oilPump = {
            steel = 30,
            aluminum = 10,
            rubber = 200,
            metalscrap = 50,
        },
        driveShaft = {
            steel = 50,
            aluminum = 20,
            rubber = 10,
            metalscrap = 10,
        },
        cylinderHead = {
            steel = 30,
            aluminum = 5,
            metalscrap = 20,
        },
        batteryCables = {
            wires = 50,
            rubber = 50,
            metalscrap = 10,
        },
        fuelTank = {
            steel = 30,
            plastic = 20,
        },
        hood = {
            steel = 50,
            plastic = 30,
            carbon = 5,
        },
        roof = {
            steel = 20,
            plastic = 30,
            carbon = 5,
        },
        bumper = {
            aluminum = 20,
            plastic = 30,
            carbon = 2,
            rubber = 10,
        },
        exhaust = {
            steel = 20,
            aluminum = 10,
            carbon = 10,
            metalscrap = 20,
        },
        horn = {
            steel = 5,
            wires = 20,
            plastic = 20,
        },
        rims = {
            aluminum = 20,
            rubber = 10,
            steel = 10,
        },
        cardoor = {
            steel = 20,
            aluminum = 10,
            rubber = 10,
            plastic = 30,
            glass = 20
        },
        tire = {
            rubber = 50,
            wires = 20,
        }
    },

    -- -----------------------------------------------------------------------
    -- Trader Ped: spawns near the player via lib.point and offers wreck purchases
    -- and restoration mission assignment.
    -- -----------------------------------------------------------------------
    TraderPed = {
        Enabled  = true,

        -- GTA ped model to use for the trader.
        Model    = 'a_m_m_hillbilly_01',

        -- Location of the trader ped (vec4: x, y, z, heading).
        -- Set these to wherever you want the NPC in your world.
        Coords   = vec4(2340.65, 3126.47, 48.21, 355.18),

        -- Distance at which lib.point starts tracking the ped zone.
        -- The ped itself is spawned once the player is within 15 m.
        SpawnRadius = 30.0,

        -- Where the wreck prop is placed after a player purchases it from the trader.
        -- Defaults to the first CraftingZone if not set.
        WreckDeliveryCoords = vec4(2347.17, 3133.91, 49.21, 260.4),

        -- Skills / mission integration (requires metaden-skills).
        Skills = {
            -- If true, a "Request Mission" option is shown on the ped target.
            -- Silently hides the option when metaden-skills is not running.
            Enabled  = true,

            -- Pool of restoration missions to assign randomly.
            -- 'id' must match an id defined in metaden-skills/server/missions_config.lua.
            -- 'title' is shown to the player in the notification.
            Missions = {
                { id = 'restoration_search_wrecks_10', title = 'Wreck Scavenger' },
                { id = 'restoration_restore_1_bike',   title = 'First Bike Rebuild' },
                { id = 'restoration_restore_5_cars',   title = 'Classic Rebuilder' },
                { id = 'restoration_fix_1_door',       title = 'Panel Beater' },
            },
        },
    },
}
```
