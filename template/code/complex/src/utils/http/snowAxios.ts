import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { deepClone } from '../helper'
import { isFunction } from '../is'
import { RequestOptions, ResData, Result } from './axios'
import { AxiosCanceler } from './axiosCancel'
import { SnowAxiosOptions } from './axiosTransform'

export class SnowAxios {
  private axiosInstance: AxiosInstance
  private readonly options: SnowAxiosOptions

  constructor(options: SnowAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  private getTransform() {
    const { transform } = this.options
    return transform
  }

  private setupInterceptors() {
    const transform = this.getTransform()
    // type protect

    const axiosCancel = new AxiosCanceler()
    if (!transform) {
      return
    }

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform

    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const ignoreCancelToken = (config as SnowAxiosOptions).requestOptions?.ignoreCancelToken

      !ignoreCancelToken && axiosCancel.addPending(config)

      if (requestInterceptors) {
        config = requestInterceptors(config, this.options)
      }

      return config
    }, undefined)

    this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCancel.removePending(res.config)
      if (responseInterceptors) {
        res = responseInterceptors(res)
      }

      return res
    }, undefined)

    this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  request<T = any, U extends boolean = false>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<ResData<T, U>> {
    return new Promise((resolve, reject) => {
      //
      let conf: SnowAxiosOptions = deepClone(config)
      const transform = this.getTransform()
      const { requestOptions } = this.options

      const opt: RequestOptions = Object.assign({}, requestOptions, options)

      const { beforeRequestHook, transformRequestHook } = transform || {}
      if (beforeRequestHook && isFunction(beforeRequestHook)) {
        conf = beforeRequestHook(conf, opt)
      }
      conf.requestOptions = opt

      // 排序参数的特殊处理
      // const orderCfg = conf?.data?.search?.orders;
      // if (orderCfg) {
      //   conf.data.orders = orderCfg;
      //   conf.data.search.orders = undefined;
      // }

      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request eror'))
            }
            return
          }
          resolve(res as unknown as Promise<ResData<T, U>>)
        })
        .catch((e: Error) => {
          reject(e)
        })
    })
  }

  get<T = any, U extends boolean = false>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<ResData<T, U>> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any, U extends boolean = false>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<ResData<T, U>> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any, U extends boolean = false>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<ResData<T, U>> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any, U extends boolean = false>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<ResData<T, U>> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }
}
