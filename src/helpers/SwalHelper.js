import Swal from "sweetalert2";
import "./swal-custom.css";

// 🔶 Konfirmasi Aksi (misal: simpan, hapus, logout, login)
export const confirmAction = async (title, text, confirmButtonText = "Ya") => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText, // Tombol biru
    cancelButtonText: "Batal", // Tombol merah
    customClass: {
      confirmButton: "swal2-confirm-custom",
      cancelButton: "swal2-cancel-custom",
    },
    buttonsStyling: false,
  });

  return result.isConfirmed;
};

// 🟢 Alert Sukses
export const successAlert = (title = "Berhasil", text = "Aksi berhasil dilakukan!") => {
  Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText: "OK",
    confirmButtonColor: "#16a34a",
  });
};

// 🔴 Alert Error
export const errorAlert = (title = "Terjadi Kesalahan", text = "Silakan coba lagi") => {
  Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "Tutup",
    confirmButtonColor: "#dc2626",
  });
};
