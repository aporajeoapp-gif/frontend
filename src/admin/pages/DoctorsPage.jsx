import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Phone, X, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import useDoctors from "../../hooks/doctorhook";
import { createDoctor, updateDoctor, deleteDoctor } from "../../api/doctorApi";
import { confirmDelete, successAlert, errorAlert } from "../../utils/alert";
import fetchUser from "../../hooks/userhook";
import { toast } from "sonner";

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

const emptySchedule = { day: "", time: "", chamber: "" };
const empty = {
  name: "",
  specialty: "",
  location: "",
  phone: "",
  email: "",
  experience: "",
  schedule: [],
};

export default function DoctorsPage() {
  const { profile } = fetchUser();
  const { doctors, loading } = useDoctors();
  const [localDoctors, setLocalDoctors] = useState([]);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (doctors) setLocalDoctors(doctors);
  }, [doctors]);

  const isAdmin = profile?.role === "admin";
  const perms = Array.isArray(profile?.permissions) ? profile.permissions : [];
  const hasPerm = (key) => isAdmin || perms.includes(key);
  const canCreate = hasPerm("doctors.create");
  const canRead = hasPerm("doctors.read");
  const canUpdate = hasPerm("doctors.update");
  const canDelete = hasPerm("doctors.delete");

  if (!canRead) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400 text-sm">
        You don't have permission to view doctors.
      </div>
    );
  }

  const filtered = localDoctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setForm(empty);
    setEditId(null);
    setModal("add");
  };

  const openEdit = (d) => {
    setForm({ ...d, schedule: Array.isArray(d.schedule) ? d.schedule : [] });
    setEditId(d._id || d.id);
    setModal("edit");
  };

  // ── Schedule helpers ──
  const addSchedule = () =>
    setForm((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { ...emptySchedule }],
    }));

  const removeSchedule = (index) =>
    setForm((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index),
    }));

  const updateSchedule = (index, field, value) =>
    setForm((prev) => ({
      ...prev,
      schedule: prev.schedule.map((s, i) =>
        i === index ? { ...s, [field]: value } : s,
      ),
    }));

  const handleSave = async () => {
    if (!form.name || !form.specialty) return;
    const payload = {
      ...form,
      experience: Number(form.experience),
      // only send complete schedule entries
      schedule: form.schedule.filter((s) => s.day && s.time && s.chamber),
    };
    try {
      if (modal === "add") {
        const res = await createDoctor(payload);
        toast.success(res.message);
        setLocalDoctors((prev) => [res.doctor, ...prev]);
      } else {
        const res = await updateDoctor(editId, payload);
        toast.success(res.message);
        setLocalDoctors((prev) =>
          prev.map((d) => ((d._id || d.id) === editId ? res.doctor : d)),
        );
      }
      setModal(null);
    } catch (err) {
      errorAlert("Failed to save doctor");
    }
  };

  const handleDelete = async (doc) => {
    const result = await confirmDelete();
    if (!result.isConfirmed) return;
    const id = doc._id || doc.id;
    try {
      await deleteDoctor(id);
      setLocalDoctors((prev) => prev.filter((d) => (d._id || d.id) !== id));
      successAlert("Doctor deleted successfully");
    } catch (err) {
      errorAlert("Failed to delete doctor");
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Doctors
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {localDoctors.length} registered
          </p>
        </div>
        {canCreate && (
          <button className={btn()} onClick={openAdd}>
            <Plus size={15} /> Add Doctor
          </button>
        )}
      </div>

      {/* Search */}
      <input
        className="w-full max-w-xs px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-lg border border-transparent focus:border-indigo-400 outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400 transition-colors"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or specialty..."
      />

      {/* Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc, i) => (
            <motion.div
              key={doc._id || doc.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                  {doc.name.charAt(0).toUpperCase()}
                </div>
                {doc.schedule?.length > 0 && (
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar size={11} /> {doc.schedule.length} slots
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                {doc.name}
              </h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                {doc.specialty}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                {doc.location}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                <Phone size={11} />
                <span>{doc.phone}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {doc.experience} yrs experience
              </p>

              {/* Schedule preview — show first 2 slots */}
              {doc.schedule?.length > 0 && (
                <div className="mt-3 space-y-1">
                  {doc.schedule.slice(0, 2).map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-lg px-2.5 py-1.5"
                    >
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {s.day}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">
                        ·
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {s.time}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">
                        ·
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 truncate">
                        {s.chamber}
                      </span>
                    </div>
                  ))}
                  {doc.schedule.length > 2 && (
                    <p className="text-xs text-slate-400 pl-1">
                      +{doc.schedule.length - 2} more
                    </p>
                  )}
                </div>
              )}

              {(canUpdate || canDelete) && (
                <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {canUpdate && (
                    <button
                      className={btn("secondary") + " flex-1 justify-center"}
                      onClick={() => openEdit(doc)}
                    >
                      <Pencil size={13} /> Edit
                    </button>
                  )}
                  {canDelete && (
                    <button
                      className={btn("ghost")}
                      onClick={() => handleDelete(doc)}
                    >
                      <Trash2 size={13} className="text-red-500" />
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {!!modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setModal(null)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {modal === "add" ? "Add Doctor" : "Edit Doctor"}
              </h2>
              <button
                onClick={() => setModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-5 max-h-[75vh] overflow-y-auto space-y-4">
              {/* Basic fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Full Name
                  </label>
                  <input
                    className={inp}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Dr. John Doe"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Specialty
                  </label>
                  <input
                    className={inp}
                    value={form.specialty}
                    onChange={(e) =>
                      setForm({ ...form, specialty: e.target.value })
                    }
                    placeholder="Cardiology"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Hospital / Location
                </label>
                <input
                  className={inp}
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="Apollo Hospital, Kolkata"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Phone
                  </label>
                  <input
                    className={inp}
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+91-9876543210"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Email
                  </label>
                  <input
                    className={inp}
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="doctor@hospital.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                  Experience (years)
                </label>
                <input
                  className={inp}
                  type="number"
                  value={form.experience}
                  onChange={(e) =>
                    setForm({ ...form, experience: e.target.value })
                  }
                  placeholder="10"
                />
              </div>

              {/* ── Schedule ── */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Schedule
                  </label>
                  <button
                    className={btn("secondary") + " !py-1 !px-2 !text-xs"}
                    onClick={addSchedule}
                  >
                    <Plus size={12} /> Add Slot
                  </button>
                </div>

                {form.schedule.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                    No schedule added yet — click Add Slot
                  </p>
                ) : (
                  <div className="space-y-2">
                    {/* Column headers */}
                    <div className="grid grid-cols-[1fr_1fr_1fr_28px] gap-2 px-1">
                      {["Day", "Time", "Chamber"].map((h) => (
                        <span key={h} className="text-xs text-slate-400">
                          {h}
                        </span>
                      ))}
                    </div>

                    {form.schedule.map((s, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_1fr_1fr_28px] gap-2 items-center"
                      >
                        <input
                          className={inp}
                          value={s.day}
                          onChange={(e) =>
                            updateSchedule(index, "day", e.target.value)
                          }
                          placeholder="Monday"
                        />
                        <input
                          className={inp}
                          value={s.time}
                          onChange={(e) =>
                            updateSchedule(index, "time", e.target.value)
                          }
                          placeholder="10am–1pm"
                        />
                        <input
                          className={inp}
                          value={s.chamber}
                          onChange={(e) =>
                            updateSchedule(index, "chamber", e.target.value)
                          }
                          placeholder="Chamber 3"
                        />
                        <button
                          onClick={() => removeSchedule(index)}
                          className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  className={btn("secondary")}
                  onClick={() => setModal(null)}
                >
                  Cancel
                </button>
                <button className={btn()} onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
