import { defineStore } from 'pinia'
import { store } from '..'
import { Route } from 'vue-router'
import router from '@/router'

export interface ITagView extends Partial<Route> {
  title?: string
}

export interface ITagsViewState {
  visitedViews: ITagView[]
  cachedViews: (string | undefined)[]
  activedViews: ITagView
}

export const useTagStore = defineStore({
  id: 'tag',
  state: (): ITagsViewState => ({
    visitedViews: [],
    cachedViews: [],
    activedViews: {}
  }),
  actions: {
    SAVE_ACIVED_VIEW(view: ITagView) {
      this.activedViews = view
    },
    CLEAR_VISITED_VIEWS() {
      this.visitedViews = []
    },
    ADD_VISITED_VIEW(view: ITagView) {
      if (this.visitedViews.some((v) => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: (view && view.meta?.title) || 'no-name'
        })
      )
    },
    ADD_CACHED_VIEW(view: ITagView) {
      if (view.name === null) return
      if (this.cachedViews.includes(view.name)) return
      // if (!view.meta.noCache) {
      //     this.cachedViews.push(view.name);
      // }
    },
    DEL_VISITED_VIEW(view: ITagView) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW(view: ITagView) {
      if (view.name === null) return
      const index = this.cachedViews.indexOf(view.name)
      index > -1 && this.cachedViews.splice(index, 1)
    },
    DEL_OTHERS_VISITED_VIEWS(view: ITagView) {
      this.visitedViews = this.visitedViews.filter((v: ITagView) => {
        return v.meta?.affix || v.path === view.path
      })
    },
    DEL_OTHERS_CACHED_VIEWS(view: ITagView) {
      if (view.name === null) return
      const index = this.cachedViews.indexOf(view.name)
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1)
      } else {
        // if index = -1, there is no cached tags
        this.cachedViews = []
      }
    },
    DEL_ALL_VISITED_VIEWS() {
      // keep affix tags
      const affixTags = this.visitedViews.filter((tag: ITagView) => tag.meta?.affix)
      this.visitedViews = affixTags
    },
    DEL_ALL_CACHED_VIEWS() {
      this.cachedViews = []
    },
    UPDATE_VISITED_VIEW(view: ITagView) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
    addView(view: ITagView) {
      this.ADD_VISITED_VIEW(view)
      this.ADD_CACHED_VIEW(view)
    },
    addVisitedView(view: ITagView) {
      if (view.meta.hidden) return
      this.ADD_VISITED_VIEW(view)
    },
    delView(view: ITagView) {
      this.DEL_VISITED_VIEW(view)
      this.DEL_CACHED_VIEW(view)
    },
    delCachedView(view: ITagView) {
      this.DEL_CACHED_VIEW(view)
    },
    delOthersViews(view: ITagView) {
      this.DEL_OTHERS_VISITED_VIEWS(view)
      this.DEL_OTHERS_CACHED_VIEWS(view)
    },
    delAllViews() {
      this.DEL_ALL_VISITED_VIEWS()
      this.DEL_ALL_CACHED_VIEWS()
    },
    delAllCachedViews() {
      this.DEL_ALL_CACHED_VIEWS()
    },
    updateVisitedView(view: ITagView) {
      this.UPDATE_VISITED_VIEW(view)
    },
    refreshCurrentPage(view: ITagView = this.activedViews) {
      this.delCachedView(view)
      const { fullPath } = view
      const ps = Promise.resolve()

      ps.then(() => {
        router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
  }
})

export const useTagStoreOutside = () => {
  return useTagStore(store)
}
