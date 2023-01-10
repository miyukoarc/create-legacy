import { MenuTreeItem, MenuType } from './type'

// TODO 开发环境下使用node server进行配置
export const menuList: Array<MenuTreeItem> = [
  {
    id: 1,
    parentId: 0,
    code: 'firstMenu',
    name: '第一菜单',
    menuType: MenuType.MENU,
    orderIndex: 0,
    metaJson: {
      icon: 'mdi:home',
      single: false
    },
    children: [
      {
        id: 3,
        code: 'first',
        name: '第一子菜单',
        menuType: MenuType.MENU,
        orderIndex: 4,
        parentId: 1,
        metaJson: {
          icon: 'mdi:home'
        }
      }
    ]
  },
  {
    id: 2,
    parentId: 0,
    code: 'secondMenu',
    name: '第二菜单',
    menuType: MenuType.MENU,
    orderIndex: 0,
    metaJson: {
      icon: 'mdi:home',
      single: true
    },
    children: [
      {
        id: 4,
        code: 'second',
        name: '第二子菜单',
        menuType: MenuType.MENU,
        orderIndex: 4,
        parentId: 1,
        metaJson: {
          icon: 'mdi:home'
        }
      }
    ]
  }
]

export const devMenu = [
  {
    id: 999,
    parentId: 0,
    code: 'development',
    name: '第二菜单',
    menuType: MenuType.MENU,
    orderIndex: 0,
    metaJson: {
      icon: 'mdi:rocket-launch-outline',
      single: false
    },
    children: [
      {
        id: 9999,
        code: 'menuSetting',
        name: '菜单设置',
        menuType: MenuType.MENU,
        orderIndex: 1,
        parentId: 999,
        metaJson: {
          icon: 'mdi:home'
        }
      }
    ]
  }
]
