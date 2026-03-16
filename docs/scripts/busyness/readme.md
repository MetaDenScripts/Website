# Busyness

> `metaden-busyness` is a full-featured business management script for FiveM servers that turns ordinary job locations into interactive, revenue-generating businesses. It brings together NPC customers, public storefront peds, in-world billing registers, delivery jobs, live stock and pricing controls, employee cash tracking, and polished management/admin tools in one server-owned system built for serious roleplay economies.

---

## Features

- **Server-owned business state**: business balance, revenue, payout totals, permissions, storefront placement, stock, and the live business item catalog all live on the server and persist in MySQL.
- **NPC customer loop**: employees can serve spawned customers using stocked items instead of client-side fake pricing.
- **Business management panel**: `/businesspanel` opens a React-based UI for employees, managers, and owners.
- **Admin oversight panel**: `/busynessadmin` exposes cross-business controls for ACE-authorized admins.
- **Grade-based permissions**: stock, withdraw, and management actions respect stored grade thresholds while still honoring QBX boss grades.
- **Public storefront ped**: each business can place one public-facing shop ped that sells from the live menu and only spawns when players are nearby.
- **Billing registers**: admins can add and place multiple persistent billing registers per business for in-world employee billing and customer payment.
- **Register-bound invoices**: employees create bills for nearby players, customers settle them with cash or card, and open bills remain synced to the register until paid or dismissed.
- **Delivery order board**: employees can accept, dismiss, and complete server-owned delivery jobs with waypoint support and audit logging.
- **Distance bonus support**: long deliveries can add configurable bonus payout based on travel distance.
- **Employee cash ledger**: employee earnings, paid-out cash, withdrawable balance, and withdrawals are tracked in a dedicated table.
- **Expanded audit metadata**: customer logs can track source type, register references, customer identity, payment method, and descriptions for storefront, billing, and delivery activity.
- **Reusable payout API**: custom resources can calculate or apply normal and inverse business payout splits through a shared export/event path.

---

## Requirements

### Dependencies

| Resource | Role |
|---|---|
| `ox_lib` | Shared utility layer and callback support |
| `metabridge` | Framework, inventory, targeting, and compatibility bridge |
| `oxmysql` | Persistent business, log, and cash ledger storage |
| `npm / Node.js` | Required to build the React UI |

---

## Installation

### 1. Files

Place the `metaden-busyness` folder inside your resources directory.

### 2. Load Order (`server.cfg`)

```cfg
ensure oxmysql
ensure ox_lib
ensure metabridge
ensure metaden-busyness
```

### 3. Database

The resource creates and updates its own required tables on startup through `ensureSchema()`. A `database.sql` file is still included if you prefer to seed the base schema manually before first launch.


### 4. ACE Permissions

Grant access to the admin panel with:

```cfg
add_ace group.admin metaden.busyness.admin allow
```

Without that ACE permission, `/busynessadmin` will be denied even if the player is a boss or manager for a configured business.

`metaden-busyness` now uses `metabridge` as its compatibility layer, so framework, inventory, and target integrations are handled through your bridge setup rather than being hard-required directly by this resource.


---

## Usage

### For Employees

1. Work at a configured business job.
2. Serve spawned NPC customers using stocked items from your inventory.
3. Open `/businesspanel`, or the tablet, or the management target to restock, review data, or work deliveries.
4. Use placed billing registers to create bills for nearby customers when your grade can serve.
5. Accept delivery orders from the Orders page, follow the waypoint, and complete the handoff through the in-world interaction system provided by `metabridge`.
6. Receive the configured employee split for normal sales and the inverse split for delivery jobs.

### For Managers and Owners

Managers and owners can use the business panel to:

- review business stats, logs, and employee cash totals
- set live sale prices inside admin-defined ceilings
- choose which allowed items appear on the public storefront menu
- deposit stock into the business inventory pool
- manage delivery orders from the Orders tab
- configure payout split and minimum grade thresholds
- withdraw business funds if their grade allows it
- place or clear the public storefront ped

QBX boss grades always retain manager access even if stored numeric thresholds are higher.
Non-boss managers can tighten stored grade thresholds, but only bosses or ACE admins can lower them.

### For Admins

ACE-authorized admins can use `/busynessadmin` to:

- add, place, move, and clear billing registers per business
- review register placement state alongside storefront placement state
- manage live catalog items, business controls, and audit data across all configured businesses

### Register Billing Flow

- Employees interact with a placed register to open the register billing UI.
- The bill creator selects a nearby player, enters an amount, and optionally adds a description.
- Open bills remain tied to that register until they are paid or dismissed.
- Customers interact with the same register area to open the payment UI and settle bills with cash or card.
- Register-driven sales feed the shared audit pipeline, including register references and payment metadata.

### Public Storefront

Players can interact with a placed storefront ped to browse the live menu and buy stocked items directly from the business.

### Delivery Board Behavior

- Delivery queues are stored in server memory per business.
- A queue activates once that business is opened through the management flow after resource startup.
- Activation fills the board up to `Config.DeliveryOrders.MaxActive`.
- Refill is action-driven, not polled. Opening the panel, accepting an order, dismissing one, and completing one all reconcile the queue.
- Delivery total is built from subtotal + delivery fee + optional distance bonus.
- Delivery payout uses the inverse of the business's configured in-house employee payout split.
- Dismissed and completed deliveries write audit entries into the customer log table.


---

## Troubleshooting

### Customers Not Spawning

- Verify the business `job`, `coords`, `spawnPoints`, and `path` are configured correctly.
- Confirm NPC traffic is enabled for the business.
- Check that the resource started without schema or dependency errors.

### Delivery Board Empty

- Ensure the business has enabled items with usable prices.
- Confirm `Config.DeliveryOrders.Destinations` or business-specific `deliveryDestinations` contain valid `vec3` or `vec4` entries.
- Open the management panel at least once after startup so the delivery queue activates.

### Public Storefront Not Working

- Confirm a storefront ped has been placed and the business has at least one live menu item.
- Make sure stock exists for the listed items.
- Verify `metabridge`, `ox_lib`, and `oxmysql` are started before this resource.
- Confirm your bridge is configured with working target and inventory adapters.

### Register Billing Or Payment Not Working

- Confirm the business has at least one placed register in `/busynessadmin`.
- Make sure the employee is on the correct business job and has serve access.
- Verify the customer is close enough to appear in the nearby target list.
- Check whether an open bill already exists for that customer at the register when multiple open bills are disabled.
- If the customer cannot pay, confirm they still have an open bill tied to that register and enough cash or card balance for the selected payment method.


---

## Support

When debugging issues, start with the server console. Most setup mistakes surface as missing dependencies, invalid config entries, failed schema operations, or item-definition mismatches in the inventory system connected through `metabridge`.