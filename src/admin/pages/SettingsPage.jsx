import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Palette,
  Shield,
  Bell,
  Save,
  Upload,
  Check,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import {
  FormField,
  Input,
  Select,
  ActionBtn,
} from "../components/ui/FormField";
import {
  PERMISSION_RESOURCES,
  CRUD_ACTIONS,
  ROLE_DEFAULT_PERMS,
  permKey,
  resourcePerms,
  allPerms,
} from "../data/adminData";

const TABS = [
  { id: "general", label: "General", icon: Globe },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "permissions", label: "Permissions", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const FONTS = ["Inter", "Roboto", "Poppins", "DM Sans", "Nunito"];
const RADII = [
  "rounded-sm",
  "rounded-md",
  "rounded-lg",
  "rounded-xl",
  "rounded-2xl",
  "rounded-full",
];
const ROLES = ["Admin", "Coordinator", "Member"];

function GeneralTab({ settings, onSave }) {
  const [form, setForm] = useState(settings.general);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Website Name">
          <Input
            value={form.siteName}
            onChange={(e) => setForm({ ...form, siteName: e.target.value })}
          />
        </FormField>
        <FormField label="Tagline">
          <Input
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          />
        </FormField>
        <FormField label="Support Email">
          <Input
            type="email"
            value={form.supportEmail}
            onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
          />
        </FormField>
        <FormField label="Timezone">
          <Select
            value={form.timezone}
            onChange={(e) => setForm({ ...form, timezone: e.target.value })}
          >
            {["Asia/Kolkata", "UTC", "America/New_York", "Europe/London"].map(
              (tz) => (
                <option key={tz}>{tz}</option>
              ),
            )}
          </Select>
        </FormField>
      </div>
      <FormField label="Logo Upload (UI only)">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            E
          </div>
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex-1 text-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <Upload size={16} className="mx-auto text-slate-400 mb-1" />
            <p className="text-sm text-slate-400">Upload new logo</p>
          </div>
        </div>
      </FormField>
      <div className="flex justify-end">
        <ActionBtn onClick={() => onSave({ general: form })}>
          <Save size={14} /> Save Changes
        </ActionBtn>
      </div>
    </div>
  );
}

