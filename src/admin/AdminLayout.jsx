import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AdminNavbar from "./components/AdminNavbar";
import ToastContainer from "./components/ToastContainer";

import { useEffect } from "react";
import { useAdmin } from "./context/AdminContext";
import { getAllUsers } from "../api/authApi";
import { getDoctors } from "../api/doctorApi";

export default function AdminLayout() {
  const { dispatch } = useAdmin();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [users, doctors] = await Promise.all([
          getAllUsers(),
          getDoctors(),
        ]);
        dispatch({ type: "SET_USERS", payload: users });
        dispatch({ type: "SET_DOCTORS", payload: doctors });
      } catch (error) {
        console.error("Failed to load initial data", error);
      }
    };
    fetchInitialData();
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminNavbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
