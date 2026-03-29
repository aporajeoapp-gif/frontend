import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Check, X } from "lucide-react";
import { toast } from "sonner";
import Table from "../components/ui/Table";
import fetchUser, { useUsers } from "../../hooks/userhook";
import { createUser, updateUser, deleteUser } from "../../api/authApi";
import { confirmDelete, errorAlert, successAlert } from "../../utils/alert";

const inp =
  "w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-indigo-400 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 transition-colors";

const btn = (v = "primary") =>
  ({
    primary:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors",
    secondary:
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors",
    ghost:
      "inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors",
  })[v];

const ROLES = ["admin", "coordinator", "member"];
const STATUSES = ["active", "deactive"];
const RESOURCES = [
  { key: "bus", label: "Bus Routes", group: "Transport" },
  { key: "ferry", label: "Ferry Routes", group: "Transport" },
  { key: "doctors", label: "Doctors", group: "Healthcare" },
  { key: "emergency", label: "Emergency Services", group: "Healthcare" },
  { key: "blood", label: "Blood Donation", group: "Healthcare" },
  { key: "events", label: "Events", group: "Content" },
  { key: "ads", label: "Advertisements", group: "Content" },
];
const ACTIONS = ["create", "read", "update", "delete"];
const pKey = (r, a) => `${r}.${a}`;
const allGroups = [...new Set(RESOURCES.map((r) => r.group))];
const TOTAL = RESOURCES.length * ACTIONS.length;

const emptyUser = { name: "", email: "", password: "", role: "member", status: "active", permissions: [] };

const badgeCls = {
  admin: "bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300",
  coordinator: "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300",
  member: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
  active: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300",
  inactive: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400",
  suspended: "bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400",
};

const Badge = ({ label }) => {
  const cls = badgeCls[(label ?? "").toLowerCase()] ?? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>{label}</span>;
};

function PasswordCell({ value }) {
  const [show, setShow] = useState(false);
  if (!value) return <span className="text-xs text-slate-400 italic">—</span>;
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{show ? value : "••••••••"}</span>
      <button type="button" onClick={() => setShow((v) => !v)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
        {show ? <EyeOff size={13} /> : <Eye size={13} />}
      </button>
    </div>
  );
}

