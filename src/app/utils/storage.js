const storage = localStorage;

export const getStorageItem = (key) => {
  try {
    const serializedItem = storage.getItem(key);

    if (serializedItem === null) {
      return undefined;
    }

    return JSON.parse(serializedItem);
  } catch (error) {
    return undefined;
  }
};

export const setStorageItem = (key, value) => {
  try {
    const serializedItem = JSON.stringify(value);
    storage.setItem(key, serializedItem);
  } catch (error) {
    // Ignore write errors.
  }
};
