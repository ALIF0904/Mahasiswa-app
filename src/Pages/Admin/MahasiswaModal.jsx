import React, { useEffect, useState } from "react";

export default function MahasiswaModal({
  isModalOpen,
  onClose,
  onSubmit,
  selectedMahasiswa,
  isDetail = false, // ✅ mode detail tambahan
}) {
  const [form, setForm] = useState({ nim: "", nama: "", status: "Aktif" });

  useEffect(() => {
    if (selectedMahasiswa) {
      setForm(selectedMahasiswa);
    } else {
      setForm({ nim: "", nama: "", status: "Aktif" });
    }
  }, [selectedMahasiswa]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nim.trim() || !form.nama.trim()) {
      alert("⚠️ NIM dan Nama wajib diisi!");
      return;
    }

    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            {isDetail
              ? "Detail Mahasiswa"
              : selectedMahasiswa
              ? "Edit Mahasiswa"
              : "Tambah Mahasiswa"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">NIM</label>
            <input
              type="text"
              name="nim"
              value={form.nim}
              onChange={handleChange}
              readOnly={isDetail}
              className={`w-full border rounded-lg p-2 ${
                isDetail
                  ? "bg-gray-100 cursor-not-allowed"
                  : "focus:outline-none focus:ring-2 focus:ring-blue-500"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              readOnly={isDetail}
              className={`w-full border rounded-lg p-2 ${
                isDetail
                  ? "bg-gray-100 cursor-not-allowed"
                  : "focus:outline-none focus:ring-2 focus:ring-blue-500"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            {isDetail ? (
              <input
                type="text"
                value={form.status}
                readOnly
                className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
              />
            ) : (
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
            )}
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
            >
              {isDetail ? "Tutup" : "Batal"}
            </button>

            {!isDetail && (
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Simpan
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
