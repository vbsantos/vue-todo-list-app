import mutationTypes from "./mutation-types";
import Storage from "../../functions/storage/todos";

export const todos = {
  state: {
    loading: false,
    todos: [],
  },

  mutations: {
    [mutationTypes.SET_LOADING_STATUS]: (state, status) => {
      state.loading = status;
    },
    [mutationTypes.SET_TODOS]: (state, todos) => {
      state.todos = todos;
    },
    [mutationTypes.REORDER_TODOS]: (state, [oldIndex, newIndex]) => {
      const todo = state.todos.splice(oldIndex, 1)[0];
      state.todos.splice(newIndex, 0, todo);
    },
  },

  actions: {
    async loadTodos({ commit }) {
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const todos = await Storage.loadTodos();
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    async addTodo({ commit }, todo) {
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const todos = await Storage.addTodo(todo);
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    async editTodo({ commit }, todo) {
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const todos = await Storage.editTodo(todo.id, todo);
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    async deleteTodo({ commit }, todo_id) {
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const todos = await Storage.deleteTodo(todo_id);
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    async reorderTodos({ commit, state }, index) {
      commit(mutationTypes.SET_LOADING_STATUS, true);
      commit(mutationTypes.REORDER_TODOS, index);
      await Storage.storeTodos(state.todos);
      commit(mutationTypes.SET_LOADING_STATUS, false);
    },
  },

  getters: {
    todos: (state) => state.todos,
    loading: (state) => state.loading,
  },
};
