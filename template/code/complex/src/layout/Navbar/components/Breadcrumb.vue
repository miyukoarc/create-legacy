<!-- @format -->

<template>
  <div class="flex h-32px px-16px box-border items-center">
    <el-breadcrumb
      v-if="breadcrumbs.length"
      separator-class="el-icon-arrow-right"
      class="app-breadcrumb"
      separator="/"
    >
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          class="text-gray-700"
          v-for="item in breadcrumbs"
          :key="item.path"
        >
          <span @click="handleRouter(item)">
            <i v-if="breadcrumbs.length == 1" class="el-icon-arrow-left"></i>
            {{ item.meta.title }}
            <template v-if="extraTitle">-</template>
            <template v-if="extraTitle">
              {{ extraTitle }}
            </template>
          </span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Breadcrumb',
};
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Route, RouteRecord } from 'vue-router';
import { useRoute, useRouter } from 'vue-router/composables';

const getBreadcrumb = () => {
  const matched: RouteRecord[] = route.matched.filter(
    (item) => item.meta && item.meta.title && !item.meta.single
  );
  // const first = matched[0];
  breadcrumbs.value = matched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false;
  });
};

const breadcrumbs = ref<Array<any>>([]);
const route = useRoute();
const router = useRouter();
const extraTitle = ref<string>('');

const setExtraTitle = (str: string) => {
  extraTitle.value = str;
};

const handleRouter = (item: Route) => {
  // return;
  if (item?.meta?.title !== '个人主页' && breadcrumbs.value.length == 1) {
    router.go(-1);
  }
};

watch(
  () => route,
  (val) => {
    if (val.query.tec) {
      setExtraTitle(val.query.tec as string);
    }
    if (val.path.startsWith('/redirect/')) return;
    getBreadcrumb();
  },
  { immediate: true, deep: true }
);
</script>

<style>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
