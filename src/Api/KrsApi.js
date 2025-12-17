function loadKRS() {
  return JSON.parse(localStorage.getItem("krs")) || [];
}
function saveKRS(data) {
  localStorage.setItem("krs", JSON.stringify(data));
}

function loadMahasiswa() {
  return JSON.parse(localStorage.getItem("mahasiswa")) || [];
}
function saveMahasiswa(data) {
  localStorage.setItem("mahasiswa", JSON.stringify(data));
}

function updateMahasiswaSKS(mahasiswaId) {
  const krs = loadKRS();
  const mahasiswa = loadMahasiswa();
  const matkul = JSON.parse(localStorage.getItem("matakuliah")) || [];

  const totalSks = krs
    .filter((k) => k.mahasiswaId === Number(mahasiswaId))
    .reduce((sum, k) => {
      const mk = matkul.find((m) => m.id === k.mataKuliahId);
      return sum + (mk?.sks || 0);
    }, 0);

  const updatedMahasiswa = mahasiswa.map((m) =>
    m.id === Number(mahasiswaId) ? { ...m, sksTerpakai: totalSks } : m
  );

  saveMahasiswa(updatedMahasiswa);
}

// ================================
// GET ALL KRS
// ================================
export async function getAllKRS() {
  const krs = loadKRS();
  const mahasiswa = loadMahasiswa();
  const matakuliah = JSON.parse(localStorage.getItem("matakuliah")) || [];
  const dosen = JSON.parse(localStorage.getItem("dosen")) || [];

  return krs.map((k) => {
    const mhs = mahasiswa.find((m) => m.id === Number(k.mahasiswaId));
    const mk = matakuliah.find((mk) => mk.id === Number(k.mataKuliahId));
    const dsn = dosen.find((d) => d.id === mk?.dosenId);

    return {
      ...k,
      mahasiswaNama: mhs?.nama || "-",
      mataKuliahNama: mk?.nama || "-",
      sks: mk?.sks || 0,
      dosenNama: dsn?.nama || "-",
    };
  });
}

// ================================
// CREATE KRS
// ================================
export async function createKRS(newData) {
  const krs = loadKRS();
  const mahasiswa = loadMahasiswa();
  const matkul = JSON.parse(localStorage.getItem("matakuliah")) || [];

  const exists = krs.some(
    (k) =>
      k.mahasiswaId === Number(newData.mahasiswaId) &&
      k.mataKuliahId === Number(newData.mataKuliahId)
  );
  if (exists) throw new Error("Mahasiswa sudah mengambil mata kuliah ini");

  const mhs = mahasiswa.find((m) => m.id === Number(newData.mahasiswaId));
  const mk = matkul.find((m) => m.id === Number(newData.mataKuliahId));
  const totalSks = (mhs?.sksTerpakai || 0) + (mk?.sks || 0);

  if (totalSks > mhs.maxSks) throw new Error("Melebihi batas SKS mahasiswa");

  const newId = krs.length > 0 ? Math.max(...krs.map((k) => k.id)) + 1 : 1;
  const newKRS = { id: newId, ...newData };

  krs.push(newKRS);
  saveKRS(krs);

  updateMahasiswaSKS(newData.mahasiswaId);
  return newKRS;
}

// ================================
// UPDATE KRS
// ================================
export async function updateKRS(id, updatedData) {
  let krs = loadKRS();
  const mahasiswa = loadMahasiswa();
  const matkul = JSON.parse(localStorage.getItem("matakuliah")) || [];

  const exists = krs.some(
    (k) =>
      k.mahasiswaId === Number(updatedData.mahasiswaId) &&
      k.mataKuliahId === Number(updatedData.mataKuliahId) &&
      k.id !== Number(id)
  );
  if (exists) throw new Error("Mahasiswa sudah mengambil mata kuliah ini");

  const mhs = mahasiswa.find((m) => m.id === Number(updatedData.mahasiswaId));
  const mk = matkul.find((m) => m.id === Number(updatedData.mataKuliahId));
  const totalSks = krs
    .filter((k) => k.mahasiswaId === Number(updatedData.mahasiswaId) && k.id !== Number(id))
    .reduce((sum, k) => {
      const m = matkul.find((m) => m.id === k.mataKuliahId);
      return sum + (m?.sks || 0);
    }, 0) + (mk?.sks || 0);

  if (totalSks > mhs.maxSks) throw new Error("Melebihi batas SKS mahasiswa");

  krs = krs.map((k) => (k.id === Number(id) ? { ...k, ...updatedData } : k));
  saveKRS(krs);

  updateMahasiswaSKS(updatedData.mahasiswaId);
  return updatedData;
}

// ================================
// DELETE KRS
// ================================
export async function deleteKRS(id) {
  const krs = loadKRS();
  const k = krs.find((k) => k.id === Number(id));
  if (!k) return false;

  const filtered = krs.filter((k) => k.id !== Number(id));
  saveKRS(filtered);

  updateMahasiswaSKS(k.mahasiswaId);
  return true;
}
