const STORAGE_KEY_DOSEN = "dosen";

function loadDosen() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_DOSEN)) || [];
}

function saveDosen(data) {
  localStorage.setItem(STORAGE_KEY_DOSEN, JSON.stringify(data));
}

export async function getAllDosen() {
  return Promise.resolve(loadDosen());
}

export async function createDosen(data) {
  const current = loadDosen();
  const updated = [...current, { ...data, id: Date.now() }];
  saveDosen(updated);
  return Promise.resolve(updated);
}

export async function updateDosen(id, data) {
  const current = loadDosen();
  const updated = current.map(item => item.id === id ? { ...item, ...data } : item);
  saveDosen(updated);
  return Promise.resolve(updated);
}

export async function deleteDosen(id) {
  const current = loadDosen();
  const updated = current.filter(item => item.id !== id);
  saveDosen(updated);
  return Promise.resolve(updated);
}
