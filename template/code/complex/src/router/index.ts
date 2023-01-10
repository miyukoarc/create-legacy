import Vue from 'vue';
import VueRouter from 'vue-router';
import { constantRoutes } from './constantRoutes';
import { createPermissionGuard } from './guard/permissionGuard';
import { secondaryRoutes } from './secondaryRoutes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [...constantRoutes, ...secondaryRoutes],
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition;
    else return { x: 0, y: 0 };
  },
});

createPermissionGuard(router);

export default router;
