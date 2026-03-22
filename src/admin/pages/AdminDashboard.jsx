import { motion } from "framer-motion";
import {
  Users,
  CalendarDays,
  Stethoscope,
  Megaphone,
  Bus,
  Ship,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { useAdmin } from "../context/AdminContext";
import StatCard from "../components/ui/StatCard";
import {
  EVENTS_PER_MONTH,
  USER_GROWTH,
  RECENT_ACTIVITY,
} from "../data/adminData";

const activityIcons = {
  route: <Bus size={14} className="text-indigo-500" />,
  event: <CalendarDays size={14} className="text-emerald-500" />,
  ad: <Megaphone size={14} className="text-amber-500" />,
  user: <Users size={14} className="text-violet-500" />,
  view: <TrendingUp size={14} className="text-slate-400" />,
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="font-medium text-slate-700 dark:text-slate-300">{label}</p>
      <p className="text-indigo-600 dark:text-indigo-400">
        {payload[0].value} {payload[0].name}
      </p>
    </div>
  );
};

export default function AdminDashboard() {
  const { state } = useAdmin();
  const activeAds = state.advertisements.filter(
    (a) => a.active !== false,
  ).length;

  const stats = [
    {
      label: "Total Users",
      value: state.users.length,
      icon: Users,
      color: "indigo",
      trend: { up: true, value: "+12%" },
    },
    {
      label: "Total Events",
      value: state.events.length,
      icon: CalendarDays,
      color: "emerald",
      trend: { up: true, value: "+3" },
    },
    {
      label: "Total Doctors",
      value: state.doctors.length,
      icon: Stethoscope,
      color: "cyan",
      trend: { up: false, value: "-1" },
    },
    {
      label: "Active Ads",
      value: activeAds,
      icon: Megaphone,
      color: "amber",
      trend: { up: true, value: "+2" },
    },
    {
      label: "Bus Routes",
      value: state.busRoutes.length,
      icon: Bus,
      color: "violet",
    },
    {
      label: "Ferry Routes",
      value: state.ferryRoutes.length,
      icon: Ship,
      color: "rose",
    },
    {
      label: "Emergency Services",
      value: state.emergency.length,
      icon: AlertTriangle,
      color: "rose",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Welcome back, Aryan. Here's what's happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5"
        >
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            User Growth
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={USER_GROWTH}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                className="dark:stroke-slate-700"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="users"
                name="users"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#userGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5"
        >
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Events per Month
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={EVENTS_PER_MONTH}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                className="dark:stroke-slate-700"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="events"
                name="events"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5"
      >
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {RECENT_ACTIVITY.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"
            >
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                {activityIcons[a.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
                  <span className="font-medium">{a.user}</span> — {a.action}
                </p>
              </div>
              <span className="text-xs text-slate-400 shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
