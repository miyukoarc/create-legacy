<template>
  <section class="h-[calc(100%-128px)]">
    <div class="p-16px overflow-y-scroll overflow-x-hidden">
      <transition name="breadcrumb" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </section>
</template>

<script lang="ts" setup></script>
