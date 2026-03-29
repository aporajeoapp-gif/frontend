import { NavLink } from "react-router-dom";
import {
  Home,
  Stethoscope,
  AlertTriangle,
  Bus,
  Ship,
  Droplets,
} from "lucide-react";

const LINKS = [
  { path: "/", label: "Home", Icon: Home },
  { path: "/doctor", label: "Doctors", Icon: Stethoscope },
  { path: "/emergency", label: "Emergency", Icon: AlertTriangle },
  { path: "/bus", label: "Bus", Icon: Bus },
  { path: "/ferry", label: "Ferry", Icon: Ship },
  { path: "/blood-donation", label: "Blood", Icon: Droplets },
];

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700 shadow-2xl">
      <div className="flex items-stretch">
        {LINKS.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[9px] font-bold transition-all duration-200 min-w-0
              ${
                isActive
                  ? "text-primary-600 dark:text-primary-400 bg-primary-50/80 dark:bg-primary-900/30"
                  : "text-slate-500 dark:text-slate-400 hover:text-primary-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`relative flex items-center justify-center w-7 h-7 rounded-xl transition-all ${isActive ? "bg-primary-100 dark:bg-primary-900/50" : ""}`}
                >
                  <Icon size={17} />
                  {isActive && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary-500 rounded-full" />
                  )}
                </span>
                <span className="truncate w-full text-center leading-none px-0.5">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
