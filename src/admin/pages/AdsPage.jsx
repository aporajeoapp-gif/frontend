import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAdmin } from "../context/AdminContext";
import Modal from "../components/ui/Modal";
import {
  FormField,
  Input,
  Select,
  Textarea,
  ActionBtn,
} from "../components/ui/FormField";

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

function AdForm({ value, onChange }) {
  return (
    <div className="space-y-4">
      <FormField label="Title">
        <Input
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          placeholder="Hospital Promotion"
        />
      </FormField>
      <FormField label="Description">
        <Textarea
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          placeholder="Ad description..."
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Tag / Category">
          <Select
            value={value.tag}
            onChange={(e) => onChange({ ...value, tag: e.target.value })}
          >
            {TAGS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </FormField>
        <FormField label="CTA Button Text">
          <Input
            value={value.cta}
            onChange={(e) => onChange({ ...value, cta: e.target.value })}
            placeholder="Learn More"
          />
        </FormField>
      </div>
      <FormField label="Image URL (or upload)">
        <Input
          value={value.imageUrl}
          onChange={(e) => onChange({ ...value, imageUrl: e.target.value })}
          placeholder="https://..."
        />
      </FormField>
      <FormField label="Image Upload (UI only)">
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-5 text-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
          <p className="text-sm text-slate-400">Click to upload image</p>
          <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">
            PNG, JPG up to 5MB
          </p>
        </div>
      </FormField>
      <FormField label="Redirect URL">
        <Input
          value={value.redirectUrl}
          onChange={(e) => onChange({ ...value, redirectUrl: e.target.value })}
          placeholder="https://example.com"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Start Date">
          <Input
            type="date"
            value={value.startDate}
            onChange={(e) => onChange({ ...value, startDate: e.target.value })}
          />
        </FormField>
        <FormField label="End Date">
          <Input
            type="date"
            value={value.endDate}
            onChange={(e) => onChange({ ...value, endDate: e.target.value })}
          />
        </FormField>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={value.active !== false}
          onChange={(e) => onChange({ ...value, active: e.target.checked })}
          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="text-sm text-slate-600 dark:text-slate-400">
          Active
        </span>
      </label>
    </div>
  );
}

export default function AdsPage() {
  const { state, dispatch, toast } = useAdmin();
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
    if (!form.title) return toast("Title is required", "error");
    if (modal === "add") {
      dispatch({ type: "ADD_AD", payload: form });
      toast("Advertisement added");
    } else {
      dispatch({ type: "UPDATE_AD", payload: form });
      toast("Advertisement updated");
    }
    setModal(null);
  };

  const toggleActive = (ad) => {
    dispatch({ type: "UPDATE_AD", payload: { ...ad, active: !ad.active } });
    toast(`Ad ${ad.active ? "deactivated" : "activated"}`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Advertisements
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {state.advertisements.length} total ·{" "}
            {state.advertisements.filter((a) => a.active !== false).length}{" "}
            active
          </p>
        </div>
        <ActionBtn onClick={openAdd}>
          <Plus size={15} /> Add Ad
        </ActionBtn>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.advertisements.map((ad, i) => (
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
              <div
                className={`absolute inset-0 bg-gradient-to-t ${ad.gradient ?? "from-slate-900/60 to-transparent"}`}
              />
              <div className="absolute top-2 left-2">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full text-white ${ad.tagColor ?? "bg-slate-600"}`}
                >
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
                <ActionBtn
                  variant="secondary"
                  onClick={() => openEdit(ad)}
                  className="flex-1 justify-center"
                >
                  <Pencil size={13} /> Edit
                </ActionBtn>
                <ActionBtn
                  variant="ghost"
                  onClick={() => {
                    dispatch({ type: "DELETE_AD", payload: ad.id });
                    toast("Ad deleted", "warning");
                  }}
                >
                  <Trash2 size={13} className="text-red-500" />
                </ActionBtn>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal === "add" ? "Add Advertisement" : "Edit Advertisement"}
        size="lg"
      >
        <AdForm value={form} onChange={setForm} />
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
