import Vue from 'vue'
import App from './App.vue'
import './assets/main.css'
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  pinia,
  render: (h) => h(App)
})
