import api from "./AxiosInstance";

export const getAllMK = () => api.get("/mata_kuliah");
export const getMKById = (id) => api.get(`/mata_kuliah/${id}`);
export const createMK = (data) => api.post("/mata_kuliah", data);
export const updateMK = (id, data) => api.put(`/mata_kuliah/${id}`, data);
export const deleteMK = (id) => api.delete(`/mata_kuliah/${id}`);
