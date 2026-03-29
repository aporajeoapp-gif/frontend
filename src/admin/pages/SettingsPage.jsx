import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Palette, Bell, Save, Upload, X } from "lucide-react";

const inp =
  "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-indigo-400 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 transition-colors";
const btn = (v = "primary") =>
  ({
    primary:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors",
    secondary:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors",
  })[v];
const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
      {label}
    </label>
    {children}
  </div>
);

const DEFAULT_SETTINGS = {
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

const TABS = [
  { id: "general", label: "General", icon: Globe },
  { id: "appearance", label: "Appearance", icon: Palette },
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

function GeneralTab({ settings, onSave }) {
  const [form, setForm] = useState(settings.general);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Website Name">
          <input
            className={inp}
            value={form.siteName}
            onChange={(e) => setForm({ ...form, siteName: e.target.value })}
          />
        </Field>
        <Field label="Tagline">
          <input
            className={inp}
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          />
        </Field>
        <Field label="Support Email">
          <input
            className={inp}
            type="email"
            value={form.supportEmail}
            onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
          />
        </Field>
        <Field label="Timezone">
          <select
            className={inp}
            value={form.timezone}
            onChange={(e) => setForm({ ...form, timezone: e.target.value })}
          >
            {["Asia/Kolkata", "UTC", "America/New_York", "Europe/London"].map(
              (tz) => (
                <option key={tz}>{tz}</option>
              ),
            )}
          </select>
        </Field>
      </div>
      <Field label="Logo Upload (UI only)">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            E
          </div>
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex-1 text-center cursor-pointer hover:border-indigo-400 transition-colors">
            <Upload size={16} className="mx-auto text-slate-400 mb-1" />
            <p className="text-sm text-slate-400">Upload new logo</p>
          </div>
        </div>
      </Field>
      <div className="flex justify-end">
        <button className={btn()} onClick={() => onSave({ general: form })}>
          <Save size={14} /> Save Changes
        </button>
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
          <input
            className={inp}
            type="color"
            value={form.primaryColor}
            onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
            className="w-9 h-9 rounded-xl cursor-pointer border-0 p-0.5 bg-transparent"
          />
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
              style={{ fontFamily: f }}
              className={`px-4 py-2 rounded-lg text-sm border transition-all ${form.fontFamily === f ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"}`}
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
              className={`px-4 py-2 text-sm border transition-all ${r} ${form.borderRadius === r ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"}`}
            >
              {r.replace("rounded-", "")}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button className={btn()} onClick={() => onSave({ appearance: form })}>
          <Save size={14} /> Save Changes
        </button>
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
        <button
          className={btn()}
          onClick={() => onSave({ notifications: form })}
        >
          <Save size={14} /> Save Preferences
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = (patch) => setSettings((prev) => ({ ...prev, ...patch }));

  const tabContent = {
    general: <GeneralTab settings={settings} onSave={handleSave} />,
    appearance: <AppearanceTab settings={settings} onSave={handleSave} />,
    notifications: <NotificationsTab settings={settings} onSave={handleSave} />,
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
