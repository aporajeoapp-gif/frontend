import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const inp =
  "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-indigo-400 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 transition-colors";
const btn = (v = "primary") =>
  ({
    primary:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors",
    secondary:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors",
    ghost:
      "inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors",
  })[v];
const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
      {label}
    </label>
    {children}
  </div>
);
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

const TAGS = [
  "Healthcare",
  "Pharmacy",
  "Transport",
  "Events",
  "Food",
  "Education",
  "Other",
];
const empty = {
  title: "",
  description: "",
  tag: "Other",
  imageUrl: "",
  redirectUrl: "",
  cta: "Learn More",
  active: true,
  startDate: "",
  endDate: "",
};

export default function AdsPage() {
  const [advertisements, setAdvertisements] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);

  const openAdd = () => {
    setForm(empty);
    setModal("add");
  };
  const openEdit = (a) => {
    setForm({ ...a });
    setModal("edit");
  };
  const handleSave = () => {
    if (!form.title) return;
    if (modal === "add")
      setAdvertisements((prev) => [{ ...form, id: Date.now() }, ...prev]);
    else
      setAdvertisements((prev) =>
        prev.map((a) => (a.id === form.id ? form : a)),
      );
    setModal(null);
  };
  const toggleActive = (ad) =>
    setAdvertisements((prev) =>
      prev.map((a) => (a.id === ad.id ? { ...a, active: !a.active } : a)),
    );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Advertisements
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {advertisements.length} total ·{" "}
            {advertisements.filter((a) => a.active !== false).length} active
          </p>
        </div>
        <button className={btn()} onClick={openAdd}>
          <Plus size={15} /> Add Ad
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {advertisements.map((ad, i) => (
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-36 bg-slate-200 dark:bg-slate-800 overflow-hidden">
              {ad.imageUrl && (
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
              <div className="absolute top-2 left-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white bg-slate-600">
                  {ad.tag}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <button onClick={() => toggleActive(ad)} className="text-white">
                  {ad.active !== false ? (
                    <ToggleRight size={20} className="text-emerald-400" />
                  ) : (
                    <ToggleLeft size={20} className="text-slate-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                  {ad.title}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${ad.active !== false ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                >
                  {ad.active !== false ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {ad.description}
              </p>
              {ad.redirectUrl && (
                <a
                  href={ad.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-600 mt-2"
                >
                  <ExternalLink size={11} />{" "}
                  {ad.redirectUrl.replace(/^https?:\/\//, "")}
                </a>
              )}
              <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  className={btn("secondary") + " flex-1 justify-center"}
                  onClick={() => openEdit(ad)}
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  className={btn("ghost")}
                  onClick={() =>
                    setAdvertisements((prev) =>
                      prev.filter((a) => a.id !== ad.id),
                    )
                  }
                >
                  <Trash2 size={13} className="text-red-500" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal === "add" ? "Add Advertisement" : "Edit Advertisement"}
      >
        <div className="space-y-4">
          <Field label="Title">
            <input
              className={inp}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Hospital Promotion"
            />
          </Field>
          <Field label="Description">
            <textarea
              className={inp + " resize-none"}
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Ad description..."
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tag">
              <select
                className={inp}
                value={form.tag}
                onChange={(e) => setForm({ ...form, tag: e.target.value })}
              >
                {TAGS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="CTA Text">
              <input
                className={inp}
                value={form.cta}
                onChange={(e) => setForm({ ...form, cta: e.target.value })}
                placeholder="Learn More"
              />
            </Field>
          </div>
          <Field label="Image URL">
            <input
              className={inp}
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </Field>
          <Field label="Redirect URL">
            <input
              className={inp}
              value={form.redirectUrl}
              onChange={(e) =>
                setForm({ ...form, redirectUrl: e.target.value })
              }
              placeholder="https://example.com"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date">
              <input
                className={inp}
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
              />
            </Field>
            <Field label="End Date">
              <input
                className={inp}
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </Field>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active !== false}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 accent-indigo-600"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Active
            </span>
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button className={btn("secondary")} onClick={() => setModal(null)}>
            Cancel
          </button>
          <button className={btn()} onClick={handleSave}>
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
