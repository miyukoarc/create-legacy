<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      'menu-wrapper',
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel },
      { 'title-mode': isTitle }
    ]"
  >
    <el-submenu
      v-if="item.children && item.children.length && !item.meta.single"
      :index="item.name"
      popper-append-to-body
    >
      <div class="flex items-center" slot="title">
        <Icon class="svg-icon" :icon="item.meta.icon || 'mdi:home'"></Icon>
        <span v-if="item.meta && item.meta.title" slot="title" class="ml-[5px]">
          {{ item.meta.title }}
        </span>
      </div>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.name"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
    <template v-else>
      <template v-if="theOnlyOneChild">
        <sidebar-item-link :to="resolvePath(theOnlyOneChild.path)">
          <el-menu-item
            :index="theOnlyOneChild.name"
            :class="{ 'submenu-title-noDropdown': isFirstLevel }"
            class="flex items-center"
          >
            <Icon v-if="theOnlyOneChild.meta.icon" :icon="theOnlyOneChild.meta.icon" />
            <span v-if="theOnlyOneChild.meta.title" slot="title" class="ml-5px text-14px">
              {{ theOnlyOneChild.meta.title }}
            </span>
          </el-menu-item>
        </sidebar-item-link>
      </template>
      <sidebar-title v-else :title="theOnlyOneChild.meta.title"></sidebar-title>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SidebarItem'
}
</script>

<script lang="ts" setup>
import SidebarItemLink from './SidebarItemLink.vue'
import SidebarTitle from './SidebarTitle.vue'
// 在线图标包
import { MenuType } from '@/router/menu/type'
import path from 'path-browserify'
import { computed, ref } from 'vue'
// 离线图标包

interface Props {
  item: any
  isFirstLevel: boolean
  basePath: string
}
const _props = withDefaults(defineProps<Props>(), {
  item: () => {},
  isFirstLevel: true,
  basePath: ''
})

const isCollapse = ref(false)

const showingChildNumber = computed(() => {
  if (_props.item.children) {
    const showingChildren = _props.item.children.filter((item) => {
      if (item.meta && item.meta.hidden) {
        return false
      } else {
        return true
      }
    })
    return showingChildren.length
  }
  return 0
})

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null
  }
  if (_props.item.children) {
    for (const child of _props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  // If there is no children, return itself with path removed,
  // because this.basePath already conatins item's path information
  return { ..._props.item, path: '' }
})

const isTitle = computed(() => {
  return _props.item.meta?.type === MenuType.CATEGORY //3
})

const resolvePath = (routePath: string) => {
  return path.resolve(_props.basePath, routePath)
}
</script>
