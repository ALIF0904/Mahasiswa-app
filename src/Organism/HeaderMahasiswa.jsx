import React from "react";
import { useLocation } from "react-router-dom";

export default function HeaderMahasiswa() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const location = useLocation();

  // Fungsi untuk menampilkan judul berdasarkan path
  const getPageTitle = () => {
    if (location.pathname.includes("/mahasiswa/dashboard"))
      return "Dashboard Mahasiswa";
    if (location.pathname.includes("/mahasiswa/profil"))
      return "Profil Mahasiswa";
    return "Mahasiswa";
  };

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b">
      {/* 🔹 Judul Halaman */}
      <h1 className="text-lg font-semibold text-gray-700">{getPageTitle()}</h1>

      {/* 🔹 Profil User */}
      <div className="flex items-center gap-3">
        <img
          src={user.photo || "https://via.placeholder.com/40"}
          alt="User"
          className="w-10 h-10 rounded-full border"
        />
        <span className="text-sm text-gray-700">
          {user.email || "Mahasiswa"}
        </span>
      </div>
    </header>
  );
}
