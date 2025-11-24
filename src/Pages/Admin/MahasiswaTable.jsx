import React from "react";

export default function MahasiswaTable({
  mahasiswa,
  openEditModal,
  openDetailModal,
  onDelete,
}) {
  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">NIM</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">Status</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {mahasiswa.length > 0 ? (
          mahasiswa.map((mhs, i) => (
            <tr key={i} className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4">{mhs.nim}</td>
              <td className="py-2 px-4">{mhs.nama}</td>
              <td
                className={`py-2 px-4 font-semibold ${
                  mhs.status === "Aktif" ? "text-green-600" : "text-red-600"
                }`}
              >
                {mhs.status}
              </td>
              <td className="py-2 px-4">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => openDetailModal(mhs)}
                    className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => openEditModal(mhs)}
                    className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(mhs.nim)}
                    className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="p-4 text-center text-gray-500 font-medium">
              Tidak ada data mahasiswa.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
