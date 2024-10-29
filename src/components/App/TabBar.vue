<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

interface TabBarProps {
  name: string
  icon: string
  to: RouteLocationRaw
}
const tabMap = ref<TabBarProps[]>([
  { name: '首页', icon: '/logo.svg', to: '/' },
  { name: '我的', icon: '/logo.svg', to: '/user' },
])
</script>

<template>
  <VanTabbar placeholder route :z-index="20">
    <VanTabbarItem v-for="(item, index) in tabMap" :key="index" replace :to="item.to">
      {{ item.name }}
      <template #icon>
        <img :src="item.icon" alt="">
      </template>
    </VanTabbarItem>
  </VanTabbar>
</template>

<style scoped>

</style>
