import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    cartItems: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    addToCart(state, product) {
      // Check if the product is already in the cart
      const existingProductIndex = state.cartItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // If the product is already in the cart, update the quantity
        state.cartItems[existingProductIndex].quantity += product.quantity;
      } else {
        // If the product is not in the cart, add it
        state.cartItems.push(product);
      }
    },
    removeFromCart(state, product) {
      // Remove the product from the cart
      const index = state.cartItems.findIndex((item) => item.id === product.id);
      state.cartItems.splice(index, 1);
    },
    updateCartItemQuantity(state, payload) {
      // Update the quantity of the cart item at the specified index
      state.cartItems[payload.index].quantity = payload.quantity;
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
    addToCart(context, product) {
      context.commit("addToCart", product);
    },
    removeFromCart(context, product) {
      context.commit("removeFromCart", product);
    },
    updateCartItemQuantity(context, payload) {
      context.commit("updateCartItemQuantity", payload);
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
    currentUser(state) {
      return state.user;
    },
    cartItems: (state) => state.cartItems,
    cartTotal: (state) => {
      // Calculate the total price of the items in the cart
      return state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    totalItems: (state) => {
      // Calculate the total number of items in the cart
      return state.cartItems.reduce(
        (total, item) => total + parseInt(item.quantity),
        0
      );
    },
  },
  plugins: [
    createPersistedState({
      key: "my-app",
      storage: window.localStorage,
    }),
  ],
  //   methods: {
  //     addToCart(product) {
  //       this.$store.commit("addToCart", product);
  //     },
  //   },
});
