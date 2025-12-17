import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { confirmAction, successAlert, errorAlert } from "../helpers/SwalHelper";
import { showSuccess, showError } from "../helpers/ToastHelper";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const confirmed = await confirmAction(
        "Konfirmasi Logout",
        "Apakah Anda yakin ingin keluar dari akun ini?",
        "Ya, Logout"
      );

      if (confirmed) {
        localStorage.removeItem("user");
        showSuccess("Berhasil logout!");
        successAlert("Logout Berhasil", "Anda telah keluar dari akun.");
        navigate("/");
      } else {
        showError("Logout dibatalkan!");
      }
    } catch (err) {
      errorAlert("Terjadi Kesalahan", err.message);
      showError("Gagal logout!");
    }
  };

  const navClass = ({ isActive }) =>
    `flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
      ? "bg-blue-700 text-white"
      : "text-white/90 hover:bg-blue-700 hover:text-white"
    }`;

  return (
    <aside className="bg-blue-800 text-white min-h-screen transition-all duration-300 w-20 lg:w-64 flex flex-col justify-between shadow-lg">

      {/* Bagian Atas */}
      <div>
        <div className="flex justify-between items-center p-4 border-b border-blue-700">
          <span className="text-2xl font-bold hidden lg:block">Admin</span>
        </div>

        {/* Navigasi Menu */}
        <nav className="p-4 space-y-2">

          <NavLink to="/admin/dashboard" className={navClass}>
            <span className="text-lg">🏠</span>
            <span className="hidden lg:inline">Dashboard</span>
          </NavLink>

          <NavLink to="/admin/mahasiswa" className={navClass}>
            <span className="text-lg">🎓</span>
            <span className="hidden lg:inline">Mahasiswa</span>
          </NavLink>

          <NavLink to="/admin/dosen" className={navClass}>
            <span className="text-lg">👨‍🏫</span>
            <span className="hidden lg:inline">Dosen</span>
          </NavLink>

          <NavLink to="/admin/matakuliah" className={navClass}>
            <span className="text-lg">📘</span>
            <span className="hidden lg:inline">Mata Kuliah</span>
          </NavLink>

          <NavLink to="/admin/kelas" className={navClass}>
            <span className="text-lg">🏫</span>
            <span className="hidden lg:inline">Kelas</span>
          </NavLink>
          
          <NavLink to="/admin/krs" className={navClass}>
            <span className="text-lg">📝</span>
            <span className="hidden lg:inline">KRS</span>
          </NavLink>


        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-medium transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden lg:inline">Logout</span>
        </button>
      </div>

    </aside>
  );
}
