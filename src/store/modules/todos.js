import mutationTypes from "./mutation-types";
import Storage from "@/functions/storage/todos";

export const todos = {
  state: {
    todos: [],
  },

  mutations: {
    [mutationTypes.SET_TODOS]: (state, todos) => {
      state.todos = todos;
    },
    [mutationTypes.REORDER_TODOS]: (state, [oldIndex, newIndex]) => {
      const todo = state.todos.splice(oldIndex, 1)[0];
      state.todos.splice(newIndex, 0, todo);
    },
  },

  actions: {
    async loadTodos({ commit, dispatch }) {
      dispatch("setLoading", true);
      const todos = await Storage.loadTodos();
      dispatch("setLoading", false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    async addTodo({ commit, dispatch }, todo) {
      dispatch("setLoading", true);
      const todos = await Storage.addTodo(todo);
      dispatch("setLoading", false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    async editTodo({ commit, dispatch }, todo) {
      dispatch("setLoading", true);
      const todos = await Storage.editTodo(todo.id, todo);
      dispatch("setLoading", false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    async deleteTodo({ commit, dispatch }, todo_id) {
      dispatch("setLoading", true);
      const todos = await Storage.deleteTodo(todo_id);
      dispatch("setLoading", false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    async reorderTodos({ commit, dispatch, state }, index) {
      dispatch("setLoading", true);
      commit(mutationTypes.REORDER_TODOS, index);
      await Storage.storeTodos(state.todos);
      dispatch("setLoading", false);
    },
  },

  getters: {
    todos: (state) => state.todos,
  },
};
