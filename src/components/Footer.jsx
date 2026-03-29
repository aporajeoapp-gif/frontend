import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Home,
  Stethoscope,
  AlertTriangle,
  Bus,
  Ship,
  CalendarDays,
  ExternalLink,
  Heart,
  X,
} from "lucide-react";

import { useTranslation } from "../context/LanguageContext";

const QUICK_LINKS = [
  { path: "/", label: "Home", Icon: Home },
  { path: "/doctor", label: "Doctors", Icon: Stethoscope },
  { path: "/emergency", label: "Emergency", Icon: AlertTriangle },
  { path: "/bus", label: "Bus Services", Icon: Bus },
  { path: "/ferry", label: "Ferry Services", Icon: Ship },
  { path: "/events", label: "Events", Icon: CalendarDays },
];

const SOCIAL = [
  {
    name: "Facebook",
    url: "#",
    cls: "hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600",
    svg: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    name: "Instagram",
    url: "#",
    cls: "hover:bg-pink-500 hover:text-white dark:hover:bg-pink-600",
    svg: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
  {
    name: "Twitter / X",
    url: "#",
    cls: "hover:bg-slate-700 hover:text-white dark:hover:bg-slate-600",
    svg: <path d="M4 4l16 16M4 20L20 4" />,
  },
  {
    name: "YouTube",
    url: "#",
    cls: "hover:bg-red-600 hover:text-white dark:hover:bg-red-600",
    svg: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </>
    ),
  },
];

const PHONE = "+91 98765 43210";
const WHATSAPP_NUM = "919876543210";

/* ── FAB rendered via portal so it's never trapped in a stacking context ── */
function FAB({ open, onToggle, items }) {
  const fab = (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="fab-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 998,
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(3px)",
            }}
          />
        )}
      </AnimatePresence>

      <div
        style={{
          position: "fixed",
          bottom: 80,
          right: 20,
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 12,
        }}
      >
        <AnimatePresence>
          {open &&
            items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.6 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 22,
                  delay: i * 0.07,
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <a
                  href={item.href}
                  onClick={onToggle}
                  target={item.href?.startsWith("https") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    width: 52,
                    height: 62,
                    clipPath:
                      "path('M26 0 C40.36 0 52 11.64 52 26 C52 40.36 33 56 26 62 C19 56 0 40.36 0 26 C0 11.64 11.64 0 26 0Z')",
                    background: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: 10,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
                    cursor: "pointer",
                  }}
                >
                  <item.icon size={22} color="#fff" strokeWidth={2.2} />
                </a>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#fff",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={onToggle}
          whileTap={{ scale: 0.92 }}
          style={{
            width: 58,
            height: 70,
            clipPath:
              "path('M29 0 C45 0 58 13 58 29 C58 45 37 63 29 70 C21 63 0 45 0 29 C0 13 13 0 29 0Z')",
            background: open
              ? "linear-gradient(135deg,#f97316,#ea580c)"
              : "linear-gradient(135deg,#6366f1,#4f46e5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 12,
            border: "none",
            cursor: "pointer",
            boxShadow: open
              ? "0 10px 30px rgba(249,115,22,0.55)"
              : "0 10px 30px rgba(99,102,241,0.55)",
          }}
        >
          {open ? (
            <X size={24} color="#fff" strokeWidth={2.5} />
          ) : (
            <Phone size={24} color="#fff" strokeWidth={2.2} />
          )}
        </motion.button>
      </div>
    </>
  );

  return createPortal(fab, document.body);
}

export default function Footer() {
  const { t } = useTranslation();
  const [fabOpen, setFabOpen] = useState(false);

  const fabItems = [
    {
      href: `tel:${PHONE.replace(/\s/g, "")}`,
      icon: Phone,
      color: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
      label: "Call",
    },
    {
      href: `https://wa.me/${WHATSAPP_NUM}`,
      icon: MessageCircle,
      color: "linear-gradient(135deg,#22c55e,#15803d)",
      label: "WhatsApp",
    },
  ];

  return (
    <>
      <footer className="relative overflow-hidden bg-linear-to-br from-slate-100 via-primary-50 to-violet-50 dark:bg-none dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 notranslate">
        {/* decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/40 dark:bg-primary-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-200/40 dark:bg-violet-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo.png"
                  alt="Oporajeo"
                  className="h-16 w-auto object-contain rounded-xl"
                />
              </div>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-5">
                {t.footer_tagline}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-slate-800 dark:text-white font-bold mb-4 text-xs uppercase tracking-widest">
                {t.footer_quicklinks}
              </h4>
              <ul className="space-y-2">
                {QUICK_LINKS.map(({ path, label, Icon }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                    >
                      <span className="w-6 h-6 rounded-lg bg-primary-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        <Icon
                          size={11}
                          className="text-primary-500 dark:text-primary-400"
                        />
                      </span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-slate-800 dark:text-white font-bold mb-4 text-xs uppercase tracking-widest">
                {t.footer_contact}
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                  <span className="w-7 h-7 rounded-lg bg-primary-50 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin
                      size={13}
                      className="text-primary-500 dark:text-primary-400"
                    />
                  </span>
                  <span>
                    42, MG Road, Bengaluru,
                    <br />
                    Karnataka 560001, India
                  </span>
                </div>
                <a
                  href="mailto:info@oporajeo.in"
                  className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 transition-colors"
                >
                  <span className="w-7 h-7 rounded-lg bg-primary-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Mail
                      size={13}
                      className="text-primary-500 dark:text-primary-400"
                    />
                  </span>
                  info@oporajeo.in
                </a>
                <a
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  <span className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Phone
                      size={13}
                      className="text-emerald-500 dark:text-emerald-400"
                    />
                  </span>
                  {PHONE}
                </a>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-slate-800 dark:text-white font-bold mb-4 text-xs uppercase tracking-widest">
                {t.footer_follow}
              </h4>
              <div className="flex gap-2 mb-5">
                {SOCIAL.map(({ name, url, cls, svg }) => (
                  <a
                    key={name}
                    href={url}
                    title={name}
                    className={`w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 ${cls} flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all border border-slate-200 dark:border-slate-700`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {svg}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
            <p
              data-testid="footer-copyright"
              className="flex items-center gap-1.5"
            >
              © {new Date().getFullYear()} অপরাজেয় (Oporajeo). Made with
              <Heart size={11} className="text-rose-500 fill-rose-500" /> in
              India.
            </p>
            <div className="flex items-center gap-4">
              <span>Trusted by 10,000+ community members</span>
              <a
                href="#"
                className="hover:text-primary-500 transition-colors flex items-center gap-1"
              >
                {t.footer_privacy} <ExternalLink size={9} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* FAB via portal — completely outside any stacking context */}
      <FAB
        open={fabOpen}
        onToggle={() => setFabOpen((v) => !v)}
        items={fabItems}
      />
    </>
  );
}
