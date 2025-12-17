import DashboardCard from "../../Components/UI/DashboardCard";
import { Users } from "lucide-react";

export default function MahasiswaCard({ total }) {
  return <DashboardCard icon={Users} title="Jumlah Mahasiswa" total={total} />;
}
