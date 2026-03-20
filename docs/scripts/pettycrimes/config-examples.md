# Petty Crimes Configuration

```lua
Config = {
    DropChance = 60, -- Percentage of success getting coins
    MinCoinsAmount = 1,
    MaxCoinsAmount = 10,
    ParkingFee = 2,             -- Amount of 50 cent coins to pay for parking
    NonMeterDropChance = 30,    -- Percentage of success getting coins from non-meter props
    ChanceOfStealPost = 70,     -- Percentage of success getting mail from mailboxes
    StealCooldown = 5 * 60,     -- Cooldown in seconds before a robbed location becomes available again
    ParkingDurations = {
        meter = 60 * 60,
        car_park = 24 * 60 * 60,
    },
    LocationKeyPrecision = 2,
    ReputationChance = 45,
    NightBonus = 15,
    RandomItemsFromLetters = {  -- This is for 'garbage' single items, duplicate to increase chances
        'discount_coupon_25',
        'panties',
        'handwritten_letter',
        'parking_ticket',
        'turd',
        'certificate',
        'handwritten_letter',
        'parking_receipt',
    },
    -- Steal clothing stuff
    ChanceOfStealWearables = 80, -- Percentage of success getting wearables from clothes
    ClothingItems = {
        'rolex',
        'basic_tshirt',
        -- Add more items here, get a bunch of them from metaden-tailor script!
    },
    HatItems = {
        'knitcap',
        'cap',
    },
    GlassesItems = {
        'aviators',
    },
    SevenElevenItems = {
        "sprunk",
        "mustard",
        "water",
        -- Add more items here

    },
    LiquorShopItems = {
        'wine',
        -- Add more items here

    },
    LiquorStoreZones = {
        vec3(1139.54, -984.3, 46.42),
        vec3(-1227.44, -906.1, 12.33),
        vec3(-1491.51, -379.67, 40.16),
        vec3(-2971.51, 387.91, 15.04),
        vec3(1169.23, 2705.92, 38.16),
        vec3(1398.21, 3607.97, 34.98),
    },
    FruitStandItems = {
        'grapes',
        -- Add more items here
    },
    -- Peds Attack Player stuff
    AggroRadius = 10,            -- Radius to attack the player
    ChanceOfPedUsingWeapon = 15, -- Percentage of chance to give a weapon to the ped
    RandomAngryPedWeapon = {
        "weapon_hammer",
        "weapon_knife",
        "weapon_switchblade"
    }
}

```