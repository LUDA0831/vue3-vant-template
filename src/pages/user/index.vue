<script setup lang="ts">
defineOptions({ name: 'User' })
definePage({
  meta: { keepAlive: true, title: '我的' },
})
const router = useRouter()
const userStore = useUserStore()
const { isLogin, getUserInfo } = storeToRefs(userStore)
function handleLogin() {
  router.push('/login')
}
</script>

<template>
  <AppPage nav-bar tab-bar p-4>
    <VanCellGroup :inset="true">
      <van-cell center :is-link="!isLogin" @click="handleLogin">
        <template #title>
          <van-skeleton-avatar v-if="!isLogin" />
        </template>

        <template #value>
          <span v-if="isLogin">{{ getUserInfo?.username }}</span>
          <span v-else>登录</span>
        </template>
      </van-cell>
    </VanCellGroup>
  </AppPage>
</template>

<style scoped>

</style>
