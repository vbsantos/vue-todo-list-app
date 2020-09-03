import { createStore } from "vuex";
import mutationTypes from "./mutation-types";
import Storage from "../functions/storage.js";

export default createStore({
  state: {
    loading: false,
    todos: [],
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loading = status;
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
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
    async toggleTodo({ commit }, todo) {
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const todos = await Storage.toggleTodo(todo);
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    async deleteTodo({ commit }, todo_id) {
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const todos = await Storage.deleteTodo(todo_id);
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, todos);
    },
  },
  modules: {},
});
