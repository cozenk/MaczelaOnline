export const getLocalStorageItem = (key = "") => {
  if (key) return JSON.parse(window.localStorage.getItem(key));
};

export const setLocalStorageItem = (key = "", value = null) => {
  if (key && value) {
    if (typeof value === "object")
      return window.localStorage.setItem(key, JSON.stringify(value));
  }
};
