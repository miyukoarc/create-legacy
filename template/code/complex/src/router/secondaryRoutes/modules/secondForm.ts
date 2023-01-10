import AppLayout from '@/layout/index.vue';
import { RouteRaw } from '@/router/menu/type';

export const secondForm: RouteRaw[] = [
  {
    path: '/secondForm',
    component: AppLayout,
    meta: { hidden: true },
    children: [
      {
        path: 'edit',
        name: 'SecondFormEdit',
        meta: {
          title: '编辑',
        },
        component: () => import('@/views/secondaryPage/secondForm/index.vue'),
      },
    ],
  },
];
