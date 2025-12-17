// ================================
// Helpers
// ================================
function loadKelas() {
  return JSON.parse(localStorage.getItem("kelas")) || [];
}

function saveKelas(data) {
  localStorage.setItem("kelas", JSON.stringify(data));
}

// ================================
// Get All Kelas (AUTO JOIN MATKUL + DOSEN)
// ================================
export async function getAllKelas() {
  const kelas = loadKelas();
  const matkul = JSON.parse(localStorage.getItem("matakuliah")) || [];
  const dosen = JSON.parse(localStorage.getItem("dosen")) || [];

return kelas.map((k) => {
  const m = matkul.find((m) => m.id === Number(k.matkulId));
  const d = dosen.find((d) => d.id === m?.dosenId);

  return {
    ...k,
    matkulKode: m?.kode || "-", // kode matkul ikut tampil
    matkulNama: m?.nama || "-",
    dosenNama: d?.nama || "-",
  };
});

}

// ================================
// CREATE
// ================================
export async function createKelas(newData) {
  const kelas = loadKelas();
  const newId = kelas.length > 0 ? Math.max(...kelas.map((k) => k.id)) + 1 : 1;

  const newKelas = {
    id: newId,
    matkulId: Number(newData.matkulId),
    namaKelas: newData.namaKelas,
    tahunAjaran: newData.tahunAjaran,
  };

  kelas.push(newKelas);
  saveKelas(kelas);
  return newKelas;
}

// ================================
// UPDATE
// ================================
export async function updateKelas(id, updatedData) {
  let kelas = loadKelas();
  kelas = kelas.map((k) =>
    k.id === Number(id)
      ? {
          ...k,
          matkulId: Number(updatedData.matkulId),
          namaKelas: updatedData.namaKelas,
          tahunAjaran: updatedData.tahunAjaran,
        }
      : k
  );

  saveKelas(kelas);
  return updatedData;
}

// ================================
// DELETE
// ================================
export async function deleteKelas(id) {
  const kelas = loadKelas().filter((k) => k.id !== Number(id));
  saveKelas(kelas);
  return true;
}
