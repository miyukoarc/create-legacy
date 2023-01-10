export type ResData<U, T extends boolean = true> = T extends true ? PageBody<U> : U;

export type Result<U = any, T extends boolean = true> = {
  code: number;
  msg: string;
  data: ResData<U, T>;
  t: number;
};

export type PageBody<T = any> = {
  pageSize: number;
  pageNumber: number;
  total: number;
  pages: number;
  records: T;
};

/**
 * @param customPrefix 自定义前缀 适用于多proxy的情况
 * @param joinPrefix 请求地址前缀 默认true请不要修改
 * @param withToken 携带token 默认true请不要修改
 * @param ignoreCancelToken 忽略重复请求 默认false
 * @param isReturnOriginalResponse 返回原始response body false
 * @param reportMessageMode 消息提示类型 默认“message”
 * @param errorReport 打开消息错误提示 默认false
 * @param successReport 打开成功消息提示 默认false
 * @param joinTime 请求增加时间 未实现//TODO
 * @param loading 全局loading状态，作用于表格 默认false
 * @param queue 队列请求
 */
export interface RequestOptions {
  customPrefix?: string;
  joinPrefix?: boolean;
  withToken?: boolean;
  ignoreCancelToken?: boolean;
  isReturnOriginalResponse?: boolean;
  errorReport?: boolean;
  successReport?: boolean;
  joinTime?: boolean;
  loading?: boolean; // 全局loading
  queue?: boolean;
}
