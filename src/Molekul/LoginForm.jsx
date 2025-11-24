import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Atoms/Input";
import Button from "../Atoms/Button";
import Label from "../Atoms/Label";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Login sederhana (dummy)
    if (email === "admin@gmail.com" && password === "1234") {
      // ✅ Simpan status login ke localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: email,
          name: "Admin Sistem",
          role: "admin",
        })
      );

      alert("Login berhasil! Masuk ke halaman Admin.");
      navigate("/admin"); // ✅ langsung pindah ke halaman admin
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label text="Email" />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan email"
          required
        />
      </div>

      <div>
        <Label text="Password" />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukkan password"
          required
        />
      </div>

      <div className="pt-2">
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};

export default LoginForm;
