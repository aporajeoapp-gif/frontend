import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Droplets,
  Users,
  Target,
  CheckCircle,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useBloodCamp } from "../../hooks/bloodCampHook";
import { confirmDelete, successAlert, errorAlert } from "../../utils/alert";

const inp =
  "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-primary-400 dark:focus:border-primary-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 transition-colors";
const btn = (v = "primary") =>
  ({
    primary:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white transition-colors",
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
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
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

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const STATUS_OPTIONS = ["upcoming", "ongoing", "completed", "cancelled"];

const empty = {
  campName: "",
  organizer: "",
  date: "",
  time: "",
  location: "",
  address: "",
  city: "",
  bloodGroupsNeeded: [],
  contactPhone: "",
  contactEmail: "",
  description: "",
  status: "upcoming",
  targetUnits: "",
  collectedUnits: "0",
  banner: null,
};

const STATUS_STYLE = {
  upcoming: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  ongoing:
    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  completed:
    "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
  cancelled: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
};

function BloodGroupToggle({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {BLOOD_GROUPS.map((g) => (
        <button
          key={g}
          type="button"
          onClick={() =>
            onChange(
              selected.includes(g)
                ? selected.filter((x) => x !== g)
                : [...selected, g],
            )
          }
          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${selected.includes(g)
              ? "bg-rose-600 border-rose-600 text-white"
              : "border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-rose-400"
            }`}
        >
          {g}
        </button>
      ))}
    </div>
  );
}

function CampForm({ value, onChange }) {
  const [preview, setPreview] = useState(value.banner_image || null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ ...value, banner: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-4">
      <Field label="Banner Image">
        <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors overflow-hidden">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center">
              <Upload size={24} className="text-slate-400 mb-2" />
              <span className="text-xs text-slate-500">Click to upload banner</span>
            </div>
          )}
          <input type="file" className="hidden" onChange={handleFile} accept="image/*" />
        </label>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Camp Name">
          <input
            className={inp}
            value={value.campName}
            onChange={(e) => onChange({ ...value, campName: e.target.value })}
            placeholder="Life Saver Blood Camp"
          />
        </Field>
        <Field label="Organizer">
          <input
            className={inp}
            value={value.organizer}
            onChange={(e) => onChange({ ...value, organizer: e.target.value })}
            placeholder="Red Cross Society"
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Date">
          <input
            className={inp}
            type="date"
            value={value.date}
            onChange={(e) => onChange({ ...value, date: e.target.value })}
          />
        </Field>
        <Field label="Time">
          <input
            className={inp}
            value={value.time}
            onChange={(e) => onChange({ ...value, time: e.target.value })}
            placeholder="09:00 AM - 04:00 PM"
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Location / Venue">
          <input
            className={inp}
            value={value.location}
            onChange={(e) => onChange({ ...value, location: e.target.value })}
            placeholder="Town Hall"
          />
        </Field>
        <Field label="City">
          <input
            className={inp}
            value={value.city}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
            placeholder="Kolkata"
          />
        </Field>
      </div>
      <Field label="Full Address">
        <input
          className={inp}
          value={value.address}
          onChange={(e) => onChange({ ...value, address: e.target.value })}
          placeholder="1, S.N. Banerjee Road, Kolkata"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Contact Phone">
          <input
            className={inp}
            value={value.contactPhone}
            onChange={(e) =>
              onChange({ ...value, contactPhone: e.target.value })
            }
            placeholder="+91-9800000001"
          />
        </Field>
        <Field label="Contact Email">
          <input
            className={inp}
            type="email"
            value={value.contactEmail}
            onChange={(e) =>
              onChange({ ...value, contactEmail: e.target.value })
            }
            placeholder="camp@example.com"
          />
        </Field>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Field label="Target Units">
          <input
            className={inp}
            type="number"
            value={value.targetUnits}
            onChange={(e) =>
              onChange({ ...value, targetUnits: e.target.value })
            }
            placeholder="200"
          />
        </Field>
        <Field label="Collected Units">
          <input
            className={inp}
            type="number"
            value={value.collectedUnits}
            onChange={(e) =>
              onChange({ ...value, collectedUnits: e.target.value })
            }
            placeholder="0"
          />
        </Field>
        <Field label="Status">
          <select
            value={value.status}
            onChange={(e) => onChange({ ...value, status: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Blood Groups Needed">
        <BloodGroupToggle
          selected={value.bloodGroupsNeeded}
          onChange={(v) => onChange({ ...value, bloodGroupsNeeded: v })}
        />
      </Field>
      <Field label="Description">
        <textarea
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          rows={3}
          placeholder="Details about the camp..."
          className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
      </Field>
    </div>
  );
}

export default function BloodDonationPage() {
  const { camps, loading, fetchCamps, createCamp, updateCamp, deleteCamp } = useBloodCamp();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCamps();
  }, [fetchCamps]);

  const filtered = camps.filter(
    (c) =>
      c.campName.toLowerCase().includes(search.toLowerCase()) ||
      c.organizer.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setForm(empty);
    setModal("add");
  };
  const openEdit = (c) => {
    setForm({ ...c, banner: null });
    setModal("edit");
  };

  const handleSave = async () => {
    if (!form.campName || !form.date || !form.location) return;

    let res;
    if (modal === "add") {
      res = await createCamp(form);
    } else {
      res = await updateCamp(form._id, form);
    }

    if (res.success) {
      setModal(null);
    } else {
      alert(res.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (!result.isConfirmed) return;
    try {
      await deleteCamp(id);
      successAlert("Camp deleted successfully");

    } catch (error) {
      errorAlert("Failed to delete camp");

    }


  };

  const stats = [
    {
      label: "Total Camps",
      value: camps.length,
      Icon: Droplets,
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-900/20",
    },
    {
      label: "Upcoming",
      value: camps.filter((c) => c.status === "upcoming").length,
      Icon: Target,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Completed",
      value: camps.filter((c) => c.status === "completed").length,
      Icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      label: "Target Units",
      value: camps.reduce((s, c) => s + (Number(c.targetUnits) || 0), 0),
      Icon: Users,
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-900/20",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Blood Donation Camps
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {camps.length} camps registered
          </p>
        </div>
        <button className={btn()} onClick={openAdd} disabled={loading}>
          <Plus size={15} /> Add Camp
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-3"
          >
            <div
              className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}
            >
              <Icon size={18} className={color} />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-800 dark:text-white">
                {value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search camps..."
          className="w-full max-w-xs px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-lg border border-transparent focus:border-primary-400 outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400 transition-colors"
        />
        {loading && <div className="text-xs text-slate-500 animate-pulse">Processing...</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((camp, i) => (
          <motion.div
            key={camp._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-28 w-full bg-slate-200 dark:bg-slate-800 relative">
              {camp.banner_image ? (
                <img src={camp.banner_image} alt={camp.campName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon size={32} />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full capitalize shadow-sm ${STATUS_STYLE[camp.status] ?? STATUS_STYLE.upcoming}`}
                >
                  {camp.status}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm truncate">
                {camp.campName}
              </h3>
              <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mt-0.5">
                {camp.organizer}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {camp.date} · {camp.time}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {camp.location}, {camp.city}
              </p>

              <div className="flex flex-wrap gap-1 mt-2">
                {(camp.bloodGroupsNeeded ?? []).map((g) => (
                  <span
                    key={g}
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Target size={11} />
                <span>
                  {camp.collectedUnits}/{camp.targetUnits} units
                </span>
              </div>

              <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  className={btn("secondary") + " flex-1 justify-center"}
                  onClick={() => openEdit(camp)}
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  className={btn("ghost")}
                  onClick={() => handleDelete(camp._id)}
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
        title={modal === "add" ? "Add Blood Camp" : "Edit Blood Camp"}
      >
        <CampForm value={form} onChange={setForm} />
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button className={btn("secondary")} onClick={() => setModal(null)} disabled={loading}>
            Cancel
          </button>
          <button className={btn()} onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
