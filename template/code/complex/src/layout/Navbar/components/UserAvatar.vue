<template>
  <div class="flex items-center">
    <div class="flex items-center" v-if="userInfo">
      <el-image
        class="h-[36px] w-[36px]"
        :src="userInfo.userImage ? 'data:image/png;base64,' + userInfo.userImage : defaultImage"
      ></el-image>
      <span class="text-sm ml-5px">
        {{ userInfo.name || '访问者' }}
      </span>
    </div>
    <div>
      <el-divider direction="vertical"></el-divider>
      <el-button type="text" @click="onLogout">「 退出 」</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import image from '@/assets/img/defaultImage.png'
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router/composables'

const defaultImage = image
const router = useRouter()
const userInfo = ref<Record<string, any>>({})

// 获取用户信息
const getLocalUserInfo = () => {
  const data = localStorage.getItem('userInfo') || ''
  userInfo.value = data ? JSON.parse(data) : {}
}

const onLogout = () => {
  router.push('/login')
}

onMounted(() => {
  getLocalUserInfo()
})
</script>

<style lang="scss" scoped></style>
