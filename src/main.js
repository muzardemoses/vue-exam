import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/tailwind.css";

Vue.config.productionTip = false

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  newestOnTop: true,
});

new Vue({
  router,
  store,
  Toast,
  render: h => h(App),
}).$mount('#app')
