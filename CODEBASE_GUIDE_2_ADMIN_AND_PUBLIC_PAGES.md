# Guide 2: Admin Dashboard, State Management & Public Pages

---

## 1. Admin State — How All Data is Managed (`src/admin/context/AdminContext.jsx`)

The entire admin panel shares one central state. Think of it as a single JavaScript
object that holds everything: users, bus routes, ferry routes, doctors, events, etc.

### The state shape

```js
{
  users: [...],
  busRoutes: [...],       // loaded from busServices.json
  ferryRoutes: [...],     // loaded from ferryServices.json
  doctors: [...],         // loaded from doctors.json
  emergency: [...],
  events: [...],
  advertisements: [...],
  bloodCamps: [...],
  settings: { general, appearance, notifications },
  toasts: []              // notification messages
}
```

### How state changes work (useReducer pattern)

React's `useReducer` is like a controlled switch statement. You never change state
directly. Instead you send an **action** (a plain object with a `type`) and the
reducer function decides how to update state.

```
Component calls:  dispatch({ type: "ADD_BUS", payload: { routeName: "..." } })
                                    ↓
adminReducer receives the action
                                    ↓
Returns new state with the new bus route added
                                    ↓
All components using useAdmin() re-render with new data
```

### Every resource follows the same 3-action pattern

| Action type | What it does |
|---|---|
| `ADD_BUS` | Adds new item, auto-generates `id: String(Date.now())` |
| `UPDATE_BUS` | Finds item by `id`, replaces it with new data |
| `DELETE_BUS` | Filters out item with matching `id` |

Same pattern exists for: FERRY, DOCTOR, EMERGENCY, EVENT, AD, BLOOD_CAMP, USER.

### Toast notifications

```js
const toast = useCallback((message, type = "success") => {
  const id = Date.now();
  dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
  setTimeout(() => dispatch({ type: "REMOVE_TOAST", payload: id }), 3500);
}, []);
```

Calling `toast("Route added")` adds a notification to `state.toasts`.
After 3.5 seconds it auto-removes itself. The `ToastContainer` component
reads `state.toasts` and renders them on screen.

### How to use admin state in any component

```jsx
import { useAdmin } from "../context/AdminContext";

const { state, dispatch, toast } = useAdmin();

// Read data
const routes = state.busRoutes;

// Add something
dispatch({ type: "ADD_BUS", payload: { routeName: "...", fare: 30 } });

// Show a notification
toast("Bus route added successfully");
toast("Something failed", "error");
```

---

## 2. Admin Dashboard (`src/admin/pages/AdminDashboard.jsx`)

The dashboard has 3 sections: stat cards, charts, recent activity.

### Stat Cards

```js
const stats = [
  { label: "Total Users", value: state.users.length, icon: Users, color: "indigo" },
  { label: "Total Events", value: state.events.length, icon: CalendarDays, color: "emerald" },
  // ...
];
```

Each stat reads a `.length` from the live admin state. So if you add a user in
the Users page, the "Total Users" card updates immediately — no API call needed.

`activeAds` is calculated separately:
```js
const activeAds = state.advertisements.filter(a => a.active !== false).length;
```
It counts only ads where `active` is not explicitly `false`.

### Charts (Recharts library)

The charts use **static mock data** from `adminData.js` — not live state.

```js
import { EVENTS_PER_MONTH, USER_GROWTH } from "../data/adminData";
// EVENTS_PER_MONTH = [{ month: "Jan", events: 3 }, { month: "Feb", events: 5 }, ...]
// USER_GROWTH      = [{ month: "Jan", users: 120 }, ...]
```

**AreaChart** (User Growth) — shows a filled area under a line:
```jsx
<AreaChart data={USER_GROWTH}>
  <Area dataKey="users" />   ← "users" matches the key in each data object
</AreaChart>
```

**BarChart** (Events per Month) — shows vertical bars:
```jsx
<BarChart data={EVENTS_PER_MONTH}>
  <Bar dataKey="events" />   ← "events" matches the key in each data object
</BarChart>
```

`ResponsiveContainer width="100%"` makes charts fill their parent div width.

**CustomTooltip** — the popup that appears when you hover a chart point:
```jsx
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  // active = is mouse hovering?
  // label = the X axis value (e.g. "Jan")
  // payload[0].value = the Y axis value (e.g. 120)
  return <div>...</div>;
};
```

