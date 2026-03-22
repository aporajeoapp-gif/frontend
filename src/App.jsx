import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AdminProvider } from "./admin/context/AdminContext";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Emergency from "./pages/Emergency";
import Bus from "./pages/Bus";
import Ferry from "./pages/Ferry";
import Events from "./pages/Events";
// Admin
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

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-150">
      <Navbar />
      <main className="grow pb-16 lg:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/ferry" element={<Ferry />} />
          <Route path="/events" element={<Events />} />
        </Routes>
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
          <Router>
            <Routes>
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
              </Route>
              <Route path="/*" element={<PublicLayout />} />
            </Routes>
          </Router>
        </AdminProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
