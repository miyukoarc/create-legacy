import { createPinia, PiniaVuePlugin } from 'pinia';
// import piniaPersist from 'pinia-plugin-persist';
import Vue from 'vue';

Vue.use(PiniaVuePlugin);
const store = createPinia();
// store.use(piniaPersist);

export { store };
