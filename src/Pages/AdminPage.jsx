import React from "react";

export default function AdminPage() {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Halaman Admin</h1>
      </header>
      <main className="flex-1 p-6">
        <h2 className="text-lg font-semibold mb-4">Dashboard Admin</h2>
        <p>Selamat datang di halaman admin!</p>
      </main>
      <footer className="bg-gray-200 text-center p-4">
        <p>&copy; 2025 Admin Panel</p>
      </footer>
    </div>
  );
}
