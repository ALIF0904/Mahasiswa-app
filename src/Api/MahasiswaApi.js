import api from "./Api";

// GET
export async function getAllMahasiswa() {
  const res = await api.get("/mahasiswa");
  return res.data;
}

// CREATE
export async function createMahasiswa(data) {
  const payload = {
    nim: data.nim,
    nama: data.nama,
    status: data.status ?? "Aktif",
    maxSks: data.maxSks ?? 24,
    sksTerpakai: data.sksTerpakai ?? 0,
  };

  const res = await api.post("/mahasiswa", payload);
  return res.data;
}

// UPDATE
export async function updateMahasiswa(id, data) {
  const res = await api.patch(`/mahasiswa/${id}`, data);
  return res.data;
}

// DELETE
export async function deleteMahasiswa(id) {
  const res = await api.delete(`/mahasiswa/${id}`);
  return res.data;
}
