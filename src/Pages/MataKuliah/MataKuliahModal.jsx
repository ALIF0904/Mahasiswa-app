import React, { useState, useEffect } from "react";
import { confirmAction, successAlert, errorAlert } from "../../helpers/SwalHelper";
import { showSuccess, showError } from "../../helpers/ToastHelper";

export default function MataKuliahModal({ isOpen, data, onClose, onSave }) {
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [sks, setSks] = useState("");

  useEffect(() => {
    if (data) {
      setKode(data.kode);
      setNama(data.nama);
      setSks(data.sks);
    } else {
      setKode("");
      setNama("");
      setSks("");
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDASI
    if (!kode || !nama || !sks) {
      showError("Semua field wajib diisi!");
      errorAlert("Gagal", "Harap lengkapi semua data.");
      return;
    }

    // KONFIRMASI SWAL
    const ok = await confirmAction(
      "Simpan Data Mata Kuliah",
      "Apakah Anda yakin ingin menyimpan data ini?",
      "Ya, Simpan"
    );

    if (!ok) return;

    try {
      onSave({ kode, nama, sks });

      showSuccess("Data mata kuliah berhasil disimpan!");
      successAlert("Berhasil", "Data mata kuliah telah disimpan!");

      onClose();
    } catch (err) {
      showError("Terjadi kesalahan saat menyimpan.");
      errorAlert("Error", err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg w-96">

        <h2 className="text-xl font-bold mb-4">
          {data ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Kode MK</label>
            <input
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label>Nama MK</label>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label>SKS</label>
            <input
              type="number"
              value={sks}
              onChange={(e) => setSks(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="px-3 py-1 bg-gray-400 text-white rounded mr-2"
              onClick={onClose}
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
