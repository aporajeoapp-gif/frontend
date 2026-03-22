import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AdminProvider } from "./admin/context/AdminContext";

import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Emergency from "./pages/Emergency";
import Bus from "./pages/Bus";
import Ferry from "./pages/Ferry";
import Events from "./pages/Events";
import BloodDonation from "./pages/BloodDonation";

// Admin Pages
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import UsersPage from "./admin/pages/UsersPage";
import BusPage from "./admin/pages/BusPage";
import FerryPage from "./admin/pages/FerryPage";
import DoctorsPage from "./admin/pages/DoctorsPage";
import EmergencyPage from "./admin/pages/EmergencyPage";
import EventsPage from "./admin/pages/EventsPage";
import AdsPage from "./admin/pages/AdsPage";
import AnalyticsPage from "./admin/pages/AnalyticsPage";
import SettingsPage from "./admin/pages/SettingsPage";
import BloodDonationPage from "./admin/pages/BloodDonationPage";
import ProtectedRoute from "./protectedroute/ProtectedRoute";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayout() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <main
        style={{
          flex: 1,
          paddingBottom: "4rem",
        }}
      >
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AdminProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="bus" element={<BusPage />} />
                <Route path="ferry" element={<FerryPage />} />
                <Route path="doctors" element={<DoctorsPage />} />
                <Route path="emergency" element={<EmergencyPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="advertisements" element={<AdsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="blood-donation" element={<BloodDonationPage />} />
              </Route>
            </Route>

            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="doctor" element={<Doctor />} />
              <Route path="emergency" element={<Emergency />} />
              <Route path="bus" element={<Bus />} />
              <Route path="ferry" element={<Ferry />} />
              <Route path="events" element={<Events />} />
              <Route path="blood-donation" element={<BloodDonation />} />
            </Route>
          </Routes>
        </AdminProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
