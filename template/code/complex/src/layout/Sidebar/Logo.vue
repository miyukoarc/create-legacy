<template>
  <div class="flex bg-[#4b78ff] py-8px px-16px items-center">
    <img class="h-[48px] w-[48px]" :src="logo" alt="" />
    <span class="text-white text-16px">{{ projectName }}</span>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/img/logo.png';
import { ref } from 'vue';
const projectName = ref('标题');
</script>

<style lang="scss" scoped></style>
