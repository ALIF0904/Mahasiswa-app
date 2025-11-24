import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ListMahasiswa() {
  const navigate = useNavigate();

  // Data dummy awal
  const defaultData = [
    { nim: "A11.2022.10001", nama: "Andi Pratama", status: "Aktif" },
    { nim: "A11.2022.10002", nama: "Budi Santoso", status: "Tidak Aktif" },
    { nim: "A11.2022.10003", nama: "Citra Lestari", status: "Aktif" },
    { nim: "A11.2022.10004", nama: "Dewi Rahmawati", status: "Aktif" },
    { nim: "A11.2022.10005", nama: "Eka Saputra", status: "Tidak Aktif" },
  ];

  // State utama
  const [mahasiswa, setMahasiswa] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalNim, setOriginalNim] = useState(""); // simpan NIM lama sebelum edit
  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
    status: "Aktif",
  });

  // Load data awal
  useEffect(() => {
    const saved = localStorage.getItem("mahasiswaData");
    if (saved) {
      setMahasiswa(JSON.parse(saved));
    } else {
      setMahasiswa(defaultData);
      localStorage.setItem("mahasiswaData", JSON.stringify(defaultData));
    }
  }, []);

  // Simpan otomatis ke localStorage setiap kali data berubah
  useEffect(() => {
    localStorage.setItem("mahasiswaData", JSON.stringify(mahasiswa));
  }, [mahasiswa]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Tambah data baru
  const handleAdd = () => {
    setFormData({ nim: "", nama: "", status: "Aktif" });
    setIsEditing(false);
    setShowModal(true);
  };

  // Edit data
  const handleEdit = (nim) => {
    const mhs = mahasiswa.find((m) => m.nim === nim);
    setFormData({ ...mhs });
    setOriginalNim(nim); // simpan NIM lama
    setIsEditing(true);
    setShowModal(true);
  };

  // Simpan (Tambah/Edit)
  const handleSave = () => {
    const nimTrim = formData.nim.trim();
    const namaTrim = formData.nama.trim();

    if (!nimTrim || !namaTrim) {
      alert("⚠️ NIM dan Nama wajib diisi!");
      return;
    }

    if (isEditing) {
      if (!confirm("Apakah Anda yakin ingin memperbarui data ini?")) return;

      // Cek jika NIM baru bentrok dengan NIM lain (selain dirinya sendiri)
      const nimExists = mahasiswa.some(
        (m) => m.nim === nimTrim && m.nim !== originalNim
      );
      if (nimExists) {
        alert("❌ NIM sudah terdaftar pada mahasiswa lain!");
        return;
      }

      setMahasiswa((prev) =>
        prev.map((m) =>
          m.nim === originalNim ? { ...formData } : m
        )
      );

      alert("✅ Data berhasil diperbarui!");
    } else {
      // Tambah baru
      if (mahasiswa.some((m) => m.nim === nimTrim)) {
        alert("❌ NIM sudah terdaftar!");
        return;
      }
      setMahasiswa((prev) => [...prev, { ...formData }]);
      alert("✅ Data berhasil ditambahkan!");
    }

    setShowModal(false);
  };

  // Hapus data
  const handleDelete = (nim) => {
    if (confirm("🗑️ Yakin ingin menghapus data ini?")) {
      setMahasiswa((prev) => prev.filter((m) => m.nim !== nim));
      alert("✅ Data berhasil dihapus!");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Mahasiswa</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm transition-all"
        >
          + Tambah Mahasiswa
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-2 border">NIM</th>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.length > 0 ? (
              mahasiswa.map((mhs, i) => (
                <tr key={i} className="odd:bg-white even:bg-gray-100">
                  <td className="p-2 border">{mhs.nim}</td>
                  <td className="p-2 border text-left pl-4">{mhs.nama}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      mhs.status === "Aktif"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {mhs.status}
                  </td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      onClick={() => navigate(`/admin/mahasiswa/${mhs.nim}`)}
                      className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handleEdit(mhs.nim)}
                      className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(mhs.nim)}
                      className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-gray-500 font-medium"
                >
                  Tidak ada data mahasiswa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {isEditing ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Form Input */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">NIM</label>
                <input
                  type="text"
                  name="nim"
                  value={formData.nim}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan NIM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan Nama"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>
            </div>

            {/* Tombol Aksi */}
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
