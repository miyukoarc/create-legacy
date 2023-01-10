import AppLayout from '@/layout/index.vue'
import { RouteRaw } from '@/router/menu/type'

export const firstForm: RouteRaw[] = [
  {
    path: '/firstForm',
    component: AppLayout,
    meta: { hidden: true },
    children: [
      {
        path: 'edit',
        name: 'FirstFormEdit',
        meta: {
          title: '编辑'
        },
        component: () => import('@/views/secondaryPage/firstForm/index.vue')
      }
    ]
  }
]
