import { Outlet } from "react-router-dom";
import Sidebar from "../Organism/Sidebar";
import Header from "../Organism/Header";
import Footer from "../Organism/Footer";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-gray-200">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
