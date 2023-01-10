import Mock from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

export const loginMock: MockMethod[] = [
  {
    url: '/api/uc/login/pwd',
    method: 'post',
    response: () => {
      return Mock.mock({
        code: 200,
        data: '',
        msg: '成功'
      })
    }
  },
  {
    url: '/api/uc/user/my/info',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        data: {
          username: 'admin'
        },
        msg: '成功'
      })
    }
  }
]
