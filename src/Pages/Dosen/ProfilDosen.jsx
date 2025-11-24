import React from "react";

export default function ProfilDosen() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profil Dosen</h1>

      <div className="p-4 bg-white rounded shadow w-96">
        <p><strong>Nama :</strong> {user.nama}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Role :</strong> {user.role}</p>
      </div>
    </div>
  );
}
