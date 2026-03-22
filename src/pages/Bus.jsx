import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bus as BusIcon,
  Clock,
  Banknote,
  Navigation,
  Table2,
  LayoutGrid,
  Search,
  CheckCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import busServices from "../constant/data/busServices.json";
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

export default function Bus() {
  const { t } = useTranslation();
  const { state } = useAdmin();
  const busServices = state.busRoutes;
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");

  const filtered = busServices.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.routeName.toLowerCase().includes(q) ||
      s.routeNumber.includes(q) ||
      s.stops.some((st) => st.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageBanner
        title="Bus Services"
        subtitle={`${filtered.length} active routes across the city`}
        image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1400&auto=format&fit=crop&q=80"
        gradient="from-emerald-900/85 via-teal-900/75 to-slate-900/80"
        Icon={BusIcon}
        badge="Public Transport"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="flex flex-col sm:flex-row gap-4 mb-8 bg-slate-900/95 dark:bg-slate-900/50 backdrop-blur-xl p-2 sm:p-2.5 rounded-[24px] border border-white/5 dark:border-white/10 shadow-2xl"
        >
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder={t.search_placeholder_bus}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-[18px] bg-white/5 dark:bg-slate-800/40 text-sm text-slate-100 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all border-none"
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
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
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
                        className="hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-colors"
                        data-testid="bus-card"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0">
                              <BusIcon size={13} className="text-white" />
                            </div>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              {s.routeNumber}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-800 dark:text-white">
                          {s.routeName}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                            <Clock size={12} className="text-emerald-500" />
                            {s.departureTime}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                            <Clock size={12} className="text-teal-500" />
                            {s.arrivalTime}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-lg">
                            {getDuration(s.departureTime, s.arrivalTime)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {s.fare} ৳
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {s.stops.map((stop, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full"
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
                  <BusIcon
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
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 dark:hover:shadow-emerald-900/20 transition-all"
                  data-testid="bus-card"
                >
                  <div className="h-1.5 bg-linear-to-r from-emerald-500 to-teal-500" />
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-200 dark:shadow-emerald-900/30 shrink-0">
                        <BusIcon size={22} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
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
                          color: "text-emerald-500",
                        },
                        {
                          label: t.arrival,
                          val: s.arrivalTime,
                          Icon: Clock,
                          color: "text-teal-500",
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
                        <Banknote size={13} className="text-emerald-500" />
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">
                          {s.fare} ৳
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
                        <CheckCircle size={10} /> {t.active}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        <Navigation size={10} /> {t.stops}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.stops.map((stop, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium"
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
