import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const [mahasiswa, setMahasiswa] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("mahasiswa")) || [];
    setMahasiswa(data);
  }, []);

  const total = mahasiswa.length;
  const aktif = mahasiswa.filter((m) => m.status === "Aktif").length;
  const nonAktif = mahasiswa.filter((m) => m.status === "Tidak Aktif").length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">
        Selamat Datang 
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-600 text-white rounded-xl p-4 shadow">
          <p className="text-sm">Total Mahasiswa</p>
          <h2 className="text-3xl font-bold">{total}</h2>
        </div>
        <div className="bg-green-600 text-white rounded-xl p-4 shadow">
          <p className="text-sm">Mahasiswa Aktif</p>
          <h2 className="text-3xl font-bold">{aktif}</h2>
        </div>
        <div className="bg-red-600 text-white rounded-xl p-4 shadow">
          <p className="text-sm">Tidak Aktif</p>
          <h2 className="text-3xl font-bold">{nonAktif}</h2>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Data Terbaru Mahasiswa</h3>
        <table className="min-w-full text-sm border border-gray-200">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="py-2 px-4 text-left">NIM</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((m, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{m.nim}</td>
                <td className="py-2 px-4">{m.nama}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    m.status === "Aktif" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {m.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
