import api from "./Api";

// GET ALL + join dosen
export async function getAllMataKuliah() {
  const [mkRes, dosenRes] = await Promise.all([
    api.get("/mataKuliah"),
    api.get("/dosen"),
  ]);

  return mkRes.data.map((m) => {
    const d = dosenRes.data.find((d) => d.id === m.dosenId);
    return { ...m, dosenNama: d?.nama || "-" };
  });
}

// CREATE
export async function createMataKuliah(data) {
  const res = await api.post("/mataKuliah", data);
  return res.data;
}

// UPDATE
export async function updateMataKuliah(id, data) {
  const res = await api.put(`/mataKuliah/${id}`, data);
  return res.data;
}

// DELETE
export async function deleteMataKuliah(id) {
  const res = await api.delete(`/mataKuliah/${id}`);
  return res.data;
}
