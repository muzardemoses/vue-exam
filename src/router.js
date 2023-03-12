import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "products",
      component: () => import("@/views/Products.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/Signup.vue"),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/SearchResults.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/category/:categoryName",
      name: "CategorySearch",
      component: () => import("@/views/CategorySearchResults.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/products",
      name: "products",
      component: () => import("@/views/Products.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/product/:id/:title",
      name: "ProductDetails",
      component: () => import("@/views/ProductsDetails.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "*",
      name: "not-found",
      component: () => import("@/views/NotFound.vue"),
    },
    // {
    //   path: "/:catchAll(.*)",
    //   name: "NotFound",
    //   component: () => import("@/views/NotFound.vue"),
    // },
  ],
});

// Check local storage for auth token on page reload
if (localStorage.getItem("authToken")) {
  store.commit("setAuthToken", localStorage.getItem("authToken"));
}

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);
  const isLoggedIn = store.getters.isLoggedIn;

  if (requiresAuth && !isLoggedIn) {
    next("/login");
  } else if (requiresGuest && isLoggedIn) {
    next("/products");
  } else {
    next();
  }
});

store.subscribe((mutation) => {
  if (mutation.type === "setAuthToken") {
    localStorage.setItem("authToken", mutation.payload);
  }
});

export default router;
