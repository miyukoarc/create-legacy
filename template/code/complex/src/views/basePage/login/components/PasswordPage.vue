<template>
  <div class="w-full">
    <h1 class="text-center mb-15 text-2xl dark:text-white">用户名登录</h1>
    <el-form label-position="top">
      <ElRow>
        <ElCol :span="24">
          <el-form-item label="用户名">
            <el-input v-model="form.userId" size="large" class="w-full" placeholder=""></el-input>
          </el-form-item>
        </ElCol>
        <ElCol :span="24">
          <el-form-item label="密码">
            <el-input
              v-model="form.password"
              size="large"
              class="w-full"
              placeholder=""
              type="password"
              @keypress="enterPress"
            ></el-input>
          </el-form-item>
        </ElCol>
        <ElCol :span="24">
          <div class="w-full">
            <el-button
              v-loading="loading"
              size="large"
              class="w-full"
              type="primary"
              @click="buttonLogin"
            >
              登录
            </el-button>
          </div>
        </ElCol>
        <ElCol :span="24">
          <slot></slot>
        </ElCol>
      </ElRow>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { loginPwd } from '@/api/modules/auth'
import { AuthBody } from '@/api/types'
import { ENTER } from '@/constant/keyboard'
import { TOKEN } from '@/constant/login'
import { useMenuStore } from '@/stores/modules/menu'
import { useUserStore } from '@/stores/modules/user'
import { getToken, setToken } from '@/utils/cookies'
import { uniqueId } from '@/utils/data'
import { reactive, ref, unref } from 'vue'
import router from '@/router'

const userStore = useUserStore()
const menuStore = useMenuStore()

const loading = ref<boolean>(false)
const form = reactive<AuthBody>({
  userId: 'admin',
  password: 'admin'
})

const buttonLogin = () => {
  const payload = unref(form)
  loading.value = true
  loginPwd(payload).then(async () => {
    setToken(TOKEN, uniqueId())

    await userStore.afterLoginAction()

    const timer = window.setTimeout(() => {
      loading.value = false
      if (getToken(TOKEN)) {
        router.push({ path: '/logged/welcome' })
      }
      window.clearTimeout(timer)
    }, 800)
  })
}

const enterPress = (e: KeyboardEvent) => {
  e.code === ENTER && buttonLogin()
}
</script>

<style lang="scss" scoped>
$prefix-cls: #{$root}-password;

.#{$prefix-cls} {
  &__container {
    border: 1px solid var(--el-border-color);
  }
}
</style>
