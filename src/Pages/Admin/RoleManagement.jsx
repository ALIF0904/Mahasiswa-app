import React, { useEffect, useState } from "react";
import { confirmAction, successAlert, errorAlert } from "../../helpers/SwalHelper";
import { showSuccess, showError } from "../../helpers/ToastHelper";

export default function RoleManagement() {
  const [users, setUsers] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(stored);
  }, []);

  const updateRole = async (email, newRole) => {
    const confirm = await confirmAction(
      "Ubah Role User",
      `Apakah Anda yakin ingin mengubah role menjadi ${newRole}?`,
      "Ya, ubah"
    );
    if (!confirm) return;

    try {
      const updated = users.map((u) =>
        u.email === email ? { ...u, role: newRole } : u
      );

      setUsers(updated);
      localStorage.setItem("users", JSON.stringify(updated));

      showSuccess("Role berhasil diubah!");
      successAlert("Berhasil", `Role user telah berubah menjadi ${newRole}`);
    } catch (err) {
      showError("Gagal mengubah role!");
      errorAlert("Error", err.message);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Manajemen Role User</h2>

      <table className="w-full table-auto border">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-3 py-2 border">Nama</th>
            <th className="px-3 py-2 border">Email</th>
            <th className="px-3 py-2 border">Role</th>
            <th className="px-3 py-2 border">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-3">
                Tidak ada user terdaftar.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.email}>
                <td className="border px-3 py-2">{user.nama}</td>
                <td className="border px-3 py-2">{user.email}</td>
                <td className="border px-3 py-2 capitalize">{user.role}</td>
                <td className="border px-3 py-2 space-x-2">

                  {loggedUser.email === user.email ? (
                    <span className="text-gray-500 italic">
                      (Tidak bisa edit diri sendiri)
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => updateRole(user.email, "admin")}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Jadikan Admin
                      </button>

                      <button
                        onClick={() => updateRole(user.email, "mahasiswa")}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Jadikan Mahasiswa
                      </button>

                      <button
                        onClick={() => updateRole(user.email, "dosen")}
                        className="bg-purple-600 text-white px-3 py-1 rounded"
                      >
                        Jadikan Dosen
                      </button>
                    </>
                  )}

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
