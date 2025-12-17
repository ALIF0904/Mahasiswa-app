import { useEffect, useMemo, useState } from "react";

import MahasiswaCard from "../Cards/MahasiswaCard";
import DosenCard from "../Cards/DosenCard";
import KelasCard from "../Cards/KelasCard";
import ChartOverview from "../../Components/Chart";

import { useMahasiswaQuery } from "../../Utils/Queries/useMahasiswaQuery";
import { useDosenQuery } from "../../Utils/Queries/useDosenQuery";
import { useMataKuliahQuery } from "../../Utils/Queries/useMataKuliahQuery";
import storage from "../../Utils/Queries/Storage";

export default function Dashboard() {
  // =========================
  // HOOKS — HARUS DI ATAS
  // =========================
  const { data: mahasiswa = [], isLoading: lm } = useMahasiswaQuery();
  const { data: dosen = [], isLoading: ld } = useDosenQuery();
  const { data: mataKuliah = [], isLoading: lmk } = useMataKuliahQuery();

  const [krs, setKrs] = useState([]);

  useEffect(() => {
    const sync = () => setKrs(storage.get("krs") || []);
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // =========================
  // HITUNG DATA
  // =========================
  const totalMahasiswa = mahasiswa.length;
  const totalDosen = dosen.length;
  const totalKelas = mataKuliah.length;

  const chartData = useMemo(
    () => [
      { name: "Mahasiswa", value: totalMahasiswa },
      { name: "Dosen", value: totalDosen },
      { name: "Kelas", value: totalKelas },
    ],
    [totalMahasiswa, totalDosen, totalKelas]
  );

  // =========================
  // BARU BOLEH CONDITIONAL RETURN
  // =========================
  if (lm || ld || lmk) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MahasiswaCard total={totalMahasiswa} />
        <DosenCard total={totalDosen} />
        <KelasCard total={totalKelas} />
      </div>

      <ChartOverview
        key={`${totalMahasiswa}-${totalDosen}-${totalKelas}`}
        data={chartData}
      />
    </div>
  );
}
