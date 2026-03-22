import { createContext, useContext, useReducer, useCallback } from "react";
import { USERS, SETTINGS } from "../data/adminData";
import busData from "../../constant/data/busServices.json";
import ferryData from "../../constant/data/ferryServices.json";
import doctorsData from "../../constant/data/doctors.json";
import emergencyData from "../../constant/data/emergencyContacts.json";
import eventsData from "../../constant/data/events.json";
import adsData from "../../constant/data/advertisements.json";
import bloodDonationData from "../../constant/data/bloodDonation.json";

// ─── Initial State ─────────────────────────────────────────────────────────────
const initialState = {
  users: USERS,
  busRoutes: busData,
  ferryRoutes: ferryData,
  doctors: doctorsData,
  emergency: emergencyData,
  events: eventsData,
  advertisements: adsData,
  bloodCamps: bloodDonationData,
  settings: SETTINGS,
  toasts: [],
};

// ─── Reducer ───────────────────────────────────────────────────────────────────
function adminReducer(state, action) {
  switch (action.type) {
    // Users
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, { ...action.payload, id: Date.now() }],
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u,
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };
    // Bus
    case "ADD_BUS":
      return {
        ...state,
        busRoutes: [
          ...state.busRoutes,
          { ...action.payload, id: String(Date.now()) },
        ],
      };
    case "UPDATE_BUS":
      return {
        ...state,
        busRoutes: state.busRoutes.map((r) =>
          r.id === action.payload.id ? action.payload : r,
        ),
      };
    case "DELETE_BUS":
      return {
        ...state,
        busRoutes: state.busRoutes.filter((r) => r.id !== action.payload),
      };
    // Ferry
    case "ADD_FERRY":
      return {
        ...state,
        ferryRoutes: [
          ...state.ferryRoutes,
          { ...action.payload, id: String(Date.now()) },
        ],
      };
    case "UPDATE_FERRY":
      return {
        ...state,
        ferryRoutes: state.ferryRoutes.map((r) =>
          r.id === action.payload.id ? action.payload : r,
        ),
      };
    case "DELETE_FERRY":
      return {
        ...state,
        ferryRoutes: state.ferryRoutes.filter((r) => r.id !== action.payload),
      };
    // Doctors
    case "ADD_DOCTOR":
      return {
        ...state,
        doctors: [
          ...state.doctors,
          { ...action.payload, id: String(Date.now()) },
        ],
      };
    case "UPDATE_DOCTOR":
      return {
        ...state,
        doctors: state.doctors.map((d) =>
          d.id === action.payload.id ? action.payload : d,
        ),
      };
    case "DELETE_DOCTOR":
      return {
        ...state,
        doctors: state.doctors.filter((d) => d.id !== action.payload),
      };
    // Emergency
    case "ADD_EMERGENCY":
      return {
        ...state,
        emergency: [
          ...state.emergency,
          { ...action.payload, id: String(Date.now()) },
        ],
      };
    case "UPDATE_EMERGENCY":
      return {
        ...state,
        emergency: state.emergency.map((e) =>
          e.id === action.payload.id ? action.payload : e,
        ),
      };
    case "DELETE_EMERGENCY":
      return {
        ...state,
        emergency: state.emergency.filter((e) => e.id !== action.payload),
      };
    // Events
    case "ADD_EVENT":
      return {
        ...state,
        events: [
          ...state.events,
          { ...action.payload, id: String(Date.now()) },
        ],
      };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e,
        ),
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.payload),
      };
    // Ads
    case "ADD_AD":
      return {
        ...state,
        advertisements: [
          ...state.advertisements,
          { ...action.payload, id: Date.now() },
        ],
      };
    case "UPDATE_AD":
      return {
        ...state,
        advertisements: state.advertisements.map((a) =>
          a.id === action.payload.id ? action.payload : a,
        ),
      };
    case "DELETE_AD":
      return {
        ...state,
        advertisements: state.advertisements.filter(
          (a) => a.id !== action.payload,
        ),
      };
    // Blood Camps
    case "ADD_BLOOD_CAMP":
      return {
        ...state,
        bloodCamps: [
          ...state.bloodCamps,
          { ...action.payload, id: String(Date.now()), donors: [] },
        ],
      };
    case "UPDATE_BLOOD_CAMP":
      return {
        ...state,
        bloodCamps: state.bloodCamps.map((c) =>
          c.id === action.payload.id ? action.payload : c,
        ),
      };
    case "DELETE_BLOOD_CAMP":
      return {
        ...state,
        bloodCamps: state.bloodCamps.filter((c) => c.id !== action.payload),
      };
    // Settings
    case "UPDATE_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.payload } };
    // Toasts
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, { id: Date.now(), ...action.payload }],
      };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────
const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const toast = useCallback((message, type = "success") => {
    const id = Date.now();
    dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
    setTimeout(() => dispatch({ type: "REMOVE_TOAST", payload: id }), 3500);
  }, []);

  return (
    <AdminContext.Provider value={{ state, dispatch, toast }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
