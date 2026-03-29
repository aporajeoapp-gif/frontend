import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../api/authApi";
import { getDoctors } from "../../api/doctorApi";
// import { getBuses } from "../../api/busApi";
// import { getFerries } from "../../api/ferryApi";

const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="font-medium text-slate-700 dark:text-slate-300">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  const [counts, setCounts] = useState({
    users: [],
    doctors: [],
    busRoutes: [],
    ferryRoutes: [],
  });

  useEffect(() => {
    Promise.allSettled([
      getAllUsers(),
      getDoctors(),
      getBuses(),
      getFerries(),
    ]).then(([users, doctors, buses, ferries]) => {
      setCounts({
        users: users.value ?? [],
        doctors: doctors.value ?? [],
        busRoutes: buses.value ?? [],
        ferryRoutes: ferries.value ?? [],
      });
    });
  }, []);

  const roleData = ["Admin", "Coordinator", "Member"].map((role) => ({
    name: role,
    value: counts.users.filter((u) => u.role === role).length,
  }));

  const routeData = [
    { name: "Bus Routes", count: counts.busRoutes.length },
    { name: "Ferry Routes", count: counts.ferryRoutes.length },
    { name: "Doctors", count: counts.doctors.length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Analytics
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Platform overview and trends
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5"
        >
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            User Growth (2025)
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={[]}>
              <defs>
                <linearGradient id="ug" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
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
                name="Users"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#ug)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5"
        >
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Events per Month
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[]}>
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
                name="Events"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5"
        >
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            User Roles Distribution
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {roleData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v) => (
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {v}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5"
        >
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Platform Data Overview
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={routeData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                className="dark:stroke-slate-700"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                width={90}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                name="Count"
                fill="#8b5cf6"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
