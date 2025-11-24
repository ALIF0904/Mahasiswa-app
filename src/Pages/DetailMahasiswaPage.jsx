import React from "react";
import { useParams } from "react-router-dom";

const mahasiswaData = [
  { nim: "A11.2022.13955", nama: "Moh. Fachri Alif", status: "Aktif" },
  { nim: "A11.2022.13999", nama: "Siti Aminah", status: "Tidak Aktif" },
  { nim: "A11.2021.13567", nama: "Budi Santoso", status: "Aktif" }
];

export default function DetailMahasiswaPage() {
  const { nim } = useParams();
  const mhs = mahasiswaData.find((m) => m.nim === nim);

  if (!mhs) {
    return <p className="p-6">Data mahasiswa tidak ditemukan.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Detail Mahasiswa</h2>
      <p><strong>NIM:</strong> {mhs.nim}</p>
      <p><strong>Nama:</strong> {mhs.nama}</p>
      <p><strong>Status:</strong> {mhs.status}</p>
    </div>
  );
}
