import mutationTypes from "./mutation-types";
import Storage from "../../functions/storage/themes";

export const themes = {
  state: {
    theme: "default",
  },

  mutations: {
    [mutationTypes.SET_COLOR_THEME]: (state, theme) => {
      state.theme = theme;
    },
  },

  actions: {
    async toggleColorTheme({ commit, state }) {
      const theme = state.theme === "light" ? "default" : "light";
      commit(mutationTypes.SET_COLOR_THEME, theme);
      await Storage.setColorTheme(theme);
    },
    async getColorTheme({ commit }) {
      const theme = await Storage.getColorTheme();
      commit(mutationTypes.SET_COLOR_THEME, theme);
    },
  },

  getters: {
    theme: (state) => state.theme,
  },
};
