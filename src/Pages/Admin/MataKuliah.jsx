import React, { useState, useEffect } from "react";
import Pagination from "../../Components/Pagination";
import MataKuliahModal from "./MataKuliahModal";
import { useMataKuliahQuery } from "../../Utils/Queries/useMataKuliahQuery";
import { useDosenQuery } from "../../Utils/Queries/useDosenQuery";
import Swal from "sweetalert2";
import { showSuccess, showError } from "../../helpers/ToastHelper";

export default function MataKuliah() {
  const {
    data: mataKuliah = [],
    isLoading,
    isError,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useMataKuliahQuery();

  const { data: dosen = [] } = useDosenQuery();

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const limit = 5;
  const totalPages = Math.ceil(mataKuliah.length / limit);
  const rows = mataKuliah.slice((page - 1) * limit, page * limit);

  // 🔹 Pagination kembali ke halaman sebelumnya jika kosong
  useEffect(() => {
    if (page > 1 && rows.length === 0) {
      setPage(page - 1);
    }
  }, [rows.length, page]);

  const onDelete = async (mk) => {
    const res = await Swal.fire({
      title: "Hapus Mata Kuliah?",
      html: `Apakah Anda yakin ingin menghapus mata kuliah <b>${mk.nama}</b> (Kode: ${mk.kode})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!res.isConfirmed) return;

    deleteMutation.mutate(mk.id, {
      onSuccess: () => showSuccess(`Mata kuliah "${mk.nama}" berhasil dihapus`),
      onError: () => showError(`Gagal menghapus mata kuliah "${mk.nama}"`),
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Gagal memuat</p>;

  return (
    <div className="p-5">
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl text-gray-700">Data Mata Kuliah</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          + Tambah
        </button>

      </div>

      {/* TABLE */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2">Kode</th>
            <th className="py-2">Nama</th>
            <th className="py-2">SKS</th>
            <th className="py-2">Dosen</th>
            <th className="py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((m, i) => (
              <tr key={m.id} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="text-center py-2">{m.kode}</td>
                <td className="text-center py-2">{m.nama}</td>
                <td className="text-center py-2">{m.sks}</td>
                <td className="text-center py-2">
                  {dosen.find((d) => d.id === m.dosenId)?.nama || "-"}
                </td>
                <td className="text-center py-2 space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setSelected(m);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => onDelete(m)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                Data kosong
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>

  {/* MODAL */ }
  {
    open && (
      <MataKuliahModal
        selected={selected}
        dosen={dosen}
        mataKuliah={mataKuliah}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
        createMutation={createMutation}
        updateMutation={updateMutation}
      />
    )
  }
    </div >
  );
}
