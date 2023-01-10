import { defHttp } from '@/utils/http';
import { AuthBody } from '../types';

/**
 * @description 获取当前登录人星系
 * @returns
 */
export const queryLoginUserInfo = () => {
  return defHttp.get(
    { url: '/uc/user/my/info' },
    { errorReport: true, successReport: false }
  );
};

/**
 * @description 用户名密码登录
 * @param payload
 * @returns
 */
export const loginPwd = (payload: AuthBody) => {
  return defHttp.post(
    { url: '/uc/login/pwd', data: payload },
    {
      errorReport: true,
      successReport: false,
    }
  );
};
