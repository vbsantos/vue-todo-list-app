function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

export default {
  async setColorTheme(theme) {
    try {
      if (!storageAvailable("localStorage")) throw "Storage not available!";
      localStorage["color-theme"] = theme;
      return theme;
    } catch (error) {
      console.error("ERROR:", error);
      return theme;
    }
  },
  async getColorTheme() {
    try {
      if (!storageAvailable("localStorage")) throw "Storage not available!";
      const theme = localStorage["color-theme"];
      return theme ? theme : "default";
    } catch (error) {
      console.error("ERROR:", error);
      return "default";
    }
  },
};
