import RoutePageTemplate from "./shared/RoutePageTemplate";
import useBuses from "../../hooks/bushook";
import { createBus, deleteBus, updateBus } from "../../api/busApi";
import fetchUser from "../../hooks/userhook";

export default function BusPage() {
  const { profile } = fetchUser();
  const { buses, loading, refresh } = useBuses();

  // ── Permission helpers ──────────────────────────────────────────────────────
  const isAdmin = profile?.role === "admin";
  const perms = Array.isArray(profile?.permissions) ? profile.permissions : [];
  const hasPerm = (key) => isAdmin || perms.includes(key);

  const canCreate = hasPerm("bus.create");
  const canUpdate = hasPerm("bus.update");
  const canDelete = hasPerm("bus.delete");
  const canRead = hasPerm("bus.read");
  // ───────────────────────────────────────────────────────────────────────────
    if (!canRead) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400 text-sm">
        You don't have permission to view buses.
      </div>
    );
  }
  return (
    <RoutePageTemplate
      title="Bus Route"
      data={buses}
      loading={loading}
      fetchFn={refresh}
      createFn={createBus}
      updateFn={updateBus}
      deleteFn={deleteBus}
      canCreate={canCreate}
      canUpdate={canUpdate}
      canDelete={canDelete}
      placeholder={{
        routeNumber: "201",
        stops: "Stop A, Stop B",
      }}
    />
  );
}
