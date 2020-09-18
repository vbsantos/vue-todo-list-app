import mutationTypes from "./mutation-types";

export const editmode = {
  state: {
    editingTodoId: null,
  },

  mutations: {
    [mutationTypes.SET_EDITING_TODO]: (state, todo_id) => {
      state.editingTodoId = todo_id;
    },
  },

  actions: {
    async startEditMode({ commit, state }, todo_id) {
      if (todo_id === state.editingTodoId) return;
      commit(mutationTypes.SET_EDITING_TODO, todo_id);
    },
    async stopEditMode({ commit }) {
      commit(mutationTypes.SET_EDITING_TODO, null);
    },
  },

  getters: {
    editing: (state) => state.editingTodoId,
  },
};
