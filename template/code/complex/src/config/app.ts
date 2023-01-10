export type ThemeTypes = {
  elColorPrimary?: string;
  leftMenuBorderColor?: string;
  leftMenuBgColor?: string;
  leftMenuBgLightColor?: string;
  leftMenuBgActiveColor?: string;
  leftMenuCollapseBgActiveColor?: string;
  leftMenuTextColor?: string;
  leftMenuTextActiveColor?: string;
  logoTitleTextColor?: string;
  logoBorderColor?: string;
  topHeaderBgColor?: string;
  topHeaderTextColor?: string;
  topHeaderHoverColor?: string;
  topToolBorderColor?: string;
};
export interface AppState {
  breadcrumb: boolean;
  breadcrumbIcon: boolean;
  collapse: boolean;
  uniqueOpened: boolean;
  hamburger: boolean;
  screenfull: boolean;
  size: boolean;
  tagsView: boolean;
  tagsViewIcon: boolean;
  logo: boolean;
  fixedHeader: boolean;
  pageLoading: boolean;
  title: string;
  userInfo: string;
  footer: boolean;
}

export const appModules: AppState = {
  userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
  //   sizeMap: ['default', 'large', 'small'],
  //   mobile: false, // 是否是移动端
  title: import.meta.env.VITE_APP_TITLE, // 标题
  pageLoading: false, // 路由跳转loading

  breadcrumb: true, // 面包屑
  breadcrumbIcon: true, // 面包屑图标
  collapse: false, // 折叠菜单
  uniqueOpened: false, // 是否只保持一个子菜单的展开
  hamburger: true, // 折叠图标
  screenfull: true, // 全屏图标
  size: true, // 尺寸图标
  tagsView: true, // 标签页
  tagsViewIcon: true, // 是否显示标签图标
  logo: true, // logo
  fixedHeader: true, // 固定toolheader
  footer: true, // 显示页脚
};
