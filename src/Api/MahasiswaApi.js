const STORAGE_KEY = "mahasiswa";

function loadData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function getAllMahasiswa() {
  return Promise.resolve(loadData());
}

export async function createMahasiswa(data) {
  const current = loadData();
  const updated = [...current, { ...data, id: Date.now() }];
  saveData(updated);
  return Promise.resolve(updated);
}

export async function updateMahasiswa(id, updatedData) {
  const current = loadData();
  const updated = current.map((item) =>
    item.id === id ? { ...item, ...updatedData } : item
  );
  saveData(updated);
  return Promise.resolve(updated);
}

export async function deleteMahasiswa(id) {
  const current = loadData();
  const updated = current.filter((item) => item.id !== id);
  saveData(updated);
  return Promise.resolve(updated);
}
