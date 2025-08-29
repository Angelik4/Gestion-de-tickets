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
  },
  create: async (nuevoUsuario) => {
    const res = await fetchWithErrors(`${BASE_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    });
    if (!res.ok) throw new Error("Error creando usuario");
    return res.json();
  },
  login: async (email, password) => {
    const url = `${BASE_URL}/usuarios?email=${encodeURIComponent(email)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("No se pudo conectar");

    const list = await res.json();
    const user = list.length > 0 ? list[0] : null;

    if (!user) return null;
    return user.password.trim() === password.trim() ? user : null;
  }

};
