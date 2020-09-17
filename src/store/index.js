import Vue from "vue";
import Vuex from "vuex";

import { todos } from "./modules/todos";
import { loading } from "./modules/loading";
import { themes } from "./modules/themes";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todos,
    loading,
    themes,
  },
});
