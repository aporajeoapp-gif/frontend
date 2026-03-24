// ─── Admin Mock Data ───────────────────────────────────────────────────────────
// Structured for easy API replacement: swap these with fetch/axios calls later.

// ─── Granular CRUD permission matrix ──────────────────────────────────────────
// Each resource has 4 actions: create, read, update, delete
export const PERMISSION_RESOURCES = [
  { key: "bus", label: "Bus Routes", group: "Transport" },
  { key: "ferry", label: "Ferry Routes", group: "Transport" },
  { key: "doctors", label: "Doctors", group: "Healthcare" },
  { key: "emergency", label: "Emergency Services", group: "Healthcare" },
  { key: "blood", label: "Blood Donation", group: "Healthcare" },
  { key: "events", label: "Events", group: "Content" },
  { key: "ads", label: "Advertisements", group: "Content" },
  { key: "analytics", label: "Analytics", group: "Admin" },
  { key: "settings", label: "Settings", group: "Admin" },
];

export const CRUD_ACTIONS = ["create", "read", "update", "delete"];

// Helper: build a flat permission key like "bus.create"
export const permKey = (resource, action) => `${resource}.${action}`;

// Helper: check if a permissions array includes a specific perm
export const hasPerm = (permissions, resource, action) =>
  permissions.includes(permKey(resource, action));

// Helper: get all keys for a resource
export const resourcePerms = (resource) =>
  CRUD_ACTIONS.map((a) => permKey(resource, a));

// Helper: get all keys for a full-access set
export const allPerms = () =>
  PERMISSION_RESOURCES.flatMap((r) => resourcePerms(r.key));

// ─── Default role permission sets ─────────────────────────────────────────────
export const ROLE_DEFAULT_PERMS = {
  admin: allPerms(),
  coordinator: [
    "bus.read",
    "ferry.read",
    "doctors.read",
    "emergency.read",
    "blood.read",
    "events.create",
    "events.read",
    "events.update",
    "events.delete",
    "ads.create",
    "ads.read",
    "ads.update",
    "ads.delete",
    "analytics.read",
  ],
  member: [
    "bus.read",
    "ferry.read",
    "doctors.read",
    "emergency.read",
    "blood.read",
    "events.read",
    "analytics.read",
  ],
};

// ─── Users ─────────────────────────────────────────────────────────────────────
// password field is stored in plain text here for demo purposes.
// In production: hash with bcrypt on the backend, never store plain text.
export const USERS = [
  {
    id: 1,
    name: "Aryan Bose",
    email: "aryan@enjio.app",
    password: "Admin@123",
    role: "admin",
    status: "Active",
    joined: "2025-01-10",
    avatar: "AB",
    permissions: allPerms(),
  },
  {
    id: 2,
    name: "Priya Nair",
    email: "priya@enjio.app",
    password: "Coord@123",
    role: "coordinator",
    status: "Active",
    joined: "2025-03-15",
    avatar: "PN",
    permissions: ROLE_DEFAULT_PERMS.coordinator,
  },
  {
    id: 3,
    name: "Rahul Das",
    email: "rahul@enjio.app",
    password: "Member@123",
    role: "member",
    status: "Active",
    joined: "2025-05-20",
    avatar: "RD",
    permissions: ROLE_DEFAULT_PERMS.member,
  },
  {
    id: 4,
    name: "Sneha Roy",
    email: "sneha@enjio.app",
    password: "Sneha@123",
    role: "coordinator",
    status: "Inactive",
    joined: "2025-06-01",
    avatar: "SR",
    permissions: ["bus.read", "bus.update", "ferry.read", "analytics.read"],
  },
  {
    id: 5,
    name: "Amit Verma",
    email: "amit@enjio.app",
    password: "Amit@123",
    role: "member",
    status: "Active",
    joined: "2025-07-12",
    avatar: "AV",
    permissions: [],
  },
  {
    id: 6,
    name: "Kavya Menon",
    email: "kavya@enjio.app",
    password: "Kavya@123",
    role: "admin",
    status: "Active",
    joined: "2025-08-05",
    avatar: "KM",
    permissions: allPerms(),
  },
  {
    id: 7,
    name: "Rohan Ghosh",
    email: "rohan@enjio.app",
    password: "Rohan@123",
    role: "member",
    status: "Suspended",
    joined: "2025-09-18",
    avatar: "RG",
    permissions: [],
  },
  {
    id: 8,
    name: "Divya Pillai",
    email: "divya@enjio.app",
    password: "Divya@123",
    role: "coordinator",
    status: "Active",
    joined: "2025-10-22",
    avatar: "DP",
    permissions: [
      "events.create",
      "events.read",
      "events.update",
      "analytics.read",
    ],
  },
];

// ─── Chart data ────────────────────────────────────────────────────────────────
export const EVENTS_PER_MONTH = [
  { month: "Jan", events: 3 },
  { month: "Feb", events: 5 },
  { month: "Mar", events: 4 },
  { month: "Apr", events: 8 },
  { month: "May", events: 6 },
  { month: "Jun", events: 9 },
  { month: "Jul", events: 7 },
  { month: "Aug", events: 11 },
  { month: "Sep", events: 8 },
  { month: "Oct", events: 13 },
  { month: "Nov", events: 10 },
  { month: "Dec", events: 15 },
];

export const USER_GROWTH = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 180 },
  { month: "Mar", users: 240 },
  { month: "Apr", users: 310 },
  { month: "May", users: 390 },
  { month: "Jun", users: 480 },
  { month: "Jul", users: 560 },
  { month: "Aug", users: 650 },
  { month: "Sep", users: 720 },
  { month: "Oct", users: 810 },
  { month: "Nov", users: 920 },
  { month: "Dec", users: 1050 },
];

export const RECENT_ACTIVITY = [
  {
    id: 1,
    user: "Aryan Bose",
    action: "Added new bus route",
    time: "2 min ago",
    type: "route",
  },
  {
    id: 2,
    user: "Priya Nair",
    action: "Created event: Tech Meetup",
    time: "15 min ago",
    type: "event",
  },
  {
    id: 3,
    user: "Kavya Menon",
    action: "Updated advertisement",
    time: "1 hr ago",
    type: "ad",
  },
  {
    id: 4,
    user: "Rahul Das",
    action: "Registered as new member",
    time: "2 hr ago",
    type: "user",
  },
  {
    id: 5,
    user: "Sneha Roy",
    action: "Edited ferry route F3",
    time: "3 hr ago",
    type: "route",
  },
  {
    id: 6,
    user: "Amit Verma",
    action: "Viewed analytics dashboard",
    time: "5 hr ago",
    type: "view",
  },
];

export const SETTINGS = {
  general: {
    siteName: "ENJIO",
    tagline: "Smart City Service Platform",
    supportEmail: "support@enjio.app",
    timezone: "Asia/Kolkata",
  },
  appearance: {
    primaryColor: "#6366f1",
    fontFamily: "Inter",
    borderRadius: "rounded-xl",
  },
  notifications: {
    emailAlerts: true,
    systemAlerts: true,
    smsAlerts: false,
    weeklyReport: true,
  },
};

// Keep ALL_PERMISSIONS exported for any legacy references (maps to flat list)
export const ALL_PERMISSIONS = PERMISSION_RESOURCES.flatMap((r) =>
  CRUD_ACTIONS.map((a) => ({
    key: permKey(r.key, a),
    label: `${a.charAt(0).toUpperCase() + a.slice(1)} ${r.label}`,
    group: r.label,
    resource: r.key,
    action: a,
  })),
);
