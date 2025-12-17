import React, { useState, useEffect } from "react";
import Pagination from "../../Components/Pagination";
import MahasiswaModal from "./MahasiswaModal";
import storage from "../../Utils/Queries/Storage";
import Swal from "sweetalert2";
import { showSuccess } from "../../helpers/ToastHelper"

export default function MahasiswaPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [version, setVersion] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const data = storage.get("mahasiswa") || [];
    setMahasiswaList(data);

    // Jika halaman kosong setelah hapus, kembali ke halaman sebelumnya
    const totalPages = Math.max(1, Math.ceil(data.length / limit));
    if (page > totalPages) setPage(totalPages);
  }, [version]);

  const remove = async (id) => {
    const mhs = mahasiswaList.find(m => m.id === id);
    const res = await Swal.fire({
      title: "Hapus data mahasiswa?",
      html: `Apakah Anda yakin ingin menghapus mahasiswa <b>${mhs.nama}</b> (NIM: ${mhs.nim})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!res.isConfirmed) return;

    const next = mahasiswaList.filter(item => item.id !== id);
    storage.set("mahasiswa", next);
    setVersion(v => v + 1);

    showSuccess("Data mahasiswa berhasil dihapus!");
  };

  const totalPages = Math.max(1, Math.ceil(mahasiswaList.length / limit));
  const slice = mahasiswaList.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-5">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl text-gray-700">Data Mahasiswa</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              setSelected(null);
              setOpenModal(true);
            }}
          >
            + Tambah
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-3">NIM</th>
                <th className="py-2 px-3">Nama</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {slice.length ? (
                slice.map((m, i) => (
                  <tr key={m.id} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="text-center py-2 px-3">{m.nim}</td>
                    <td className="text-center py-2 px-3">{m.nama}</td>
                    <td className="text-center py-2 px-3">{m.status}</td>
                    <td className="text-center py-2 px-3 flex justify-center gap-2">
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                        onClick={() => {
                          setSelected(m);
                          setOpenModal(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        onClick={() => remove(m.id)}
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
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {openModal && (
        <MahasiswaModal
          selected={selected}
          onClose={() => setOpenModal(false)}
          onSaved={() => setVersion(v => v + 1)}
        />
      )}
    </div>
  );
}
