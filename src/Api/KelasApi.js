import api from "./Api";

// ================================
// GET ALL KELAS (AUTO JOIN MATKUL + DOSEN)
// ================================
export async function getAllKelas() {
  const [kelasRes, matkulRes, dosenRes] = await Promise.all([
    api.get("/kelas"),
    api.get("/mataKuliah"),
    api.get("/dosen"),
  ]);

  const kelas = kelasRes.data;
  const matkul = matkulRes.data;
  const dosen = dosenRes.data;

  return kelas.map((k) => {
    const m = matkul.find((m) => m.kode === k.matkulKode);
    const d = dosen.find((d) => d.id === m?.dosenId);

    return {
      ...k,
      matkulNama: m?.nama || "-",
      dosenNama: d?.nama || "-",
    };
  });
}

// ================================
// CREATE
// ================================
export async function createKelas(data) {
  const res = await api.post("/kelas", data);
  return res.data;
}

// ================================
// UPDATE
// ================================
export async function updateKelas(id, data) {
  const res = await api.put(`/kelas/${id}`, data);
  return res.data;
}

// ================================
// DELETE
// ================================
export async function deleteKelas(id) {
  await api.delete(`/kelas/${id}`);
  return id;
}
