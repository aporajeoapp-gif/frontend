import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Emergency from "./pages/Emergency";
import Bus from "./pages/Bus";
import Ferry from "./pages/Ferry";
import Events from "./pages/Events";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-150">
            {/* Desktop top navbar */}
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
            {/* Mobile bottom nav — only visible on small screens */}
            <BottomNav />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
