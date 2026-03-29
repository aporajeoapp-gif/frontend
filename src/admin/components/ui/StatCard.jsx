import { motion } from "framer-motion";

export default function StatCard({
  label,
  value,
  icon: Icon,
  color = "indigo",
  trend,
  loading,
}) {
  const colors = {
    indigo:
      "bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400",
    emerald:
      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
    amber:
      "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
    rose: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
    violet:
      "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400",
    cyan: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400",
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 animate-pulse">
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
        <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {label}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            {value}
          </p>
          {trend && (
            <p
              className={`text-xs mt-1 font-medium ${trend.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}
            >
              {trend.up ? "↑" : "↓"} {trend.value} vs last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
}
