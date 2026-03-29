import { Navigate, Outlet } from "react-router-dom";
import fetchUser from "../hooks/userhook";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}


// Guards routes that require role === "admin"
export function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

