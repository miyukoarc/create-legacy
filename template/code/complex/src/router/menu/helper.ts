import Layout from '@/layout/index.vue'
import { MenuTreeItem } from './type'

const modules = import.meta.glob('../../views/primaryPage/**/index.vue')
// 动态加载组件
function getComponents(code: string) {
  return modules[`../../views/primaryPage/${code}/index.vue`]
}

/**
 * @description 构造路由表
 * @param arr
 * @returns
 */
export const genMenu = (arr: Array<MenuTreeItem>): [Array<any>, Array<any>] => {
  // 搜索索引
  const searchSource: Array<any> = []

  return [
    filterTree(
      arr.sort((a, b) => a.orderIndex - b.orderIndex),
      (node) => {
        // 1菜单 2权限 3分类
        return node.menuType !== 2
      },
      (data, parentNode, deep) => {
        if (parentNode && data.menuType !== 3) {
          searchSource.push({
            url: `/${parentNode.code}/${data.code}`,
            value: data.name
          })
        }
        const meta = data.metaJson
        return {
          path: data.parentId === 0 ? `/${data.code}` : data.code,
          name: data.code.charAt(0).toUpperCase() + data.code.slice(1),
          component: data.parentId === 0 ? Layout : getComponents(data.code),
          meta: parentNode
            ? {
                ...meta,
                type: data.menuType,
                title: data.name
              }
            : {
                ...meta,
                type: data.menuType,
                title: data.name,
                icon: meta ? meta.icon : 'mdi:home'
              }
        }
      }
    ),
    searchSource.sort((a, b) => a.orderIndex - b.orderIndex)
  ]
}

/**
 * @description 遍历并过滤树
 * @param tree
 * @param validate
 * @param param
 * @param arr
 * @returns
 */
/* eslint-disable */
export function filterTree(
  tree: Array<any> = [],
  validate: { (...args: any): any },
  callback: { (...args: any): any },
  parentNode: any = null,
  arr: Array<any> = [],
  deep: number = 0
) {
  if (!tree.length) return []
  for (const item of tree) {
    if (!validate.apply(null, [item, parentNode])) continue
    const node = {
      ...callback({ ...item }, parentNode, deep),
      children: []
    }
    arr.push(node)
    if (item.children && item.children.length)
      filterTree(item.children, validate, callback, item, node.children, deep + 1)
  }
  return arr
}
