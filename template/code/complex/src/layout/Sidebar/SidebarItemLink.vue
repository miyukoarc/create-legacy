<!-- @format -->

<template>
  <router-link :to="to">
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: ''
    }
  }
}
</script>
