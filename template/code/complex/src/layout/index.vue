<!-- @format -->

<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container" :style="{ 'margin-left': isCollapse ? '64px' : '200px' }">
      <Navbar />
      <TagsView />
      <AppMain />
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import AppMain from './AppMain.vue'
// import Breadcrumb from './Navbar/components/Breadcrumb.vue';
import Sidebar from './Sidebar/index.vue'
import Navbar from './Navbar/index.vue'
import Footer from './Footer.vue'
import TagsView from './TagsView/index.vue'

const isCollapse = ref(false)
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.main-container {
  position: relative;
  height: 100%;
  transition: margin-left 0.28s;
}

.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  height: 100%;
  font-size: 0;
  transition: width 0.28s;
}
</style>
