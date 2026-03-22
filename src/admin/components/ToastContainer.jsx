import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const icons = {
  success: <CheckCircle size={16} className="text-emerald-500" />,
  error: <XCircle size={16} className="text-red-500" />,
  warning: <AlertCircle size={16} className="text-amber-500" />,
};

export default function ToastContainer() {
  const { state, dispatch } = useAdmin();

  return (
    <div className="fixed bottom-5 right-5 z-100 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {state.toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl min-w-[260px] max-w-sm"
          >
            {icons[t.type] ?? icons.success}
            <p className="text-sm text-slate-700 dark:text-slate-300 flex-1">
              {t.message}
            </p>
            <button
              onClick={() => dispatch({ type: "REMOVE_TOAST", payload: t.id })}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
