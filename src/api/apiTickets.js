/* Tanto en este archivo como en mi apiUser se centraliza el llamado de los metodos de mi Api, 
para evitar estarlos llamando en diferentes archivos y que esto genere desorder y  
futuros errores al generar muchos llamads, en un proyecto que cree anteriormente de un gestor de coworking 
se estaban haciendo varios llamados gada vez que se enviaba un dato segun el componente y la decision 
que tome fue centralizar los datos y usat useContext para manejar los datos que necesite de manera global en mi aplicacion*/

/* Tambien se uso la persistencia de datos con el localstorage en 
caso tal de que el servidor falle para que haya una persistencia 
de los datos cargando la ultima version guardada  */

import { saveToStorage, loadFromStorage } from "./storage";
import { fetchWithErrors } from "./fetchWithErrors";
const BASE_URL = "http://localhost:8081";

async function fetchWithRetry(url, options = {}, retries = 3, timeout = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const res = await fetchWithErrors(url, { ...options, signal: controller.signal });
      clearTimeout(id);

      if (!res.ok) {
        if (res.status === 404) throw new Error("404 Not Found");
        throw new Error(`Error ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 350)); 
      console.warn(`Retrying... (${i + 1})`, err.message);
    }
  }
}

export const ticketsApi = {
  getAll: async () => {
    try {
      const data = await fetchWithRetry(`${BASE_URL}/tickets`);
      saveToStorage("tickets", data); 
      return data;
    } catch (err) {
      console.warn("Usando cache local de tickets", err.message);
      return loadFromStorage("tickets"); 
    }
  },

  getById: async (id) => {
    try {
      const data = await fetchWithRetry(`${BASE_URL}/tickets/${id}`);
      return data;
    } catch (err) {
      console.warn("Error en getById, probando cache:", err.message);
      const local = loadFromStorage("tickets", []);
      return local.find((t) => t.id === id) || null; 
    }
  },

  create: async (data) => {
    try {
      const created = await fetchWithRetry(`${BASE_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const local = loadFromStorage("tickets", []);
      saveToStorage("tickets", [...local, created]); 
      return created;
    } catch (err) {
      console.error("No se pudo crear ticket:", err.message);
      throw err;
    }
  },

  update: async (id, data) => {
    try {
      const updated = await fetchWithRetry(`${BASE_URL}/tickets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let local = loadFromStorage("tickets", []);
      local = local.map((t) => (t.id === id ? updated : t));
      saveToStorage("tickets", local);
      return updated;
    } catch (err) {
      console.error("No se pudo actualizar ticket:", err.message);
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await fetchWithRetry(`${BASE_URL}/tickets/${id}`, { method: "DELETE" });
      const local = loadFromStorage("tickets", []);
      saveToStorage("tickets", local.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      console.error("No se pudo eliminar ticket:", err.message);
      throw err;
    }
  },
};
