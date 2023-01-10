import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store as pinia } from '@/stores/index';
import 'virtual:windi.css';
import ElementUI from 'element-ui';
import '@/assets/style/index.scss';
import Iconify from '@/plugin/iconify/index';

Vue.use(Iconify);
Vue.use(ElementUI);

new Vue({
  el: '#app',
  pinia,
  router,
  render: (h) => h(App),
});
