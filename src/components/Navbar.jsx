import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Stethoscope,
  AlertTriangle,
  Bus,
  Ship,
  CalendarDays,
  Sun,
  Moon,
  Globe,
  LogIn,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import LoginModal from "./LoginModal";

const NAV_LINKS = [
  { path: "/", label: "Home", Icon: Home },
  { path: "/doctor", label: "Doctors", Icon: Stethoscope },
  { path: "/emergency", label: "Emergency", Icon: AlertTriangle },
  { path: "/bus", label: "Bus", Icon: Bus },
  { path: "/ferry", label: "Ferry", Icon: Ship },
  { path: "/events", label: "Events", Icon: CalendarDays },
];

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [loginOpen, setLoginOpen] = useState(false);
  const location = useLocation();
  const isDark = theme === "dark";

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-b border-slate-200/70 dark:border-slate-700/60 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/logo.png"
              alt="Oporajeo"
              className="h-20 w-30 md:w-50 object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(({ path, label, Icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      active
                        ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                  <Icon size={14} />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right controls — always visible including mobile */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              data-testid="theme-toggle"
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              title={isDark ? "Switch to light" : "Switch to dark"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  {isDark ? (
                    <Sun size={15} className="text-amber-400" />
                  ) : (
                    <Moon size={15} className="text-indigo-500" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              data-testid="language-toggle"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-slate-700 dark:text-slate-200"
            >
              <Globe size={13} className="text-indigo-500" />
              <span className="text-xs font-bold">
                {language === "en" ? "বাংলা" : "EN"}
              </span>
            </button>

            {/* Login — visible on ALL screen sizes now */}
            <button
              onClick={() => setLoginOpen(true)}
              data-testid="login-button"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold transition-all shadow-md shadow-indigo-200 dark:shadow-indigo-900/40"
            >
              <LogIn size={14} />
              <span className="hidden sm:inline">Login</span>
            </button>
          </div>
        </div>

        {/* Mobile bottom nav handles page navigation — no hamburger needed */}
      </motion.nav>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
