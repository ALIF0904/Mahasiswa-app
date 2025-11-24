import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const [mahasiswa, setMahasiswa] = useState([]);

  // Ambil data mahasiswa dari localStorage (key sama dengan Mahasiswa.js)
  useEffect(() => {
    const savedData = localStorage.getItem("mahasiswa");
    if (savedData) {
      setMahasiswa(JSON.parse(savedData));
    }
  }, []);

  // Hitung jumlah mahasiswa aktif dan tidak aktif
  const aktifCount = mahasiswa.filter((m) => m.status === "Aktif").length;
  const nonAktifCount = mahasiswa.filter((m) => m.status === "Tidak Aktif").length;

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Selamat Datang di Dashboard Admin
      </h2>

      {/* Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Mahasiswa Aktif</h3>
          <p className="text-2xl font-bold mt-2">{aktifCount}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Mahasiswa Tidak Aktif</h3>
          <p className="text-2xl font-bold mt-2">{nonAktifCount}</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Total Mahasiswa</h3>
          <p className="text-2xl font-bold mt-2">{mahasiswa.length}</p>
        </div>
      </div>

      {/* Daftar Mahasiswa */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex items-center justify-between mb-3 border-b pb-2">
          <h3 className="text-xl font-bold text-gray-700">Daftar Mahasiswa</h3>
          <span className="text-sm text-gray-500">
            Total: {mahasiswa.length} mahasiswa
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border text-sm text-center">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-2 border">NIM</th>
                <th className="p-2 border">Nama</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {mahasiswa.length > 0 ? (
                mahasiswa.map((mhs, index) => (
                  <tr key={index} className="hover:bg-gray-50 border">
                    <td className="p-2 border">{mhs.nim}</td>
                    <td className="p-2 border text-left pl-4">{mhs.nama}</td>
                    <td
                      className={`p-2 border font-semibold ${
                        mhs.status === "Aktif" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {mhs.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-gray-500">
                    Belum ada data mahasiswa.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
