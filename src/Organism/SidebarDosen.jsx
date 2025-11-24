import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, User, LogOut } from "lucide-react";
import { confirmAction, successAlert, errorAlert } from "../helpers/SwalHelper";
import { showSuccess, showError } from "../helpers/ToastHelper";

export default function SidebarDosen() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const ok = await confirmAction(
      "Logout",
      "Apakah Anda yakin ingin keluar?",
      "Ya, Logout"
    );

    if (!ok) return;

    localStorage.removeItem("user");
    showSuccess("Logout berhasil!");
    successAlert("Logout Berhasil", "Anda telah keluar dari akun");
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive ? "bg-blue-500" : "hover:bg-blue-700"
    }`;

  return (
    <aside className="w-64 bg-blue-600 text-white p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6">Dosen</h2>

        <nav className="flex flex-col gap-3">
          <NavLink to="/dosen/dashboard" className={navClass}>
            <Home size={18} /> Dashboard
          </NavLink>

          <NavLink to="/dosen/profil" className={navClass}>
            <User size={18} /> Profil
          </NavLink>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-2 rounded-lg"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
