export const getLocalStorage = (key: string) => {
  const value = typeof window !== "undefined" && localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

export const setLocalStorage = (key: string, value: any) => {
  typeof window !== "undefined" &&
    localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string) => {
  typeof window !== "undefined" && localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  typeof window !== "undefined" && localStorage.clear();
};
