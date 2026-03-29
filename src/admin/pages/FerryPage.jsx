import RoutePageTemplate from "./shared/RoutePageTemplate";
import useFerries from "../../hooks/ferryhook";
import { createFerry, deleteFerry, updateFerry } from "../../api/ferryApi";
import fetchUser from "../../hooks/userhook";

export default function FerryPage() {
  const { profile } = fetchUser();
  const { ferries, loading, refresh } = useFerries();

  // ── Permission helpers ──────────────────────────────────────────────────────
  const isAdmin = profile?.role === "admin";
  const perms = Array.isArray(profile?.permissions) ? profile.permissions : [];
  const hasPerm = (key) => isAdmin || perms.includes(key);

  const canCreate = hasPerm("ferry.create");
  const canUpdate = hasPerm("ferry.update");
  const canDelete = hasPerm("ferry.delete");
  const canRead = hasPerm("ferry.read");
  // ───────────────────────────────────────────────────────────────────────────
  if (!canRead) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400 text-sm">
        You don't have permission to view ferry page.
      </div>
    );
  }
  return (
    <RoutePageTemplate
      title="Ferry Route"
      data={ferries}
      loading={loading}
      fetchFn={refresh}
      createFn={createFerry}
      updateFn={updateFerry}
      deleteFn={deleteFerry}
      canCreate={canCreate}
      canUpdate={canUpdate}
      canDelete={canDelete}
      placeholder={{
        routeNumber: "F1",
        stops: "Ghat A, Ghat B",
      }}
    />
  );
}
