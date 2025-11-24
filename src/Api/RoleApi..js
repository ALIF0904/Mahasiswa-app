import api from "./AxiosInstance";

export const getRoles = () => api.get("/roles");
export const updateRole = (id, data) => api.put(`/roles/${id}`, data);

export const getUsers = () => api.get("/users");
export const updateUserRole = (id, role) =>
  api.patch(`/users/${id}`, { role });
