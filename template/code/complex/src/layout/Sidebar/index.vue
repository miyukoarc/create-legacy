<!-- @format -->

<template>
  <div class="z-0" :class="{ sidebar: !isCollapse }">
    <Logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        ref="elMenu"
        class="el-menu"
        :collapse="isCollapse"
        :default-active="activeMenu"
        :collapse-transition="false"
        mode="vertical"
        text-color="#fff"
        background-color="#252c4b"
        active-text-color="#ffd04b"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.name"
          :is-first-level="true"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { menuList } from '@/router/menu'
import { useMenuStore } from '@/stores/modules/menu'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router/composables'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

const menuStore = useMenuStore()

const { renderMenuList: routes } = storeToRefs(menuStore)

const route = useRoute()

const activeMenu = computed(() => {
  const { meta, name } = route
  if (meta?.activeMenu) return meta?.activeMenu
  return name
})
const isCollapse = ref<boolean>(false)
</script>

<style lang="scss">
.sidebar {
  width: 200px;
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }
  .el-scrollbar {
    overflow-y: auto;
    height: 100%;
  }

  .scrollbar-wrapper {
    user-select: none;
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-menu {
  border: none;
  height: 100%;
}

.search-tool {
  display: flex;
  .inline-input {
    padding: 5px 10px;
  }

  ::v-deep .el-input__inner {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
    border-bottom-color: rgba($color: #fff, $alpha: 0.3);
  }
}
</style>
