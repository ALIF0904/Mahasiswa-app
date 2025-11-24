import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../helpers/ToastHelper";
import { successAlert, errorAlert } from "../helpers/SwalHelper";

export default function RegisterPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("mahasiswa"); // 🔥 Role dipilih user
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // === VALIDASI ===
    if (!nama || !email || !password || !confirm) {
      showError("Semua field wajib diisi!");
      errorAlert("Gagal", "Mohon isi seluruh data.");
      return;
    }

    if (password !== confirm) {
      showError("Password tidak cocok!");
      errorAlert("Gagal", "Password & Konfirmasi tidak sama.");
      return;
    }

    // === CEK EMAIL ===
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = existingUsers.some((user) => user.email === email);

    if (emailExists) {
      showError("Email sudah terdaftar!");
      errorAlert("Email Terpakai", "Gunakan email lain.");
      return;
    }

    // === SIMPAN USER BARU ===
    const newUser = {
      nama,
      email,
      password,
      role, // 🔥 role berdasarkan pilihan user
    };

    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    showSuccess("Registrasi berhasil!");
    successAlert("Akun Berhasil Dibuat", `Akun dengan role ${role} berhasil dibuat.`);

    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[380px]">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Daftar Akun
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">

          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pilih Role
            </label>
            <select
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
              <option value="dosen">Dosen</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan password"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password
            </label>
            <input
              type="password"
              placeholder="Ulangi password"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {/* Tombol */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
          >
            Daftar
          </button>

          <p className="text-center text-sm text-gray-600">
            Sudah punya akun?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Login di sini
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}
