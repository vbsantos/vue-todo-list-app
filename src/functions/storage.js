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
  async toggleTodo(toggle_todo) {
    try {
      if (!storageAvailable("localStorage")) throw "Storage not available!";
      let todos = JSON.parse(localStorage["todos"]);
      todos.find(
        (todo) => todo.id === toggle_todo.id
      ).completed = !toggle_todo.completed;
      localStorage["todos"] = JSON.stringify(todos);
      return todos;
    } catch (error) {
      console.error("ERROR:", error);
      return [];
    }
  },
  async deleteTodo(id) {
    try {
      if (!storageAvailable("localStorage")) throw "Storage not available!";
      let todos = JSON.parse(localStorage["todos"]);
      todos = todos.filter((todo) => todo.id !== id);
      localStorage["todos"] = JSON.stringify(todos);
      return todos;
    } catch (error) {
      console.error("ERROR:", error);
      return [];
    }
  },
  async addTodo(todo) {
    try {
      if (!storageAvailable("localStorage")) throw "Storage not available!";
      let todos = JSON.parse(localStorage["todos"]);
      todos = [...todos, todo];
      localStorage["todos"] = JSON.stringify(todos);
      return todos;
    } catch (error) {
      console.error("ERROR:", error);
      return [];
    }
  },
  async loadTodos() {
    try {
      if (!storageAvailable("localStorage")) throw "Storage not available!";
      return JSON.parse(localStorage["todos"]);
    } catch (error) {
      console.error("ERROR:", error);
      localStorage["todos"] = JSON.stringify([]);
      return [];
    }
  },
  async storeTodos(todos) {
    try {
      if (!storageAvailable("localStorage")) throw "Storage not available!";
      localStorage["todos"] = JSON.stringify(todos);
      return JSON.parse(localStorage["todos"]);
    } catch (error) {
      console.error("ERROR:", error);
      return todos;
    }
  },
};
