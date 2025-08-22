export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromStorage = (key, fallback = []) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};
