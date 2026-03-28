# Health Conditions Configuration

```lua
Config = {}

Config.Debug = true

-------------------------------------------------------------------------------
--  GENERAL
-------------------------------------------------------------------------------
-- Chat command to open the self-inspection UI.
Config.Command = 'healthconditions'

-- Third-eye target settings for examining other players.
Config.TargetLabel    = 'Examine Player'
Config.TargetIcon     = 'fa-solid fa-eye'
Config.TargetDistance  = 3.0

-------------------------------------------------------------------------------
--  PERMISSIONS
-------------------------------------------------------------------------------
-- Jobs allowed to set / edit / remove conditions on OTHER players.
-- Key = job name, value = minimum grade level required.
Config.AuthorizedJobs = {
    ambulance = 0,
    police    = 0,
}

-------------------------------------------------------------------------------
--  DEFAULTS & LIMITS
-------------------------------------------------------------------------------
-- Default expiry (hours) for self-reported conditions.
Config.DefaultExpiryHours = 24

-- Maximum expiry (hours) that a self-reporter can set.
Config.MaxSelfExpiryHours = 72

-- Maximum number of active self-reported conditions per player.
Config.MaxSelfConditions = 10

-------------------------------------------------------------------------------
--  DAMAGE DETECTION
-------------------------------------------------------------------------------
-- Automatically create conditions when the player takes damage in-game.
Config.DamageDetection = {
    Enabled  = true,
    Cooldown = 10,   -- seconds cooldown per body location before another auto-condition
    DefaultExpiry = 2, -- fallback hours when severity has no specific entry
    MaxAutoConditions = 20, -- max active auto-detected conditions per player

    -- Weapon type group hash to category mapping used by client-side damage detection.
    WeaponGroupToCategory = {
        [`GROUP_MELEE`] = "melee",
        [`GROUP_PISTOL`] = "pistol",
        [`GROUP_SMG`] = "smg",
        [`GROUP_SHOTGUN`] = "shotgun",
        [`GROUP_RIFLE`] = "rifle",
        [`GROUP_SNIPER`] = "sniper",
        [`GROUP_MG`] = "rifle",
        [`GROUP_THROWN`] = "explosion",
        [`GROUP_HEAVY`] = "explosion",
        [`GROUP_PETROLCAN`] = "fire",
    },

    -- Melee weapons that should map to sharp_melee instead of generic melee.
    SharpMeleeWeapons = {
        [`WEAPON_DAGGER`] = true,
        [`WEAPON_BOTTLE`] = true,
        [`WEAPON_KNIFE`] = true,
        [`WEAPON_HATCHET`] = true,
        [`WEAPON_SWITCHBLADE`] = true,
        [`WEAPON_MACHETE`] = true,
        [`WEAPON_BATTLEAXE`] = true,
        [`WEAPON_STONE_HATCHET`] = true,
        -- Custom melee weapons (from noego_damages)
        [`WEAPON_SCISSORS`] = true,
        [`WEAPON_ZK`] = true,
        [`WEAPON_BLUEZK`] = true,
        [`WEAPON_REDZK`] = true,
        [`WEAPON_PINKZK`] = true,
        [`WEAPON_BUTCHER`] = true,
        [`WEAPON_HUNTERKNIFE`] = true,
        [`WEAPON_SCIMITAR`] = true,
        [`WEAPON_SCIFIWORD`] = true,
        [`WEAPON_KATANA`] = true,
        [`WEAPON_BLACKKATANA`] = true,
        [`WEAPON_LONGMACHETE`] = true,
        [`WEAPON_BROWNMACHETE`] = true,
        [`WEAPON_TACTICALHATCHET`] = true,
        [`WEAPON_TACAXE`] = true,
        [`WEAPON_AXE`] = true,
        [`WEAPON_SPIKEDKNUCKLES`] = true,
        [`WEAPON_ICEDCLIMBER`] = true,
        [`WEAPON_ICECLIMBER`] = true,
        [`WEAPON_BARBEDBAT`] = true,
    },

    -- Direct weapon hash → category for environmental / special damage sources.
    WeaponHashToCategory = {
        [`WEAPON_DROWNING`]              = "drowning",
        [`WEAPON_DROWNING_IN_VEHICLE`]   = "drowning",
        [`WEAPON_BLEEDING`]              = "bleeding",
        [`WEAPON_ELECTRIC_FENCE`]        = "electric",
        [`WEAPON_BARBED_WIRE`]           = "sharp_melee",
        [`WEAPON_EXPLOSION`]             = "explosion",
        [`WEAPON_FALL`]                  = "fall_damage",
        [`WEAPON_EXHAUSTION`]            = "exhaustion",
        [`WEAPON_HIT_BY_WATER_CANNON`]   = "melee",
        [`WEAPON_HELI_CRASH`]            = "explosion",
        [`WEAPON_FIRE`]                  = "fire",
        [`WEAPON_MOLOTOV`]               = "fire",
        [`WEAPON_PETROLCAN`]             = "fire",
        [`WEAPON_HAZARDCAN`]             = "fire",
        [`WEAPON_FERTILIZERCAN`]         = "fire",
        [`WEAPON_ANIMAL`]                = "animal",
        [`WEAPON_COUGAR`]                = "animal",
        [`WEAPON_SMALL_DOG`]             = "animal",
        [`WEAPON_DOG`]                   = "animal",
        [`WEAPON_RUN_OVER_BY_CAR`]       = "vehicle",
        [`WEAPON_RAMMED_BY_CAR`]         = "vehicle",
    },

    -- Damage thresholds for dynamic severity (percentage of max effective HP lost).
    -- GTA V ped health is typically 100–200, so effective HP ≈ 100.
    SeverityThresholds = {
        moderate = 15,   -- >= 15% HP lost → moderate
        severe   = 40,   -- >= 40% HP lost → severe  (also always severe if fatal)
    },

    -- Expiry hours per severity level.  Adjust these to taste.
    SeverityExpiry = {
        minor    = 4,    -- 4 hours
        moderate = 8,    -- 8 hours
        severe   = 12,   -- 12 hours
    },
}

-- Maps damage categories to condition presets.
-- Each entry can override: condition (key), severity, description.
Config.DamageTypeMap = {
    fall_damage    = { condition = "bruised_ribs",    severity = "moderate", description = "Injuries sustained from a fall." },
    weapon_unarmed = { condition = "black_and_blue",  severity = "minor",    description = "Bruising from blunt impact." },
    melee          = { condition = "black_and_blue",  severity = "moderate", description = "Visible bruising from blunt trauma." },
    sharp_melee    = { condition = "laceration",      severity = "moderate", description = "Cut or puncture wound from a bladed weapon." },
    pistol         = { condition = "gunshot_wound",   severity = "severe",   description = "Gunshot wound from a pistol." },
    shotgun        = { condition = "gunshot_wound",   severity = "severe",   description = "Gunshot wound from a shotgun." },
    smg            = { condition = "gunshot_wound",   severity = "severe",   description = "Gunshot wound from an SMG." },
    rifle          = { condition = "gunshot_wound",   severity = "severe",   description = "Gunshot wound from a rifle." },
    sniper         = { condition = "gunshot_wound",   severity = "severe",   description = "Gunshot wound from a sniper rifle." },
    explosion      = { condition = "burn_marks",      severity = "severe",   description = "Blast and burn injuries from an explosion." },
    fire           = { condition = "burn_marks",      severity = "severe",   description = "Burn injuries from fire." },
    animal         = { condition = "bite_marks",      severity = "severe",   description = "Injuries from an animal attack." },
    drowning       = { condition = "pale_skin",       severity = "severe",   description = "Near-drowning, water inhalation." },
    bleeding       = { condition = "bloody_bandage",  severity = "severe",   description = "Significant blood loss from open wounds." },
    electric       = { condition = "burn_marks",      severity = "severe",   description = "Electrical burn from high-voltage contact." },
    exhaustion     = { condition = "pale_skin",       severity = "moderate", description = "Collapsed from physical exhaustion." },
    vehicle        = { condition = "vehicle_impact",  severity = "moderate", description = "Injuries from a vehicle collision." },
    default        = { condition = "black_and_blue",  severity = "minor",    description = "Visible bruising from unknown cause." },
}

-------------------------------------------------------------------------------
--  CONDITION TYPES
-------------------------------------------------------------------------------
-- Predefined conditions. Players pick from this list when adding a status.
-- Each entry: { key, label, icon (FontAwesome class), description }
Config.Conditions = {
    { key = "black_eye",          label = "Black Eye",           icon = "fa-solid fa-eye",              description = "Bruised and swollen eye socket." },
    { key = "swollen_lip",        label = "Swollen Lip",         icon = "fa-solid fa-face-flushed",     description = "Puffy, inflamed lip." },
    { key = "bruised_cheek",      label = "Bruised Cheek",       icon = "fa-solid fa-face-sad-tear",    description = "Visible bruising on the cheek." },
    { key = "split_lip",          label = "Split Lip",           icon = "fa-solid fa-droplet",          description = "A cut running through the lip." },
    { key = "broken_nose",        label = "Broken Nose",         icon = "fa-solid fa-head-side-cough",  description = "Crooked, swollen nose." },
    { key = "cut_forehead",       label = "Cut Forehead",        icon = "fa-solid fa-band-aid",         description = "An open cut on the forehead." },
    { key = "bruised_ribs",       label = "Bruised Ribs",        icon = "fa-solid fa-lungs",            description = "Tenderness and discoloration around the rib cage." },
    { key = "limp",               label = "Limp",                icon = "fa-solid fa-person-cane",      description = "Noticeably favoring one leg." },
    { key = "arm_sling",          label = "Arm in Sling",        icon = "fa-solid fa-hand",             description = "Arm immobilized in a sling." },
    { key = "bandaged_hand",      label = "Bandaged Hand",       icon = "fa-solid fa-hand-dots",        description = "Hand wrapped in bandages." },
    { key = "burn_marks",         label = "Burn Marks",          icon = "fa-solid fa-fire",             description = "Visible burn scarring on the skin." },
    { key = "scratch_marks",      label = "Scratch Marks",       icon = "fa-solid fa-cat",              description = "Shallow scratches across the skin." },
    { key = "bite_marks",         label = "Bite Marks",          icon = "fa-solid fa-tooth",            description = "Indentation marks from a bite." },
    { key = "bloodshot_eyes",     label = "Bloodshot Eyes",       icon = "fa-solid fa-eye-dropper",      description = "Red, irritated eyes." },
    { key = "pale_skin",          label = "Pale Skin",           icon = "fa-solid fa-ghost",            description = "Unusually pale complexion." },
    { key = "sweating",           label = "Sweating",            icon = "fa-solid fa-droplet",          description = "Profuse sweating, clammy skin." },
    { key = "shaking",            label = "Shaking",             icon = "fa-solid fa-hand-sparkles",    description = "Visible tremors or shaking." },
    { key = "stitches",           label = "Stitches",            icon = "fa-solid fa-syringe",          description = "Surgical stitches closing a wound." },
    { key = "cast",               label = "Cast",                icon = "fa-solid fa-bone",             description = "A plaster cast on a limb." },
    { key = "neck_brace",         label = "Neck Brace",          icon = "fa-solid fa-head-side-mask",   description = "A supportive brace around the neck." },
    { key = "concussion",         label = "Concussion",          icon = "fa-solid fa-brain",            description = "Dazed look, possible head injury." },
    { key = "bloody_bandage",     label = "Bloody Bandage",      icon = "fa-solid fa-bandage",          description = "Blood-soaked bandage on a wound." },
    { key = "black_and_blue",     label = "Black & Blue",        icon = "fa-solid fa-circle",           description = "Large area of deep bruising." },
    { key = "laceration",         label = "Laceration",          icon = "fa-solid fa-band-aid",         description = "A deep cut or puncture wound." },
    { key = "swollen_jaw",        label = "Swollen Jaw",         icon = "fa-solid fa-face-grimace",     description = "Jaw appears swollen and tender." },
    { key = "chemical_burn",      label = "Chemical Burn",       icon = "fa-solid fa-flask",            description = "Discolored skin from chemical exposure." },
    { key = "gunshot_wound",      label = "Gunshot Wound",       icon = "fa-solid fa-crosshairs",       description = "Penetrating wound from a firearm." },
    { key = "vehicle_impact",     label = "Vehicle Impact",      icon = "fa-solid fa-car-burst",        description = "Injuries from a vehicle collision." },
    { key = "other",              label = "Other",               icon = "fa-solid fa-pen",              description = "Custom condition not listed above." },
}

-------------------------------------------------------------------------------
--  BODY LOCATIONS
-------------------------------------------------------------------------------
-- Where on the body a condition is located.
Config.BodyLocations = {
    { key = "head",       label = "Head" },
    { key = "face",       label = "Face" },
    { key = "neck",       label = "Neck" },
    { key = "chest",      label = "Chest" },
    { key = "abdomen",    label = "Abdomen" },
    { key = "upper_back", label = "Upper Back" },
    { key = "lower_back", label = "Lower Back" },
    { key = "left_arm",   label = "Left Arm" },
    { key = "right_arm",  label = "Right Arm" },
    { key = "left_hand",  label = "Left Hand" },
    { key = "right_hand", label = "Right Hand" },
    { key = "left_leg",   label = "Left Leg" },
    { key = "right_leg",  label = "Right Leg" },
    { key = "left_foot",  label = "Left Foot" },
    { key = "right_foot", label = "Right Foot" },
}

-------------------------------------------------------------------------------
--  SEVERITIES
-------------------------------------------------------------------------------
Config.Severities = {
    { key = "minor",    label = "Minor" },
    { key = "moderate", label = "Moderate" },
    { key = "severe",   label = "Severe" },
}

```