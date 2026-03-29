import { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Palette,
  Bell,
  Save,
  RotateCcw,
  Sun,
  Moon,
  Check,
} from "lucide-react";
import { useBrand } from "../../context/BrandContext";
import { ThemeContext } from "../../context/ThemeContext";

const inp =
  "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-primary-400 dark:focus:border-primary-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 transition-colors";

const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
      {label}
    </label>
    {children}
  </div>
);

const TABS = [
  { id: "general", label: "General", icon: Globe },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const DEFAULT_GENERAL = {
  siteName: "অপরাজেয়",
  tagline: "Smart City Service Platform",
  supportEmail: "support@aporajeo.app",
  timezone: "Asia/Dhaka",
};

/* ── General Tab ── */
function GeneralTab() {
  const [form, setForm] = useState(() => {
    const stored = localStorage.getItem("siteGeneral");
    return stored ? JSON.parse(stored) : DEFAULT_GENERAL;
  });
  const [saved, setSaved] = useState(false);

  const save = () => {
    localStorage.setItem("siteGeneral", JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
            {[
              "Asia/Dhaka",
              "Asia/Kolkata",
              "UTC",
              "America/New_York",
              "Europe/London",
            ].map((tz) => (
              <option key={tz}>{tz}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="flex justify-end">
        <button
          onClick={save}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
          style={{ backgroundColor: "var(--brand, #6366f1)" }}
        >
          {saved ? (
            <>
              <Check size={14} /> Saved!
            </>
          ) : (
            <>
              <Save size={14} /> Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── Appearance Tab ── */
function AppearanceTab() {
  const { accentColor, updateColor, resetColor, COLORS } = useBrand();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [customHex, setCustomHex] = useState(accentColor);
  const [saved, setSaved] = useState(false);

  const apply = (hex) => {
    updateColor(hex);
    setCustomHex(hex);
  };

  const save = () => {
    updateColor(customHex);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Theme toggle */}
      <div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Color Mode
        </p>
        <div className="flex gap-3">
          {[
            { label: "Light", value: "light", Icon: Sun },
            { label: "Dark", value: "dark", Icon: Moon },
          ].map(({ label, value, Icon }) => (
            <button
              key={value}
              onClick={() => theme !== value && toggleTheme()}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                theme === value
                  ? "border-[var(--brand)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] text-[var(--brand)]"
                  : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Preset colors */}
      <div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Accent Color
        </p>
        <div className="flex flex-wrap gap-3 mb-4">
          {COLORS.map(({ name, value }) => (
            <button
              key={value}
              onClick={() => apply(value)}
              title={name}
              className="relative w-10 h-10 rounded-xl transition-all hover:scale-110 focus:outline-none"
              style={{ backgroundColor: value }}
            >
              {accentColor === value && (
                <Check
                  size={16}
                  className="absolute inset-0 m-auto text-white drop-shadow"
                />
              )}
            </button>
          ))}
        </div>

        {/* Custom color picker */}
        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="relative">
            <input
              type="color"
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value)}
              className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0.5 bg-transparent"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Custom Hex
            </p>
            <input
              type="text"
              value={customHex}
              onChange={(e) =>
                /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) &&
                setCustomHex(e.target.value)
              }
              className="w-32 px-2 py-1 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-[var(--brand)] text-slate-800 dark:text-slate-200"
            />
          </div>
          <div
            className="w-10 h-10 rounded-xl shadow-inner border border-slate-200 dark:border-slate-700"
            style={{ backgroundColor: customHex }}
          />
        </div>
      </div>

      {/* Live preview */}
      <div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Live Preview
        </p>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3">
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg text-white text-sm font-semibold"
              style={{ backgroundColor: customHex }}
            >
              Primary Button
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-semibold border-2"
              style={{ borderColor: customHex, color: customHex }}
            >
              Outline Button
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: customHex }}
            />
            <span className="text-sm font-medium" style={{ color: customHex }}>
              Accent text color
            </span>
          </div>
          <div
            className="h-2 rounded-full"
            style={{ backgroundColor: customHex, opacity: 0.2 }}
          >
            <div
              className="h-2 rounded-full w-2/3"
              style={{ backgroundColor: customHex }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={resetColor}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <RotateCcw size={13} /> Reset to Default
        </button>
        <button
          onClick={save}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
          style={{ backgroundColor: "var(--brand, #6366f1)" }}
        >
          {saved ? (
            <>
              <Check size={14} /> Applied!
            </>
          ) : (
            <>
              <Save size={14} /> Apply Color
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── Notifications Tab ── */
function NotificationsTab() {
  const [form, setForm] = useState(() => {
    const stored = localStorage.getItem("notifSettings");
    return stored
      ? JSON.parse(stored)
      : {
          emailAlerts: true,
          systemAlerts: true,
          smsAlerts: false,
          weeklyReport: true,
        };
  });
  const [saved, setSaved] = useState(false);

  const save = () => {
    localStorage.setItem("notifSettings", JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
            className="relative w-11 h-6 rounded-full transition-colors"
            style={{
              backgroundColor: form[key] ? "var(--brand, #6366f1)" : undefined,
            }}
            data-off={!form[key]}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form[key] ? "translate-x-5" : "translate-x-0"} ${!form[key] ? "bg-slate-300 dark:bg-slate-600" : ""}`}
              style={!form[key] ? { backgroundColor: "#94a3b8" } : {}}
            />
          </button>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          onClick={save}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
          style={{ backgroundColor: "var(--brand, #6366f1)" }}
        >
          {saved ? (
            <>
              <Check size={14} /> Saved!
            </>
          ) : (
            <>
              <Save size={14} /> Save Preferences
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("appearance");

  const tabContent = {
    general: <GeneralTab />,
    appearance: <AppearanceTab />,
    notifications: <NotificationsTab />,
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
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full ${
                  activeTab === id
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                style={
                  activeTab === id
                    ? { backgroundColor: "var(--brand, #6366f1)" }
                    : {}
                }
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
