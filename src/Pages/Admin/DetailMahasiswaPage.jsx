import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DetailMahasiswa() {
  const { nim } = useParams();
  const navigate = useNavigate();
  const [mahasiswa, setMahasiswa] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("mahasiswaData")) || [];
    const found = data.find((m) => m.nim === nim);
    setMahasiswa(found);
  }, [nim]);

  if (!mahasiswa) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Data mahasiswa tidak ditemukan.</p>
        <button
          onClick={() => navigate("/admin/mahasiswa")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Detail Mahasiswa
      </h2>

      <div className="space-y-3 text-gray-700">
        <p><strong>NIM :</strong> {mahasiswa.nim}</p>
        <p><strong>Nama :</strong> {mahasiswa.nama}</p>
        <p>
          <strong>Status :</strong>{" "}
          <span
            className={`font-semibold ${
              mahasiswa.status === "Aktif" ? "text-green-600" : "text-red-600"
            }`}
          >
            {mahasiswa.status}
          </span>
        </p>
      </div>

      <button
        onClick={() => navigate("/admin/mahasiswa")}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
      >
        Kembali ke Daftar
      </button>
    </div>
  );
}
