<template>
  <div class="sidebar-title">{{ title }}</div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="scss" scoped>
.el-menu {
  .title-mode:first-child {
    .sidebar-title {
      border-top: none;
    }
  }
}
.sidebar-title {
  // width: 100%;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.3);
  margin: 0 40px;
  padding: 10px 0px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
}
</style>
