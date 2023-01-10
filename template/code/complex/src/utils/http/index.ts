import router from '@/router'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestOptions, Result } from './axios'
import { SnowAxiosOptions, SnowAxiosTransform } from './axiosTransform'
import { checkStatus } from './checkStatus'
import { SnowAxios } from './snowAxios'

const urlPrefix = '/api'

const transform: SnowAxiosTransform = {
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isReturnOriginalResponse, successReport, errorReport } = options

    // 全局loading状态
    if (options.loading) {
      //
    }

    // 返回原始响应体
    if (isReturnOriginalResponse) {
      return res
    }

    return checkStatus(res, options)
  },

  beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions) => {
    const { joinPrefix, joinTime = true, customPrefix, loading } = options

    const prefix = customPrefix ? customPrefix : urlPrefix

    if (loading) {
      //
    }

    if (joinPrefix) {
      config.url = `${prefix}${config.url}`
    }
    return config
  },

  requestInterceptors: (config: AxiosRequestConfig, options: SnowAxiosOptions) => {
    return config
  },

  requestInterceptorsCatch: (err) => {
    return Promise.reject(err)
  },
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },
  responseInterceptorsCatch: (error) => {
    const errorMsg = error.message
    // 超时处理
    if (error.message.indexOf('timeout') !== -1) {
      console.error('请求超时！')
      return false
    }
    // 未登录
    if (error.response && error.response.status === 401) {
      router.push('/login')
      return false
    }

    const { message, config } = error || {}
    const reportMessageMode = config?.requestOptions?.reportMessageMode || 'none'
    const errorReport = config?.requestOptions?.errorReport

    errorReport && console.error(errorMsg || '请求失败')
  }
}

function createAxios(opt?: Partial<SnowAxiosOptions>) {
  return new SnowAxios({
    timeout: 10 * 1000,
    urlPrefix: urlPrefix,
    transform,
    requestOptions: {
      customPrefix: '',
      joinPrefix: true,
      withToken: true,
      ignoreCancelToken: true,
      isReturnOriginalResponse: false,
      errorReport: true,
      successReport: false,
      joinTime: true,
      loading: false
    }
  })
}

export const defHttp = createAxios()
