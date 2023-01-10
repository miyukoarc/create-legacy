<template>
  <div
    :class="prefixCls"
    class="h-[100%] relative overflow-hidden <sm:px-10px <md:px-10px <xl:bg-dan-dark <xl:px-10px"
  >
    <div class="flex h-full mx-auto relative">
      <div
        :class="`${prefixCls}__left flex-1 bg-gray-500 bg-opacity-20 relative p-30px <xl:hidden`"
      >
        <div class="flex items-center relative dark:text-white">
          <img
            src="@/assets/img/logo.png"
            alt=""
            class="h-48px mr-10px w-48px"
          />
          <span class="font-bold text-20px"> 标题 </span>
        </div>
        <div class="flex h-[calc(100%-60px)] justify-center items-center">
          <TransitionGroup
            appear
            tag="div"
            enter-active-class="animate__animated animate__bounceInLeft"
          >
            <img
              key="1"
              src="@/assets/svgs/login-box-bg.svg"
              alt=""
              class="w-350px"
            />
            <div key="2" class="text-3xl dark:text-white">欢迎使用本系统</div>
            <div
              key="3"
              class="font-normal mt-5 text-14px dark:text-white"
            ></div>
          </TransitionGroup>
        </div>
      </div>
      <div class="flex-1 p-30px relative <sm:p-10px dark:bg-dan-dark">
        <div
          class="flex justify-between items-center @xl:justify-end @2xl:justify-end"
        >
          <div class="flex items-center @xl:hidden @2xl:hidden">
            <img
              src="@/assets/img/logo.png"
              alt=""
              class="h-48px mr-10px w-48px"
            />
            <span class="font-bold text-20px dark:text-white"> 标题 </span>
          </div>

          <div class="flex space-x-10px justify-end items-center"></div>
        </div>
        <Transition
          appear
          enter-active-class="animate__animated animate__bounceInRight"
        >
          <div class="flex h-full m-auto max-w-380px w-[100%] items-center">
            <div class="form-region__container">
              <div class="form-region__inner">
                <transition name="slide-fade" mode="out-in">
                  <PasswordPage></PasswordPage>
                </transition>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <div class="dan-login login"></div>
  </div>
</template>

<script lang="ts" setup>
import { TOKEN } from '@/constant/login';
import { useDesign } from '@/hooks/web/useDesign';
import { removeToken } from '@/utils/cookies';
import { computed, onMounted, ref, unref } from 'vue';
import PasswordPage from './components/PasswordPage.vue';

const { getPrefixCls } = useDesign();

const prefixCls = getPrefixCls('login');

onMounted(async () => {
  // 确保重置登录标志
  removeToken(TOKEN);
});
</script>

<style lang="scss" scoped>
// 声明一个局域变量 $root为全局变量空格拼接字符串
$prefix-cls: #{$root}-login;

.#{$prefix-cls} {
  &__left {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      // background-image: url('@/assets/svgs/login-bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      content: '';
    }
  }
}
.form-region {
  &__container {
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
    padding: 10px;
  }
  &__inner {
    padding: 10px;
  }
}
</style>
