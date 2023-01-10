import { useMenuStoreOutside } from '@/stores/modules/menu';
import { useUserStoreOutside } from '@/stores/modules/user';
import { getToken } from '@/utils/cookies';
import VueRouter, { NavigationGuardNext, Route } from 'vue-router';

const whiteList = ['/login']; // no redirect whitelist

export function createPermissionGuard(router: VueRouter) {
  //https://github.com/vuejs/pinia/issues/1630
  const menuStore = useMenuStoreOutside();
  const userStore = useUserStoreOutside();
  // eslint-disable-next-line
  router.beforeEach(
    async (to: Route, from: Route, next: NavigationGuardNext) => {
      const hasToken = getToken();
      if (hasToken) {
        if (to.path.includes('/login')) {
          next('/');
          return;
        }
      }

      if (whiteList.includes(to.path)) {
        next();
        return;
      }

      if (!hasToken) {
        next(`/login?redirect=${to.path}`);
        return;
      }

      if (!userStore.getLastUpdateTime) {
        try {
          console.log('userinfo');
          await userStore.getLoginUserInfo();
          //   await TreeModule.commonDeptTree(); //菜单
          //   window.watermark = new Watermark(UserModule.myInfo.username);
        } catch (err) {
          next();
          return;
        }
      }

      if (menuStore.getIsAddedDynamicRoutes) {
        next();
        return;
      }

      const routes = (await menuStore.buildMenuAction()) as Array<any>;

      console.log(routes);

      routes.concat({
        path: '*',
        redirect: '/404',
      });

      routes.forEach((route) => {
        router.addRoute(route);
      });

      menuStore.SET_ADDED_DYNAMIC_ROUTES_STATUS(true);

      if (to.name === '404') {
        next({ path: to.path, replace: true, query: to.query });
      } else {
        const redirectPath = (from.query.redirect || to.path) as string;
        const redirect = decodeURIComponent(redirectPath);
        const nextConfig =
          to.path === redirect ? { ...to, replace: true } : { path: redirect };
        next(nextConfig as any);
      }
    }
  );
}
