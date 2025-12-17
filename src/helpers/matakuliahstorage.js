const STORAGE_KEY = "mataKuliah";

// ambil semua data
export const getMataKuliah = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// SIMPAN (CREATE / UPDATE) + VALIDASI
export const saveMataKuliah = (data, editId = null) => {
  const list = getMataKuliah();

  // 🔒 VALIDASI KUNCI
  const dosenSudahDipakai = list.some(
    (mk) =>
      Number(mk.dosenId) === Number(data.dosenId) &&
      mk.id !== editId
  );

  if (dosenSudahDipakai) {
    throw new Error("Dosen hanya boleh mengampu satu mata kuliah");
  }

  if (editId) {
    // UPDATE
    const index = list.findIndex((mk) => mk.id === editId);
    if (index === -1) throw new Error("Data tidak ditemukan");

    list[index] = { ...list[index], ...data };
  } else {
    // CREATE
    list.push({
      id: Date.now(),
      ...data,
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

// DELETE
export const deleteMataKuliah = (id) => {
  const list = getMataKuliah().filter((mk) => mk.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};
