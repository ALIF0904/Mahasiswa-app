import React from "react";
import { Outlet } from "react-router-dom";
import SidebarMahasiswa from "../Organism/SidebarMahasiswa";
import HeaderMahasiswa from "../Organism/HeaderMahasiswa";

export default function MahasiswaLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarMahasiswa />

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        <HeaderMahasiswa />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
