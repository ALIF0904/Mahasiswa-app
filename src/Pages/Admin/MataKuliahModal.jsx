import React, { useEffect, useMemo, useState } from "react";
import { showSuccess, showError } from "../../helpers/ToastHelper";
import Swal from "sweetalert2";

export default function MataKuliahModal({
  selected = null,
  dosen = [],
  mataKuliah = [],
  onClose,
  createMutation,
  updateMutation,
}) {
  const [form, setForm] = useState({
    kode: "",
    nama: "",
    sks: "",
    dosenId: "",
  });

  const isEdit = Boolean(selected);

  const usedDosenIds = useMemo(() => {
    return new Set(
      mataKuliah
        .filter((mk) => mk.id !== selected?.id)
        .map((mk) => String(mk.dosenId))
    );
  }, [mataKuliah, selected]);

  useEffect(() => {
    if (selected) {
      setForm({
        kode: selected.kode ?? "",
        nama: selected.nama ?? "",
        sks: selected.sks?.toString() ?? "",
        dosenId: selected.dosenId?.toString() ?? "",
      });
    } else {
      setForm({ kode: "", nama: "", sks: "", dosenId: "" });
    }
  }, [selected]);

  const submit = async () => {
    if (!form.kode.trim() || !form.nama.trim() || !form.sks || !form.dosenId) {
      showError("Semua field wajib diisi");
      return;
    }

    if (usedDosenIds.has(form.dosenId)) {
      showError("Dosen ini sudah mengajar mata kuliah lain!");
      return;
    }

    const confirm = await Swal.fire({
      title: isEdit ? "Perbarui Mata Kuliah?" : "Tambah Mata Kuliah?",
      html: `<b>${form.nama}</b> (Kode: ${form.kode})`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, simpan",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    const payload = {
      kode: form.kode.trim(),
      nama: form.nama.trim(),
      sks: Number(form.sks),
      dosenId: String(form.dosenId),
    };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: selected.id, data: payload });
        showSuccess("Mata kuliah berhasil diubah");
      } else {
        await createMutation.mutateAsync(payload);
        showSuccess("Mata kuliah berhasil ditambahkan");
      }

      // 🔹 Swal setelah simpan: Edit Lagi / Tambah Lagi / Selesai
      const resNext = await Swal.fire({
        title: "Berhasil!",
        html: "Apa yang ingin Anda lakukan selanjutnya?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: isEdit ? "Edit Lagi" : "Tambah Lagi",
        cancelButtonText: "Selesai",
      });

      if (resNext.isConfirmed) {
        if (!isEdit) setForm({ kode: "", nama: "", sks: "", dosenId: "" }); // reset form tambah
      } else {
        onClose();
      }
    } catch (err) {
      showError("Terjadi kesalahan saat menyimpan mata kuliah");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded w-[400px]">
        <h3 className="font-bold mb-3">{isEdit ? "Edit" : "Tambah"} Mata Kuliah</h3>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Kode"
          value={form.kode}
          onChange={(e) => setForm({ ...form, kode: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Nama"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
        />

        <input
          type="number"
          className="border p-2 w-full mb-2"
          placeholder="SKS"
          value={form.sks}
          onChange={(e) => setForm({ ...form, sks: e.target.value })}
        />

        <select
          className="border p-2 w-full mb-3"
          value={form.dosenId}
          onChange={(e) => setForm({ ...form, dosenId: e.target.value })}
        >
          <option value="">Pilih Dosen</option>
          {dosen.map((d) => {
            const disabled = usedDosenIds.has(String(d.id));
            return (
              <option key={d.id} value={d.id} disabled={disabled}>
                {d.nama} {disabled ? "(Sudah mengajar MK lain)" : ""}
              </option>
            );
          })}
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
