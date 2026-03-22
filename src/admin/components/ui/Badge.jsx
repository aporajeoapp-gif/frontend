const variants = {
  Admin:
    "bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300",
  Coordinator:
    "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300",
  Member: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
  Active:
    "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300",
  Inactive: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400",
  Suspended: "bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400",
  default: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
};

export default function Badge({ label, variant }) {
  const cls = variants[variant ?? label] ?? variants.default;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}
    >
      {label}
    </span>
  );
}
