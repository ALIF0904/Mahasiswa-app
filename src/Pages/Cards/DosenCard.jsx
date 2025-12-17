import DashboardCard from "../../Components/UI/DashboardCard";
import { UserCheck } from "lucide-react";

export default function DosenCard({ total }) {
  return <DashboardCard icon={UserCheck} title="Jumlah Dosen" total={total} />;
}
