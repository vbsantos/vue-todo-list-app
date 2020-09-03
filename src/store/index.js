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
      console.log(mutationTypes.SET_LOADING_STATUS, status);
      state.loading = status;
    },
    SET_TODOS(state, todos) {
      console.log(mutationTypes.SET_TODOS, todos);
      state.todos = todos;
    },
  },
  actions: {
    async loadTodos({ commit }) {
      console.groupCollapsed("loadTodos");
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const allTodos = await Storage.loadTodos();
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, allTodos);
      console.groupEnd("loadTodos");
    },
    async addTodo({ commit }, todo) {
      console.groupCollapsed("addTodo");
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const allTodos = await Storage.addTodo(todo);
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, allTodos);
      console.groupEnd("addTodo");
    },
    async toggleTodo({ commit }, todo) {
      console.groupCollapsed("toggleTodo");
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const allTodos = await Storage.toggleTodo(todo);
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, allTodos);
      console.groupEnd("toggleTodo");
    },
    async deleteTodo({ commit }, todo_id) {
      console.groupCollapsed("deleteTodo");
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const allTodos = await Storage.deleteTodo(todo_id);
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, allTodos);
      console.groupEnd("deleteTodo");
    },
  },
  modules: {},
});
