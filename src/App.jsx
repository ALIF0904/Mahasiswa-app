import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";

// Admin Layout & Pages
import AdminLayout from "./Layout/AdminLayout.jsx";
import DashboardPage from "./Pages/Admin/DashboardPage.jsx";
import Mahasiswa from "./Pages/Admin/Mahasiswa.jsx";
import DetailMahasiswaPage from "./Pages/Admin/DetailMahasiswaPage.jsx";
import ProtectedRoute from "./Molekul/ProtectedRoute.jsx";

// Dosen Layout & Pages
import ProtectedDosen from "./Molekul/ProtectedDosen";
import DosenLayout from "./Layout/DosenLayout";
import DashboardDosen from "./Pages/Dosen/DashboardDosen";
import ProfilDosen from "./Pages/Dosen/ProfilDosen";


// Role Management
import RoleManagement from "./Pages/Admin/RoleManagement.jsx"; 

// Dosen CRUD
import DosenList from "./Pages/Dosen/DosenList.jsx";

// Mata Kuliah CRUD
import MataKuliah from "./Pages/MataKuliah/MataKuliah.jsx";

// Mahasiswa User
import MahasiswaLayout from "./Layout/MahasiswaLayout.jsx";
import DashboardMahasiswa from "./Pages/Mahasiswa/DashboardMahasiswa.jsx";
import ProtectedMahasiswa from "./Molekul/ProtectedMahasiswa.jsx";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <Routes>

        {/* ================== AUTH ================== */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ================== ADMIN AREA ================== */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>

            {/* Dashboard */}
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />

            {/* Mahasiswa CRUD */}
            <Route path="mahasiswa" element={<Mahasiswa />} />
            <Route path="mahasiswa/:nim" element={<DetailMahasiswaPage />} />

            {/* Dosen CRUD */}
            <Route path="dosen" element={<DosenList />} />

            {/* Mata Kuliah CRUD */}
            <Route path="matakuliah" element={<MataKuliah />} />

            {/* 🔥 Role Management */}
            <Route path="role-management" element={<RoleManagement />} />

          </Route>
        </Route>

        {/* ================== MAHASISWA AREA ================== */}
        <Route element={<ProtectedMahasiswa />}>
          <Route path="/mahasiswa" element={<MahasiswaLayout />}>
            <Route index element={<DashboardMahasiswa />} />
            <Route path="dashboard" element={<DashboardMahasiswa />} />
          </Route>
        </Route>

        {/* ================== DOSEN AREA ================== */}
        {/* ================== DOSEN AREA ================== */}
        <Route element={<ProtectedDosen />}>
          <Route path="/dosen" element={<DosenLayout />}>
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
