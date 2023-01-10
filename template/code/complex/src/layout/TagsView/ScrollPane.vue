<!-- @format -->

<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>
<script lang="ts">
export default {
  name: 'ScrollPane'
}
</script>
<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'

const parent = inject<any>('parent')

const tagSpacing = 4

const scrollContainer = ref<any>(null)

const scrollWrapper = computed(() => scrollContainer.value?.$refs.wrap)

const emit = defineEmits(['scroll'])

const emitScroll = () => {
  emit('scroll')
}

onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true)
})

onUnmounted(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll)
})

const handleScroll = (e) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const scrollWrap = scrollWrapper.value
  scrollWrap.scrollLeft = scrollWrap.scrollLeft + eventDelta / 4
}

const moveToTarget = (currentTag: HTMLElement) => {
  const container = scrollContainer.value.$el as HTMLElement
  const containerWidth = container.offsetWidth
  const scrollWrap = scrollWrapper.value
  // eslint-disable-next-line
  const tagList = parent.value
  // this.$parent.$refs.tag as any[];

  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    scrollWrap.scrollLeft = 0
  } else if (lastTag === currentTag) {
    scrollWrap.scrollLeft = scrollWrap.scrollWidth - containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = tagList.findIndex((item) => item === currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]
    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagSpacing
    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagSpacing

    if (afterNextTagOffsetLeft > scrollWrap.scrollLeft + containerWidth) {
      scrollWrap.scrollLeft = afterNextTagOffsetLeft - containerWidth
    } else if (beforePrevTagOffsetLeft < scrollWrap.scrollLeft) {
      scrollWrap.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}

defineExpose({
  moveToTarget
})
</script>

<style lang="scss">
.scroll-container {
  .el-scrollbar__bar {
    bottom: 0px;
  }

  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}
</style>
