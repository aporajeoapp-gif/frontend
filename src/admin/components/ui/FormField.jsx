export function FormField({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-indigo-400 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 transition-colors";

export function Input({ ...props }) {
  return <input className={inputCls} {...props} />;
}

export function Select({ children, ...props }) {
  return (
    <select className={inputCls} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ ...props }) {
  return <textarea className={`${inputCls} resize-none`} rows={3} {...props} />;
}

export function ActionBtn({ variant = "primary", children, ...props }) {
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary:
      "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    ghost:
      "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400",
  };
  return (
    <button
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
