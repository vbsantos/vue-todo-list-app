function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
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
      return theme;
    } catch (error) {
      console.error("ERROR:", error);
      return "default";
    }
  },
};
