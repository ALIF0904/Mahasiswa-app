import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedDosen() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "dosen") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