### Recent Activity

```js
const activityIcons = {
  route: <Bus />,
  event: <CalendarDays />,
  ad: <Megaphone />,
  user: <Users />,
  view: <TrendingUp />,
};
```

Each activity item in `RECENT_ACTIVITY` has a `type` field. The icon is looked
up from this map: `activityIcons[a.type]`.

### Animations (Framer Motion)

```jsx
<motion.div
  initial={{ opacity: 0, y: 16 }}   ← starts invisible, 16px below
  animate={{ opacity: 1, y: 0 }}    ← animates to visible, normal position
  transition={{ delay: i * 0.05 }}  ← each card staggers by 50ms
>
```

`i * 0.05` means card 0 starts at 0ms, card 1 at 50ms, card 2 at 100ms, etc.
This creates the "cascade" effect where cards appear one after another.

---

## 3. Reusable Admin UI Components

### Table (`src/admin/components/ui/Table.jsx`)

The Table component is generic — you pass it columns and data, it handles
search, pagination, and rendering.

```jsx
<Table
  columns={[
    { key: "routeNumber", label: "Route #" },
    { key: "routeName", label: "Route Name" },
    {
      key: "stops",
      label: "Stops",
      render: (value, row) => <span>{value.join(" → ")}</span>
      // render = optional custom cell renderer
      // value = the cell value (row["stops"])
      // row = the full row object
    },
  ]}
  data={state.busRoutes}
  searchKeys={["routeNumber", "routeName"]}  // which fields to search
  actions={(row) => (
    <>
      <button onClick={() => openEdit(row)}>Edit</button>
      <button onClick={() => dispatch({ type: "DELETE_BUS", payload: row.id })}>Delete</button>
    </>
  )}
/>
```

**How search works inside Table:**
```js
const filtered = data.filter(row =>
  searchKeys.some(k =>
    String(row[k]).toLowerCase().includes(query.toLowerCase())
  )
);
```
It checks if ANY of the `searchKeys` fields contain the search query.

**How pagination works:**
```js
const totalPages = Math.ceil(filtered.length / pageSize);  // default pageSize=8
const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
// page 1: items 0-7
// page 2: items 8-15
// etc.
```

### StatCard (`src/admin/components/ui/StatCard.jsx`)

```jsx
<StatCard
  label="Total Users"
  value={42}
  icon={Users}          // Lucide icon component
  color="indigo"        // one of: indigo, emerald, amber, rose, violet, cyan
  trend={{ up: true, value: "+12%" }}  // optional trend indicator
/>
```

The `colors` object maps color names to Tailwind classes:
```js
const colors = {
  indigo: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400",
  // ...
};
```

### Modal (`src/admin/components/ui/Modal.jsx`)

```jsx
<Modal
  open={!!modal}           // boolean: show or hide
  onClose={() => setModal(null)}
  title="Add Bus Route"
  size="md"                // sm | md | lg | xl
>
  {/* form content goes here */}
</Modal>
```

When `open` is true:
- `document.body.style.overflow = "hidden"` — prevents background scrolling
- Backdrop (dark overlay) renders, clicking it calls `onClose`
- Modal panel animates in with spring physics

`AnimatePresence` from Framer Motion handles the enter/exit animations.
Without it, the exit animation would not play.

---

## 4. BusPage — Full CRUD Flow (`src/admin/pages/BusPage.jsx`)

This is the clearest example of how every admin CRUD page works.

```
State:
  modal = null | "add" | "edit"   ← controls which modal is open
  form = { routeNumber, routeName, departureTime, arrivalTime, stops, fare }
```

### Add flow
```
User clicks "Add Route"
  → openAdd() sets form to empty object, modal to "add"
  → Modal opens with empty form
  → User fills in fields
  → handleSave() validates, builds payload, dispatches ADD_BUS
  → AdminContext reducer adds item to state.busRoutes
  → Table re-renders with new route
  → toast("Bus route added") shows notification
```

### Edit flow
```
User clicks pencil icon on a row
  → openEdit(row) copies row data into form state, modal to "edit"
  → Modal opens with pre-filled form
  → User changes fields
  → handleSave() dispatches UPDATE_BUS with updated payload
  → Reducer finds item by id, replaces it
```

