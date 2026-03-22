import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Phone,
  Shield,
  HeartPulse,
  Flame,
  HandHeart,
  CheckCircle,
  Table2,
  LayoutGrid,
  Search,
  PhoneCall,
  Siren,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import emergencyContacts from "../constant/data/emergencyContacts.json";
import PageBanner from "../components/PageBanner";
import { useTranslation } from "../context/LanguageContext";

const CATEGORY_META = {
  "Law Enforcement": {
    Icon: Shield,
    accent: "from-blue-500 to-indigo-500",
    badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    dot: "bg-blue-500",
    color: "text-blue-600 dark:text-blue-400",
  },
  Medical: {
    Icon: HeartPulse,
    accent: "from-rose-500 to-red-500",
    badge: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500",
    color: "text-rose-600 dark:text-rose-400",
  },
  "Fire Safety": {
    Icon: Flame,
    accent: "from-orange-500 to-amber-500",
    badge:
      "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
    dot: "bg-orange-500",
    color: "text-orange-600 dark:text-orange-400",
  },
  "Emergency Management": {
    Icon: Siren,
    accent: "from-red-600 to-rose-500",
    badge: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
    dot: "bg-red-500",
    color: "text-red-600 dark:text-red-400",
  },
  "Social Support": {
    Icon: HandHeart,
    accent: "from-violet-500 to-purple-500",
    badge:
      "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
    dot: "bg-violet-500",
    color: "text-violet-600 dark:text-violet-400",
  },
};
const defaultMeta = {
  Icon: Phone,
  accent: "from-slate-400 to-slate-500",
  badge: "bg-slate-100 text-slate-700",
  dot: "bg-slate-400",
  color: "text-slate-600",
};

export default function Emergency() {
  const { t } = useTranslation();
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");

  const categories = [...new Set(emergencyContacts.map((c) => c.category))];

  const filtered = emergencyContacts.filter((c) => {
    const q = search.toLowerCase();
    return (
      (c.serviceName.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.phoneNumber.includes(q)) &&
      (!catFilter || c.category === catFilter)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageBanner
        title="Emergency Services"
        subtitle="Call now — Available 24/7 for your safety"
        image="https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=1400&auto=format&fit=crop&q=80"
        gradient="from-rose-900/85 via-red-900/75 to-slate-900/80"
        Icon={AlertTriangle}
        badge="Emergency Contacts"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="flex flex-col sm:flex-row gap-4 mb-8 bg-slate-100 dark:bg-slate-900/50 backdrop-blur-xl p-2 sm:p-2.5 rounded-[24px] border border-slate-200 dark:border-white/10 shadow-md"
        >
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder={t.search_placeholder_emergency}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-[18px] bg-white dark:bg-slate-800/40 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all border border-slate-200 dark:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <SlidersHorizontal
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className="h-12 pl-11 pr-10 rounded-[18px] bg-white dark:bg-slate-800/40 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all appearance-none border border-slate-200 dark:border-transparent min-w-[160px]"
              >
                <option
                  value=""
                  className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                >
                  {t.all_categories}
                </option>
                {categories.map((c) => (
                  <option
                    key={c}
                    value={c}
                    className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                  >
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>

            <div className="flex p-1 gap-1 bg-white/5 dark:bg-slate-800/40 rounded-[18px] shrink-0 h-12 items-center">
              {[
                ["table", Table2, t.table_view],
                ["card", LayoutGrid, t.card_view],
              ].map(([v, Icon, lbl]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`flex items-center justify-center w-10 sm:w-11 h-10 rounded-[14px] transition-all duration-300 ${
                    view === v
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                  }`}
                  title={lbl}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
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
                        t.service,
                        t.category,
                        t.description,
                        t.phone,
                        t.status,
                        t.action,
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filtered.map((c, i) => {
                      const { Icon, accent, badge, dot, color } =
                        CATEGORY_META[c.category] || defaultMeta;
                      return (
                        <motion.tr
                          key={c.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="hover:bg-rose-50/30 dark:hover:bg-rose-900/10 transition-colors"
                          data-testid="emergency-card"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-9 h-9 rounded-xl bg-linear-to-br ${accent} flex items-center justify-center shrink-0`}
                              >
                                <Icon size={15} className="text-white" />
                              </div>
                              <span className="font-semibold text-slate-800 dark:text-white">
                                {c.serviceName}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${badge}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${dot}`}
                              />
                              {c.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-xs">
                            {c.description}
                          </td>
                          <td className="px-4 py-3">
                            <a
                              href={`tel:${c.phoneNumber}`}
                              className={`font-extrabold text-lg ${color} hover:opacity-80 transition-opacity`}
                              data-testid="emergency-phone"
                            >
                              {c.phoneNumber}
                            </a>
                          </td>
                          <td className="px-4 py-3">
                            {c.available24_7 && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
                                <CheckCircle size={10} /> {t.available_247}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <a
                              href={`tel:${c.phoneNumber}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-sm"
                            >
                              <PhoneCall size={11} /> {t.call_now}
                            </a>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filtered.length === 0 && (
                <div className="py-16 text-center">
                  <AlertTriangle
                    size={40}
                    className="mx-auto text-slate-300 dark:text-slate-700 mb-3"
                  />
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    No results found.
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
              {filtered.map((c, i) => {
                const { Icon, accent, badge, dot, color } =
                  CATEGORY_META[c.category] || defaultMeta;
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all"
                    data-testid="emergency-card"
                  >
                    <div className={`h-1.5 bg-linear-to-r ${accent}`} />
                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`w-11 h-11 rounded-2xl bg-linear-to-br ${accent} flex items-center justify-center shrink-0 shadow-md`}
                        >
                          <Icon size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 dark:text-white">
                            {c.serviceName}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 ${badge}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${dot}`}
                            />
                            {c.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        {c.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <a
                          href={`tel:${c.phoneNumber}`}
                          className={`font-extrabold text-2xl ${color}`}
                          data-testid="emergency-phone"
                        >
                          {c.phoneNumber}
                        </a>
                        {c.available24_7 && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                            <CheckCircle size={10} /> {t.available_247}
                          </span>
                        )}
                      </div>
                      <a
                        href={`tel:${c.phoneNumber}`}
                        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-linear-to-r ${accent} text-white text-sm font-bold shadow-sm hover:opacity-90 transition-opacity`}
                      >
                        <PhoneCall size={14} /> {t.call_now}
                      </a>
                    </div>
                  </motion.div>
                );
              })}
              {filtered.length === 0 && (
                <div className="col-span-full py-16 text-center">
                  <AlertTriangle
                    size={40}
                    className="mx-auto text-slate-300 dark:text-slate-700 mb-3"
                  />
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    No results found.
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
