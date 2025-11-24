import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedMahasiswa() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  // Hanya mahasiswa yang boleh masuk
  if (user.role !== "mahasiswa") {
    // Admin kembali ke admin
    if (user.role === "admin") return <Navigate to="/admin/dashboard" />;

    // Role lain (misal dosen)
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
