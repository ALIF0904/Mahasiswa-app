import React from "react";
import { Outlet } from "react-router-dom";
import SidebarDosen from "../Organism/SidebarDosen";

export default function DosenLayout() {
  return (
    <div className="flex">
      <SidebarDosen />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
