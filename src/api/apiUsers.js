import { fetchWithErrors } from "./fetchWithErrors";
const BASE_URL = "http://localhost:8081";

export const usersApi = {
  getAll: async () => {
    const res = await fetchWithErrors(`${BASE_URL}/usuarios`);
    if (!res.ok) throw new Error("Error cargando usuarios");
    return res.json();
  },
  getById: async (id) => {
    const res = await fetchWithErrors(`${BASE_URL}/usuarios/${id}`);
    if (!res.ok) throw new Error("Error cargando usuario");
    return res.json();
  }
};
