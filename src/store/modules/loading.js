import mutationTypes from "./mutation-types";

export const loading = {
  state: {
    loading: false,
  },

  mutations: {
    [mutationTypes.SET_LOADING_STATUS]: (state, status) => {
      state.loading = status;
    },
  },

  actions: {
    async setLoading({ commit }, status) {
      commit(mutationTypes.SET_LOADING_STATUS, status);
    },
  },

  getters: {
    loading: (state) => state.loading,
  },
};
