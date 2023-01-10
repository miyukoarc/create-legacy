import { RouteRaw } from './menu/type'
import LAYOUT from '@/layout/index.vue'

export const ROOT_ROUTE: RouteRaw = {
  path: '/',
  redirect: '/logged/welcome',
  name: 'DefaultRedirect',
  meta: {
    hidden: true
  }
}

// export const PAGE_NOT_FOUND_ROUTE: RouteRaw = {
//   path: '/:path(.*)*',
//   name: 'PageNotFound',
//   component: LAYOUT,
//   meta: {
//     title: 'ErrorPage',
//   },
//   children: [
//     {
//       path: '/:path(.*)*',
//       name: 'PageNotFound',
//       component: () => import('@/views/basePage/exception/index.vue'),
//       meta: {
//         title: 'ErrorPage',
//       },
//     },
//   ],
// };

export const LOGIN_ROUTE: RouteRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/basePage/login/index.vue'),
  meta: {
    title: '登录'
  }
}

export const REDIRECT_ROUTE: RouteRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: 'Redirect',
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'RedirectPath',
      meta: {
        hidden: true
      },
      component: () => import('@/views/basePage/redirect/index.vue')
    }
  ]
}

export const WELCOME_PAGE: RouteRaw = {
  path: '/logged',
  name: 'Logged',
  component: LAYOUT,
  children: [
    {
      path: 'welcome',
      name: 'Welcome',
      component: () => import('@/views/basePage/welcome/index.vue'),
      meta: {
        title: '欢迎'
      }
    }
  ]
}

export const constantRoutes: RouteRaw[] = [
  ROOT_ROUTE,
  LOGIN_ROUTE,
  WELCOME_PAGE,
  // PAGE_NOT_FOUND_ROUTE,
  REDIRECT_ROUTE
]
