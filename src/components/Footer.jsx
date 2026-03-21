import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  
} from "lucide-react";

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
    lightColor: "hover:bg-blue-600 hover:text-white",
    darkColor: "dark:hover:bg-blue-600",
    svg: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    name: "Instagram",
    url: "#",
    lightColor: "hover:bg-pink-500 hover:text-white",
    darkColor: "dark:hover:bg-pink-600",
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
    lightColor: "hover:bg-slate-700 hover:text-white",
    darkColor: "dark:hover:bg-slate-600",
    svg: <path d="M4 4l16 16M4 20L20 4" />,
  },
  {
    name: "YouTube",
    url: "#",
    lightColor: "hover:bg-red-600 hover:text-white",
    darkColor: "dark:hover:bg-red-600",
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

export default function Footer() {
  return (
    <footer
      className="
      relative overflow-hidden
      bg-linear-to-br from-slate-100 via-indigo-50 to-violet-50
      dark:bg-none dark:bg-slate-900
      border-t border-slate-200 dark:border-slate-800
    "
    >
      {/* Light theme decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/40 dark:bg-indigo-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-200/40 dark:bg-violet-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-100/30 dark:bg-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* ── Brand ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Oporajeo"
                className="h-20 w-30 md:w-50 object-contain rounded-xl shadow-md shadow-indigo-200 dark:shadow-none"
              />
              {/* <div>
                <span className="block text-base font-extrabold text-slate-800 dark:text-white">
                  অপরাজেয়
                </span>
                <span className="block text-[9px] text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase">
                  Oporajeo
                </span>
              </div> */}
            </div>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-5">
              Connecting communities across India with essential services —
              healthcare, emergency response, transport, and local events.
            </p>
            {/* <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-300/50 dark:shadow-indigo-900/30 group"
            >
              <Phone size={14} className="group-hover:animate-bounce" />
              Call Us: {PHONE}
            </a> */}
          </motion.div>

          {/* ── Quick Links ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <h4 className="text-slate-800 dark:text-white font-bold mb-4 text-xs uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ path, label, Icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                      <Icon
                        size={11}
                        className="text-indigo-500 dark:text-indigo-400"
                      />
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Contact — Indian data ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
          >
            <h4 className="text-slate-800 dark:text-white font-bold mb-4 text-xs uppercase tracking-widest">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin
                    size={13}
                    className="text-indigo-500 dark:text-indigo-400"
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
                className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
              >
                <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                  <Mail
                    size={13}
                    className="text-indigo-500 dark:text-indigo-400"
                  />
                </span>
                info@oporajeo.in
              </a>

              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
              >
                <span className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors">
                  <Phone
                    size={13}
                    className="text-emerald-500 dark:text-emerald-400 group-hover:animate-bounce"
                  />
                </span>
                {PHONE}
              </a>

              <a
                href="tel:+911800123456"
                className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
              >
                <span className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                  <Phone
                    size={13}
                    className="text-emerald-500 dark:text-emerald-400"
                  />
                </span>
                Toll Free: 1800-123-456
              </a>
            </div>
          </motion.div>

          {/* ── Social + Actions ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
          >
            <h4 className="text-slate-800 dark:text-white font-bold mb-4 text-xs uppercase tracking-widest">
              Follow Us
            </h4>
            <div className="flex gap-2 mb-5">
              {SOCIAL.map(({ name, url, lightColor, darkColor, svg }) => (
                <a
                  key={name}
                  href={url}
                  title={name}
                  className={`w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 ${lightColor} ${darkColor} flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all border border-slate-200 dark:border-slate-700`}
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

            {/* <div className="space-y-2.5">
              <a
                href={`https://wa.me/${WHATSAPP_NUM}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30"
              >
                <MessageCircle size={14} /> WhatsApp Us
              </a>
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
              >
                <Phone size={14} /> Call Now
              </a>
            </div> */}
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
          <p
            data-testid="footer-copyright"
            className="flex items-center gap-1.5"
          >
            © {new Date().getFullYear()} অপরাজেয় (Oporajeo). Made with
            <Heart size={11} className="text-rose-500 fill-rose-500" />
            in India.
          </p>
          <div className="flex items-center gap-4">
            <span>Trusted by 10,000+ community members</span>
            <a
              href="#"
              className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              Privacy Policy <ExternalLink size={9} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Floating action buttons ── */}
      <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 flex flex-col gap-3">
        <motion.a
          href={`tel:${PHONE.replace(/\s/g, "")}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl shadow-indigo-400/40 dark:shadow-indigo-900/50 flex items-center justify-center"
          style={{ width: 52, height: 52 }}
          title="Call Us"
        >
          <Phone size={21} />
        </motion.a>

        <motion.a
          href={`https://wa.me/${WHATSAPP_NUM}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-400/40 dark:shadow-emerald-900/50 flex items-center justify-center"
          style={{ width: 52, height: 52 }}
          title="WhatsApp"
        >
          <MessageCircle size={21} />
        </motion.a>
      </div>
    </footer>
  );
}
