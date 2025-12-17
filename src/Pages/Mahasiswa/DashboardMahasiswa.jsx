// src/Pages/Mahasiswa/DashboardMahasiswa.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardMahasiswa() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Ambil data user dari localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    // Jika user tidak ada → redirect ke login
    if (!userData) {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return <p className="p-6">Memuat data...</p>;

  const displayName = (user?.nama || "Mahasiswa").toUpperCase();
  const email = user?.email || "-";
  const role = user?.role || "mahasiswa";

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-700 mb-3">
        Selamat Datang, {displayName}! 
      </h1>
      <p className="text-gray-600 mb-6">
        Anda sedang berada di dashboard mahasiswa.
      </p>

      {/* Card Informasi User */}
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Informasi Akun
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-medium">Nama :</span> {user?.nama}
          </p>
          <p>
            <span className="font-medium">Email :</span> {email}
          </p>
          <p>
            <span className="font-medium">Role :</span>{" "}
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
              {role.toUpperCase()}
            </span>
          </p>
        </div>
      </div>

      {/* Menu Fitur */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* KRS */}
        <div
          onClick={() => navigate("/mahasiswa/krs")}
          className="bg-blue-600 text-white p-5 rounded-xl shadow cursor-pointer hover:bg-blue-700 transition"
        >
          <h3 className="text-xl font-semibold">Kartu Rencana Studi (KRS)</h3>
          <p className="text-sm mt-1 opacity-90">
            Lihat dan kelola mata kuliah yang Anda ambil.
          </p>
        </div>

        {/* Nilai */}
        <div
          onClick={() => navigate("/mahasiswa/nilai")}
          className="bg-green-600 text-white p-5 rounded-xl shadow cursor-pointer hover:bg-green-700 transition"
        >
          <h3 className="text-xl font-semibold">Nilai & Transkrip</h3>
          <p className="text-sm mt-1 opacity-90">
            Cek nilai kuliah dan perkembangan akademik.
          </p>
        </div>

        {/* Jadwal */}
        <div
          onClick={() => navigate("/mahasiswa/jadwal")}
          className="bg-yellow-500 text-white p-5 rounded-xl shadow cursor-pointer hover:bg-yellow-600 transition"
        >
          <h3 className="text-xl font-semibold">Jadwal Kuliah</h3>
          <p className="text-sm mt-1 opacity-90">
            Lihat jadwal perkuliahan minggu ini.
          </p>
        </div>

        {/* Pengumuman */}
        <div
          onClick={() => navigate("/mahasiswa/pengumuman")}
          className="bg-red-500 text-white p-5 rounded-xl shadow cursor-pointer hover:bg-red-600 transition"
        >
          <h3 className="text-xl font-semibold">Pengumuman</h3>
          <p className="text-sm mt-1 opacity-90">
            Informasi terbaru dari kampus & dosen.
          </p>
        </div>
      </div>
    </div>
  );
}
