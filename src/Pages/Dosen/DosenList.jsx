// src/Pages/Dosen/DosenList.jsx
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { getAllDosen, deleteDosen } from "../../Api/DosenApi";
import { confirmAction, errorAlert } from "../../helpers/SwalHelper";
import { showSuccess, showError } from "../../helpers/ToastHelper";
import DosenModal from "./DosenModal";

export default function DosenList() {
  const [dosen, setDosen] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchDosen = () => {
    try {
      const data = getAllDosen();
      setDosen(data);
    } catch (err) {
      showError("Gagal memuat data dosen");
    }
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  const handleDelete = async (id) => {
    const ok = await confirmAction(
      "Hapus Dosen",
      "Apakah Anda yakin ingin menghapus dosen ini?",
      "Ya, Hapus"
    );

    if (!ok) return;

    try {
      deleteDosen(id);
      showSuccess("Dosen berhasil dihapus");
      fetchDosen();
    } catch (err) {
      errorAlert("Error", "Gagal menghapus dosen");
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Daftar Dosen</h2>
        <button
          onClick={() => {
            setSelected(null);
            setIsOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Tambah Dosen
        </button>
      </div>

<table className="table-auto w-full border">
  <thead className="bg-gray-200">
    <tr>
      <th className="border px-3 py-2 text-center">Nama Dosen</th>
      <th className="border px-3 py-2 text-center">NIDN</th>
      <th className="border px-3 py-2 text-center">Aksi</th>
    </tr>
  </thead>

  <tbody>
    {dosen.length === 0 ? (
      <tr>
        <td colSpan={3} className="text-center py-3 border">
          Tidak ada data dosen
        </td>
      </tr>
    ) : (
      dosen.map((d) => (
        <tr key={d.id}>
          <td className="border px-3 py-2 text-center">{d.nama}</td>
          <td className="border px-3 py-2 text-center">{d.nidn}</td>
          <td className="border px-3 py-2 text-center">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
              onClick={() => {
                setSelected(d);
                setIsOpen(true);
              }}
            >
              Edit
            </button>

            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(d.id)}
            >
              Hapus
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>


      {isOpen && (
        <DosenModal
          selected={selected}
          onClose={() => setIsOpen(false)}
          onUpdated={fetchDosen}
        />
      )}
    </div>
  );
}
