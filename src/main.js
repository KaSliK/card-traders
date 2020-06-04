import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";


axios.interceptors.request.use(
   config => {
     const token = store.getters.token;
     if (token) {
       config.headers.common["Authorization"] = `Bearer ${token}`;
       config.headers.common["Accept"] = "application/json";
     }
     return config;
   },
   error => {
     return Promise.reject(error);
   }
);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created () {
      this.$store.dispatch('getCategories')
      this.$store.dispatch('getSubCategories')
  },
  render: h => h(App)
}).$mount('#app')
