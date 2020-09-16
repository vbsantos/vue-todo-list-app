import Vue from "vue";
import Vuex from "vuex";

import { todos } from "./modules/todos";
import { themes } from "./modules/themes";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todos,
    themes,
  },
});
