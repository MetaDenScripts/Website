# MetaDen Ladies of the Night Configuration

```lua
Config = {}

Config.Debug = false

-- lb-phone custom app settings.
Config.LbPhoneApp = {
    -- Set to false to prevent the lb-phone app from being registered.
    Enabled = true,
}

-- Maximum number of recruited peds a player can own.
Config.MaxRecruits = 5

-- Maximum number of peds that can follow a player at once.
Config.MaxFollowers = 3

-- Maximum distance allowed when giving care items to a ped.
Config.CareInteractionDistance = 2.0

-- Currency item name used for recruitment, hospital, and payouts.
Config.Currency = "money"

-- One-time cost to recruit a new ped.
Config.RecruitCost = 2500

-------------------------------------------------------------------------------
--  RECRUIT GIFT REQUIREMENT
-------------------------------------------------------------------------------
-- When recruiting, a random gift from this list is required (on top of money).
-- The system picks one entry at random and rolls an amount between min and max.
-- The gift item is consumed even if the charm roll fails.
Config.RecruitGifts = {
    { item = "wine",    min = 1, max = 3, label = "Wine" },
    { item = "perfume", min = 1, max = 2, label = "Perfume" },
    { item = "makeup",  min = 1, max = 2, label = "Makeup" },
    { item = "diamond_ring", min=1, max=1, label = "Diamond Ring" },
    { item = "rolex", min=1, max=2, label = "Rolex" },
    { item = "goldchain", min=1, max=3, label = "Gold Chain" },
}

-------------------------------------------------------------------------------
--  RECRUITABLE PED MODELS
-------------------------------------------------------------------------------
-- Hash or string model names that can be approached and recruited in the open world.
Config.RecruitableModels = {
    `a_f_m_bodybuild_01`,
    `a_f_m_fatcult_01`,
    `a_f_m_fatbla_01`,
    `a_f_m_fatwhite_01`,
    `a_f_m_skidrow_01`,
    `a_f_m_tramp_01`,
    `a_f_y_topless_01`,
    `a_f_y_bevhills_02`,
    `a_f_y_clubcust_02`,
    `a_f_y_genhot_01`,
    `a_f_y_eastsa_02`,
    `a_f_y_rurmeth_01`,
    `a_f_y_soucent_02`,
    `a_f_y_tourist_02`,
    `s_f_y_bartender_01`,
    `s_f_y_hooker_01`,
    `s_f_y_hooker_02`,
    `s_f_y_hooker_03`,
    `s_f_y_stripper_01`,
    `s_f_y_stripper_02`,
    `s_f_y_stripperlite`,
    -- Add more models as desired

}

-- Random names assigned to recruited peds.
Config.PedNames = {
    "Candy", "Diamond", "Crystal", "Roxy", "Amber",
    "Jade", "Scarlet", "Ruby", "Destiny", "Angel",
    "Misty", "Ginger", "Honey", "Tiffany", "Jasmine",
    "Star", "Luna", "Bella", "Cherry", "Violet",
    "Ivy", "Sofia", "Valentina", "Lola", "Aria",
    "Lexi", "Mercedes", "Chanel", "Raven", "Sapphire",
    "Monroe", "Savannah", "Paris",
}

-------------------------------------------------------------------------------
--  CLOTHING CHARM SCORE  (affects recruitment success rate)
-------------------------------------------------------------------------------
-- Player clothing is checked at recruitment time. Each matching component/prop
-- adds charm points. Total points translate to a success percentage.
--
-- Component IDs: 0=Head 1=Mask 2=Hair 3=Arms 4=Legs 5=Bag 6=Shoes 7=Accessories
--                8=Undershirt 9=Vest 10=Decals 11=Torso
-- Prop IDs:      0=Hat 1=Glasses 2=Ear 6=Watch 7=Bracelet

Config.CharmScore = {
    baseChance = 1,   -- minimum success % with zero charm points
    maxChance  = 95,   -- maximum possible success %
    pointsForMax = 60, -- charm points needed to reach maxChance

    -- Clothing components that grant charm points.
    components = {
        { componentId = 11, drawables = {525, 515, 421, 304, 293, 240, 102, 72, 70, 20}, points = 18, label = "Jacket" },
        { componentId = 8,  drawables = {46, 15, 60, 69, 7, 15, 31, 57},                 points = 6,  label = "Shirt" },
        { componentId = 4,  drawables = {10, 13, 20, 25},                                points = 10, label = "Pants" },
        { componentId = 6,  drawables = {10, 15, 18, 20, 21, 30, 40},                    points = 5,  label = "Shoes" },
        { componentId = 7,  drawables = {17,18,50, 137, 143  },                          points = 5,  label = "Tie / Chain" },
    },

    -- Accessory props that grant charm points.
    props = {
        { propId = 6, drawables = {10, 14, 30, 33,}, points = 5, label = "Watch" },
        { propId = 1, drawables = {5, 7, 8, 10, 12, 13, 44, 18, 19, 20, 21, 22, 23, 24, 25}, points = 5,  label = "Glasses" },
        { propId = 7, drawables = {2, 3, 11, 14},                                            points = 2,  label = "Bracelet" },
        { propId = 0, drawables = {12, 25, 30, 64, 172, 219,},                               points = 5,  label = "Hats" },
    },
}

-------------------------------------------------------------------------------
--  PED TRAIT STATS  (randomly rolled on recruit, impact earnings)
-------------------------------------------------------------------------------
-- Each stat is 0-100.  `min`/`max` define the random roll range on recruit.
-- `decay` is the rate multiplier for passive stat loss (0 = innate, never decays).
-- `weight` is how much this stat contributes to the income multiplier (should sum to 1.0).
Config.Stats = {
    beauty      = { min = 20, max = 100, decay = 1, weight = 0.25, label = "Beauty" },
    strength    = { min = 10, max = 100, decay = 1, weight = 0.05, label = "Strength" },
    seduction   = { min = 10, max = 100, decay = 1, weight = 0.20, label = "Seduction" },
    cleanliness = { min = 30, max = 100, decay = 3, weight = 0.15, label = "Cleanliness" },
    fatness     = { min = 10, max = 90,  decay = 0, weight = 0.10, label = "Body Shape" },
    charisma    = { min = 10, max = 100, decay = 2, weight = 0.25, label = "Charisma" },
    loyalty     = { min = 25, max = 40,  decay = 2, weight = 0,    label = "Loyalty" },
}

-- How often decayable stats lose points.
Config.StatDecayIntervalHours = 8

-- Points lost per decay interval; actual loss = DecayAmount * stat.decay
Config.StatDecayAmount = 1

-- Fatness optimal range: full income weight when between these values.
-- Outside this range, the contribution is linearly reduced.
Config.FatnessOptimalMin = 20
Config.FatnessOptimalMax = 70

-- Loyalty: how much each activity increases loyalty (0-100 scale).
Config.LoyaltyInitial = 35
Config.LoyaltyGain = {
    feed    = 1,
    drink   = 1,
    groom   = 2,
    heal    = 4,
    task    = 8,
    collect = -1,
}

Config.LoyaltyIncomeMinFactor = 0.60
Config.LoyaltyPenalty = {
    sick = 2,
    hurt = 3,
    starving = 2,
    dehydrated = 2,
}

-------------------------------------------------------------------------------
--  STATS & DECAY (hunger, thirst, sickness)
-------------------------------------------------------------------------------
Config.HoursBeforeLosingStats = 8          -- Number of real-time hours between each passive stat loss tick.
Config.HungerThirstIncreaseHours = 1       -- real-time hours between hunger/thirst ticks
Config.SicknessChancePerHour = 2           -- % chance of getting sick per income tick
Config.SicknessAutoHealHours = {
    cold     = 12,  -- hours to auto-heal cold
    injured  = 48,
    critical = 96,
}
Config.HealthRecoverySecondsPerHp = 180    -- 3 min per missing HP

-------------------------------------------------------------------------------
--  INCOME
-------------------------------------------------------------------------------
Config.PassiveIncomePerHour = 500           -- base hourly income while stationed & healthy
Config.MaxPendingEarnings   = 5000         -- cap on uncollected earnings per ped
Config.ActiveHours = {
    startHour = 18,                        -- 24-hour clock start time for all peds
    endHour = 6,                           -- 24-hour clock end time for all peds
}
Config.IncomeOnlyDuringActiveHours = true  -- income only accrues during the ped's active hours
Config.IncomeTickMinutes = 10              -- how often (real minutes) the server ticks income

-------------------------------------------------------------------------------
--  STATION ZONE EXCLUSION
-------------------------------------------------------------------------------
Config.StationZoneRadius = 50              -- other players cannot station peds within this radius
Config.PoachSkillCheck   = { difficulty = 'medium', inputs = {'w', 'a', 's', 'd'} }
Config.PoachDisableHours = 2               -- hours a ped is disabled after being poached

-------------------------------------------------------------------------------
--  HOSPITAL
-------------------------------------------------------------------------------
-- Optional: pedModel = `model_hash` to override default doctor ped (s_m_m_doctor_01).
Config.HospitalLocations = {
    { coords = vec4(308.82, -596.47, 42.29, 18.51),   radius = 10.0,  label = "Pillbox Hospital" },
    { coords = vec4(-248.13, 6333.08, 31.43, 223.59),  radius = 10.0,  label = "Paleto Hospital" },
    { coords = vec4(1839.84, 3674.27, 33.28, 218.06),  radius = 10.0,  label = "Sandy Shores Medical Center", pedModel = `s_m_m_paramedic_01` },
    { coords = vec4(307.56, -1433.16, 28.97, 143.56),   radius = 10.0,  label = "Central Los Santos Medical Center" },
    { coords = vec4(1150.77, -1530.23, 34.39, 325.54), radius = 10.0,  label = "St. Fiacre Hospital" },
    { coords = vec4(-447.54, -340.85, 33.5, 81.83),    radius = 10.0,  label = "Mount Zonah Medical Center" },
}
Config.HospitalHealCost  = 500
Config.HospitalFullHeal  = true  -- cures sickness + heals to max HP

-- Spawn NPC peds (cop/doctor) at police stations and hospitals for interaction.
-- If false, show a marker + text prompt instead (no ped spawned).
Config.SpawnInteractionPeds = true

-------------------------------------------------------------------------------
--  ARREST SYSTEM
-------------------------------------------------------------------------------
Config.Arrest = {
    enabled = true,
    baseBailAmount = 500,       -- base bail cost
    bailPerTier = 150,          -- additional bail per district tier
    bailHeatMultiplier = 2,     -- extra $ per heat point
    maxBailAmount = 5000,       -- bail cap
    arrestDurationHours = 4,    -- auto-release after this if not bailed
    heatArrestBonus = 0.004,    -- +0.4% arrest chance per heat point (times 100 for the roll)
    loyaltyLossOnArrest = 5,    -- loyalty lost when arrested
    arrestCooldownHours = 2,    -- can't be arrested again within this window after release
}

-- Optional: pedModel = `model_hash` to override default cop ped (s_m_y_cop_01).
Config.PoliceStations = {
    { id = "mission_row",   label = "Mission Row PD",        coords = vec4(441.03, -978.85, 29.69, 179.03) },
    { id = "vespucci",      label = "Vespucci PD",           coords = vec4(-1107.21, -845.05, 18.32, 140.44) },
    { id = "vinewood",      label = "Vinewood PD",           coords = vec4(638.27, 2.15, 81.69, 247.33) },
    { id = "sandy_shores",  label = "Sandy Shores Sheriff",  coords = vec4(1852.72, 3688.87, 33.27, 214.35), pedModel = `s_m_y_sheriff_01` },
    { id = "paleto",        label = "Paleto Bay PD",         coords = vec4(-448.31, 6012.53, 30.72, 318.59), pedModel = `s_m_y_sheriff_01` },
}

-------------------------------------------------------------------------------
--  GYM TRAINING
-------------------------------------------------------------------------------
-- Gym locations where players can take followers to train strength & health.
-- Optional: pedModel = `model_hash` to override default trainer ped (a_m_y_musclbeac_01).
Config.GymLocations = {
    { coords = vec4(-1201.0, -1568.42, 3.61, 50.13),  radius = 15.0, label = "Muscle Sands Gym" },              -- Vespucci Beach muscle beach
}

Config.GymTraining = {
    cooldownSeconds       = 300,             -- 5 min cooldown per ped after training
    cost                  = 50,             -- cash cost per training session
    trainingDurationMs    = 30000,           -- animation duration (ms) before server processes
    strengthGain          = { min = 1, max = 3 },   -- random strength increase per session (capped at 100)
    healthGain            = { min = 1, max = 3 },    -- random max_health increase per session
    loyaltyGain           = 1,               -- loyalty increase per session
    experienceGain        = 5,              -- ped XP per session
    playerExperienceGain  = 2,               -- player XP per session
    hungerGain            = 20,              -- hunger increase (working out makes her hungry)
    thirstGain            = 20,              -- thirst increase (working out makes her thirsty)
    fatnessLoss           = 5,               -- fatness decrease (burns fat)
    beautyGain            = 2,               -- beauty increase (better physique)
    bodyShapeGain         = 3,               -- body_shape increase (toned body)
    exercises = {
        { label = "Push Ups",    dict = "amb@world_human_push_ups@male@base",              clip = "base" },
        { label = "Sit Ups",     dict = "amb@world_human_sit_ups@male@idle_a",             clip = "idle_a" },
        { label = "Stretching",  dict = "timetable@denice@ig_1",                           clip = "idle_b" },
        { label = "Jogging",     dict = "amb@world_human_jog_standing@male@idle_a",        clip = "idle" },
        { label = "Yoga",        dict="missfam5_yoga",                                     clip="a2_pose"}
    },
}

-------------------------------------------------------------------------------
--  FOOD / DRINK / HEALING / GROOMING ITEMS
-------------------------------------------------------------------------------
-- Food items: restore hunger, may affect fatness & cleanliness.
Config.Food = {
    burger = { hunger = 30, health = 10, fatness = 5,  cleanliness = -2, label = "Burger" },
    salad  = { hunger = 20, health = 5,  fatness = -3, cleanliness = 1,  label = "Salad" },
}

-- Drink items: restore thirst, may affect stats.
Config.Drinks = {
    water  = { thirst = 35, cleanliness = 2,  label = "Water" },
    sprunk = { thirst = 10, fatness = 2,       label = "Sprunk" },
    wine   = { thirst = 15, charisma = 3, seduction = 2, label = "Wine" },
}

-- Healing items: restore health, may treat sickness.
Config.HealingItems = {
    bandage  = { health = 25,  cleanliness = 5,  sickness_reduction = 0.005, label = "Bandage" },
    firstaid = { health = 50,  cleanliness = 10, sickness_reduction = 0.25,  label = "First Aid Kit" },
}

Config.CareCooldownSeconds = 30  -- seconds between care actions per ped

-- Grooming items: boost trait stats directly.
Config.GroomingItems = {
    soap    = { cleanliness = 30, beauty = 5,                  label = "Soap" },
    perfume = { seduction = 10,   charisma = 5,                label = "Perfume" },
    makeup  = { beauty = 15,      seduction = 5,               label = "Makeup" },
    lipstick = { beauty = 10,      seduction = 3,               label = "Lipstick" },
    beauty_cream = { beauty = 20,      cleanliness = 10,            label = "Beauty Cream" },
}

-- Gift items: increase loyalty without affecting hunger/thirst.
Config.GiftItems = {
    goldchain = { loyalty = 2, label = "Gold Chain" },
    rolex = { loyalty = 5, label = "Rolex" },
    diamond_ring = { loyalty = 7, label = "Diamond Ring" },
    panties = { loyalty = 1, label = "Panties" },
}

-------------------------------------------------------------------------------
--  STATIONED SCENARIOS
-------------------------------------------------------------------------------
-- Random idle animations for peds stationed in the world.
Config.StationedScenarios = {
    'WORLD_HUMAN_STAND_IMPATIENT',
    'WORLD_HUMAN_SMOKING',
    'WORLD_HUMAN_AA_COFFEE',
    'WORLD_HUMAN_STAND_MOBILE',
    'WORLD_HUMAN_HANG_OUT_STREET',
    'WORLD_HUMAN_PROSTITUTE_HIGH_CLASS',
    'WORLD_HUMAN_PROSTITUTE_LOW_CLASS',
    'WORLD_HUMAN_STRIP_WATCH_STAND',
}

-------------------------------------------------------------------------------
--  TASKS (active bonus income)
-------------------------------------------------------------------------------
Config.Tasks = {
    delivery       = { chance = 20, reward = 100, label = "Deliver Supplies",    description = "Your girl needs some supplies delivered.",                distance = { min = 200, max = 1000 } },
    rescue         = { chance = 15, reward = 200, label = "Rescue",              description = "Your girl is in trouble and needs help!",                distance = { min = 40, max = 100 } },
    thief          = { chance = 15, reward = 150, label = "Chase a Thief",       description = "Someone stole from your girl. Chase them down!" },
    escort         = { chance = 12, reward = 250, label = "Escort Client",       description = "Escort a VIP NPC safely from point A to B.",              requiredPlayerLevel = 5, distance = { min = 200, max = 450 } },
    relocate       = { chance = 10, reward = 120, label = "Find Safer Corner",   description = "Move her to a better nearby spot.",                       relocateBonus = true, distance = { min = 100, max = 250 } },
    recover_cash   = { chance = 8,  reward = 300, label = "Recover Stolen Cash", description = "Track down stolen earnings.",                             requiredPlayerLevel = 3, distance = { min = 50, max = 120 } },
    aggressive_npc = { chance = 10, reward = 180, label = "Deal With Trouble",   description = "An aggressive NPC is harassing your girl." },
    pickup         = { chance = 10, reward = 160, label = "Pickup From Contact", description = "Pick up a package from a contact nearby.",               requiredPlayerLevel = 4, distance = { min = 300, max = 1800 } },
}
Config.TaskCooldown = 1800   -- seconds between task offers per ped
Config.RandomTaskChance = 8  -- % chance per ped per income tick to offer a random task
Config.TaskDismissLoyaltyLoss = 3  -- loyalty lost when dismissing a task offer
Config.TaskOfferTimeoutSeconds = 30  -- auto-dismiss after this many seconds

-- High-tier tasks unlocked via player level progression.
Config.AdvancedTasks = {
    vip_transport  = { chance = 30, reward = 500, label = "VIP Transport",  description = "Drive a VIP client to a secret location.",               requiredPlayerLevel = 7, timed = 300, distance = { min = 200, max = 400 } },
    heist_support  = { chance = 20, reward = 800, label = "Heist Support",  description = "Provide getaway support for a heist crew.",              requiredPlayerLevel = 9, timed = 600, distance = { min = 80, max = 160 } },
}

-- Branching outcome probabilities for task completion.
-- Rolls are modified by ped strength, charisma, and personality.
Config.TaskOutcomes = {
    bonusChance   = 15,   -- % chance of bonus outcome (150% reward + loyalty + rare item)
    partialChance = 20,   -- % chance of partial outcome (50% reward + minor injury)
    -- Remaining % is full success (100% reward)
}

-- Proximity-triggered tasks: passive offers when standing near your own stationed peds.
-- Checked every 60s (reuses the active-hours monitor thread).
Config.ProximityTaskChance      = 5    -- base % chance per check to offer a task
Config.ProximityTaskUnhappyBonus = 3   -- extra % added when the ped is disgruntled or refusing
Config.ProximityTaskRange       = 30   -- max distance (units) from the ped to trigger the check

-------------------------------------------------------------------------------
--  LEVELS
-------------------------------------------------------------------------------
Config.Levels = {
    [1]  = 0,
    [2]  = 100,
    [3]  = 250,
    [4]  = 500,
    [5]  = 900,
    [6]  = 1500,
    [7]  = 2500,
    [8]  = 4000,
    [9]  = 6000,
    [10] = 9000,
}

-- Experience gained per activity.
Config.Experience = {
    collect = 10,   -- collecting earnings
    feed    = 5,    -- feeding / giving drinks
    groom   = 8,    -- grooming
    heal    = 5,    -- healing / first aid
    task    = 25,   -- completing a task
}

-- Extra max health gained per level.
Config.LevelHealthIncrease = 25

-------------------------------------------------------------------------------
--  DISTRICTS  (predefined zones for stationing peds)
-------------------------------------------------------------------------------
-- Allow players to toggle district zones on the map with /lotnzones.
Config.EnableZoneCommand = true

-- Each district is a named zone on the map. Stationing a ped inside a district
-- builds reputation there, increases income, but also raises heat.
-- `tier` affects base income multiplier. `requiredPlayerLevel` gates access.
Config.Districts = {
    {
        id = "strawberry",
        label = "Strawberry",
        center = vec3(210.0, -1650.0, 29.0),
        radius = 350.0,
        tier = 1,
        baseIncomeMultiplier = 1.0,
        requiredPlayerLevel = 1,
        maxPedsPerOwner = 3,
        arrestRisk = 1,
    },
    {
        id = "davis",
        label = "Davis",
        center = vec3(112.0, -1960.0, 20.7),
        radius = 350.0,
        tier = 1,
        baseIncomeMultiplier = 1.0,
        requiredPlayerLevel = 1,
        maxPedsPerOwner = 3,
        arrestRisk = 1,
    },
    {
        id = "la_mesa",
        label = "La Mesa",
        center = vec3(820.0, -2160.0, 29.0),
        radius = 300.0,
        tier = 1,
        baseIncomeMultiplier = 1.05,
        requiredPlayerLevel = 1,
        maxPedsPerOwner = 3,
        arrestRisk = 1,
    },
    {
        id = "mirror_park",
        label = "Mirror Park",
        center = vec3(1080.0, -700.0, 57.0),
        radius = 300.0,
        tier = 1,
        baseIncomeMultiplier = 1.05,
        requiredPlayerLevel = 2,
        maxPedsPerOwner = 3,
        arrestRisk = 1,
    },
    {
        id = "el_burro",
        label = "El Burro Heights",
        center = vec3(1700.0, -1850.0, 110.0),
        radius = 400.0,
        tier = 1,
        baseIncomeMultiplier = 0.95,
        requiredPlayerLevel = 1,
        maxPedsPerOwner = 3,
        arrestRisk = 1,
    },
    {
        id = "vespucci",
        label = "Vespucci",
        center = vec3(-1120.0, -1520.0, 4.4),
        radius = 400.0,
        tier = 2,
        baseIncomeMultiplier = 1.15,
        requiredPlayerLevel = 3,
        maxPedsPerOwner = 3,
        arrestRisk = 2,
    },
    {
        id = "vinewood",
        label = "Vinewood",
        center = vec3(320.0, 270.0, 105.0),
        radius = 500.0,
        tier = 3,
        baseIncomeMultiplier = 1.35,
        requiredPlayerLevel = 5,
        maxPedsPerOwner = 3,
        arrestRisk = 4,
    },
    {
        id = "delperro",
        label = "Del Perro",
        center = vec3(-1650.0, -870.0, 10.0),
        radius = 400.0,
        tier = 3,
        baseIncomeMultiplier = 1.30,
        requiredPlayerLevel = 7,
        maxPedsPerOwner = 3,
        arrestRisk = 4,
    },
    {
        id = "sandy_shores",
        label = "Sandy Shores",
        center = vec3(1870.0, 3700.0, 33.0),
        radius = 500.0,
        tier = 1,
        baseIncomeMultiplier = 0.85,
        requiredPlayerLevel = 1,
        maxPedsPerOwner = 3,
        arrestRisk = 1,
    },
    {
        id = "paleto",
        label = "Paleto Bay",
        center = vec3(-300.0, 6300.0, 31.0),
        radius = 400.0,
        tier = 1,
        baseIncomeMultiplier = 0.80,
        requiredPlayerLevel = 1,
        maxPedsPerOwner = 3,
        arrestRisk = 1,
    },
}

-- District reputation & heat settings.
Config.HeatPerIncomeTick   = 1     -- heat gained per ped per income tick
Config.HeatDecayPerHour    = 6     -- heat lost per hour (passive decay)
Config.HeatPoachBonus      = 10    -- extra heat gained when a ped is poached from you
Config.MaxReputation       = 1000   -- reputation cap per district
Config.HeatSicknessBonus   = 0.02  -- extra sickness % chance per heat point
Config.HeatPoachVulnerability = 0.005 -- extra poach success chance per heat point

-------------------------------------------------------------------------------
--  REPUTATION TIERS  (determine income bonus from district reputation)
-------------------------------------------------------------------------------
-- Tiers are evaluated top-down; the first entry whose threshold <= reputation
-- is the active tier. Keep sorted DESCENDING by threshold.
Config.ReputationTiers = {
    { threshold = 800, label = "Kingpin",     incomeMod = 0.50, heatDecayBonus = 10 },
    { threshold = 600, label = "Dominant",    incomeMod = 0.35, heatDecayBonus = 6  },
    { threshold = 400, label = "Established", incomeMod = 0.20, heatDecayBonus = 4  },
    { threshold = 200, label = "Known",       incomeMod = 0.10, heatDecayBonus = 2  },
    { threshold = 50,  label = "Newcomer",    incomeMod = 0.05, heatDecayBonus = 1  },
    { threshold = 0,   label = "Unknown",     incomeMod = 0.00, heatDecayBonus = 0  },
}

-------------------------------------------------------------------------------
--  REPUTATION GAINS  (per activity)
-------------------------------------------------------------------------------
Config.ReputationGain = {
    stationedPerTick = 1,      -- per ped per income tick
    taskComplete     = 5,      -- completing a task for a ped in the zone
    collectEarnings  = 1,      -- collecting income from a ped in the zone
    careAction       = 1,      -- feed / drink / groom / heal / gift a ped in the zone
    ambushSurvived   = 10,     -- surviving an ambush in the zone
    bail             = 3,      -- bailing a ped out in the zone
    attackDefended   = 5,      -- defending against a ped attack in the zone
}
Config.ReputationDecayPerDay = 10  -- daily reputation lost per zone where player has 0 stationed peds

-------------------------------------------------------------------------------
--  ZONE ACTIVITY LEVELS  (shown in UI, based on total peds from ALL players)
-------------------------------------------------------------------------------
Config.ZoneActivityLevels = {
    { max = 0,  label = "Empty" },
    { max = 3,  label = "Quiet" },
    { max = 7,  label = "Busy" },
    { max = 999, label = "Crowded" },
}

-------------------------------------------------------------------------------
--  TERRITORY CONTROL  (reputation-based automatic ownership)
-------------------------------------------------------------------------------
-- The player with the highest reputation in a zone automatically becomes the
-- territory owner, provided they meet the minimum reputation threshold.
Config.TerritoryControl = {
    enabled            = true,
    ownerIncomeBonus   = 0.20,   -- +20% income for the zone owner
    rivalIncomePenalty  = 0.15,   -- -15% income for non-owners in owned zones
    minReputationToOwn = 300,    -- must be at "Established" tier to own a zone
}


-------------------------------------------------------------------------------
--  PERSONALITIES  (randomly assigned on recruit)
-------------------------------------------------------------------------------
-- Each personality modifies income, sickness, loyalty, decay, and task behavior.
-- `weight` controls relative frequency during random roll.
Config.Personalities = {
    independent = {
        label       = "Independent",
        description = "Higher income, harder to please.",
        weight      = 20,
        incomeMod        = 1.15,   -- +15% income
        loyaltyGainMod   = 0.7,    -- loyalty gains are 70% effective
        loyaltyDecayMod  = 1.0,
        sicknessChanceMod = 1.0,
        groomDecayMod    = 1.0,
        happinessDecayMod = 1.0,
        taskBonusMod     = 1.0,
        traitMods = {},            -- no initial trait adjustments
    },
    diva = {
        label       = "Diva",
        description = "Needs extra grooming but earns premium income.",
        weight      = 15,
        incomeMod        = 1.25,
        loyaltyGainMod   = 0.85,
        loyaltyDecayMod  = 1.2,
        sicknessChanceMod = 1.0,
        groomDecayMod    = 2.0,    -- cleanliness/beauty decay twice as fast
        happinessDecayMod = 1.3,
        taskBonusMod     = 0.9,
        traitMods = { beauty = 10, seduction = 5 },
    },
    tough = {
        label       = "Tough",
        description = "Resilient, better at combat tasks.",
        weight      = 20,
        incomeMod        = 1.0,
        loyaltyGainMod   = 1.0,
        loyaltyDecayMod  = 0.8,
        sicknessChanceMod = 0.6,   -- 40% less sickness
        groomDecayMod    = 1.0,
        happinessDecayMod = 0.8,
        taskBonusMod     = 1.2,    -- +20% task reward
        traitMods = { strength = 15 },
    },
    social = {
        label       = "Social",
        description = "More charisma growth, triggers more events.",
        weight      = 25,
        incomeMod        = 1.05,
        loyaltyGainMod   = 1.2,
        loyaltyDecayMod  = 1.0,
        sicknessChanceMod = 1.0,
        groomDecayMod    = 1.0,
        happinessDecayMod = 1.0,
        taskBonusMod     = 1.0,
        eventChanceMod   = 1.3,    -- 30% more VIP events
        traitMods = { charisma = 10 },
    },
    fragile = {
        label       = "Fragile",
        description = "Gets sick easier, naturally beautiful.",
        weight      = 20,
        incomeMod        = 1.10,
        loyaltyGainMod   = 1.1,
        loyaltyDecayMod  = 1.0,
        sicknessChanceMod = 1.5,   -- 50% more sickness
        groomDecayMod    = 1.0,
        happinessDecayMod = 1.3,
        taskBonusMod     = 0.8,
        traitMods = { beauty = 15, strength = -10 },
    },
}

-------------------------------------------------------------------------------
--  SPECIALIZATIONS  (training paths chosen at ped level 5)
-------------------------------------------------------------------------------
Config.Specializations = {
    charmer = {
        label           = "Charmer",
        description     = "Charisma & seduction focused. Better passive income.",
        requiredLevel   = 5,
        charismaBonus   = 15,
        seductionBonus  = 10,
        incomeBonus     = 0.10,   -- +10% income
    },
    survivor = {
        label              = "Survivor",
        description        = "Strength & health focused. Resists sickness.",
        requiredLevel      = 5,
        strengthBonus      = 20,
        healthBonus        = 50,   -- +50 max health
        sicknessResistance = 0.5,  -- 50% less sickness chance
    },
    earner = {
        label           = "Earner",
        description     = "Higher earnings cap and income multiplier.",
        requiredLevel   = 5,
        maxPendingBonus = 1000,    -- +$1000 to max pending earnings
        incomeBonus     = 0.20,    -- +20% income
    },
    loyalist = {
        label          = "Loyalist",
        description    = "Slower loyalty decay, faster loyalty gain.",
        requiredLevel  = 5,
        loyaltyDecayMod = 0.5,    -- 50% slower loyalty decay
        loyaltyGainMod  = 1.5,    -- 50% faster loyalty gain
    },
}

-------------------------------------------------------------------------------
--  CARE STREAKS  (consecutive care rewards)
-------------------------------------------------------------------------------
-- Players must feed/drink/groom/heal a ped within the care window to maintain
-- the streak. Higher streaks give loyalty and income bonuses.
Config.CareStreakWindowHours = 24   -- hours between care actions to keep streak alive
Config.CareStreakActions     = { 'feed', 'drink', 'groom', 'heal' }

Config.CareStreakThresholds = {
    [3]  = { loyaltyBonus = 5,  incomeBonus = 0,    label = "Attentive" },
    [7]  = { loyaltyBonus = 10, incomeBonus = 0.05, label = "Devoted" },
    [14] = { loyaltyBonus = 15, incomeBonus = 0.10, label = "Best Boss" },
}

-------------------------------------------------------------------------------
--  LOYALTY STATES  (graceful failure before permanent departure)
-------------------------------------------------------------------------------
-- Instead of instant deletion at loyalty 0, peds go through declining states.
-- Each state has gameplay penalties. Player can recover by raising loyalty.
Config.LoyaltyStates = {
    disgruntled = {
        threshold     = 20,     -- loyalty <= this triggers state
        incomePenalty = 0.30,   -- -30% income
        canFollow     = true,
        canStation    = true,
        poachVulnerability = 0.15,  -- +15% easier to poach
        label = "Disgruntled",
    },
    refusing = {
        threshold     = 10,
        incomePenalty = 0.70,   -- -70% income
        canFollow     = false,  -- refuses to follow
        canStation    = false,  -- refuses to work
        poachVulnerability = 0.30,
        label = "Refusing",
    },
    fleeing = {
        threshold        = 5,
        autoLeaveHours   = 48,   -- 48 hours before ped leaves permanently
        incomePenalty    = 1.0,  -- 0 income
        canFollow        = false,
        canStation       = false,
        poachVulnerability = 0.50,
        label = "About to Leave",
    },
}

-------------------------------------------------------------------------------
--  VIP EVENTS  (temporary district-wide bonuses/penalties)
-------------------------------------------------------------------------------
-- Rolled per-district during income ticks. Active events stored in server memory.
Config.VIPEvents = {
    weekend_rush = {
        incomeMultiplier = 1.5,
        duration         = 7200,  -- 2 hours
        chance           = 15,    -- % per district per hour
        label            = "Weekend Rush",
        description      = "Extra foot traffic is boosting income!",
    },
    festival = {
        incomeMultiplier = 2.0,
        duration         = 3600,
        chance           = 5,
        label            = "Festival Night",
        description      = "A nearby festival is drawing big crowds.",
    },
    rich_client = {
        incomeMultiplier = 1.8,
        duration         = 1800,
        chance           = 10,
        label            = "Rich Client Alert",
        description      = "A wealthy client is looking for company.",
    },
    rival_pressure = {
        incomeMultiplier = 0.6,
        heatBonus        = 20,
        duration         = 3600,
        chance           = 8,
        label            = "Rival Crew Pressure",
        description      = "A rival crew is muscling into the area. Income will be reduced here, so consider moving your girl to a different location.",
    },
    police_sweep = {
        incomeMultiplier = 0.3,
        duration         = 1800,
        chance           = 5,
        label            = "Police Sweep",
        description      = "Police are cracking down in the area.",
    },
}
Config.VIPEventRollIntervalMinutes = 30  -- how often events are rolled per district

-------------------------------------------------------------------------------
--  PLAYER-LEVEL PROGRESSION
-------------------------------------------------------------------------------
-- Player-level (separate from ped level). Unlocks recruit slots, districts,
-- and advanced task types. XP earned from all activities.
Config.PlayerLevels = {
    [1]  = { xp = 0,     maxRecruits = 1  },
    [2]  = { xp = 500,   maxRecruits = 1  },
    [3]  = { xp = 1500,  maxRecruits = 2,  unlockDistrict = "vespucci" },
    [4]  = { xp = 3000,  maxRecruits = 3  },
    [5]  = { xp = 6000,  maxRecruits = 3,  unlockDistrict = "vinewood",  unlockTask = "escort" },
    [6]  = { xp = 10000, maxRecruits = 4  },
    [7]  = { xp = 15000, maxRecruits = 5,  unlockDistrict = "delperro",  unlockTask = "vip_transport" },
    [8]  = { xp = 22000, maxRecruits = 6  },
    [9]  = { xp = 30000, maxRecruits = 7,  unlockTask = "heist_support" },
    [10] = { xp = 40000, maxRecruits = 8 },
}

-- Player XP earned per activity (adds to player-level progression).
Config.PlayerExperience = {
    collect  = 15,   -- collecting earnings
    feed     = 5,    -- feeding / giving drinks
    groom    = 8,    -- grooming
    heal     = 5,    -- healing / first aid
    task     = 30,   -- completing a task
    recruit  = 25,   -- successfully recruiting a new ped
}

-------------------------------------------------------------------------------
--  PVP  (attack, ambush, territory)
-------------------------------------------------------------------------------
Config.PvP = {
    attackStationedPed = {
        enabled        = true,
        damagePerHit   = 25,      -- health damage per melee hit to stationed ped
        disableHours   = 4,       -- hours ped is disabled after being beaten up
        loyaltyLoss    = 10,      -- loyalty the ped loses from the attack
        heatGain       = 15,      -- heat added to the attacker's district presence
        cooldownSeconds = 6000,   -- cooldown before can attack the same ped again
        notifyOwner    = true,    -- notify the owner when their ped is attacked
        retaliationDurationSeconds = 60, -- seconds the ped fights back after being attacked (0 to disable)
    },
    ambushCollection = {
        enabled            = true,
        chance             = 25,      -- % chance of ambush when collecting big earnings
        earningsThreshold  = 500,     -- minimum earnings to trigger ambush roll
        enemyCount         = { min = 2, max = 4 },
        enemyModels        = { `g_m_y_mexgoon_01`, `g_m_y_mexgang_01`, `g_m_y_salvagoon_01` },
        spawnRadius        = { min = 3, max = 5 },
        stolenPercentage   = 0.3,     -- % of earnings stolen if player dies/flees
        bonusOnSurvive     = 0.35,    -- % bonus earnings if player defeats all enemies
    },
    lureAway = {
        sweetTalkThreshold = 'refusing',  -- loyalty state at which "Sweet Talk" becomes available
        alertTimeout = 15,                -- seconds before the owner PvP alert auto-dismisses
        giftCooldownSeconds = 30,         -- seconds between gifts to the same ped
    },
}
```
