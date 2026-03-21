import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  Award,
  Star,
  LayoutGrid,
  Table2,
  Search,
  SlidersHorizontal,
  PhoneCall,
  CalendarCheck,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import doctors from "../constant/data/doctors.json";
import PageBanner from "../components/PageBanner";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={11}
            className={
              s <= Math.round(rating)
                ? "text-amber-400 fill-amber-400"
                : "text-slate-300 dark:text-slate-600 fill-current"
            }
          />
        ))}
      </div>
      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
        {rating}
      </span>
    </div>
  );
}

const SPECIALTY_COLORS = {
  Cardiology: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500",
  },
  Pediatrics: {
    bg: "bg-sky-100 dark:bg-sky-900/30",
    text: "text-sky-700 dark:text-sky-300",
    dot: "bg-sky-500",
  },
  Orthopedics: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  Dermatology: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    text: "text-pink-700 dark:text-pink-300",
    dot: "bg-pink-500",
  },
  Neurology: {
    bg: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-700 dark:text-violet-300",
    dot: "bg-violet-500",
  },
};
const defaultColor = {
  bg: "bg-indigo-100 dark:bg-indigo-900/30",
  text: "text-indigo-700 dark:text-indigo-300",
  dot: "bg-indigo-500",
};

export default function Doctor() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [view, setView] = useState("table");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const specialties = [...new Set(doctors.map((d) => d.specialty))];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = doctors.filter((d) => {
      const matchQ =
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q);
      return matchQ && (!specialty || d.specialty === specialty);
    });
    return [...list].sort((a, b) => {
      const av = a[sortField],
        bv = b[sortField];
      if (typeof av === "number") return sortDir === "asc" ? av - bv : bv - av;
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [search, specialty, sortField, sortDir]);

  const toggleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }) => (
    <span className="inline-flex flex-col ml-1 opacity-40">
      <ChevronUp
        size={9}
        className={
          sortField === field && sortDir === "asc"
            ? "opacity-100 text-indigo-500"
            : ""
        }
      />
      <ChevronDown
        size={9}
        className={
          sortField === field && sortDir === "desc"
            ? "opacity-100 text-indigo-500"
            : ""
        }
        style={{ marginTop: -3 }}
      />
    </span>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageBanner
        title="Find Doctors"
        subtitle={`${filtered.length} verified specialists near you`}
        image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1400&auto=format&fit=crop&q=80"
        gradient="from-indigo-900/85 via-violet-900/75 to-slate-900/80"
        Icon={Stethoscope}
        badge="Healthcare Directory"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="flex flex-col sm:flex-row gap-3 mb-6 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search doctors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              data-testid="search-input"
            />
          </div>
          <div className="relative">
            <SlidersHorizontal
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition appearance-none"
              data-testid="filter-dropdown"
            >
              <option value="">All Specialties</option>
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {[
              ["table", Table2, "Table"],
              ["card", LayoutGrid, "Cards"],
            ].map(([v, Icon, lbl]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${view === v ? "bg-indigo-600 text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              >
                <Icon size={13} /> {lbl}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === "table" && (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
                      {[
                        ["name", "Name"],
                        ["specialty", "Specialty"],
                        ["location", "Location"],
                        ["experience", "Experience"],
                        ["rating", "Rating"],
                        [null, "Actions"],
                      ].map(([key, label]) => (
                        <th
                          key={label}
                          onClick={() => key && toggleSort(key)}
                          className={`px-4 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap ${key ? "cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 select-none" : ""}`}
                        >
                          {label}
                          {key && <SortIcon field={key} />}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filtered.map((doc, i) => {
                      const sc =
                        SPECIALTY_COLORS[doc.specialty] || defaultColor;
                      return (
                        <motion.tr
                          key={doc.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="hover:bg-indigo-50/40 dark:hover:bg-indigo-900/10 transition-colors"
                          data-testid="doctor-card"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-400 to-violet-500 flex items-center justify-center shrink-0 shadow-sm">
                                <Stethoscope size={15} className="text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-800 dark:text-white">
                                  {doc.name}
                                </div>
                                <div className="text-xs text-slate-400 flex items-center gap-1">
                                  <Mail size={9} />
                                  {doc.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}
                              />
                              {doc.specialty}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                              <MapPin
                                size={12}
                                className="text-slate-400 shrink-0"
                              />
                              {doc.location}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                              <Award
                                size={12}
                                className="text-amber-500 shrink-0"
                              />
                              {doc.experience} yrs
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <StarRating rating={doc.rating} />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <a
                                href={`tel:${doc.phone}`}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                              >
                                <PhoneCall size={10} /> Call
                              </a>
                              <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-semibold hover:bg-indigo-100 transition-colors">
                                <CalendarCheck size={10} /> Book
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filtered.length === 0 && (
                <div className="py-16 text-center">
                  <Stethoscope
                    size={40}
                    className="mx-auto text-slate-300 dark:text-slate-700 mb-3"
                  />
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    No doctors found.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {view === "card" && (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((doc, i) => {
                const sc = SPECIALTY_COLORS[doc.specialty] || defaultColor;
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-100/60 dark:hover:shadow-indigo-900/20 transition-all"
                    data-testid="doctor-card"
                  >
                    <div className="h-1.5 bg-linear-to-r from-indigo-500 to-violet-500" />
                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-400 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-200 dark:shadow-indigo-900/30 shrink-0">
                          <Stethoscope size={22} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-800 dark:text-white truncate">
                            {doc.name}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${sc.bg} ${sc.text}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}
                            />
                            {doc.specialty}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <MapPin
                            size={12}
                            className="shrink-0 text-slate-400"
                          />
                          {doc.location}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Phone
                            size={12}
                            className="shrink-0 text-slate-400"
                          />
                          {doc.phone}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <Award
                            size={12}
                            className="shrink-0 text-amber-500"
                          />
                          {doc.experience} years experience
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                        <StarRating rating={doc.rating} />
                        <div className="flex gap-2">
                          <a
                            href={`tel:${doc.phone}`}
                            className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition-colors"
                          >
                            <PhoneCall size={13} />
                          </a>
                          <button className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors">
                            <CalendarCheck size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {filtered.length === 0 && (
                <div className="col-span-full py-16 text-center">
                  <Stethoscope
                    size={40}
                    className="mx-auto text-slate-300 dark:text-slate-700 mb-3"
                  />
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    No doctors found.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
