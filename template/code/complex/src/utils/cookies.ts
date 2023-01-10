import Cookies from 'js-cookie';

const TokenKey = '__TOKEN__';

// User
export const getToken = (tokenKey: string = TokenKey) => Cookies.get(tokenKey);
export const setToken = (
  tokenKey: string = TokenKey,
  token: string | object
) => {
  Cookies.set(tokenKey, token);
};
export const removeToken = (tokenKey: string = TokenKey) => {
  Cookies.remove(tokenKey);
};
