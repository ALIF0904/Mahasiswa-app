import React from "react";

export default function DashboardDosen() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard Dosen</h1>
      <p className="text-lg">
        Selamat datang, <span className="font-bold">{user.nama}</span> 👨‍🏫
      </p>
    </div>
  );
}
