import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  MapPin,
  Clock,
  CalendarDays,
  Phone,
  Mail,
  Users,
  Target,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import PageBanner from "../components/PageBanner";

const STATUS_META = {
  upcoming: {
    label: "Upcoming",
    Icon: AlertCircle,
    cls: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  },
  ongoing: {
    label: "Ongoing",
    Icon: AlertCircle,
    cls: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  },
  completed: {
    label: "Completed",
    Icon: CheckCircle,
    cls: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
  },
  cancelled: {
    label: "Cancelled",
    Icon: XCircle,
    cls: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  },
};

const FILTERS = ["all", "upcoming", "ongoing", "completed"];

function DonorRow({ donor, i }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.04 }}
      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold text-xs">
            {donor.name.charAt(0)}
          </div>
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {donor.name}
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
          {donor.bloodGroup}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
        {donor.age} yrs
      </td>
      <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
        {donor.phone}
      </td>
      <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
        {donor.donatedAt || (
          <span className="text-slate-400 italic">Pending</span>
        )}
      </td>
    </motion.tr>
  );
}

function CampCard({ camp, onExpand, expanded }) {
  const meta = STATUS_META[camp.status] ?? STATUS_META.upcoming;
  const progress =
    camp.targetUnits > 0
      ? Math.min((camp.collectedUnits / camp.targetUnits) * 100, 100)
      : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all"
    >
      {/* Top accent */}
      <div className="h-1.5 bg-linear-to-r from-rose-500 to-pink-500" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
              <Droplets
                size={20}
                className="text-rose-600 dark:text-rose-400"
              />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-sm leading-snug">
                {camp.campName}
              </h3>
              <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                {camp.organizer}
              </p>
            </div>
          </div>
          <span
            className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${meta.cls}`}
          >
            {meta.label}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <div className="flex items-center gap-2">
            <CalendarDays size={11} className="text-rose-400" />
            {camp.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={11} className="text-rose-400" />
            {camp.time}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={11} className="text-rose-400" />
            {camp.location}
          </div>
        </div>

        {/* Blood groups */}
        <div className="flex flex-wrap gap-1 mb-3">
          {(camp.bloodGroupsNeeded ?? []).map((g) => (
            <span
              key={g}
              className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Progress */}
        {camp.status === "completed" && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Units collected</span>
              <span className="font-semibold">
                {camp.collectedUnits} / {camp.targetUnits}
              </span>
            </div>
            <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-rose-500 to-pink-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <a
            href={`tel:${camp.contactPhone}`}
            className="flex items-center gap-1 hover:text-rose-600 transition-colors"
          >
            <Phone size={11} />
            {camp.contactPhone}
          </a>
        </div>

        {/* Expand donors */}
        <button
          onClick={() => onExpand(camp.id)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Users size={12} />
            {camp.donors?.length ?? 0} Registered Donors
          </span>
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Donors table */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-100 dark:border-slate-800"
          >
            <div className="px-5 py-4">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                Donor Details
              </h4>
              {camp.donors?.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/60">
                        {[
                          "Name",
                          "Blood Group",
                          "Age",
                          "Phone",
                          "Donated On",
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-4 py-2.5 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {camp.donors.map((d, i) => (
                        <DonorRow key={d.id} donor={d} i={i} />
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic text-center py-4">
                  No donors registered yet.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BloodDonation() {
  const [camps, setCamps] = useState([]);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    // TODO: replace with real API when available
    setCamps([]);
  }, []);

  const filtered =
    filter === "all" ? camps : camps.filter((c) => c.status === filter);

  const toggleExpand = (id) => setExpanded((prev) => (prev === id ? null : id));

  const totalDonors = camps.reduce((s, c) => s + (c.donors?.length ?? 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageBanner
        title="Blood Donation Camps"
        subtitle="Find a camp near you and save lives"
        image="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1400&auto=format&fit=crop&q=80"
        gradient="from-rose-900/85 via-pink-900/75 to-slate-900/80"
        Icon={Droplets}
        badge="Save Lives · Donate Blood"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Camps",
              value: camps.length,
              color: "text-rose-500",
              bg: "bg-rose-50 dark:bg-rose-900/20",
            },
            {
              label: "Upcoming",
              value: camps.filter((c) => c.status === "upcoming").length,
              color: "text-blue-500",
              bg: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              label: "Completed",
              value: camps.filter((c) => c.status === "completed").length,
              color: "text-emerald-500",
              bg: "bg-emerald-50 dark:bg-emerald-900/20",
            },
            {
              label: "Donors",
              value: totalDonors,
              color: "text-violet-500",
              bg: "bg-violet-50 dark:bg-violet-900/20",
            },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`${bg} rounded-2xl p-4 text-center`}>
              <div className={`text-2xl font-extrabold ${color}`}>{value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                filter === f
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-rose-300"
              }`}
            >
              {f === "all" ? "All Camps" : f}
            </button>
          ))}
        </div>

        {/* Camp cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Droplets
              size={48}
              className="mx-auto text-slate-300 dark:text-slate-700 mb-3"
            />
            <p className="text-slate-500 dark:text-slate-400">
              No camps found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((camp) => (
              <CampCard
                key={camp.id}
                camp={camp}
                expanded={expanded === camp.id}
                onExpand={toggleExpand}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