function AppearanceTab({ settings, onSave }) {
  const [form, setForm] = useState(settings.appearance);
  const COLORS = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#ef4444",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
  ];
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Primary Color
        </p>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setForm({ ...form, primaryColor: c })}
              className={`w-9 h-9 rounded-xl transition-all ${form.primaryColor === c ? "ring-2 ring-offset-2 ring-indigo-500 scale-110" : "hover:scale-105"}`}
              style={{ backgroundColor: c }}
            />
          ))}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={form.primaryColor}
              onChange={(e) =>
                setForm({ ...form, primaryColor: e.target.value })
              }
              className="w-9 h-9 rounded-xl cursor-pointer border-0 p-0.5 bg-transparent"
            />
            <span className="text-xs text-slate-400">Custom</span>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Font Family
        </p>
        <div className="flex flex-wrap gap-2">
          {FONTS.map((f) => (
            <button
              key={f}
              onClick={() => setForm({ ...form, fontFamily: f })}
              className={`px-4 py-2 rounded-lg text-sm border transition-all ${form.fontFamily === f ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"}`}
              style={{ fontFamily: f }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Border Radius
        </p>
        <div className="flex flex-wrap gap-2">
          {RADII.map((r) => (
            <button
              key={r}
              onClick={() => setForm({ ...form, borderRadius: r })}
              className={`px-4 py-2 text-sm border transition-all ${r} ${form.borderRadius === r ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"}`}
            >
              {r.replace("rounded-", "")}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <ActionBtn onClick={() => onSave({ appearance: form })}>
          <Save size={14} /> Save Changes
        </ActionBtn>
      </div>
    </div>
  );
}

function PermissionsTab() {
  const [selectedRole, setSelectedRole] = useState("Coordinator");
  const [perms, setPerms] = useState({ ...ROLE_DEFAULT_PERMS });
  const { toast } = useAdmin();

  const groups = [...new Set(PERMISSION_RESOURCES.map((r) => r.group))];

  const isChecked = (resource, action) =>
    perms[selectedRole].includes(permKey(resource, action));

  const toggle = (resource, action) => {
    const key = permKey(resource, action);
    const current = perms[selectedRole];
    setPerms({
      ...perms,
      [selectedRole]: current.includes(key)
        ? current.filter((p) => p !== key)
        : [...current, key],
    });
  };

  const toggleRow = (resource) => {
    const keys = resourcePerms(resource);
    const current = perms[selectedRole];
    const allOn = keys.every((k) => current.includes(k));
    setPerms({
      ...perms,
      [selectedRole]: allOn
        ? current.filter((p) => !keys.includes(p))
        : [...new Set([...current, ...keys])],
    });
  };

  const toggleCol = (action) => {
    const keys = PERMISSION_RESOURCES.map((r) => permKey(r.key, action));
    const current = perms[selectedRole];
    const allOn = keys.every((k) => current.includes(k));
    setPerms({
      ...perms,
      [selectedRole]: allOn
        ? current.filter((p) => !keys.includes(p))
        : [...new Set([...current, ...keys])],
    });
  };

  const toggleAll = () => {
    const all = allPerms();
    const current = perms[selectedRole];
    const allOn = all.every((k) => current.includes(k));
    setPerms({ ...perms, [selectedRole]: allOn ? [] : all });
  };

  return (
    <div className="space-y-5">
      {/* Role selector */}
      <div className="flex gap-2 flex-wrap">
        {ROLES.map((r) => (
          <button
            key={r}
            onClick={() => setSelectedRole(r)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedRole === r
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {r}
          </button>
        ))}
        <button
          onClick={toggleAll}
          className="ml-auto text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium self-center"
        >
          {allPerms().every((k) => perms[selectedRole].includes(k))
            ? "Deselect All"
            : "Select All"}
        </button>
      </div>

      {/* Permission matrix per group */}
      {groups.map((group) => {
        const resources = PERMISSION_RESOURCES.filter((r) => r.group === group);
        return (
          <div key={group}>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">
              {group}
            </p>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Header */}
              <div
                className="grid bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700"
                style={{ gridTemplateColumns: "1fr repeat(4, 72px)" }}
              >
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Resource
                </div>
                {CRUD_ACTIONS.map((action) => (
                  <button
                    key={action}
                    onClick={() => toggleCol(action)}
                    className="py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize text-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    title={`Toggle all ${action}`}
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Rows */}
              {resources.map((res, i) => {
                const rowAllOn = resourcePerms(res.key).every((k) =>
                  perms[selectedRole].includes(k),
                );
                return (
                  <div
                    key={res.key}
                    className={`grid items-center ${i < resources.length - 1 ? "border-b border-slate-100 dark:border-slate-800" : ""}`}
                    style={{ gridTemplateColumns: "1fr repeat(4, 72px)" }}
                  >
                    <button
                      onClick={() => toggleRow(res.key)}
                      className={`px-3 py-2.5 text-sm text-left font-medium transition-colors flex items-center gap-2
                        ${rowAllOn ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300"}
                        hover:text-indigo-600 dark:hover:text-indigo-400`}
                    >
                      {rowAllOn && (
                        <Check size={12} className="text-indigo-500 shrink-0" />
                      )}
                      {res.label}
                    </button>
                    {CRUD_ACTIONS.map((action) => (
                      <div
                        key={action}
                        className="flex items-center justify-center py-2.5"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked(res.key, action)}
                          onChange={() => toggle(res.key, action)}
                          className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="flex items-center justify-between pt-1">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {perms[selectedRole].length} of {allPerms().length} permissions
          granted to {selectedRole}
        </p>
        <ActionBtn
          onClick={() => toast(`Permissions saved for ${selectedRole}`)}
        >
          <Save size={14} /> Save Permissions
        </ActionBtn>
      </div>
    </div>
  );
}

function NotificationsTab({ settings, onSave }) {
  const [form, setForm] = useState(settings.notifications);

  const toggles = [
    {
      key: "emailAlerts",
      label: "Email Alerts",
      desc: "Receive important updates via email",
    },
    {
      key: "systemAlerts",
      label: "System Alerts",
      desc: "In-app notifications for system events",
    },
    { key: "smsAlerts", label: "SMS Alerts", desc: "Critical alerts via SMS" },
    {
      key: "weeklyReport",
      label: "Weekly Report",
      desc: "Summary report every Monday",
    },
  ];

  return (
    <div className="space-y-4">
      {toggles.map(({ key, label, desc }) => (
        <div
          key={key}
          className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
        >
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {label}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
          </div>
          <button
            onClick={() => setForm({ ...form, [key]: !form[key] })}
            className={`relative w-11 h-6 rounded-full transition-colors ${form[key] ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-600"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form[key] ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>
      ))}
      <div className="flex justify-end">
        <ActionBtn onClick={() => onSave({ notifications: form })}>
          <Save size={14} /> Save Preferences
        </ActionBtn>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { state, dispatch, toast } = useAdmin();
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = (patch) => {
    dispatch({ type: "UPDATE_SETTINGS", payload: patch });
    toast("Settings saved successfully");
  };

  const tabContent = {
    general: <GeneralTab settings={state.settings} onSave={handleSave} />,
    appearance: <AppearanceTab settings={state.settings} onSave={handleSave} />,
    permissions: <PermissionsTab />,
    notifications: (
      <NotificationsTab settings={state.settings} onSave={handleSave} />
    ),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Manage platform configuration
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab nav */}
        <div className="lg:w-52 shrink-0">
          <nav className="flex lg:flex-col gap-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full ${activeTab === id ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
          className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
        >
          {tabContent[activeTab]}
        </motion.div>
      </div>
    </div>
  );
}
