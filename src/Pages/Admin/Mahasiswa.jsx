import React, { useState, useEffect } from "react";
import Pagination from "../../Components/Pagination";
import MahasiswaModal from "./MahasiswaModal";
import Swal from "sweetalert2";
import { showSuccess, showError } from "../../helpers/ToastHelper";
import { useMahasiswaQuery } from "../../Utils/Queries/useMahasiswaQuery";

export default function MahasiswaPage() {
  const {
    data: mahasiswa = [],
    isLoading,
    isError,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useMahasiswaQuery();


  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);

  const limit = 5;
  const totalPages = Math.max(1, Math.ceil(mahasiswa.length / limit));
  const rows = mahasiswa.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const remove = async (m) => {
    const res = await Swal.fire({
      title: "Hapus data mahasiswa?",
      html: `Apakah Anda yakin ingin menghapus <b>${m.nama}</b> (NIM: ${m.nim})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!res.isConfirmed) return;

    // Gunakan mutateAsync supaya toast hanya muncul sekali
    try {
      await deleteMutation.mutateAsync(m.id);
      showSuccess(`Data mahasiswa "${m.nama}" berhasil dihapus`);
    } catch (err) {
      showError(`Gagal menghapus data mahasiswa "${m.nama}"`);
      console.error(err);
    }
  };


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Gagal memuat data</p>;

  return (
    <div className="p-5">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-xl">Data Mahasiswa</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              setSelected(null);
              setOpenModal(true);
            }}
          >
            + Tambah
          </button>
        </div>

        <table className="w-full border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((m, i) => (
                <tr key={m.id} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="text-center">{m.nim}</td>
                  <td className="text-center">{m.nama}</td>
                  <td className="text-center">{m.status}</td>
                  <td className="text-center space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setSelected(m);
                        setOpenModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => remove(m)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Data kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {openModal && (
        <MahasiswaModal
          selected={selected}
          onClose={() => setOpenModal(false)}
          createMutation={createMutation}
          updateMutation={updateMutation}
        />
      )}

    </div>
  );
}
