import api from "./Api";

// Update SKS Mahasiswa
async function updateMahasiswaSKS(mahasiswaId) {
  const [krsRes, matkulRes] = await Promise.all([
    api.get("/krs"),
    api.get("/mataKuliah")
  ]);

  const totalSks = krsRes.data
    .filter(k => k.mahasiswaId === mahasiswaId)
    .reduce((sum, k) => sum + (matkulRes.data.find(m => m.id === k.mataKuliahId)?.sks || 0), 0);

  await api.patch(`/mahasiswa/${mahasiswaId}`, { sksTerpakai: totalSks });
}

export async function getAllKRS() {
  const [krsRes, mhsRes, mkRes, dosenRes] = await Promise.all([
    api.get("/krs"),
    api.get("/mahasiswa"),
    api.get("/mataKuliah"),
    api.get("/dosen")
  ]);

  return krsRes.data.map(k => {
    const mhs = mhsRes.data.find(m => m.id === k.mahasiswaId);
    const mk = mkRes.data.find(m => m.id === k.mataKuliahId);
    const dsn = dosenRes.data.find(d => d.id === mk?.dosenId);
    return { ...k, mahasiswaNama: mhs?.nama, mataKuliahNama: mk?.nama, sks: mk?.sks, dosenNama: dsn?.nama };
  });
}

export async function createKRS(data) {
  const [krsRes, mhsRes, mkRes] = await Promise.all([
    api.get("/krs"),
    api.get(`/mahasiswa/${data.mahasiswaId}`),
    api.get(`/mataKuliah/${data.mataKuliahId}`)
  ]);

  const exists = krsRes.data.some(k => k.mahasiswaId === data.mahasiswaId && k.mataKuliahId === data.mataKuliahId);
  if (exists) throw new Error("Mahasiswa sudah mengambil mata kuliah ini");

  const totalSks = (mhsRes.data.sksTerpakai || 0) + (mkRes.data.sks || 0);
  if (totalSks > mhsRes.data.maxSks) throw new Error("Melebihi batas SKS mahasiswa");

  const res = await api.post("/krs", data);
  await updateMahasiswaSKS(data.mahasiswaId);
  return res.data;
}

export async function deleteKRS(id) {
  const { data } = await api.get(`/krs/${id}`);
  await api.delete(`/krs/${id}`);
  await updateMahasiswaSKS(data.mahasiswaId);
  return id;
}
