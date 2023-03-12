import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, user) {
      commit("setUser", user);
    },
    signup({ commit }, user) {
        commit("setUser", user);
    },
    logout({ commit }) {
      commit("setUser", null);
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
    currentUser(state) {
      return state.user;
    },
  },
  plugins: [
    createPersistedState({
      key: "my-app",
      storage: window.localStorage,
    }),
  ],
});
