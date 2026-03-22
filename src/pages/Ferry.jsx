import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ship,
  Clock,
  Banknote,
  Anchor,
  Table2,
  LayoutGrid,
  Search,
  CheckCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import ferryServices from "../constant/data/ferryServices.json";
import PageBanner from "../components/PageBanner";
import { useTranslation } from "../context/LanguageContext";
import { useAdmin } from "../admin/context/AdminContext";

function getDuration(dep, arr) {
  const [dh, dm] = dep.split(":").map(Number);
  const [ah, am] = arr.split(":").map(Number);
  const mins = ah * 60 + am - (dh * 60 + dm);
  if (mins <= 0) return "—";
  const h = Math.floor(mins / 60),
    m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function Ferry() {
  const { t } = useTranslation();
  const { state } = useAdmin();
  const ferryServices = state.ferryRoutes;
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");

  const filtered = ferryServices.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.routeName.toLowerCase().includes(q) ||
      s.routeNumber.toLowerCase().includes(q) ||
      s.stops.some((st) => st.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageBanner
        title="Ferry Services"
        subtitle={`${filtered.length} active waterway routes`}
        image="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1400&auto=format&fit=crop&q=80"
        gradient="from-cyan-900/85 via-blue-900/75 to-slate-900/80"
        Icon={Ship}
        badge="Waterway Transport"
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
              placeholder={t.search_placeholder_ferry}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-[18px] bg-white dark:bg-slate-800/40 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all border border-slate-200 dark:border-transparent"
            />
          </div>
          <div className="flex p-1 gap-1 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-transparent rounded-[18px] shrink-0 h-12 items-center">
            {[
              ["table", Table2, t.table_view],
              ["card", LayoutGrid, t.card_view],
            ].map(([v, Icon, lbl]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`flex items-center justify-center w-10 sm:w-11 h-10 rounded-[14px] transition-all duration-300 ${
                  view === v
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
                title={lbl}
              >
                <Icon size={16} />
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
                        t.route_no,
                        t.route_name,
                        t.departure,
                        t.arrival,
                        t.duration,
                        t.fare,
                        t.stops,
                        t.status,
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
                    {filtered.map((s, i) => (
                      <motion.tr
                        key={s.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-cyan-50/30 dark:hover:bg-cyan-900/10 transition-colors"
                        data-testid="ferry-card"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center shrink-0">
                              <Ship size={13} className="text-white" />
                            </div>
                            <span className="font-bold text-cyan-600 dark:text-cyan-400">
                              {s.routeNumber}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-800 dark:text-white">
                          {s.routeName}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                            <Clock size={12} className="text-cyan-500" />
                            {s.departureTime}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                            <Clock size={12} className="text-blue-500" />
                            {s.arrivalTime}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-lg">
                            {getDuration(s.departureTime, s.arrivalTime)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-bold text-cyan-600 dark:text-cyan-400">
                            {s.fare} ৳
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {s.stops.map((stop, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 px-2 py-0.5 rounded-full"
                              >
                                {stop}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
                            <CheckCircle size={10} /> {t.active}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filtered.length === 0 && (
                <div className="py-16 text-center">
                  <Ship
                    size={40}
                    className="mx-auto text-slate-300 dark:text-slate-700 mb-3"
                  />
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    No routes found.
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
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {filtered.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-cyan-100/50 dark:hover:shadow-cyan-900/20 transition-all"
                  data-testid="ferry-card"
                >
                  <div className="h-1.5 bg-linear-to-r from-cyan-500 to-blue-500" />
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-md shadow-cyan-200 dark:shadow-cyan-900/30 shrink-0">
                        <Ship size={22} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                          Route {s.routeNumber}
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-white text-base">
                          {s.routeName}
                        </h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        {
                          label: t.departure,
                          val: s.departureTime,
                          Icon: Clock,
                          color: "text-cyan-500",
                        },
                        {
                          label: t.arrival,
                          val: s.arrivalTime,
                          Icon: Clock,
                          color: "text-blue-500",
                        },
                        {
                          label: t.duration,
                          val: getDuration(s.departureTime, s.arrivalTime),
                          Icon: ArrowRight,
                          color: "text-slate-400",
                        },
                      ].map(({ label, val, Icon: I, color }) => (
                        <div
                          key={label}
                          className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2.5 text-center"
                        >
                          <I size={12} className={`mx-auto mb-1 ${color}`} />
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">
                            {label}
                          </div>
                          <div className="font-bold text-slate-800 dark:text-white text-sm">
                            {val}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <Banknote size={13} className="text-cyan-500" />
                        <span className="font-bold text-cyan-600 dark:text-cyan-400 text-lg">
                          {s.fare} ৳
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
                        <CheckCircle size={10} /> {t.active}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        <Anchor size={10} /> {t.stops}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.stops.map((stop, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 px-2 py-0.5 rounded-full font-medium"
                          >
                            {stop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
