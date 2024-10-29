<script lang="ts" setup>
import { useDesignSettingStore } from '@/stores/designSetting.ts'

defineOptions({ name: 'Root' })
definePage({ meta: { keepAlive: true, title: '主页' } })

const designSettingStore = useDesignSettingStore()
const isDark = computed(() => designSettingStore.getDarkMode === 'dark')
const checked = ref<boolean>(isDark.value)
function toggle() {
  designSettingStore.setDarkMode(isDark.value ? 'light' : 'dark')
}
</script>

<template>
  <AppPage nav-bar tab-bar>
    <van-cell-group inset title="基本内容" :border="false">
      <van-cell title="夜间模式">
        <template #right-icon>
          <VanSwitch v-model="checked" size="20px" aria-label="on/off Dark Mode" @click="toggle()" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group inset title="示例页面" :border="false">
      <van-cell title="KeepAlive" is-link to="demo/keepalive" />
      <van-cell title="404页面" is-link to="demo/404" />
    </van-cell-group>
  </AppPage>
</template>

<style scoped>

</style>
