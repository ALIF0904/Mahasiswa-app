import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { showSuccess, showError } from "../../helpers/ToastHelper";

export default function KrsModal({
  mode = "add",
  selected,
  mahasiswa = [],
  mataKuliah = [],
  krsData = [],
  createMutation,
  deleteMutation,
  onClose,
}) {
  const [form, setForm] = useState({ mahasiswaId: "", mataKuliahId: "" });
  const isEdit = mode === "edit";

  useEffect(() => {
    if (selected) setForm({ mahasiswaId: selected.mahasiswa.id, mataKuliahId: "" });
    else setForm({ mahasiswaId: "", mataKuliahId: "" });
  }, [selected]);

  // Hitung total SKS mahasiswa
  const getTotalSks = (mahasiswaId) =>
    krsData
      .filter(k => String(k.mahasiswaId) === String(mahasiswaId))
      .reduce((sum, k) => sum + (mataKuliah.find(m => String(m.id) === String(k.mataKuliahId))?.sks || 0), 0);

  // Cek apakah SKS mahasiswa sudah penuh
  const isSksPenuh = (mahasiswaId) => {
    const m = mahasiswa.find(m => String(m.id) === String(mahasiswaId));
    return m ? getTotalSks(mahasiswaId) >= m.maxSks : false;
  };

  // Tambah KRS
  const handleAdd = async () => {
    if (!form.mahasiswaId || !form.mataKuliahId) {
      showError("Pilih mahasiswa dan mata kuliah");
      return;
    }

    const mahasiswaObj = mahasiswa.find(m => String(m.id) === String(form.mahasiswaId));
    const mkObj = mataKuliah.find(mk => String(mk.id) === String(form.mataKuliahId));

    if (getTotalSks(form.mahasiswaId) + mkObj.sks > mahasiswaObj.maxSks) {
      showError(`Melebihi batas ${mahasiswaObj.maxSks} SKS`);
      return;
    }

    const alreadyTaken = krsData.some(
      k =>
        String(k.mahasiswaId) === String(form.mahasiswaId) &&
        String(k.mataKuliahId) === String(form.mataKuliahId)
    );
    if (alreadyTaken) {
      showError("Mata kuliah sudah diambil");
      return;
    }

    const resConfirm = await Swal.fire({
      title: "Tambah KRS?",
      html: `Tambah mata kuliah <b>${mkObj.nama}</b> (${mkObj.sks} SKS) untuk <b>${mahasiswaObj.nama}</b>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, simpan",
      cancelButtonText: "Batal",
    });
    if (!resConfirm.isConfirmed) return;

    createMutation.mutate(
      { mahasiswaId: form.mahasiswaId, mataKuliahId: form.mataKuliahId },
      {
        onSuccess: async () => {
          showSuccess("KRS berhasil ditambahkan");

          // Reset form atau tutup modal
          const resNext = await Swal.fire({
            title: "Berhasil!",
            html: "Apa yang ingin Anda lakukan selanjutnya?",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Tambah Lagi",
            cancelButtonText: "Selesai",
          });

          if (resNext.isConfirmed) setForm(prev => ({ ...prev, mataKuliahId: "" }));
          else onClose();
        },
        onError: () => showError("Gagal menambahkan KRS"),
      }
    );
  };

  // Hapus KRS
  const handleDelete = async (krsId) => {
    const krs = krsData.find(k => String(k.id) === String(krsId));
    const mk = mataKuliah.find(m => String(m.id) === String(krs?.mataKuliahId));

    const resConfirm = await Swal.fire({
      title: "Hapus KRS?",
      html: `Hapus mata kuliah <b>${mk?.nama}</b>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });
    if (!resConfirm.isConfirmed) return;

    deleteMutation.mutate(krsId, {
      onSuccess: async () => {
        showSuccess("KRS berhasil dihapus");

        const resNext = await Swal.fire({
          title: "Berhasil!",
          html: "Apa yang ingin Anda lakukan selanjutnya?",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Hapus Lagi",
          cancelButtonText: "Selesai",
        });
        if (!resNext.isConfirmed) onClose();
      },
      onError: () => showError("Gagal menghapus KRS"),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded w-[450px]">
        <h3 className="font-bold mb-3">{isEdit ? "Hapus KRS" : "Tambah KRS"}</h3>

        {!isEdit && (
          <>
            <select
              className="border p-2 w-full mb-3"
              value={form.mahasiswaId}
              onChange={e => setForm({ mahasiswaId: e.target.value, mataKuliahId: "" })}
            >
              <option value="">Pilih Mahasiswa</option>
              {mahasiswa.filter(m => m.status === "Aktif").map(m => (
                <option key={m.id} value={m.id} disabled={isSksPenuh(m.id)}>
                  {m.nama} ({m.nim}) {isSksPenuh(m.id) ? "- SKS Penuh" : ""}
                </option>
              ))}
            </select>

            <select
              className="border p-2 w-full mb-3"
              value={form.mataKuliahId}
              disabled={!form.mahasiswaId || isSksPenuh(form.mahasiswaId)}
              onChange={e => setForm({ ...form, mataKuliahId: e.target.value })}
            >
              <option value="">Pilih Mata Kuliah</option>
              {mataKuliah.map(mk => {
                const taken = krsData.some(
                  k =>
                    String(k.mahasiswaId) === String(form.mahasiswaId) &&
                    String(k.mataKuliahId) === String(mk.id)
                );
                return (
                  <option key={mk.id} value={mk.id} disabled={taken}>
                    {mk.nama} - {mk.sks} SKS
                  </option>
                );
              })}
            </select>

            <div className="flex justify-end gap-2">
              <button className="bg-gray-400 px-3 py-1 rounded" onClick={onClose}>Batal</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleAdd}>Simpan</button>
            </div>
          </>
        )}

        {isEdit && (
          <>
            {krsData.filter(k => String(k.mahasiswaId) === String(selected.mahasiswa.id)).length ? (
              <ul>
                {krsData.filter(k => String(k.mahasiswaId) === String(selected.mahasiswa.id)).map(k => {
                  const mk = mataKuliah.find(m => String(m.id) === String(k.mataKuliahId));
                  return (
                    <li key={k.id} className="flex justify-between mb-2">
                      <span>{mk?.nama} ({mk?.sks} SKS)</span>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm" onClick={() => handleDelete(k.id)}>Hapus</button>
                    </li>
                  );
                })}
              </ul>
            ) : <p className="text-gray-500">Tidak ada KRS</p>}

            <div className="flex justify-end mt-3">
              <button className="bg-gray-400 px-3 py-1 rounded" onClick={onClose}>Tutup</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
