<!-- @format -->

<template>
  <div :class="`${pf}__container`">
    <Breadcrumb />
    <UserAvatar />
  </div>
</template>

<script lang="ts" setup>
import UserAvatar from './components/UserAvatar.vue'
import Breadcrumb from './components/Breadcrumb.vue'
const pf = 'navbar'
</script>

<style lang="scss" scoped>
$pf: navbar;

.#{$pf} {
  &__container {
    height: 64px;
    user-select: none;
    overflow: hidden;
    position: relative;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
  }
}
</style>
