import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";

axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token
axios.defaults.headers.common['Accept'] = "application/json"


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
