import React from "react";

const variants = {
  primary:
    "bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-200 dark:shadow-primary-900/30",
  secondary:
    "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200",
  danger:
    "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-200 dark:shadow-rose-900/30",
};

export default function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  icon: Icon,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]}`}
      data-testid="button"
    >
      {Icon && <Icon size={15} />}
      {label}
    </button>
  );
}
