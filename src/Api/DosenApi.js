const KEY = "data_dosen";

// Ambil semua dosen
export const getAllDosen = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

// Ambil dosen berdasarkan ID
export const getDosenById = (id) => {
  const data = getAllDosen();
  return data.find((d) => d.id === id);
};

// Tambah dosen
export const createDosen = (newData) => {
  const data = getAllDosen();
  data.push(newData);
  localStorage.setItem(KEY, JSON.stringify(data));
  return true;
};

// Update dosen
export const updateDosen = (id, updatedData) => {
  const data = getAllDosen();
  const index = data.findIndex((d) => d.id === id);

  if (index !== -1) {
    data[index] = { ...data[index], ...updatedData };
    localStorage.setItem(KEY, JSON.stringify(data));
    return true;
  }
  return false;
};

// Hapus dosen
export const deleteDosen = (id) => {
  const data = getAllDosen();
  const newData = data.filter((d) => d.id !== id);
  localStorage.setItem(KEY, JSON.stringify(newData));
  return true;
};
