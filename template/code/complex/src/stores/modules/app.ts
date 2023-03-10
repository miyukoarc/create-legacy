import { appModules, AppState } from '@/config/app'
import { defineStore } from 'pinia'
import { store } from '..'

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => appModules,
  //   persist: {
  //     enabled: true,
  //   },
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb
    },
    getBreadcrumbIcon(): boolean {
      return this.breadcrumbIcon
    },
    getCollapse(): boolean {
      return this.collapse
    },
    getUniqueOpened(): boolean {
      return this.uniqueOpened
    },
    getHamburger(): boolean {
      return this.hamburger
    },
    getScreenfull(): boolean {
      return this.screenfull
    },
    getSize(): boolean {
      return this.size
    },
    getTagsView(): boolean {
      return this.tagsView
    },
    getTagsViewIcon(): boolean {
      return this.tagsViewIcon
    },
    getLogo(): boolean {
      return this.logo
    },
    getFixedHeader(): boolean {
      return this.fixedHeader
    },
    getGreyMode(): boolean {
      return this.greyMode
    },
    getPageLoading(): boolean {
      return this.pageLoading
    },
    // getLayout(): LayoutType {
    //   return this.layout;
    // },
    getTitle(): string {
      return this.title
    },
    getUserInfo(): string {
      return this.userInfo
    },
    getMobile(): boolean {
      return this.mobile
    },
    getFooter(): boolean {
      return this.footer
    }
  },
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb
    },
    setBreadcrumbIcon(breadcrumbIcon: boolean) {
      this.breadcrumbIcon = breadcrumbIcon
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    setUniqueOpened(uniqueOpened: boolean) {
      this.uniqueOpened = uniqueOpened
    },
    setHamburger(hamburger: boolean) {
      this.hamburger = hamburger
    },
    setScreenfull(screenfull: boolean) {
      this.screenfull = screenfull
    },
    setSize(size: boolean) {
      this.size = size
    },
    setTagsView(tagsView: boolean) {
      this.tagsView = tagsView
    },
    setTagsViewIcon(tagsViewIcon: boolean) {
      this.tagsViewIcon = tagsViewIcon
    },
    setLogo(logo: boolean) {
      this.logo = logo
    },
    setFixedHeader(fixedHeader: boolean) {
      this.fixedHeader = fixedHeader
    },
    setGreyMode(greyMode: boolean) {
      this.greyMode = greyMode
    },
    setPageLoading(pageLoading: boolean) {
      this.pageLoading = pageLoading
    },
    // setLayout(layout: LayoutType) {
    //   //   if (this.mobile && layout !== 'classic') {
    //   //     ElMessage.warning('?????????????????????????????????????????????');
    //   //     return;
    //   //   }
    //   //   this.layout = layout;
    //   //   wsCache.set('layout', this.layout);
    // },
    setTitle(title: string) {
      this.title = title
    },
    // setIsDark(isDark: boolean) {
    //   this.isDark = isDark;
    //   if (this.isDark) {
    //     document.documentElement.classList.add('dark');
    //     document.documentElement.classList.remove('light');
    //   } else {
    //     document.documentElement.classList.add('light');
    //     document.documentElement.classList.remove('dark');
    //   }
    //   wsCache.set('isDark', this.isDark);
    // },
    // setCurrentSize(currentSize: ElementPlusSize) {
    //   this.currentSize = currentSize;
    //   wsCache.set('currentSize', this.currentSize);
    // },
    setMobile(mobile: boolean) {
      this.mobile = mobile
    },
    // setTheme(theme: ThemeTypes) {
    //   this.theme = Object.assign(this.theme, theme);
    //   wsCache.set('theme', this.theme);
    // },
    // setCssVarTheme() {
    //   for (const key in this.theme) {
    //     setCssVar(
    //       `--${humpToUnderline(key)}`,
    //       (this.theme as Record<string, any>)[key]
    //     );
    //   }
    // },
    setFooter(footer: boolean) {
      this.footer = footer
    }
  }
})

/**
 * @description use store outside setup
 * @returns
 */
export const useAppStoreOutside = () => {
  return useAppStore(store)
}
