# Busyness Configuration

```lua
Config = {}

-- Enable extra debug output and zone helpers while developing.
Config.Debug = false

-- lb-phone custom app settings.
Config.LbPhoneApp = {
    -- Set to false to prevent the lb-phone app from being registered.
    Enabled = true,
}

-- Used by the React UI bridge and any resource-name-dependent callbacks.
Config.ResourceName = 'metaden-busyness'

-- Management panel settings for employees/managers of a configured business.
Config.Management = {
    -- Chat/console command used to open the management UI.
    Command = 'businesspanel',
    -- Maximum number of recent sale/withdraw log rows returned to the owner UI.
    MaxLogRows = 50,
    Target = {
        -- Sphere zone size around managementCoords.
        Radius = 1.6,
        -- Interaction distance once inside the sphere zone.
        Distance = 2.0,
        -- ox_target icon shown to employees.
        Icon = 'fas fa-store',
        -- ox_target label shown to employees.
        Label = 'Open Business Panel',
    },
}

-- Settings for the public store ped placed by managers/admins.
Config.StorePed = {
    -- Outer lib.point radius used to decide when the local ped should exist.
    SpawnRadius = 30.0,
    -- Inner distance used to actually spawn the ped once a player is close enough.
    SpawnDistance = 15.0,
    -- Maximum distance from the business management point where the storefront ped may be placed.
    MaxPlacementDistance = 35.0,
    -- How close a player must be to interact with the public store ped.
    InteractionDistance = 2.0,
    -- Fallback model if a business does not define its own storePedModel.
    DefaultModel = 's_f_y_shop_mid',
    -- Idle scenario the ped will loop while waiting for customers.
    Scenario = 'WORLD_HUMAN_STAND_IMPATIENT',
    -- Preview offset in front of the player while placing the ped.
    PreviewDistance = 2.5,
    Target = {
        -- ox_target icon shown on the public storefront ped.
        Icon = 'fas fa-basket-shopping',
        -- ox_target label shown on the public storefront ped.
        Label = 'Browse Store',
    },
}

-- Settings for admin-placed crafting stations.
Config.CraftingStations = {
    -- Maximum distance from the business management point where a station may be placed.
    MaxPlacementDistance = 35.0,
    Target = {
        -- Interaction area radius for the crafting station.
        Radius = 1.5,
        -- ox_target interaction distance once inside the area.
        Distance = 2.0,
        Icon = 'fas fa-hammer',
        Label = 'Make',
    },
    Preview = {
        RayDistance = 8.0,
        ImpactSize = 0.12,
    },
    CraftingAnimation = {
        dict = 'mini@repair',
        clip = 'fixing_a_player',
    },
}

-- Settings for admin-placed billing registers and register-bound invoices.
Config.Registers = {
    -- Maximum distance from the business management point where a register may be placed.
    MaxPlacementDistance = 35.0,
    -- How far away the area marker stays visible while nearby.
    MarkerDistance = 18.0,
    Preview = {
        -- Max distance the aim-based preview ray checks for a valid hit point.
        RayDistance = 8.0,
        -- Small impact dot drawn where the aim preview ray lands.
        ImpactSize = 0.12,
        -- Visual sphere size for the placement preview. Keep this smaller than the live target area.
        SphereSize = 5.0,
        -- Ground-disc size for the placement preview. Use 10.0 as an upper bound before it feels oversized.
        DiscSize = 5.0,
    },
    Target = {
        -- Interaction area radius for both employee and customer bill actions.
        Radius = 1.35,
        -- ox_target interaction distance once inside the area.
        Distance = 2.0,
        EmployeeIcon = 'fas fa-file-invoice-dollar',
        EmployeeLabel = 'Create Bill',
        CustomerIcon = 'fas fa-credit-card',
        CustomerLabel = 'Pay Bill',
    },
    Billing = {
        -- Max player distance used when building the nearby bill target list.
        NearbyPlayerDistance = 6.0,
        -- Restrict each customer to one open bill per register at a time.
        AllowMultipleOpenBillsPerTarget = false,
        -- Hard cap for the free-text description stored in the audit trail.
        MaxDescriptionLength = 180,
    },
}

-- ACE-gated admin panel settings for cross-business control.
Config.Admin = {
    -- Chat/console command used to open the admin UI.
    Command = 'busynessadmin',
    -- ACE permission required to access admin callbacks and UI.
    AcePermission = 'metaden.busyness.admin',
    -- Maximum number of recent rows returned to the admin audit view.
    MaxLogRows = 100,
}

-- NPC customer spawn timing for the original employee-served sales loop.
Config.CustomerSpawnInterval = 300000
Config.MaxCustomers = 1
Config.CustomerLifetime = 600000
Config.WaveDistance = 3.0
Config.InteractionDistance = 2.0

-- Random NPC order generation rules.
Config.CustomerOrder = {
    -- Minimum unique items per NPC order.
    MinItems = 1,
    -- Maximum unique items per NPC order.
    MaxItems = 3,
    -- Minimum quantity per selected item.
    MinQuantity = 1,
    -- Maximum quantity per selected item.
    MaxQuantity = 3,
}

-- Delivery board settings for employee-run dropoff orders.
Config.DeliveryOrders = {
    -- Maximum number of active orders per business.
    MaxActive = 10,
    -- Time between new order slots once a business queue drops below the cap.
    RefillIntervalMinutes = 10,
    -- Extra percent added on top of the item subtotal for delivery pay.
    DeliveryFeePercent = 15,
    -- Outer lib.point radius used to decide when the recipient ped should exist.
    SpawnRadius = 30.0,
    -- Inner distance used to actually spawn the recipient ped once a player is close enough.
    SpawnDistance = 15.0,
    RecipientScenario = 'WORLD_HUMAN_STAND_MOBILE',
    Target = {
        Icon = 'fas fa-box',
        Label = 'Deliver Order',
        Distance = 2.0,
    },
    Reward = {
        -- 'money' pays through QBX money accounts, 'item' gives ox_inventory items.
        type = 'money',
        -- Used when type = 'money'.
        moneyType = 'cash',
        -- Used when type = 'item'.
        itemName = 'money',
    },
    DistanceBonus = {
        -- Enable extra payout for longer delivery routes.
        Enabled = true,
        -- No distance bonus is paid until the route is longer than this many GTA units.
        MinimumDistance = 3500.0,
        -- Each step past MinimumDistance adds BonusPerStep to the payout.
        DistanceStep = 2000.0,
        BonusPerStep = 20,
        -- Set to 0 for no cap.
        MaxBonus = 150,
        -- Leave false to use 2D map distance. Set true if height should count.
        UseZ = false,
    },
    -- Global fallback dropoff list. Businesses can override this with deliveryDestinations.
    Destinations = {
        { label = 'Legion Square', coords = vec4(195.29, -932.74, 30.69, 234.92) },
        { label = 'Alta Apartments', coords = vec4(-270.88, -957.21, 31.22, 213.44) },
        { label = '7611 Goma Street', coords = vec4(-1149.64, -1522.25, 9.63, 226.13) },
        { label = "Magellan Ave", coords = vec4(-1300.5, -1233.3, 3.49, 292.65)},
        { label = 'Little Seoul', coords = vec4(-683.34, -876.18, 23.5, 173.97) },
        { label = "Imagination Ct", coords = vec4(-1114.18, -1069.3, 1.15, 33.11)},
        { label = "Forum Drive", coords = vec4(16.65, -1443.96, 29.95, 144.72)},
        { label = "Forum Drive", coords = vec4(-64.35, -1449.67, 31.52, 182.4)},
        { label = "Chamberlain Hills", coords = vec4(-161.17, -1638.62, 33.03, 333.82)},
        { label = "Grove Street", coords = vec4(76.52, -1948.32, 20.17, 264.6)},
        { label = "Roy Lowenstein", coords = vec4(165.01, -1945.13, 19.24, 252.18)},
        { label = "Rancho", coords = vec4(365.19, -2064.67, 20.74, 57.42)},
        { label = "El Burro Heights", coords = vec4(1245.39, -1626.82, 52.28, 44.51)},
        { label = "Mirror Park", coords = vec4(965.32, -542.25, 58.53, 208.04)},
        { label = "Rockford Hills", coords = vec4(-812.67, 111.19, 59.81, 179.59)},
        { label = "2862 Vinewood Hills", coords = vec4(-685.92, 596.35, 142.64, 42.33)},
        { label = "Vinehood Hills", coords = vec4(-597.03, 764.16, 188.12, 216.88)},
        { label = "Vinehood Hills", coords = vec4(-85.6, 834.74, 234.92, 100.57)},
        { label = "Vinehood Hills Tower", coords = vec4(781.47, 1274.49, 360.28, 277.19)},
        { label = "Grand Senora Desert Farm", coords = vec4(1535.72, 2231.87, 76.7, 96.92)},
        { label = "Commune", coords = vec4(2359.53, 2541.84, 46.7, 196.43)},
        { label = "Sandy Shores", coords = vec4(1763.94, 3823.61, 33.77, 47.03)},
        { label = "7184 Sandy Shores", coords = vec4(1728.42, 3851.82, 33.79, 216.52)},
        { label = "7509 Sandy Shores", coords = vec4(1808.89, 3908.02, 32.73, 203.32)},
        { label = "Grape Seed", coords = vec4(2728.62, 4141.88, 43.29, 82.86)},
        { label = "Grape Seed Town", coords = vec4(1682.77, 4689.54, 42.07, 274.02)},
        { label = "Paleto Bay", coords = vec4(-246.01, 6414.07, 30.46, 162.36)},
        { label = "Paleto Bay", coords = vec4(35.49, 6663.16, 31.19, 164.17)},
        { label = "Barbareno Road", coords = vec4(-3219.93, 1138.11, 8.9, 152.43)},
        { label = "Ineseno Road", coords = vec4(-3093.79, 349.4, 6.54, 247.19)},
    }        
}

-- Default runtime values used when a business is first seeded into the database.
Config.BusinessDefaults = {
    NpcEnabled = true,
    EmployeePayoutPercent = 20,
    MinStockGrade = 1,
    MinWithdrawGrade = 3,
    MinManageGrade = 3,
    MaxCustomers = 1,
}

-- Ped models used for roaming NPC customers. These are unrelated to the store ped.
Config.CustomerPeds = {
    'a_f_m_bevhills_02',
    'a_f_m_downtown_01',
    'a_f_o_genstreet_01',
    'a_f_y_business_01',
    'a_f_y_business_02',
    'a_f_y_eastsa_02',
    'a_m_m_bevhills_02',
    'a_m_m_afriamer_01',
    'a_m_m_genfat_02',
    'a_m_m_eastsa_02',
    'a_m_m_malibu_01',
    'a_m_y_busicas_01',
    'a_m_y_genstreet_01',
    'a_m_y_vinewood_01'
}

--
-- Business seed data
--
-- Each business here is seeded into the database on resource start.
-- The database becomes the source of truth for live settings like:
--   - payout split
--   - item catalog and menu selection
--   - stock levels
--   - storefront ped placement
--
-- What you should configure here:
--   - name/job identifiers
--   - world coordinates
--   - default storefront ped model
--   - seed item list and default/max prices
--
-- name:
--   Internal business key. Keep this stable once a business is live.
-- job:
--   Qbox job name that owns/manages this business.
-- coords:
--   Main employee service point for NPC orders.
-- managementCoords:
--   Where employees can open the management panel via ox_target.
-- storePedModel:
--   Default public storefront ped model for this business.
-- deliveryDestinations:
--   Optional per-business dropoff override list.
-- spawnPoints:
--   Possible NPC customer spawn positions.
-- path:
--   Optional walking path points NPC customers follow toward the counter.
-- items:
--   Seed/default items for this business.
--   Admins can later add, edit, hide, or delete live catalog items from the admin panel.
--   New in-game catalog entries must already exist in ox_inventory.
--
Config.Businesses = {
    {
        name = 'burgershot',
        label = 'Burger Shot',
        job = 'burgershot',
        storePedModel = 's_f_y_shop_mid',
        coords = vec3(-1189.7, -894.26, 13.8),
        managementCoords = vec3(-1189.7, -894.26, 13.8),
        heading = 120.0,
        spawnPoints = {
            vec3(-1197.41, -884.75, 13.8),
        },
        path = {
            vec4(-1196.89, -886.31, 13.8, 210.92),
            vec4(-1195.79, -888.09, 13.8, 215.33),
            vec4(-1192.66, -891.25, 13.8, 230.49),
            vec4(-1189.75, -894.25, 13.8, 222.57),
        },
        deliveryDestinations = {},
        items = {
            -- defaultPrice is the seeded live price.
            -- maxPrice is the admin ceiling managers cannot exceed.
            { name = 'burger', label = 'Burger', defaultPrice = 25, maxPrice = 40 },
            { name = 'sprunk', label = 'Sprunk', defaultPrice = 5, maxPrice = 15 },
            { name = "water", label = "Water", defaultPrice = 5, maxPrice = 15 },
        },
    },
    {
        name = 'vanillaunicorn',
        label = 'Vanilla Unicorn',
        job = 'vanillaunicorn',
        storePedModel = 'a_f_y_topless_01',
        coords = vec3(127.97, -1284.89, 29.28),
        managementCoords = vec3(95.27, -1293.41, 28.27),
        heading = 326.72,
        spawnPoints = {
            vec3(130.16, -1295.59, 29.28),
            vec3(114.98, -1296.4, 29.28)
        },
        path = {
            vec4(127.37, -1289.94, 29.28, 31.23),
            vec4(127.71, -1285.41, 29.28, 294.31)
        },
        deliveryDestinations = {},
        items = {
            { name = 'panties', label = 'Panties', defaultPrice = 5, maxPrice = 25 },
            { name = 'burger', label = 'Burger', defaultPrice = 25, maxPrice = 40 },
            { name = 'sprunk', label = 'Sprunk', defaultPrice = 5, maxPrice = 15 },
            { name = "water", label = "Water", defaultPrice = 5, maxPrice = 15 },
            -- Add more seed items here.
        },
    },
    -- Add more businesses here.
}

-- Fast lookup table used internally by the script.
Config.BusinessIndex = {}
for _, business in ipairs(Config.Businesses) do
    Config.BusinessIndex[business.name] = business
    if business.job and business.job ~= '' then
        Config.BusinessIndex[business.job] = business
    end
end

-- Derived list of configured business jobs.
Config.BusinessJobs = {}
for _, business in ipairs(Config.Businesses) do
    Config.BusinessJobs[#Config.BusinessJobs + 1] = business.job or business.name
end

-- Helper for looking up a configured business by name/job key.
function Config.GetBusinessByName(name)
    return Config.BusinessIndex[name]
end

```