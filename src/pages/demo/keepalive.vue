<script setup lang="ts">
defineOptions({ name: 'DemoKeepalive' }) // 注意, 组件名称必须跟路由名称一致
definePage({
  meta: { keepAlive: true, title: 'KeepAlive演示页' },
})
const value = ref(1)
</script>

<template>
  <AppPage show-back p-8>
    <div>当前组件会被缓存</div>
    <van-stepper v-model="value" />
  </AppPage>
</template>

<style scoped>

</style>
