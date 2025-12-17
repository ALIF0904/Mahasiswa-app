import React, { useEffect, useState } from "react";
import { showSuccess, showError } from "../../helpers/ToastHelper";
import Swal from "sweetalert2";

export default function DosenModal({ selected, onClose, createMutation, updateMutation }) {
  const [form, setForm] = useState({ nama: "", nidn: "" });
  const isEdit = !!selected;

  useEffect(() => {
    if (selected) setForm(selected);
    else setForm({ nama: "", nidn: "" });
  }, [selected]);

  const submit = async () => {
    if (!form.nama || !form.nidn) {
      showError("Nama dan NIDN wajib diisi");
      return;
    }

    // 🔹 Konfirmasi sebelum simpan
    const resConfirm = await Swal.fire({
      title: isEdit ? "Perbarui data dosen?" : "Tambah data dosen?",
      html: `Apakah Anda yakin ingin ${isEdit ? "mengubah" : "menambahkan"} dosen <b>${form.nama}</b> (NIDN: ${form.nidn})?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, simpan",
      cancelButtonText: "Batal",
    });

    if (!resConfirm.isConfirmed) return;

    try {
      if (isEdit) {
        updateMutation.mutate({ id: selected.id, data: form }, {
          onSuccess: () => showSuccess("Data dosen berhasil diubah"),
          onError: () => showError("Gagal mengubah data dosen")
        });
      } else {
        createMutation.mutate(form, {
          onSuccess: () => showSuccess("Data dosen berhasil ditambahkan"),
          onError: () => showError("Gagal menambahkan data dosen")
        });
      }

      // 🔹 Swal setelah simpan: Edit Lagi / Tambah Lagi / Selesai
      const resNext = await Swal.fire({
        title: "Berhasil!",
        html: `Apa yang ingin Anda lakukan selanjutnya?`,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: isEdit ? "Edit Lagi" : "Tambah Lagi",
        cancelButtonText: "Selesai",
      });

      if (resNext.isConfirmed) {
        if (!isEdit) setForm({ nama: "", nidn: "" }); // reset form tambah
      } else {
        onClose();
      }
    } catch (err) {
      showError("Terjadi kesalahan saat menyimpan data");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[420px]">
        <h3 className="font-bold text-lg mb-4">{isEdit ? "Edit" : "Tambah"} Dosen</h3>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Nama"
          value={form.nama}
          onChange={e => setForm({ ...form, nama: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-4"
          placeholder="NIDN"
          value={form.nidn}
          onChange={e => setForm({ ...form, nidn: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button className="bg-gray-400 px-3 py-1 rounded" onClick={onClose}>
            Batal
          </button>
          <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={submit}>
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
