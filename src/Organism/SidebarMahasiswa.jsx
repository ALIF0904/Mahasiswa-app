import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, User, LogOut } from "lucide-react";
import { confirmAction, successAlert, errorAlert } from "../helpers/SwalHelper";
import { showSuccess, showError } from "../helpers/ToastHelper";

export default function SidebarMahasiswa() {
  const navigate = useNavigate();

  // 🔴 Logout dengan Swal Confirm + Toast
  const handleLogout = async () => {
    try {
      const confirmed = await confirmAction(
        "Konfirmasi Logout",
        "Apakah Anda yakin ingin keluar?",
        "Ya, Logout"
      );

      if (confirmed) {
        localStorage.removeItem("user");

        // Toast berhasil
        showSuccess("Berhasil logout!");

        // Swal popup berhasil
        successAlert("Logout Berhasil", "Anda telah keluar dari akun.");

        navigate("/login");
      } else {
        showError("Logout dibatalkan!");
      }
    } catch (err) {
      errorAlert("Terjadi Kesalahan", err.message);
      showError("Gagal logout!");
    }
  };

  return (
    <aside className="w-64 bg-blue-600 text-white p-6 flex flex-col justify-between">
      {/* 🔹 Menu atas */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Mahasiswa</h2>

        <nav className="flex flex-col gap-3">

          {/* Dashboard */}
          <NavLink
            to="/mahasiswa/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? "bg-blue-500" : "hover:bg-blue-700"
              }`
            }
          >
            <Home size={18} />
            Dashboard
          </NavLink>

          {/* Profil */}
          <NavLink
            to="/mahasiswa/profil"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? "bg-blue-500" : "hover:bg-blue-700"
              }`
            }
          >
            <User size={18} />
            Profil
          </NavLink>
        </nav>
      </div>

      {/* 🔹 Tombol Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md mt-6 transition-all"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
