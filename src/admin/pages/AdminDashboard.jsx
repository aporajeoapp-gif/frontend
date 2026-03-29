import { motion } from "framer-motion";
import {
  Users,
  CalendarDays,
  Stethoscope,
  Megaphone,
  Bus,
  Ship,
  AlertTriangle,
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
import { useState, useEffect } from "react";
import StatCard from "../components/ui/StatCard";

import  fetchUser, { useUsers } from "../../hooks/userhook";
import useBuses from "../../hooks/bushook";
import useDoctors from "../../hooks/doctorhook";
import useFerries from "../../hooks/ferryhook";
import useEmergencyServices from "../../hooks/emergencyHook";
// import { getBuses } from "../../api/busApi";
// import { getFerries } from "../../api/ferryApi";

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

  const { users } = useUsers();
  const {profile}=fetchUser()
  const { buses } = useBuses();
  const { doctors } = useDoctors();
  const { ferries } = useFerries();
  const { emergencies } = useEmergencyServices();
  const statData = {
    users: users?.length,
    buses: buses?.length,
    doctors: doctors?.length,
    ferries: ferries?.length,
    emergencies: emergencies?.length,
  };
  console.log("Stat data", statData);



  const stats = [
    {
      label: "Total Users",
      value: users?.length,
      icon: Users,
      color: "indigo",
      trend: { up: true, value: "+12%" },
    },
    {
      label: "Total Doctors",
      value: doctors?.length,
      icon: Stethoscope,
      color: "cyan",
    },
    {
      label: "Bus Routes",
      value: buses?.length,
      icon: Bus,
      color: "violet",
    },
    {
      label: "Ferry Routes",
      value: ferries?.length,
      icon: Ship,
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
          Welcome back, {profile?.name}. Here's what's happening.
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
            <AreaChart data={[]}>
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
                name="events"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
