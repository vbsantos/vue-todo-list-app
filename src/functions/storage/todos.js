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
  async editTodo(id, newTodo) {
    try {
      if (!storageAvailable("localStorage")) throw "Storage not available!";
      let todos = JSON.parse(localStorage["todos"]);
      const todo = Object.assign(
        todos.find((todo) => todo.id === id),
        newTodo
      );
      todos = todos.filter((temp_todo) => {
        if (temp_todo.id !== id) {
          return temp_todo;
        }
        return todo;
      });
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
      todos = [todo, ...todos];
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
