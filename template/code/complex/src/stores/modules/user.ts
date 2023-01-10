import { RouteConfig } from 'vue-router'
import { useMenuStore } from './menu'
import { queryLoginUserInfo } from '@/api/modules/auth'
import { TOKEN } from '@/constant/login'
import { getToken } from '@/utils/cookies'
import { defineStore } from 'pinia'
import { store } from '..'
import router from '@/router'
import { Nullable } from '@/type/helper'

interface UserState {
  userInfo: Nullable<any>
  lastUpdateTime: number
  token?: string
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    lastUpdateTime: 0,
    token: ''
  }),
  getters: {
    getToken(): string {
      return this.token || (getToken(TOKEN) as string)
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    }
  },
  actions: {
    SAVE_USER_INFO(userInfo: any | null) {
      this.userInfo = userInfo
      this.SET_LAST_UPDATE_TIME(new Date().getTime())
    },
    SET_LAST_UPDATE_TIME(time: number) {
      this.lastUpdateTime = time
    },
    async getLoginUserInfo(): Promise<any | null> {
      if (!this.getToken) return null
      const userInfo = await queryLoginUserInfo()
      this.SAVE_USER_INFO(userInfo)
      return userInfo
    },
    async afterLoginAction(): Promise<any | null> {
      if (!this.getToken) return null
      const userInfo = await this.getLoginUserInfo()

      const menuStore = useMenuStore()
      // 未添加异步路由
      if (!menuStore.getIsAddedDynamicRoutes) {
        const routes = await menuStore.buildMenuAction()
        routes.forEach((route) => router.addRoute(route as unknown as RouteConfig))

        menuStore.SET_ADDED_DYNAMIC_ROUTES_STATUS(true)
      }

      return userInfo
    }
  }
})

export const useUserStoreOutside = () => {
  return useUserStore(store)
}
