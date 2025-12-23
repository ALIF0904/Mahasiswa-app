import React, { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination";
import DosenModal from "./DosenModal";
import { useDosenQuery } from "../../Utils/Queries/useDosenQuery";
import { showSuccess, showError } from "../../helpers/ToastHelper";
import Swal from "sweetalert2";

export default function DosenList() {
  const { data: dosen = [], isLoading, isError, createMutation, updateMutation, deleteMutation } = useDosenQuery();

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const limit = 5;
  const totalPages = Math.max(1, Math.ceil(dosen.length / limit));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [dosen.length, totalPages, page]);

  const rows = dosen.slice((page - 1) * limit, page * limit);

  const onDelete = async (d) => {
    const res = await Swal.fire({
      title: "Hapus Dosen?",
      html: `Apakah Anda yakin ingin menghapus dosen <b>${d.nama}</b> (NIDN: ${d.nidn})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!res.isConfirmed) return;

    deleteMutation.mutate(d.id, {  // ⬅️ pakai d.id, bukan d.nidn
      onSuccess: () => showSuccess(`Dosen "${d.nama}" berhasil dihapus`),
      onError: () => showError(`Gagal menghapus dosen "${d.nama}"`),
    });

  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Gagal memuat</p>;

  return (
    <div className="p-5">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl text-gray-700">Data Dosen</h2>
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
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-3 text-center">Nama</th>
                <th className="py-2 px-3 text-center">NIDN</th>
                <th className="py-2 px-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {rows.length ? (
                rows.map((d, i) => (
                  <tr
                    key={d.id}
                    className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                  >
                    <td className="py-2 px-3 text-center">{d.nama}</td>
                    <td className="py-2 px-3 text-center">{d.nidn}</td>
                    <td className="py-2 px-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                          onClick={() => {
                            setSelected(d);
                            setOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded"
                          onClick={() => onDelete(d)}
                        >
                          Hapus
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-500 italic">
                    Data kosong
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {open && (
        <DosenModal
          selected={selected}
          onClose={() => setOpen(false)}
          createMutation={createMutation}
          updateMutation={updateMutation}
        />
      )}
    </div>
  );
}
