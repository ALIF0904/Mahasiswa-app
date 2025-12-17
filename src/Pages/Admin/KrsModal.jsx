import React, { useEffect, useState } from "react";
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

  // ===============================
  // SYNC DATA EDIT
  // ===============================
  useEffect(() => {
    if (selected) {
      setForm({ mahasiswaId: selected.mahasiswa.id, mataKuliahId: "" });
    } else {
      setForm({ mahasiswaId: "", mataKuliahId: "" });
    }
  }, [selected]);

  // ===============================
  // CEK SKS
  // ===============================
  const getTotalSks = (mahasiswaId) =>
    krsData
      .filter(k => k.mahasiswaId === Number(mahasiswaId))
      .reduce((sum, k) => {
        const mk = mataKuliah.find(m => m.id === k.mataKuliahId);
        return sum + (mk?.sks || 0);
      }, 0);

  const isSksPenuh = (mahasiswaId) => {
    const mhs = mahasiswa.find(m => m.id === Number(mahasiswaId));
    return mhs ? getTotalSks(mahasiswaId) >= mhs.maxSks : false;
  };

  // ===============================
  // TAMBAH KRS
  // ===============================
  const handleAdd = async () => {
  if (!form.mahasiswaId || !form.mataKuliahId) {
    showError("Pilih mahasiswa dan mata kuliah");
    return;
  }

  const mahasiswaObj = mahasiswa.find(m => m.id === Number(form.mahasiswaId));
  const mkObj = mataKuliah.find(mk => mk.id === Number(form.mataKuliahId));

  if (getTotalSks(form.mahasiswaId) + mkObj.sks > mahasiswaObj.maxSks) {
    showError(`Melebihi batas ${mahasiswaObj.maxSks} SKS`);
    return;
  }

  const alreadyTaken = krsData.some(
    k =>
      k.mahasiswaId === Number(form.mahasiswaId) &&
      k.mataKuliahId === Number(form.mataKuliahId)
  );
  if (alreadyTaken) {
    showError("Mata kuliah sudah diambil");
    return;
  }

  // 🔹 KONFIRMASI
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
    {
      mahasiswaId: Number(form.mahasiswaId),
      mataKuliahId: Number(form.mataKuliahId),
    },
    {
      onSuccess: async () => {
        showSuccess("KRS berhasil ditambahkan");

        // 🔹 PILIHAN SETELAH SIMPAN
        const resNext = await Swal.fire({
          title: "Berhasil!",
          html: "Apa yang ingin Anda lakukan selanjutnya?",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Tambah Lagi",
          cancelButtonText: "Selesai",
        });

        if (resNext.isConfirmed) {
          // reset mata kuliah saja
          setForm(prev => ({ ...prev, mataKuliahId: "" }));
        } else {
          onClose(); // kembali ke tabel
        }
      },
      onError: () => showError("Gagal menambahkan KRS"),
    }
  );
};

  // ===============================
  // HAPUS KRS
  // ===============================
  const handleDelete = async (krsId) => {
  const krs = krsData.find(k => k.id === krsId);
  const mk = mataKuliah.find(m => m.id === krs?.mataKuliahId);

  // 🔹 KONFIRMASI HAPUS
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

      // 🔹 PILIHAN SETELAH HAPUS (SAMA SEPERTI HANDLE ADD)
      const resNext = await Swal.fire({
        title: "Berhasil!",
        html: "Apa yang ingin Anda lakukan selanjutnya?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Hapus Lagi",
        cancelButtonText: "Selesai",
      });

      if (!resNext.isConfirmed) {
        onClose(); // 🔥 kembali ke tabel
      }
      // jika "Hapus Lagi" → modal tetap terbuka
    },
    onError: () => showError("Gagal menghapus KRS"),
  });
};

  // ===============================
  // UI
  // ===============================
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded w-[450px]">
        <h3 className="font-bold mb-3">
          {isEdit ? "Hapus KRS" : "Tambah KRS"}
        </h3>

        {!isEdit && (
          <>
            <select
              className="border p-2 w-full mb-3"
              value={form.mahasiswaId}
              onChange={e =>
                setForm({ mahasiswaId: e.target.value, mataKuliahId: "" })
              }
            >
              <option value="">Pilih Mahasiswa</option>
              {mahasiswa
                .filter(m => m.status === "Aktif")
                .map(m => (
                  <option key={m.id} value={m.id} disabled={isSksPenuh(m.id)}>
                    {m.nama} ({m.nim})
                    {isSksPenuh(m.id) ? " - SKS Penuh" : ""}
                  </option>
                ))}
            </select>

            <select
              className="border p-2 w-full mb-3"
              value={form.mataKuliahId}
              disabled={!form.mahasiswaId || isSksPenuh(form.mahasiswaId)}
              onChange={e =>
                setForm({ ...form, mataKuliahId: e.target.value })
              }
            >
              <option value="">Pilih Mata Kuliah</option>
              {mataKuliah.map(mk => {
                const taken = krsData.some(
                  k =>
                    k.mahasiswaId === Number(form.mahasiswaId) &&
                    k.mataKuliahId === mk.id
                );
                return (
                  <option key={mk.id} value={mk.id} disabled={taken}>
                    {mk.nama} - {mk.sks} SKS
                  </option>
                );
              })}
            </select>

            <div className="flex justify-end gap-2">
              <button className="bg-gray-400 px-3 py-1 rounded" onClick={onClose}>
                Batal
              </button>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={handleAdd}
              >
                Simpan
              </button>
            </div>
          </>
        )}

        {isEdit && (
          <>
            {krsData.filter(k => k.mahasiswaId === selected.mahasiswa.id).length ? (
              <ul>
                {krsData
                  .filter(k => k.mahasiswaId === selected.mahasiswa.id)
                  .map(k => {
                    const mk = mataKuliah.find(m => m.id === k.mataKuliahId);
                    return (
                      <li key={k.id} className="flex justify-between mb-2">
                        <span>{mk?.nama} ({mk?.sks} SKS)</span>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                          onClick={() => handleDelete(k.id)}
                        >
                          Hapus
                        </button>
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <p className="text-gray-500">Tidak ada KRS</p>
            )}

            <div className="flex justify-end mt-3">
              <button className="bg-gray-400 px-3 py-1 rounded" onClick={onClose}>
                Tutup
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
