import DashboardCard from "../../Components/UI/DashboardCard";
import { Layers } from "lucide-react";

export default function KelasCard({ total }) {
  return <DashboardCard icon={Layers} title="Jumlah Kelas" total={total} />;
}
