<template>
  <el-footer
    class="text-center text-sm text-gray-900 leading-[32px]"
    height="32px"
    >{{ footerName }}</el-footer
  >
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const footerName = ref('CopyRight');
</script>

<style lang="scss"></style>
