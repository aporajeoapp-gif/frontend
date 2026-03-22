import { useState } from "react";
import { Plus, Pencil, Trash2, Shield, Check, Eye, EyeOff } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import {
  FormField,
  Input,
  Select,
  ActionBtn,
} from "../components/ui/FormField";
import {
  PERMISSION_RESOURCES,
  CRUD_ACTIONS,
  permKey,
  resourcePerms,
  allPerms,
} from "../data/adminData";

const ROLES = ["Admin", "Coordinator", "Member"];
const STATUSES = ["Active", "Inactive", "Suspended"];
const emptyUser = {
  name: "",
  email: "",
  password: "",
  role: "Member",
  status: "Active",
  permissions: [],
  avatar: "",
};

// ─── Password strength meter ───────────────────────────────────────────────────
function passwordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "Too short", color: "bg-red-400" },
    { label: "Weak", color: "bg-red-400" },
    { label: "Fair", color: "bg-amber-400" },
    { label: "Good", color: "bg-emerald-400" },
    { label: "Strong", color: "bg-emerald-500" },
  ];
  return { score, ...map[score] };
}

function PasswordField({ value, onChange, isEdit }) {
  const [show, setShow] = useState(false);
  const strength = passwordStrength(value);
  return (
    <FormField
      label={isEdit ? "New Password (leave blank to keep current)" : "Password"}
    >
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            isEdit
              ? "Leave blank to keep current"
              : "Min 8 chars, e.g. Admin@123"
          }
          autoComplete="new-password"
          className="w-full px-3 py-2 pr-10 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-indigo-400 dark:focus:border-indigo-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 transition-colors"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
      {value && (
        <div className="mt-1.5 space-y-1">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${i <= strength.score ? strength.color : "bg-slate-200 dark:bg-slate-700"}`}
              />
            ))}
          </div>
          <p
            className={`text-xs font-medium ${strength.score <= 1 ? "text-red-500" : strength.score === 2 ? "text-amber-500" : "text-emerald-500"}`}
          >
            {strength.label}
          </p>
        </div>
      )}
    </FormField>
  );
}

// ─── CRUD Permission Matrix ────────────────────────────────────────────────────
function PermissionMatrix({ permissions, onChange }) {
  const groups = [...new Set(PERMISSION_RESOURCES.map((r) => r.group))];

  const isChecked = (resource, action) =>
    permissions.includes(permKey(resource, action));

  const toggle = (resource, action) => {
    const key = permKey(resource, action);
    onChange(
      permissions.includes(key)
        ? permissions.filter((p) => p !== key)
        : [...permissions, key],
    );
  };

  const toggleRow = (resource) => {
    const keys = resourcePerms(resource);
    const allOn = keys.every((k) => permissions.includes(k));
    onChange(
      allOn
        ? permissions.filter((p) => !keys.includes(p))
        : [...new Set([...permissions, ...keys])],
    );
  };

  const toggleCol = (action) => {
    const keys = PERMISSION_RESOURCES.map((r) => permKey(r.key, action));
    const allOn = keys.every((k) => permissions.includes(k));
    onChange(
      allOn
        ? permissions.filter((p) => !keys.includes(p))
        : [...new Set([...permissions, ...keys])],
    );
  };

  const toggleAll = () => {
    const all = allPerms();
    onChange(all.every((k) => permissions.includes(k)) ? [] : all);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Shield size={14} className="text-indigo-500" /> Permissions
        </p>
        <button
          onClick={toggleAll}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          {allPerms().every((k) => permissions.includes(k))
            ? "Deselect All"
            : "Select All"}
        </button>
      </div>

      {groups.map((group) => {
        const resources = PERMISSION_RESOURCES.filter((r) => r.group === group);
        return (
          <div key={group}>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">
              {group}
            </p>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div
                className="grid bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700"
                style={{ gridTemplateColumns: "1fr repeat(4, 72px)" }}
              >
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Resource
                </div>
                {CRUD_ACTIONS.map((action) => (
                  <button
                    key={action}
                    onClick={() => toggleCol(action)}
                    className="py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize text-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    title={`Toggle all ${action}`}
                  >
                    {action}
                  </button>
                ))}
              </div>
              {resources.map((res, i) => {
                const rowAllOn = resourcePerms(res.key).every((k) =>
                  permissions.includes(k),
                );
                return (
                  <div
                    key={res.key}
                    className={`grid items-center ${i < resources.length - 1 ? "border-b border-slate-100 dark:border-slate-800" : ""}`}
                    style={{ gridTemplateColumns: "1fr repeat(4, 72px)" }}
                  >
                    <button
                      onClick={() => toggleRow(res.key)}
                      className={`px-3 py-2.5 text-sm text-left font-medium transition-colors flex items-center gap-2
                        ${rowAllOn ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300"}
                        hover:text-indigo-600 dark:hover:text-indigo-400`}
                    >
                      {rowAllOn && (
                        <Check size={12} className="text-indigo-500 shrink-0" />
                      )}
                      {res.label}
                    </button>
                    {CRUD_ACTIONS.map((action) => (
                      <div
                        key={action}
                        className="flex items-center justify-center py-2.5"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked(res.key, action)}
                          onChange={() => toggle(res.key, action)}
                          className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <p className="text-xs text-slate-400 dark:text-slate-500">
        {permissions.length} of {allPerms().length} permissions granted
      </p>
    </div>
  );
}

// ─── User Form ─────────────────────────────────────────────────────────────────
function UserForm({ value, onChange, isEdit }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Full Name">
          <Input
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder="John Doe"
          />
        </FormField>
        <FormField label="Email">
          <Input
            type="email"
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            placeholder="john@enjio.app"
          />
        </FormField>
      </div>

      {/* Password field — always shown on create, optional on edit */}
      <PasswordField
        value={value.password ?? ""}
        onChange={(pw) => onChange({ ...value, password: pw })}
        isEdit={isEdit}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Role">
          <Select
            value={value.role}
            onChange={(e) => onChange({ ...value, role: e.target.value })}
          >
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </Select>
        </FormField>
        <FormField label="Status">
          <Select
            value={value.status}
            onChange={(e) => onChange({ ...value, status: e.target.value })}
          >
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </FormField>
      </div>

      <PermissionMatrix
        permissions={value.permissions}
        onChange={(perms) => onChange({ ...value, permissions: perms })}
      />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function UsersPage() {
  const { state, dispatch, toast } = useAdmin();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyUser);

  const openAdd = () => {
    setForm({ ...emptyUser });
    setModal({ mode: "add" });
  };
  const openEdit = (user) => {
    setForm({ ...user, password: "" });
    setModal({ mode: "edit", data: user });
  };
  const openPerms = (user) => {
    setForm({ ...user, password: "" });
    setModal({ mode: "perms", data: user });
  };

  const handleSave = () => {
    if (!form.name || !form.email)
      return toast("Name and email are required", "error");
    if (modal.mode === "add" && !form.password)
      return toast("Password is required", "error");
    if (modal.mode === "add" && form.password.length < 8)
      return toast("Password must be at least 8 characters", "error");

    const avatar = form.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    if (modal.mode === "add") {
      dispatch({
        type: "ADD_USER",
        payload: {
          ...form,
          avatar,
          joined: new Date().toISOString().split("T")[0],
        },
      });
      toast("User created successfully");
    } else {
      // On edit: only update password if a new one was typed
      const updated = { ...form, avatar };
      if (!form.password) {
        // keep existing password
        updated.password = modal.data.password;
      }
      dispatch({ type: "UPDATE_USER", payload: updated });
      toast("User updated successfully");
    }
    setModal(null);
  };

  const columns = [
    {
      key: "name",
      label: "User",
      render: (v, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {row.avatar}
          </div>
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              {v}
            </p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: "role", label: "Role", render: (v) => <Badge label={v} /> },
    { key: "status", label: "Status", render: (v) => <Badge label={v} /> },
    { key: "joined", label: "Joined" },
    {
      key: "permissions",
      label: "Permissions",
      render: (v) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {v.length} / {allPerms().length}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Users
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {state.users.length} total users
          </p>
        </div>
        <ActionBtn onClick={openAdd}>
          <Plus size={15} /> Add User
        </ActionBtn>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <Table
          columns={columns}
          data={state.users}
          searchKeys={["name", "email", "role"]}
          actions={(row) => (
            <>
              <ActionBtn
                variant="ghost"
                onClick={() => openPerms(row)}
                title="Manage Permissions"
              >
                <Shield size={14} />
              </ActionBtn>
              <ActionBtn variant="ghost" onClick={() => openEdit(row)}>
                <Pencil size={14} />
              </ActionBtn>
              <ActionBtn
                variant="ghost"
                onClick={() => {
                  dispatch({ type: "DELETE_USER", payload: row.id });
                  toast("User deleted", "warning");
                }}
              >
                <Trash2 size={14} className="text-red-500" />
              </ActionBtn>
            </>
          )}
        />
      </div>

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={
          modal?.mode === "add"
            ? "Create User"
            : modal?.mode === "perms"
              ? "Manage Permissions"
              : "Edit User"
        }
        size="xl"
      >
        <UserForm
          value={form}
          onChange={setForm}
          isEdit={modal?.mode !== "add"}
        />
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <ActionBtn variant="secondary" onClick={() => setModal(null)}>
            Cancel
          </ActionBtn>
          <ActionBtn onClick={handleSave}>Save</ActionBtn>
        </div>
      </Modal>
    </div>
  );
}
