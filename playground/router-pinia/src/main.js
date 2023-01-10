import Vue from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import Router from 'vue-router'
import { createPinia, PiniaVuePlugin } from 'pinia'

const pinia = createPinia()

Vue.use(PiniaVuePlugin)
Vue.use(Router)

new Vue({
  el: '#app',
  pinia,
  router,
  render: (h) => h(App)
})
