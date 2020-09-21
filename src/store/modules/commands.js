import mutationTypes from "./mutation-types";

export const commands = {
  state: {
    undo: [],
    redo: [],
  },

  mutations: {
    [mutationTypes.SET_COMMANDS]: (state, command) => {
      state.undo.push(command);
      state.redo = [];
    },
    [mutationTypes.UNDO_COMMAND]: (state) => {
      const command = state.undo.pop();
      state.redo.push(command);
    },
    [mutationTypes.REDO_COMMAND]: (state) => {
      const command = state.redo.pop();
      state.undo.push(command);
    },
  },

  actions: {
    async addCommand({ commit }, commands) {
      const command = {
        redo: commands[0],
        undo: commands[1],
      };
      commit(mutationTypes.SET_COMMANDS, command);
    },
    async undoCommand({ state, dispatch, commit }) {
      if (state.undo.length === 0) return;
      state["undo"][state.undo.length - 1]["undo"]();
      commit(mutationTypes.UNDO_COMMAND);
    },
    async redoCommand({ state, dispatch, commit }) {
      if (state.redo.length === 0) return;
      state["redo"][state.redo.length - 1]["redo"]();
      commit(mutationTypes.REDO_COMMAND);
    },
  },
};
