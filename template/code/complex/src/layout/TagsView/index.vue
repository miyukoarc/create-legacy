<!-- @format -->

<template>
  <div
    ref="tagInstance"
    id="tags-view-container"
    class="bg-gray-200 tags-view-container"
  >
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{
          path: tag.path,
          query: tag.query,
          fullPath: tag.fullPath,
        }"
        :style="{
          color: isActive(tag) ? '#fff' : '#495060',
          'background-color': isActive(tag) ? `${theme}` : '#fff',
          border: isActive(tag) ? `1px solid ${theme}` : '1px solid #d8dce5',
        }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="() => handleClick(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.meta.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TagsView',
};
</script>

<script lang="ts" setup>
import ScrollPane from './ScrollPane.vue';
import path from 'path-browserify';
import { RouteConfig } from 'vue-router';
import { computed, nextTick, onMounted, provide, ref, watch } from 'vue';
import { ITagView, useTagStore } from '@/stores/modules/tag';
import router from '@/router';
import { useRoute } from 'vue-router/composables';

const visible = ref(false);
const top = ref<number>(0);
const left = ref<number>(0);
const selectedTag = ref<ITagView>({});
const affixTags = ref<ITagView[]>([]);

const theme = ref('#4b78ff');
const tagStore = useTagStore();
const visitedViews = computed(() => tagStore.visitedViews);

const route = useRoute();
const tagInstance = ref<any>(null);
const tag = ref<any>(null); //links
const scrollPane = ref<any>(null);
provide('parent', tag);

const handleClick = (tag) => {
  return !isAffix(tag) ? closeSelectedTag(tag) : '';
};

const closeMenu = () => {
  visible.value = false;
};

const handleScroll = () => {
  closeMenu();
};

const openMenu = (tag: ITagView, e: MouseEvent) => {
  const menuMinWidth = 105;
  const offsetLeft = tagInstance.value.getBoundingClientRect().left; // container margin left
  const offsetWidth = (tagInstance.value as HTMLElement).offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const leftOff = e.clientX - offsetLeft;
  if (leftOff > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = leftOff;
  }
  top.value = e.clientY;
  visible.value = true;
  selectedTag.value = tag;
};

const toLastView = (visitedViews: ITagView[], view: ITagView) => {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push(latestView.fullPath);
  } else {
    // Default redirect to the home page if there is no tags-view, adjust it if you want
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath });
    } else {
      router.push('/');
    }
  }
};

/**
 * @description 关闭选中标签也
 * @param view
 */
const closeSelectedTag = (view: ITagView) => {
  tagStore.delView(view);
  if (isActive(view)) {
    toLastView(tagStore.visitedViews, view);
  }
};

const closeOthersTags = () => {
  if (
    selectedTag.value.fullPath !== route.path &&
    selectedTag.value.fullPath !== undefined
  ) {
    router.push(selectedTag.value.fullPath);
  }
  tagStore.delOthersViews(selectedTag.value);
  moveToCurrentTag();
};

const closeAllTags = (view: ITagView) => {
  tagStore.delAllViews();
  if (affixTags.value.some((tag) => tag.path === route.path)) {
    return;
  }
  toLastView(tagStore.visitedViews, view);
};

const refreshSelectedTag = (view: ITagView) => {
  tagStore.delCachedView(view);
  const { fullPath } = view;
  nextTick(() => {
    router.replace({
      path: '/redirect' + fullPath,
    });
  });
};

const moveToCurrentTag = () => {
  // eslint-disable-next-line
  //   const tags = this.$refs.tag as any[];
  const tags = tag.value || [];

  nextTick(() => {
    for (const tag of tags) {
      if ((tag.to as ITagView).path === route.path) {
        scrollPane.value.moveToTarget(
          // eslint-disable-next-line
          tag as any
        );
        // When query is different then update
        if ((tag.to as ITagView).fullPath !== route.fullPath) {
          tagStore.updateVisitedView(route);
        }
        break;
      }
    }
  });
};

const addTags = () => {
  const { name, meta } = route;
  if (name && !meta.hidden) {
    tagStore.addView(route);
  }
  return false;
};

const initTags = () => {
  affixTags.value = filterAffixTags([]);
  for (const tag of affixTags.value) {
    // Must have tag name
    if (tag.name) {
      tagStore.addVisitedView(tag);
    }
  }
};

const filterAffixTags = (routes: RouteConfig[], basePath = '/') => {
  let tags: ITagView[] = [];
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.meta.title,
        meta: { ...route.meta },
      });
    }
    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path);
      if (childTags.length >= 1) {
        tags = [...tags, ...childTags];
      }
    }
  });
  return tags;
};

const isAffix = (tag: ITagView) => {
  return tag.meta && tag.meta.affix;
};

const isActive = (r: ITagView) => {
  if (route.path === r.path) {
    // this.activiedTag = route;
    tagStore.SAVE_ACIVED_VIEW(r);
  }
  return route.path === r.path;
};

watch(
  () => route.path,
  (val) => {
    addTags();
    moveToCurrentTag();
  },
  {
    immediate: true,
  }
);

watch(
  () => visible.value,
  (val) => {
    if (val) {
      document.body.addEventListener('click', closeMenu);
    } else {
      document.body.removeEventListener('click', closeMenu);
    }
  }
);

onMounted(() => {
  initTags();
  addTags();
});
</script>

<style lang="scss">
// Reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.tags-view-container {
  user-select: none;
  height: 32px;
  width: 100%;
  // background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &.active {
        color: #fff;
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
