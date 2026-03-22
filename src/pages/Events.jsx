import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  MapPin,
  Tag,
  HeartPulse,
  Trophy,
  Music,
  Leaf,
} from "lucide-react";
import events from "../constant/data/events.json";
import PageBanner from "../components/PageBanner";
import { useTranslation } from "../context/LanguageContext";

const CATEGORY_META = {
  Health: {
    Icon: HeartPulse,
    color: "text-rose-600 dark:text-rose-400",
    badge: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300",
    accent: "from-rose-500 to-pink-500",
  },
  Sports: {
    Icon: Trophy,
    color: "text-emerald-600 dark:text-emerald-400",
    badge:
      "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
    accent: "from-emerald-500 to-teal-500",
  },
  Culture: {
    Icon: Music,
    color: "text-violet-600 dark:text-violet-400",
    badge:
      "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
    accent: "from-violet-500 to-purple-500",
  },
  Environment: {
    Icon: Leaf,
    color: "text-teal-600 dark:text-teal-400",
    badge: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300",
    accent: "from-teal-500 to-cyan-500",
  },
};

export default function Events() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageBanner
        title="Community Events"
        subtitle="Discover upcoming events near you"
        image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&auto=format&fit=crop&q=80"
        gradient="from-violet-900/85 via-purple-900/75 to-slate-900/80"
        Icon={CalendarDays}
        badge="What's Happening"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event, i) => {
            const meta = CATEGORY_META[event.category] || {
              Icon: Tag,
              color: "text-slate-600",
              badge: "bg-slate-100 text-slate-700",
              accent: "from-slate-400 to-slate-500",
            };
            const { Icon, color, badge, accent } = meta;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all"
                data-testid="event-card"
              >
                <div
                  className={`h-28 bg-linear-to-br ${accent} flex items-center justify-center relative overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 70% 30%, white 0%, transparent 60%)",
                    }}
                  />
                  <Icon size={48} className="text-white drop-shadow-lg" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-slate-800 dark:text-white leading-snug">
                      {event.name}
                    </h3>
                    <span
                      className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${badge}`}
                    >
                      {event.category}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={12} className={color} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className={color} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className={color} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
