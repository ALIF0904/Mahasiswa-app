import api from "./Api";

// GET semua dosen
export async function getAllDosen() {
  const res = await api.get("/dosen");
  return res.data;
}

// POST dosen baru
export async function createDosen(data) {
  const res = await api.post("/dosen", data);
  return res.data;
}

// PUT / PATCH dosen
export async function updateDosen(id, data) {
  const res = await api.put(`/dosen/${id}`, data);
  return res.data;
}

// DELETE dosen
export async function deleteDosen(id) {
  await api.delete(`/dosen/${id}`);
  return id;
}
