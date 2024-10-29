<script lang="ts" setup>
definePage({ meta: { title: '404页面' } })
const router = useRouter()

function onBack() {
  if (window.history.state.back)
    history.back()
  else
    router.replace('/')
}
</script>

<template>
  <AppPage>
    <div flex-center flex-col>
      <van-empty description="页面不存在" />
      <van-button type="primary" @click="onBack">
        返回
      </van-button>
    </div>
  </AppPage>
</template>

<style scoped>

</style>
