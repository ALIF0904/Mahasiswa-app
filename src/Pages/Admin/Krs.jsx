import React, { useState, useEffect } from "react";
import Pagination from "../../Components/Pagination";
import KrsModal from "./KrsModal";
import { useMataKuliahQuery } from "../../Utils/Queries/useMataKuliahQuery";
import { useMahasiswaQuery } from "../../Utils/Queries/useMahasiswaQuery";
import { useDosenQuery } from "../../Utils/Queries/useDosenQuery";
import { useKrsQuery } from "../../Utils/Queries/useKRSQuery";

export default function Krs() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [mode, setMode] = useState("add");
    const [page, setPage] = useState(1);

    const { data: mataKuliah = [] } = useMataKuliahQuery();
    const { data: mahasiswa = [] } = useMahasiswaQuery();
    const { data: dosen = [] } = useDosenQuery();
    const { data: krsData = [], createMutation, deleteMutation } = useKrsQuery();

    const limit = 5;

    // Pastikan setiap mahasiswa punya maxSks
    const mahasiswaWithMaxSks = mahasiswa.map(m => ({ ...m, maxSks: m.maxSks || 24 }));

    const krsPerMahasiswa = mahasiswaWithMaxSks
        .map(m => {
            const krsMahasiswa = krsData.filter(k => Number(k.mahasiswaId) === Number(m.id));
            if (!krsMahasiswa.length) return null;

            const uniqueKRS = Array.from(new Map(krsMahasiswa.map(k => [k.mataKuliahId, k])).values());
            const mkList = uniqueKRS.map(k => mataKuliah.find(mk => Number(mk.id) === Number(k.mataKuliahId))?.nama || "-");
            const totalSks = uniqueKRS.reduce((sum, k) => sum + (mataKuliah.find(mk => mk.id === k.mataKuliahId)?.sks || 0), 0);
            const dosenList = Array.from(new Set(uniqueKRS.map(k => {
                const mk = mataKuliah.find(mk => mk.id === k.mataKuliahId);
                return dosen.find(d => d.id === mk?.dosenId)?.nama || "-";
            })));

            return {
                mahasiswa: m,
                mataKuliah: mkList,
                totalSks,
                dosenList,
                krsIds: uniqueKRS.map(k => k.id),
            };
        })
        .filter(Boolean);

    const totalPages = Math.max(1, Math.ceil(krsPerMahasiswa.length / limit));
    const rows = krsPerMahasiswa.slice((page - 1) * limit, page * limit);

    // 🔹 Auto kembali halaman jika rows kosong
    useEffect(() => {
        if (rows.length === 0 && page > 1) {
            setPage(prev => prev - 1);
        }
    }, [rows, page]);

    return (
        <div className="p-5">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl text-gray-700">Data KRS</h2>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                        onClick={() => {
                            setMode("add");
                            setSelected(null);
                            setOpen(true);
                        }}
                    >
                        + Tambah
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-2">Mahasiswa</th>
                                <th className="py-2">Mata Kuliah</th>
                                <th className="py-2">Total SKS</th>
                                <th className="py-2">Dosen</th>
                                <th className="py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.length ? (
                                rows.map((row, i) => (
                                    <tr key={row.mahasiswa.id} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                                        <td className="text-center py-2">{row.mahasiswa.nama}</td>
                                        <td className="text-center py-2">{row.mataKuliah.join(", ")}</td>
                                        <td className="text-center py-2">{row.totalSks} / {row.mahasiswa.maxSks}</td>
                                        <td className="text-center py-2">{row.dosenList.join(", ")}</td>
                                        <td className="text-center py-2">
                                            <button
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                                                onClick={() => { setMode("edit"); setSelected(row); setOpen(true); }}
                                            >
                                                Edit / Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">Data kosong</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>

            {open && (
                <KrsModal
                    mode={mode}
                    selected={selected}
                    mahasiswa={mahasiswaWithMaxSks}
                    mataKuliah={mataKuliah}
                    krsData={krsData}
                    createMutation={createMutation}
                    deleteMutation={deleteMutation}
                    onClose={() => { setOpen(false); setSelected(null); }}
                />
            )}
        </div>
    );
}