### Stops field — string ↔ array conversion

Stops are stored as an array in state: `["Stop A", "Stop B", "Stop C"]`
But the form input is a text field, so it needs a string: `"Stop A, Stop B, Stop C"`

```js
// When opening edit: array → string for the input
setForm({ ...r, stops: Array.isArray(r.stops) ? r.stops.join(", ") : r.stops });

// When saving: string → array for state
stops: form.stops.split(",").map(s => s.trim()).filter(Boolean)
```

---

## 5. Public Pages — Bus & Ferry (`src/pages/Bus.jsx`, `src/pages/Ferry.jsx`)

### Where data comes from

Public pages read from the **same AdminContext state** as the admin panel:

```jsx
const { state } = useAdmin();
const busServices = state.busRoutes;  // same data the admin manages
```

This means: if an admin adds a bus route, it immediately appears on the public
Bus page — they share the same in-memory state.

### Search/filter logic

```js
const filtered = busServices.filter(s => {
  const q = search.toLowerCase();
  return (
    s.routeName.toLowerCase().includes(q) ||
    s.routeNumber.includes(q) ||
    s.stops.some(st => st.toLowerCase().includes(q))  // search inside stops array
  );
});
```

### Duration calculation

```js
function getDuration(dep, arr) {
  const [dh, dm] = dep.split(":").map(Number);  // "08:30" → [8, 30]
  const [ah, am] = arr.split(":").map(Number);  // "10:00" → [10, 0]
  const mins = ah * 60 + am - (dh * 60 + dm);  // total minutes difference
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;      // "1h 30m" or "45m"
}
```

### Table vs Card view toggle

```jsx
const [view, setView] = useState("table");  // "table" or "card"

// Toggle buttons
["table", "card"].map(v => (
  <button onClick={() => setView(v)} className={view === v ? "active styles" : "inactive styles"}>
    ...
  </button>
))

// Conditional rendering with AnimatePresence for smooth transitions
<AnimatePresence mode="wait">
  {view === "table" && <motion.div key="table">...</motion.div>}
  {view === "card"  && <motion.div key="cards">...</motion.div>}
</AnimatePresence>
```

`mode="wait"` means: wait for the current view to finish its exit animation
before starting the enter animation of the new view.

### Translation in table headers

```jsx
{[t.route_no, t.route_name, t.departure, t.arrival, t.duration, t.fare, t.stops, t.status].map(h => (
  <th key={h}>{h}</th>
))}
```

`t` comes from `useTranslation()`. Each `t.key` returns the label in the
current language. When language switches, all headers update automatically.

---

## 6. Doctor Page — Extra Features (`src/pages/Doctor.jsx`)

### Sortable columns

```js
const [sortField, setSortField] = useState("name");
const [sortDir, setSortDir] = useState("asc");

const filtered = useMemo(() => {
  let list = doctors.filter(...);
  return [...list].sort((a, b) => {
    const av = a[sortField], bv = b[sortField];
    if (typeof av === "number") return sortDir === "asc" ? av - bv : bv - av;
    return sortDir === "asc"
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });
}, [search, specialty, sortField, sortDir]);
```

`useMemo` caches the filtered+sorted result. It only recalculates when one of
the dependencies (`search`, `specialty`, `sortField`, `sortDir`) changes.

### Booking Modal

```js
const [selectedDoctor, setSelectedDoctor] = useState(null);

// Open: clicking "Book Now" sets the doctor
<button onClick={() => setSelectedDoctor(doc)}>Book Now</button>

// Close: set back to null
<BookingModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
```

When `selectedDoctor` is not null, the modal renders with that doctor's schedule.

---

## 7. Data Flow Summary

```
JSON files (src/constant/data/*.json)
        ↓
AdminContext initialState (loaded once on app start)
        ↓
state.busRoutes / state.ferryRoutes / state.doctors / etc.
        ↓
        ├── Admin pages (BusPage, FerryPage...) — read + write via dispatch
        └── Public pages (Bus, Ferry, Doctor...) — read only via useAdmin()
```

Changes made in the admin panel are immediately visible on public pages
because they share the same React context state in memory.

> Note: This is all in-memory. A page refresh resets everything back to the
> original JSON data. To persist changes, you would connect dispatch actions
> to real API calls (see API_INTEGRATION.md).
