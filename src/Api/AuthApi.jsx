import api from "./AxiosInstance";

export const registerUser = (data) => api.post("/users", data);
export const loginUser = (data) => api.post("/login", data);
