import Vue from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import Router from 'vue-router'

Vue.use(Router)

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})
