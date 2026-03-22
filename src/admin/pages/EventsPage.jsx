import { useState } from "react";
import { Plus, Pencil, Trash2, Calendar, MapPin, Clock } from "lucide-react";
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

const CATEGORIES = [
  "Health",
  "Sports",
  "Culture",
  "Environment",
  "Technology",
  "Business",
  "Food",
  "Art",
  "Music",
  "Other",
];
const empty = {
  name: "",
  date: "",
  time: "",
  location: "",
  description: "",
  category: "Other",
};

const categoryColors = {
  Health:
    "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
  Sports: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
  Culture:
    "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300",
  Environment:
    "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300",
  Technology:
    "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
  Business:
    "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300",
  Food: "bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300",
  Art: "bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300",
  Music: "bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300",
  Other: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
};

function EventForm({ value, onChange }) {
  return (
    <div className="space-y-4">
      <FormField label="Event Name">
        <Input
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder="Community Health Camp"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Date">
          <Input
            type="date"
            value={value.date}
            onChange={(e) => onChange({ ...value, date: e.target.value })}
          />
        </FormField>
        <FormField label="Time">
          <Input
            type="time"
            value={value.time}
            onChange={(e) => onChange({ ...value, time: e.target.value })}
          />
        </FormField>
      </div>
      <FormField label="Location">
        <Input
          value={value.location}
          onChange={(e) => onChange({ ...value, location: e.target.value })}
          placeholder="Eco Park, Kolkata"
        />
      </FormField>
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
        <Textarea
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          placeholder="Event description..."
        />
      </FormField>
      <FormField label="Image Upload (UI only)">
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
          <p className="text-sm text-slate-400">
            Click to upload or drag & drop
          </p>
          <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">
            PNG, JPG up to 5MB
          </p>
        </div>
      </FormField>
    </div>
  );
}

export default function EventsPage() {
  const { state, dispatch, toast } = useAdmin();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);
  const [search, setSearch] = useState("");

  const filtered = state.events.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setForm(empty);
    setModal("add");
  };
  const openEdit = (e) => {
    setForm({ ...e });
    setModal("edit");
  };

  const handleSave = () => {
    if (!form.name || !form.date)
      return toast("Name and date required", "error");
    if (modal === "add") {
      dispatch({ type: "ADD_EVENT", payload: form });
      toast("Event created");
    } else {
      dispatch({ type: "UPDATE_EVENT", payload: form });
      toast("Event updated");
    }
    setModal(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Events
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {state.events.length} events
          </p>
        </div>
        <ActionBtn onClick={openAdd}>
          <Plus size={15} /> Add Event
        </ActionBtn>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search events..."
        className="w-full max-w-xs px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-lg border border-transparent focus:border-indigo-400 dark:focus:border-indigo-500 outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400 transition-colors"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ev, i) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-32 bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-4xl">🎉</span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-snug">
                  {ev.name}
                </h3>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${categoryColors[ev.category] ?? categoryColors.Other}`}
                >
                  {ev.category}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar size={11} />
                  <span>{ev.date}</span>
                  <Clock size={11} className="ml-1" />
                  <span>{ev.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin size={11} />
                  <span className="truncate">{ev.location}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <ActionBtn
                  variant="secondary"
                  onClick={() => openEdit(ev)}
                  className="flex-1 justify-center"
                >
                  <Pencil size={13} /> Edit
                </ActionBtn>
                <ActionBtn
                  variant="ghost"
                  onClick={() => {
                    dispatch({ type: "DELETE_EVENT", payload: ev.id });
                    toast("Event deleted", "warning");
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
        title={modal === "add" ? "Add Event" : "Edit Event"}
        size="lg"
      >
        <EventForm value={form} onChange={setForm} />
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
