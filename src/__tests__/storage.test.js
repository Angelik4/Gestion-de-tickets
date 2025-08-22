import { saveToStorage, loadFromStorage } from "../api/storage";

beforeEach(() => localStorage.clear());

test("saveToStorage guarda y loadFromStorage recupera", () => {
  const data = [{ id: 1, titulo: "Test" }];
  saveToStorage("tickets", data);
  expect(loadFromStorage("tickets")).toEqual(data);
});

test("loadFromStorage devuelve fallback si no existe la clave", () => {
  expect(loadFromStorage("tickets", [])).toEqual([]);
});
