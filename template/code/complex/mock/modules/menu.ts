import Mock from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';
import { menuList } from '../../src/router/menu/index';

export const menuMock: MockMethod[] = [
  {
    url: '/api/uc/menu/tree',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        data: menuList,
        msg: '成功',
      });
    },
  },
];
