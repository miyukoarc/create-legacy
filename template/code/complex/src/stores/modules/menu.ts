import { defineStore } from 'pinia'
import { store } from '..'
import { flatByDeep } from './../../utils/data'
import { genMenu } from '@/router/menu/helper'
import { MenuTreeItem } from '@/router/menu/type'
import { commonMenuTree } from '@/api/modules/menu'

/**
 * @param renderMenuList 用于渲染菜单
 * @param rawMenu 后台获取的菜单树
 * @param buttonAccess 按钮权限code列表
 * @param menuAccess 菜单code列表
 * @param menuRoutes 菜单url
 */
interface MenuState {
  renderMenuList: Array<any>
  rawMenu: Array<MenuTreeItem>
  buttonAccess: Array<string>
  menuAccess: Array<string>
  menuRoutes: Array<{ url: string; value: string }>
  isAddedDynamicRoutes: boolean
}

export const useMenuStore = defineStore({
  id: 'menu',
  state: (): MenuState => ({
    renderMenuList: [],
    rawMenu: [],
    buttonAccess: [],
    menuAccess: [],
    menuRoutes: [],
    isAddedDynamicRoutes: false
  }),
  getters: {
    getRenderMenuList(): Array<any> {
      return this.renderMenuList
    },
    getIsAddedDynamicRoutes(): boolean {
      return this.isAddedDynamicRoutes
    }
  },
  actions: {
    SAVE_RENDER_MENU(payload: any) {
      this.renderMenuList = payload
    },
    SAVE_RAW_MENU(payload: MenuTreeItem[]) {
      this.rawMenu = payload
    },
    SAVE_BUTTON_ACCESS(payload: Array<string>) {
      this.buttonAccess = payload
    },
    SAVE_MENU_ACCESS(payload: Array<string>) {
      this.menuAccess = payload
    },
    SAVE_MENU_ROUTES(payload: Array<{ url: string; value: string }>) {
      this.menuRoutes = payload
    },
    SET_ADDED_DYNAMIC_ROUTES_STATUS(payload: boolean) {
      this.isAddedDynamicRoutes = payload
    },
    async buildMenuAction(): Promise<any[]> {
      const rawMenu = await commonMenuTree()
      // 菜单权限列表为菜单树的第一层,按钮为第二层
      const buttonAccess = flatByDeep(rawMenu, (item) => item.code, 2)
      const menuAccess = flatByDeep(rawMenu, (item) => item.code, 1)

      const [filter, temp] = genMenu(rawMenu)
      this.SAVE_RENDER_MENU(filter)
      this.SAVE_MENU_ROUTES(temp)
      this.SAVE_RAW_MENU(rawMenu)
      this.SAVE_BUTTON_ACCESS(buttonAccess)
      this.SAVE_MENU_ACCESS(menuAccess)

      return filter
    }
  }
})

export const useMenuStoreOutside = () => {
  return useMenuStore(store)
}
