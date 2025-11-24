import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import Card from "../Atoms/Card";
import { confirmAction, successAlert, errorAlert } from "../helpers/SwalHelper";
import { showSuccess, showError } from "../helpers/ToastHelper";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Konfirmasi login
    const confirm = await confirmAction(
      "Konfirmasi Login",
      "Apakah Anda yakin ingin login?"
    );
    if (!confirm) return;

    // Ambil semua user yang tersimpan
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Admin default
    const defaultUsers = [
      { 
        email: "admin@gmail.com", 
        password: "1234", 
        role: "admin",
        nama: "Administrator"
      },
    ];

    const allUsers = [...defaultUsers, ...users];

    const user = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      showError("Email atau password salah!");
      errorAlert("Login Gagal", "Periksa kembali email dan password Anda.");
      return;
    }

    // Simpan user ke localStorage
    localStorage.setItem("user", JSON.stringify(user));

    showSuccess(`Login berhasil sebagai ${user.role}!`);
    successAlert("Login Berhasil", `Selamat datang, ${user.nama || user.role}!`);

    // 🔥 Redirect berdasarkan role
    setTimeout(() => {
      if (user.role === "admin") navigate("/admin/dashboard");
      if (user.role === "mahasiswa") navigate("/mahasiswa/dashboard");
      if (user.role === "dosen") navigate("/dosen/dashboard"); 
    }, 800);
  };

  return (
    <AuthLayout>
      <Card title="Login">
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Input Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition-all"
          >
            Login
          </button>

          {/* Link ke Register */}
          <p className="text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Daftar
            </Link>
          </p>
        </form>
      </Card>
    </AuthLayout>
  );
}
