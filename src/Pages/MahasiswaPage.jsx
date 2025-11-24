import React, { useState, useEffect } from "react";

export default function MahasiswaPage() {
  // 🔹 Data default mahasiswa
  const defaultMahasiswa = [
    { nim: "A11.2022.13955", nama: "Moh. Fachri Alif", status: "Aktif" },
    { nim: "A11.2022.13999", nama: "Siti Aminah", status: "Tidak Aktif" },
    { nim: "A11.2021.13567", nama: "Budi Santoso", status: "Aktif" },
  ];

  const [mahasiswa, setMahasiswa] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newData, setNewData] = useState({ nim: "", nama: "", status: "Aktif" });
  const [isEdit, setIsEdit] = useState(false);

  // 🔹 Ambil data dari localStorage atau gabungkan dengan default
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("mahasiswa"));
    if (stored && stored.length > 0) {
      // gabungkan tanpa duplikat berdasarkan NIM
      const merged = [
        ...stored,
        ...defaultMahasiswa.filter(
          (m) => !stored.some((s) => s.nim === m.nim)
        ),
      ];
      setMahasiswa(merged);
    } else {
      setMahasiswa(defaultMahasiswa);
    }
  }, []);

  // 🔹 Simpan ke localStorage setiap kali data berubah
  useEffect(() => {
    if (mahasiswa.length > 0) {
      localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));
    }
  }, [mahasiswa]);

  // Tambah Mahasiswa
  const handleAdd = () => {
    setNewData({ nim: "", nama: "", status: "Aktif" });
    setIsEdit(false);
    setShowModal(true);
  };

  // Edit Mahasiswa
  const handleEdit = (mhs) => {
    setNewData(mhs);
    setIsEdit(true);
    setShowModal(true);
  };

  // Simpan Mahasiswa
  const handleSave = () => {
    if (!newData.nim || !newData.nama) {
      alert("Mohon isi semua data mahasiswa!");
      return;
    }

    if (isEdit) {
      setMahasiswa(
        mahasiswa.map((m) => (m.nim === newData.nim ? newData : m))
      );
    } else {
      if (mahasiswa.some((m) => m.nim === newData.nim)) {
        alert("NIM sudah terdaftar!");
        return;
      }
      setMahasiswa([...mahasiswa, newData]);
    }

    setShowModal(false);
  };

  // Hapus Mahasiswa
  const handleDelete = (nim) => {
    if (confirm("Apakah kamu yakin ingin menghapus data ini?")) {
      setMahasiswa(mahasiswa.filter((m) => m.nim !== nim));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">Daftar Mahasiswa</h1>

      <div className="bg-white shadow-md rounded-xl p-6">
        {/* Tombol tambah mahasiswa */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-md transition-all"
          >
            + Tambah Mahasiswa
          </button>
        </div>

        {/* Tabel mahasiswa */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="py-2 px-4 text-left border-b border-blue-600">NIM</th>
                <th className="py-2 px-4 text-left border-b border-blue-600">Nama</th>
                <th className="py-2 px-4 text-left border-b border-blue-600">Status</th>
                <th className="py-2 px-4 text-center border-b border-blue-600 w-40">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mahasiswa.map((mhs, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-4 py-2">{mhs.nim}</td>
                  <td className="px-4 py-2">{mhs.nama}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      mhs.status === "Aktif" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {mhs.status}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(mhs)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(mhs.nim)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal tambah/edit mahasiswa */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">NIM</label>
                <input
                  type="text"
                  value={newData.nim}
                  disabled={isEdit}
                  onChange={(e) =>
                    setNewData({ ...newData, nim: e.target.value })
                  }
                  className={`w-full border rounded-lg p-2 ${
                    isEdit ? "bg-gray-100" : "focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="Masukkan NIM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nama</label>
                <input
                  type="text"
                  value={newData.nama}
                  onChange={(e) =>
                    setNewData({ ...newData, nama: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan Nama"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={newData.status}
                  onChange={(e) =>
                    setNewData({ ...newData, status: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
