import { useState } from "react";
import { Plus, Pencil, Trash2, Phone, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAdmin } from "../context/AdminContext";
import Modal from "../components/ui/Modal";
import {
  FormField,
  Input,
  Select,
  ActionBtn,
} from "../components/ui/FormField";

const CATEGORIES = [
  "Law Enforcement",
  "Medical",
  "Fire Safety",
  "Emergency",
  "Social Support",
  "Health",
  "Transport",
  "Emergency Management",
];
const empty = {
  serviceName: "",
  category: "Emergency",
  phoneNumber: "",
  description: "",
  available24_7: true,
};

function EmergencyForm({ value, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Service Name">
          <Input
            value={value.serviceName}
            onChange={(e) =>
              onChange({ ...value, serviceName: e.target.value })
            }
            placeholder="Police"
          />
        </FormField>
        <FormField label="Phone Number">
          <Input
            value={value.phoneNumber}
            onChange={(e) =>
              onChange({ ...value, phoneNumber: e.target.value })
            }
            placeholder="100"
          />
        </FormField>
      </div>
      <FormField label="Category">
        <Select
          value={value.category}
          onChange={(e) => onChange({ ...value, category: e.target.value })}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      </FormField>
      <FormField label="Description">
        <Input
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          placeholder="Brief description..."
        />
      </FormField>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={value.available24_7}
          onChange={(e) =>
            onChange({ ...value, available24_7: e.target.checked })
          }
          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="text-sm text-slate-600 dark:text-slate-400">
          Available 24/7
        </span>
      </label>
    </div>
  );
}

const categoryColors = {
  "Law Enforcement":
    "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
  Medical: "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300",
  "Fire Safety":
    "bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300",
  Emergency: "bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300",
  "Social Support":
    "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300",
  Health:
    "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
  Transport:
    "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
  "Emergency Management":
    "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300",
};

export default function EmergencyPage() {
  const { state, dispatch, toast } = useAdmin();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);

  const openAdd = () => {
    setForm(empty);
    setModal("add");
  };
  const openEdit = (s) => {
    setForm({ ...s });
    setModal("edit");
  };

  const handleSave = () => {
    if (!form.serviceName || !form.phoneNumber)
      return toast("Service name and phone required", "error");
    if (modal === "add") {
      dispatch({ type: "ADD_EMERGENCY", payload: form });
      toast("Service added");
    } else {
      dispatch({ type: "UPDATE_EMERGENCY", payload: form });
      toast("Service updated");
    }
    setModal(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Emergency Services
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {state.emergency.length} services
          </p>
        </div>
        <ActionBtn onClick={openAdd}>
          <Plus size={15} /> Add Service
        </ActionBtn>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.emergency.map((svc, i) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[svc.category] ?? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
              >
                {svc.category}
              </span>
              {svc.available24_7 && (
                <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium">
                  <CheckCircle size={12} />
                  <span>24/7</span>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              {svc.serviceName}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {svc.description}
            </p>
            <div className="flex items-center gap-2 mt-3 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <Phone size={14} className="text-indigo-500" />
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                {svc.phoneNumber}
              </span>
            </div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <ActionBtn
                variant="secondary"
                onClick={() => openEdit(svc)}
                className="flex-1 justify-center"
              >
                <Pencil size={13} /> Edit
              </ActionBtn>
              <ActionBtn
                variant="ghost"
                onClick={() => {
                  dispatch({ type: "DELETE_EMERGENCY", payload: svc.id });
                  toast("Service removed", "warning");
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
        title={modal === "add" ? "Add Emergency Service" : "Edit Service"}
      >
        <EmergencyForm value={form} onChange={setForm} />
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
