import React, { useState, useEffect } from "react";
import MataKuliahModal from "./MataKuliahModal";
import { confirmAction, successAlert, errorAlert } from "../../helpers/SwalHelper";
import { showSuccess, showError } from "../../helpers/ToastHelper";

export default function MataKuliah() {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("matakuliah");
    return stored ? JSON.parse(stored) : [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Simpan ke localStorage setiap kali ada perubahan data
  useEffect(() => {
    localStorage.setItem("matakuliah", JSON.stringify(data));
  }, [data]);

  // Tambah atau update data
  const handleSave = (item) => {
    if (selected) {
      // update
      const updated = data.map((mk) =>
        mk.kode === selected.kode ? item : mk
      );
      setData(updated);
      showSuccess("Data mata kuliah berhasil diperbarui!");
      successAlert("Berhasil", "Mata kuliah berhasil diperbarui!");
    } else {
      // tambah
      setData([...data, item]);
      showSuccess("Data mata kuliah berhasil ditambahkan!");
      successAlert("Berhasil", "Mata kuliah baru berhasil ditambahkan!");
    }

    setIsOpen(false);
    setSelected(null);
  };

  // Hapus data dengan Swal2
  const handleDelete = async (kode) => {
    const ok = await confirmAction(
      "Hapus Mata Kuliah",
      "Apakah Anda yakin ingin menghapus mata kuliah ini?",
      "Ya, Hapus"
    );

    if (!ok) return;

    try {
      const updated = data.filter((mk) => mk.kode !== kode);
      setData(updated);
      localStorage.setItem("matakuliah", JSON.stringify(updated));

      showSuccess("Mata kuliah berhasil dihapus!");
      successAlert("Berhasil", "Data mata kuliah telah dihapus!");
    } catch (err) {
      showError("Gagal menghapus data!");
      errorAlert("Error", err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Daftar Mata Kuliah</h2>
        <button
          onClick={() => {
            setSelected(null);
            setIsOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Tambah Mata Kuliah
        </button>
      </div>

      <table className="table-auto w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Kode MK</th>
            <th className="border px-3 py-2">Nama MK</th>
            <th className="border px-3 py-2">SKS</th>
            <th className="border px-3 py-2">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-3">
                Tidak ada data mata kuliah
              </td>
            </tr>
          ) : (
            data.map((mk) => (
              <tr key={mk.kode}>
                <td className="border px-3 py-2 text-center">{mk.kode}</td>
                <td className="border px-3 py-2 text-center">{mk.nama}</td>
                <td className="border px-3 py-2 text-center">{mk.sks}</td>
                <td className="border px-3 py-2 text-center">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => {
                      setSelected(mk);
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(mk.kode)}
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
        <MataKuliahModal
          isOpen={isOpen}
          data={selected}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
