import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  // 🔹 Tentukan judul halaman berdasarkan URL
  const getPageTitle = () => {
    if (location.pathname.includes("/admin/dashboard")) return "Dashboard";
    if (location.pathname.includes("/admin/mahasiswa/")) return "Detail Mahasiswa";
    if (location.pathname.includes("/admin/mahasiswa")) return "Mahasiswa";
    if (location.pathname.includes("/admin/dosen")) return "Dosen";
    if (location.pathname.includes("/admin/matakuliah")) return "Mata Kuliah";
    if (location.pathname.includes("/admin/kelas")) return "Kelas";
    if (location.pathname.includes("/admin/krs")) return "KRS";
    return "Admin Panel";
  };

  // 🔹 Simulasi foto profil (bisa diganti dari localStorage / API)
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") ||
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );

  // 🔹 Fungsi untuk mengganti foto profil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    }
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b border-gray-200">
      {/* 🔹 Judul halaman */}
      <h1 className="text-lg font-semibold text-gray-700">{getPageTitle()}</h1>

      {/* 🔹 Profil Admin */}
      <div className="relative group">
        <img
          src={profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover cursor-pointer hover:opacity-90 transition"
          onClick={() => document.getElementById("uploadPhoto").click()}
        />
        {/* Input tersembunyi untuk ubah foto */}
        <input
          id="uploadPhoto"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        {/* Tooltip muncul saat hover */}
        <span className="absolute right-12 top-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
          Ubah foto
        </span>
      </div>
    </header>
  );
}
