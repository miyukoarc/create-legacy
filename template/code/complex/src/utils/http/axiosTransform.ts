import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestOptions, Result } from './axios';

export interface SnowAxiosOptions extends AxiosRequestConfig {
  urlPrefix?: string;
  transform?: SnowAxiosTransform;
  requestOptions?: RequestOptions;
}

export abstract class SnowAxiosTransform {
  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  requestInterceptors?: (config: AxiosRequestConfig, options: SnowAxiosOptions) => AxiosRequestConfig;

  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  requestInterceptorsCatch?: (error: Error) => void;

  responseInterceptorsCatch?: (error: any) => void;
}
