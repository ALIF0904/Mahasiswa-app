import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------- Auth Pages ---------- */
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";

/* ---------- Admin ---------- */
import AdminLayout from "./Layout/AdminLayout.jsx";
import Index from "./Pages/Admin/DashboardPage.jsx";
import Mahasiswa from "./Pages/Admin/Mahasiswa.jsx";
import RoleManagement from "./Pages/Admin/RoleManagement.jsx";
import ProtectedRoute from "./Molekul/ProtectedRoute.jsx";

/* ---------- CRUD Modules (Admin) ---------- */
import DosenList from "./Pages/Admin/DosenList.jsx";
import MataKuliah from "./Pages/Admin/MataKuliah.jsx";
import KelasList from "./Pages/Admin/KelasList.jsx";
import KRS from "./Pages/Admin/Krs.jsx";

/* ---------- Mahasiswa ---------- */
import MahasiswaLayout from "./Layout/MahasiswaLayout.jsx";
import DashboardMahasiswa from "./Pages/Mahasiswa/DashboardMahasiswa.jsx";
import ProtectedMahasiswa from "./Molekul/ProtectedMahasiswa.jsx";

/* ---------- Dosen ---------- */
import ProtectedDosen from "./Molekul/ProtectedDosen.jsx";
import DosenLayout from "./Layout/DosenLayout.jsx";
import DashboardDosen from "./Pages/Dosen/DashboardDosen.jsx";
import ProfilDosen from "./Pages/Dosen/ProfilDosen.jsx";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <Routes>

        {/* AUTH ROUTES */}
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Index />} />               {/* Dashboard */}
            <Route path="dashboard" element={<Index />} />    {/* Dashboard */}

            {/* Admin CRUD */}
            <Route path="mahasiswa" element={<Mahasiswa />} />
            <Route path="dosen" element={<DosenList />} />
            <Route path="matakuliah" element={<MataKuliah />} />
            <Route path="kelas" element={<KelasList />} />
            <Route path="krs" element={<KRS />} />

            {/* Role Management */}
            <Route path="role-management" element={<RoleManagement />} />
          </Route>
        </Route>

        {/* MAHASISWA ROUTES */}
        <Route element={<ProtectedMahasiswa />}>
          <Route path="mahasiswa" element={<MahasiswaLayout />}>
            <Route index element={<DashboardMahasiswa />} />
            <Route path="dashboard" element={<DashboardMahasiswa />} />
          </Route>
        </Route>

        {/* DOSEN ROUTES */}
        <Route element={<ProtectedDosen />}>
          <Route path="dosen" element={<DosenLayout />}>
            <Route index element={<DashboardDosen />} />
            <Route path="dashboard" element={<DashboardDosen />} />
            <Route path="profil" element={<ProfilDosen />} />
          </Route>
        </Route>

      </Routes>
    </>
  );
}

export default App;
