import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";

export default function PublicLayout() {
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