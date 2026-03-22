import { useState } from "react";
import { Plus, Pencil, Trash2, Star, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useAdmin } from "../context/AdminContext";
import Modal from "../components/ui/Modal";
import { FormField, Input, ActionBtn } from "../components/ui/FormField";

const empty = {
  name: "",
  specialty: "",
  location: "",
  phone: "",
  email: "",
  experience: "",
  rating: "",
};

function DoctorForm({ value, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Full Name">
          <Input
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder="Dr. John Doe"
          />
        </FormField>
        <FormField label="Specialty">
          <Input
            value={value.specialty}
            onChange={(e) => onChange({ ...value, specialty: e.target.value })}
            placeholder="Cardiology"
          />
        </FormField>
      </div>
      <FormField label="Hospital / Location">
        <Input
          value={value.location}
          onChange={(e) => onChange({ ...value, location: e.target.value })}
          placeholder="Apollo Hospital, Kolkata"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Phone">
          <Input
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
            placeholder="+91-9876543210"
          />
        </FormField>
        <FormField label="Email">
          <Input
            type="email"
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            placeholder="doctor@hospital.com"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Experience (years)">
          <Input
            type="number"
            value={value.experience}
            onChange={(e) => onChange({ ...value, experience: e.target.value })}
            placeholder="10"
          />
        </FormField>
        <FormField label="Rating (0-5)">
          <Input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={value.rating}
            onChange={(e) => onChange({ ...value, rating: e.target.value })}
            placeholder="4.8"
          />
        </FormField>
      </div>
    </div>
  );
}

export default function DoctorsPage() {
  const { state, dispatch, toast } = useAdmin();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState("");

  const filtered = state.doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setForm(empty);
    setModal("add");
  };
  const openEdit = (d) => {
    setForm({ ...d });
    setModal("edit");
  };

  const handleSave = () => {
    if (!form.name || !form.specialty)
      return toast("Name and specialty required", "error");
    const payload = {
      ...form,
      experience: Number(form.experience),
      rating: Number(form.rating),
    };
    if (modal === "add") {
      dispatch({ type: "ADD_DOCTOR", payload });
      toast("Doctor added");
    } else {
      dispatch({ type: "UPDATE_DOCTOR", payload });
      toast("Doctor updated");
    }
    setModal(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Doctors
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {state.doctors.length} registered
          </p>
        </div>
        <ActionBtn onClick={openAdd}>
          <Plus size={15} /> Add Doctor
        </ActionBtn>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or specialty..."
        className="w-full max-w-xs px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-lg border border-transparent focus:border-indigo-400 dark:focus:border-indigo-500 outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400 transition-colors"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                {doc.name.split(" ").slice(-1)[0][0]}
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={13} fill="currentColor" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {doc.rating}
                </span>
              </div>
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
            <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <ActionBtn
                variant="secondary"
                onClick={() => openEdit(doc)}
                className="flex-1 justify-center"
              >
                <Pencil size={13} /> Edit
              </ActionBtn>
              <ActionBtn
                variant="ghost"
                onClick={() => {
                  dispatch({ type: "DELETE_DOCTOR", payload: doc.id });
                  toast("Doctor removed", "warning");
                }}
              >
                <Trash2 size={13} className="text-red-500" />
              </ActionBtn>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal === "add" ? "Add Doctor" : "Edit Doctor"}
      >
        <DoctorForm value={form} onChange={setForm} />
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <ActionBtn variant="secondary" onClick={() => setModal(null)}>
            Cancel
          </ActionBtn>
          <ActionBtn onClick={handleSave}>Save</ActionBtn>
        </div>
      </Modal>
    </div>
  );
}
