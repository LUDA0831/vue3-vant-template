<script lang="ts" setup>
import type { ShareConfig } from '@/composables/useWeChat.ts'

defineOptions({
  inheritAttrs: false,
})

const {
  navBar = true,
  tabBar = false,
  showBack = false,
  useShare = true,
  onClickLeft,
  shareConfig,
} = defineProps<Props>()

interface Props {
  navBar?: boolean
  tabBar?: boolean
  showBack?: boolean
  onClickLeft?: () => void
  shareConfig?: ShareConfig
  useShare?: boolean
}
const router = useRouter()
const route = useRoute()

function onClickLeftInner() {
  if (onClickLeft)
    onClickLeft()
  else
    router.back()
}

// 处理标题
const APP_TITLE = import.meta.env.VITE_APP_TITLE
const defaultTitle = computed(() => route.meta.title || APP_TITLE)

// 处理导航栏
const navBarAttrs = computed(() => {
  return {
    title: defaultTitle.value,
    ...showBack && { leftText: '返回', leftArrow: true },
  }
})

onMounted(() => {
  // 处理分享
  if (useShare) {
    const { share } = useWeChat()
    share(shareConfig)
  }
})
</script>

<template>
  <div class="app-page">
    <template v-if="navBar">
      <VanNavBar v-bind="navBarAttrs" safe-area-inset-top placeholder fixed :z-index="20" @click-left="onClickLeftInner">
        <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]>
          <slot :name="slotName" />
        </template>
      </VanNavBar>
    </template>
    <div class="app-main" v-bind="$attrs">
      <slot />
    </div>
    <AppTabBar v-if="tabBar" />
  </div>
</template>

<style scoped>
.app-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  overflow: auto;
}
</style>
