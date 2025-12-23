import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { showError } from "../../helpers/ToastHelper";

export default function MahasiswaModal({
  selected,
  onClose,
  createMutation,
  updateMutation,
}) {
  const [form, setForm] = useState({
    nim: "",
    nama: "",
    status: "Aktif",
  });

  const isEdit = Boolean(selected);

  useEffect(() => {
    if (selected) {
      setForm({
        nim: selected.nim || "",
        nama: selected.nama || "",
        status: selected.status || "Aktif",
      });
    } else {
      setForm({
        nim: "",
        nama: "",
        status: "Aktif",
      });
    }
  }, [selected]);

  const submit = async () => {
    if (!form.nim || !form.nama) {
      Swal.fire("Gagal!", "NIM dan Nama wajib diisi", "error");
      return;
    }

    const resConfirm = await Swal.fire({
      title: isEdit ? "Perbarui data mahasiswa?" : "Tambah data mahasiswa?",
      html: `Apakah Anda yakin ingin ${
        isEdit ? "mengubah" : "menambahkan"
      } mahasiswa <b>${form.nama}</b> (NIM: ${form.nim})?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, simpan",
      cancelButtonText: "Batal",
    });

    if (!resConfirm.isConfirmed) return;

    try {
      if (isEdit) {
        updateMutation.mutate(
          { id: selected.id, data: { ...selected, ...form } },
          {
            onSuccess: async () => {
              // 🔹 Swal setelah simpan: Edit Lagi / Selesai
              const resNext = await Swal.fire({
                title: "Berhasil!",
                html: "Apa yang ingin Anda lakukan selanjutnya?",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Edit Lagi",
                cancelButtonText: "Selesai",
              });

              if (!resNext.isConfirmed) {
                onClose();
              }
            },
            onError: () => Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data", "error"),
          }
        );
      } else {
        createMutation.mutate(
          { ...form, maxSks: 24, sksTerpakai: 0 },
          {
            onSuccess: async () => {
              // 🔹 Swal setelah simpan: Tambah Lagi / Selesai
              const resNext = await Swal.fire({
                title: "Berhasil!",
                html: "Apa yang ingin Anda lakukan selanjutnya?",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Tambah Lagi",
                cancelButtonText: "Selesai",
              });

              if (resNext.isConfirmed) {
                setForm({ nim: "", nama: "", status: "Aktif" }); // reset form tambah
              } else {
                onClose();
              }
            },
            onError: () => Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data", "error"),
          }
        );
      }
    } catch (err) {
      showError("Terjadi kesalahan saat menyimpan data");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[420px]">
        <h3 className="font-bold text-lg mb-4">{isEdit ? "Edit" : "Tambah"} Mahasiswa</h3>

        <input
          className="border p-2 w-full mb-2"
          placeholder="NIM"
          value={form.nim}
          onChange={(e) => setForm({ ...form, nim: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Nama Mahasiswa"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
        />

        <select
          className="border p-2 w-full mb-4"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Aktif">Aktif</option>
          <option value="Tidak Aktif">Tidak Aktif</option>
        </select>

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
