// src/Pages/Dosen/DosenModal.jsx
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { createDosen, updateDosen } from "../../Api/DosenApi";
import { confirmAction, errorAlert } from "../../helpers/SwalHelper";
import { showSuccess, showError } from "../../helpers/ToastHelper";

export default function DosenModal({ selected, onClose, onUpdated }) {
  const [form, setForm] = useState({ nama: "", nidn: "" });

  useEffect(() => {
    if (selected) setForm(selected);
    else setForm({ nama: "", nidn: "" });
  }, [selected]);

  const handleSubmit = async () => {
  const ok = await confirmAction(
    "Simpan Data",
    "Apakah Anda yakin ingin menyimpan data ini?",
    "Ya"
  );
  if (!ok) return;

  try {
    if (selected) {
      await updateDosen(selected.id, form);
      showSuccess("Dosen berhasil diperbarui!");
    } else {
      const newData = { ...form, id: Date.now() }; // 🔥 tambah id otomatis
      await createDosen(newData);
      showSuccess("Dosen baru berhasil ditambahkan!");
    }

    onUpdated();
    onClose();
  } catch (err) {
    showError("Gagal menyimpan data dosen");
    errorAlert("Error", err.message);
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded shadow w-[400px]">
        <h2 className="font-bold text-lg mb-4">
          {selected ? "Edit Dosen" : "Tambah Dosen"}
        </h2>

        <input
          type="text"
          placeholder="Nama Dosen"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />

        <input
          type="text"
          placeholder="NIDN"
          value={form.nidn}
          onChange={(e) => setForm({ ...form, nidn: e.target.value })}
          className="w-full p-2 border rounded mb-3"
        />

        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-400 rounded"
            onClick={onClose}
          >
            Batal
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
