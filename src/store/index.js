import { createStore } from "vuex";
import mutationTypes from "./mutation-types";
import Storage from "../functions/storage";

export default createStore({
  state: {
    loading: false,
    todos: [],
    oldTodoIndex: -1,
    newTodoIndex: -1,
  },
  mutations: {
    SET_LOADING_STATUS: (state, status) => {
      state.loading = status;
      console.log("loading");
    },
    SET_TODOS: (state, todos) => {
      state.todos = todos;
    },
    DRAG_TODO: (state, index) => {
      state.oldTodoIndex = index;
    },
    DROP_TODO: (state, index) => {
      state.newTodoIndex = index;
    },
    SWAP_TODOS: (state) => {
      if (state.oldTodoIndex < 0 || state.newTodoIndex < 0) {
        return;
      }
      const todo = state.todos[state.oldTodoIndex];
      state.todos.splice(state.oldTodoIndex, 1);
      state.todos.splice(state.newTodoIndex, 0, { ...todo });
      state.oldTodoIndex = -1;
      state.newTodoIndex = -1;
    },
  },
  actions: {
    loadTodos: async function({ commit }) {
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const todos = await Storage.loadTodos();
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    addTodo: async function({ commit }, todo) {
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const todos = await Storage.addTodo(todo);
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    toggleTodo: async function({ commit }, todo) {
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const todos = await Storage.toggleTodo(todo);
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    deleteTodo: async function({ commit }, todo_id) {
      commit(mutationTypes.SET_LOADING_STATUS, true);
      const todos = await Storage.deleteTodo(todo_id);
      commit(mutationTypes.SET_LOADING_STATUS, false);
      commit(mutationTypes.SET_TODOS, todos);
    },
    dragTodo: async function({ commit }, index) {
      commit(mutationTypes.DRAG_TODO, index);
    },
    dropTodo: async function({ commit }, index) {
      commit(mutationTypes.SET_LOADING_STATUS, true);
      commit(mutationTypes.DROP_TODO, index);
      commit(mutationTypes.SWAP_TODOS);
      await Storage.storeTodos(this.state.todos);
      commit(mutationTypes.SET_LOADING_STATUS, false);
    },
  },
  getters: {
    invertedTodos: (state) => {
      return state.todos.sort((a, b) => b - a);
    },
  },
});
