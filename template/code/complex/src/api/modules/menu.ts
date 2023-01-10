import { defHttp } from '@/utils/http';

/**
 * @description 获取菜单
 * @returns
 */
export const commonMenuTree = () => {
  return defHttp.get(
    { url: '/uc/menu/tree' },
    { errorReport: true, successReport: false }
  );
};
