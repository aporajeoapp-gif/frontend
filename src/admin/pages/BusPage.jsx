import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import { FormField, Input, ActionBtn } from "../components/ui/FormField";

const empty = {
  routeNumber: "",
  routeName: "",
  departureTime: "",
  arrivalTime: "",
  stops: "",
  fare: "",
};

function RouteForm({ value, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Route Number">
          <Input
            value={value.routeNumber}
            onChange={(e) =>
              onChange({ ...value, routeNumber: e.target.value })
            }
            placeholder="201"
          />
        </FormField>
        <FormField label="Fare (₹)">
          <Input
            type="number"
            value={value.fare}
            onChange={(e) => onChange({ ...value, fare: e.target.value })}
            placeholder="30"
          />
        </FormField>
      </div>
      <FormField label="Route Name">
        <Input
          value={value.routeName}
          onChange={(e) => onChange({ ...value, routeName: e.target.value })}
          placeholder="Kolkata - Howrah"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Departure Time">
          <Input
            type="time"
            value={value.departureTime}
            onChange={(e) =>
              onChange({ ...value, departureTime: e.target.value })
            }
          />
        </FormField>
        <FormField label="Arrival Time">
          <Input
            type="time"
            value={value.arrivalTime}
            onChange={(e) =>
              onChange({ ...value, arrivalTime: e.target.value })
            }
          />
        </FormField>
      </div>
      <FormField label="Stops (comma separated)">
        <Input
          value={
            Array.isArray(value.stops) ? value.stops.join(", ") : value.stops
          }
          onChange={(e) => onChange({ ...value, stops: e.target.value })}
          placeholder="Stop A, Stop B, Stop C"
        />
      </FormField>
    </div>
  );
}

export default function BusPage() {
  const { state, dispatch, toast } = useAdmin();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(empty);

  const openAdd = () => {
    setForm(empty);
    setModal("add");
  };
  const openEdit = (r) => {
    setForm({
      ...r,
      stops: Array.isArray(r.stops) ? r.stops.join(", ") : r.stops,
    });
    setModal("edit");
  };

  const handleSave = () => {
    if (!form.routeNumber || !form.routeName)
      return toast("Route number and name required", "error");
    const payload = {
      ...form,
      stops:
        typeof form.stops === "string"
          ? form.stops
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : form.stops,
      fare: Number(form.fare),
    };
    if (modal === "add") {
      dispatch({ type: "ADD_BUS", payload });
      toast("Bus route added");
    } else {
      dispatch({ type: "UPDATE_BUS", payload });
      toast("Bus route updated");
    }
    setModal(null);
  };

  const columns = [
    { key: "routeNumber", label: "Route #" },
    { key: "routeName", label: "Route Name" },
    {
      key: "stops",
      label: "Stops",
      render: (v) => (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {Array.isArray(v) ? v.join(" → ") : v}
        </span>
      ),
    },
    { key: "departureTime", label: "Departure" },
    { key: "arrivalTime", label: "Arrival" },
    { key: "fare", label: "Fare", render: (v) => `₹${v}` },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Bus Routes
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {state.busRoutes.length} routes
          </p>
        </div>
        <ActionBtn onClick={openAdd}>
          <Plus size={15} /> Add Route
        </ActionBtn>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <Table
          columns={columns}
          data={state.busRoutes}
          searchKeys={["routeNumber", "routeName"]}
          actions={(row) => (
            <>
              <ActionBtn variant="ghost" onClick={() => openEdit(row)}>
                <Pencil size={14} />
              </ActionBtn>
              <ActionBtn
                variant="ghost"
                onClick={() => {
                  dispatch({ type: "DELETE_BUS", payload: row.id });
                  toast("Route deleted", "warning");
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
        title={modal === "add" ? "Add Bus Route" : "Edit Bus Route"}
      >
        <RouteForm value={form} onChange={setForm} />
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
