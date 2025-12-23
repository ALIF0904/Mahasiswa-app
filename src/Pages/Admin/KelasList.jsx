import React, { useMemo } from "react";
import { useMataKuliahQuery } from "../../Utils/Queries/useMataKuliahQuery";
import { useDosenQuery } from "../../Utils/Queries/useDosenQuery";
import { useKRSQuery } from "../../Utils/Queries/useKRSQuery";

export default function Kelas() {
  const { data: mataKuliah = [] } = useMataKuliahQuery();
  const { data: dosen = [] } = useDosenQuery();
  const { data: krsData = [] } = useKRSQuery(); // ambil KRS langsung

  const kelasList = useMemo(() => {
    return mataKuliah.map((mk) => {
      // hitung mahasiswa unik per mata kuliah
      const mahasiswaUnik = new Set(
        krsData
          .filter(k => String(k.mataKuliahId) === String(mk.id))
          .map(k => k.mahasiswaId)
      );

      return {
        id: mk.id,
        kode: mk.kode,
        nama: mk.nama,
        dosenId: mk.dosenId,
        jumlahMahasiswa: mahasiswaUnik.size,
      };
    });
  }, [mataKuliah, krsData]);

  return (
    <div className="p-5">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="font-bold text-xl mb-4 text-gray-700">
          Daftar Kelas
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-3">Kode</th>
                <th className="py-2 px-3">Nama</th>
                <th className="py-2 px-3">Dosen</th>
                <th className="py-2 px-3">Jumlah Mahasiswa</th>
              </tr>
            </thead>
            <tbody>
              {kelasList.length ? (
                kelasList.map((k, i) => (
                  <tr key={k.id} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="text-center py-2 px-3">{k.kode}</td>
                    <td className="text-center py-2 px-3">{k.nama}</td>
                    <td className="text-center py-2 px-3">
                      {dosen.find(d => String(d.id) === String(k.dosenId))?.nama || "-"}
                    </td>
                    <td className="text-center py-2 px-3 font-semibold">
                      {k.jumlahMahasiswa}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Data kelas kosong
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