function PermissionMatrix({ permissions, onChange }) {
  const has = (r, a) => permissions.includes(pKey(r, a));

  const toggle = (r, a) => {
    const k = pKey(r, a);
    onChange(permissions.includes(k) ? permissions.filter((p) => p !== k) : [...permissions, k]);
  };

  const toggleRow = (r) => {
    const keys = ACTIONS.map((a) => pKey(r, a));
    const allOn = keys.every((k) => permissions.includes(k));
    onChange(allOn ? permissions.filter((p) => !keys.includes(p)) : [...new Set([...permissions, ...keys])]);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Permissions</p>
      {allGroups.map((group) => {
        const resources = RESOURCES.filter((r) => r.group === group);
        return (
          <div key={group}>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">{group}</p>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="grid bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700" style={{ gridTemplateColumns: "1fr repeat(4, 64px)" }}>
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Resource</div>
                {ACTIONS.map((a) => (
                  <div key={a} className="py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize text-center">{a}</div>
                ))}
              </div>
              {resources.map((res, i) => {
                const rowOn = ACTIONS.every((a) => has(res.key, a));
                return (
                  <div key={res.key} className={`grid items-center ${i < resources.length - 1 ? "border-b border-slate-100 dark:border-slate-800" : ""}`} style={{ gridTemplateColumns: "1fr repeat(4, 64px)" }}>
                    <button onClick={() => toggleRow(res.key)} className={`px-3 py-2.5 text-sm text-left font-medium flex items-center gap-1.5 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${rowOn ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300"}`}>
                      {rowOn && <Check size={11} className="text-indigo-500 shrink-0" />}
                      {res.label}
                    </button>
                    {ACTIONS.map((a) => (
                      <div key={a} className="flex items-center justify-center py-2.5">
                        <input type="checkbox" checked={has(res.key, a)} onChange={() => toggle(res.key, a)} className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-indigo-600 cursor-pointer" />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function UsersPage() {
  const { profile } = fetchUser();
  const { users, addUser, updateUser: updateUserInList, removeUser } = useUsers();
  const [modal, setModal] = useState(null); // null | { mode: "add" } | { mode: "edit", id: string }
  const [form, setForm] = useState(emptyUser);
  const [showPw, setShowPw] = useState(false);

  const isAdmin = profile?.role === "admin";

  const openAdd = () => {
    setForm({ ...emptyUser });
    setShowPw(false);
    setModal({ mode: "add" });
  };

  const openEdit = (user) => {
    const perms =
      Array.isArray(user.permissions) && user.permissions.includes("*")
        ? RESOURCES.flatMap((r) => ACTIONS.map((a) => pKey(r, a)))
        : (user.permissions ?? []);
    setForm({ ...user, password: "", permissions: perms });
    setShowPw(false);
    setModal({ mode: "edit", id: user._id || user.id });
  };

  const handleSave = async () => {
    if (!form.name || !form.email) {
      errorAlert("Please fill in all required fields (Name and Email)");
      return;
    }
    if (modal.mode === "add" && (!form.password || form.password.length < 8)) {
      errorAlert("Password must be at least 8 characters");
      return;
    }
    try {
      if (modal.mode === "add") {
        const res = await createUser(form);
        if (res.user) {
          addUser(res.user);
          toast.success(res.message);
          setModal(null);
        }
      } else {
        const res = await updateUser(modal.id, form);
        if (res.user) {
          updateUserInList(modal.id, res.user);
          toast.success(res.message);
          setModal(null);
        }
      }
    } catch (err) {
      errorAlert(err.response?.data?.message || "Failed to save user");
    }
  };

  const handleDelete = async (user) => {
    const result = await confirmDelete();
    if (!result.isConfirmed) return;
    const id = user._id || user.id;
    try {
      await deleteUser(id);
      removeUser(id);
      successAlert("User deleted successfully");
    } catch (err) {
      errorAlert("Failed to delete user");
    }
  };

  const columns = [
    {
      key: "name",
      label: "User",
      render: (v, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {v.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">{v}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: "role", label: "Role", render: (v) => <Badge label={v} /> },
    { key: "password", label: "Password", render: (v) => <PasswordCell value={v} /> },
    { key: "status", label: "Status", render: (v) => <Badge label={v} /> },
    {
      key: "permissions",
      label: "Permissions",
      render: (v = []) => {
        const count = Array.isArray(v) && v.includes("*") ? TOTAL : Array.isArray(v) ? v.length : 0;
        return (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${count === TOTAL ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}>
            {count}/{TOTAL}
          </span>
        );
      },
    },
    { key: "createdAt", label: "Joined", render: (v) => new Date(v).toLocaleDateString() },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Users</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{users.length} total users</p>
        </div>
        {isAdmin && (
          <button className={btn("primary")} onClick={openAdd}>
            <Plus size={15} /> Add User
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <Table
          columns={columns}
          data={users}
          searchKeys={["name", "email", "role"]}
          actions={(row) =>
            isAdmin && (
              <>
                <button className={btn("ghost")} onClick={() => openEdit(row)}><Pencil size={14} /></button>
                <button className={btn("ghost")} onClick={() => handleDelete(row)}><Trash2 size={14} className="text-red-500" /></button>
              </>
            )
          }
        />
      </div>

      {/* Modal */}
      {!!modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {modal.mode === "add" ? "Create User" : "Edit User"}
              </h2>
              <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="px-6 py-5 max-h-[75vh] overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">Full Name</label>
                  <input className={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">Email</label>
                  <input className={inp} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
                  {modal.mode === "edit" ? "New Password (leave blank to keep)" : "Password"}
                </label>
                <div className="relative">
                  <input
                    className={inp + " pr-10"}
                    type={showPw ? "text" : "password"}
                    value={form.password ?? ""}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder={modal.mode === "edit" ? "Leave blank to keep current" : "Min 8 chars"}
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">Role</label>
                  <select className={inp} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    {ROLES.map((r) => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">Status</label>
                  <select className={inp} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <PermissionMatrix
                permissions={form.permissions ?? []}
                onChange={(perms) => setForm({ ...form, permissions: perms })}
              />
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className={btn("secondary")} onClick={() => setModal(null)}>Cancel</button>
                <button className={btn("primary")} onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}