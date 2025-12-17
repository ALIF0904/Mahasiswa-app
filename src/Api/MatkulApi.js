const STORAGE_KEY_MATKUL = "matakuliah";

function loadMatkul() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_MATKUL)) || [];
}

function saveMatkul(data) {
  localStorage.setItem(STORAGE_KEY_MATKUL, JSON.stringify(data));
}

// GET ALL dengan menambahkan nama dosen
export async function getAllMataKuliah() {
  const current = loadMatkul();
  const dosen = JSON.parse(localStorage.getItem("dosen")) || [];
  const updated = current.map((m) => {
    const d = dosen.find((d) => d.id === m.dosenId);
    return { ...m, dosenNama: d ? d.nama : "-" };
  });
  return Promise.resolve(updated);
}

// CREATE
export async function createMataKuliah(data) {
  if (!data.nama || !data.sks || !data.dosenId || !data.kode) {
    return Promise.reject("Kode, Nama, SKS dan Dosen harus diisi!");
  }
  const current = loadMatkul();
  const updated = [...current, { ...data, id: Date.now() }];
  saveMatkul(updated);
  return Promise.resolve(updated);
}

// UPDATE
export async function updateMataKuliah(id, data) {
  const current = loadMatkul();
  const updated = current.map((item) =>
    item.id === id ? { ...item, ...data } : item
  );
  saveMatkul(updated);
  return Promise.resolve(updated);
}

// DELETE
export async function deleteMataKuliah(id) {
  const current = loadMatkul();
  const updated = current.filter((item) => item.id !== id);
  saveMatkul(updated);
  return Promise.resolve(updated);
}
