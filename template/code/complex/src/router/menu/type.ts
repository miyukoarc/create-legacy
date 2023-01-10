import { RouteConfig } from 'vue-router';

export enum MenuType {
  MENU = 1,
  BUTTON = 2,
  CATEGORY = 3,
}

/**
 * @param code 代码
 * @param name 中文名名称
 * @param menuType 菜单类型
 * @param orderIndex 排序index
 * @param metaJson 路由元数据json对象
 */
export type MenuTreeItem = {
  id: number;
  parentId: number;
  code: string;
  name: string;
  menuType: MenuType;
  orderIndex: number;
  metaJson?: MetaConfig;
  children?: Array<MenuTreeItem>;
};

export type MetaConfig = Partial<{
  type: MenuType;
  hidden: boolean;
  icon: string;
  title: string;
  single?: boolean; // 为true时，有唯一子菜单将提供路由
}>;

export type RouteRaw = RouteConfig & {
  meta?: MetaConfig;
  children?: RouteRaw[];
};
