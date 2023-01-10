import { AxiosResponse } from 'axios'
import { RequestOptions } from './axios'
import { Result } from './axios.d'

export function checkStatus(res: AxiosResponse<Result>, options: RequestOptions) {
  const { successReport, errorReport } = options

  if (!res) throw new Error('No Response Body')

  if (res.status === 200) {
    switch (res.data.code) {
      case 200:
        return res.data.data
      default:
        throw new Error(res.data.msg)
    }
  }

  if (res.status / 100 > 4 && res.status / 100 < 5) {
    console.error('请求错误！')
    throw new Error()
  }

  if (res.status / 100 > 5) {
    console.error('网络异常，请稍后！')
    throw new Error('网络异常')
  }
}
