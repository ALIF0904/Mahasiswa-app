import React, { useState, useEffect } from "react";
import MahasiswaTable from "./MahasiswaTable";
import MahasiswaModal from "./MahasiswaModal";
import { confirmAction, successAlert, errorAlert } from "../../helpers/SwalHelper";
import { showSuccess, showError } from "../../helpers/ToastHelper";

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isDetail, setIsDetail] = useState(false);

  // ✅ Data dummy awal
  const dummyData = [
    { nim: "A11.2022.13999", nama: "Siti Aminah", status: "Tidak Aktif" },
    { nim: "A11.2021.13567", nama: "Budi Santoso", status: "Tidak Aktif" },
    { nim: "A11.2022.13972", nama: "Nabila Izzatil", status: "Aktif" },
    { nim: "A11.2022.13955", nama: "Moh. Fachri Alif", status: "Aktif" },
  ];

  // ✅ Ambil data dari localStorage atau pakai dummy kalau kosong
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("mahasiswa"));
    if (storedData && storedData.length > 0) {
      setMahasiswa(storedData);
    } else {
      setMahasiswa(dummyData);
      localStorage.setItem("mahasiswa", JSON.stringify(dummyData));
    }
  }, []);

  // 🟦 Modal Tambah
  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setIsDetail(false);
    setIsModalOpen(true);
  };

  // 🟨 Modal Edit
  const openEditModal = (mhs) => {
    setSelectedMahasiswa(mhs);
    setIsDetail(false);
    setIsModalOpen(true);
  };

  // 🟩 Modal Detail
  const openDetailModal = (mhs) => {
    setSelectedMahasiswa(mhs);
    setIsDetail(true);
    setIsModalOpen(true);
  };

  // 🟥 Hapus Mahasiswa (pakai Swal konfirmasi + Toast)
  const handleDelete = async (nim) => {
    const confirm = await confirmAction(
      "Hapus Data Mahasiswa",
      "Apakah kamu yakin ingin menghapus data ini?",
      "Ya, Hapus"
    );

    if (confirm) {
      try {
        const updated = mahasiswa.filter((m) => m.nim !== nim);
        setMahasiswa(updated);
        localStorage.setItem("mahasiswa", JSON.stringify(updated));
        showSuccess("Data mahasiswa berhasil dihapus!");
        successAlert("Berhasil", "Data mahasiswa telah dihapus!");
      } catch (err) {
        showError("Gagal menghapus data mahasiswa!");
        errorAlert("Terjadi Kesalahan", err.message);
      }
    }
  };

  // 🟩 Tambah/Edit Mahasiswa (pakai Swal konfirmasi + Toast)
  const handleSubmit = async (formData) => {
    const confirm = await confirmAction(
      "Simpan Perubahan",
      "Apakah kamu yakin ingin menyimpan data ini?",
      "Ya, Simpan"
    );

    if (!confirm) return;

    try {
      let updated;
      if (selectedMahasiswa) {
        // Edit data
        updated = mahasiswa.map((m) =>
          m.nim === selectedMahasiswa.nim ? formData : m
        );
        showSuccess("Data mahasiswa berhasil diperbarui!");
        successAlert("Berhasil", "Perubahan data telah disimpan!");
      } else {
        // Tambah data baru
        updated = [...mahasiswa, formData];
        showSuccess("Data mahasiswa berhasil ditambahkan!");
        successAlert("Berhasil", "Data baru telah disimpan!");
      }

      setMahasiswa(updated);
      localStorage.setItem("mahasiswa", JSON.stringify(updated));
    } catch (err) {
      showError("Terjadi kesalahan saat menyimpan data!");
      errorAlert("Gagal Menyimpan", err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">Daftar Mahasiswa</h2>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Mahasiswa
        </button>
      </div>

      {/* Table Mahasiswa */}
      <MahasiswaTable
        mahasiswa={mahasiswa}
        openEditModal={openEditModal}
        openDetailModal={openDetailModal} // ✅ kirim fungsi detail
        onDelete={handleDelete}
      />

      {/* Modal Tambah/Edit/Detail */}
      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
        isDetail={isDetail} // ✅ aktifkan mode detail
      />
    </div>
  );
}
