import type { ComputedRef } from 'vue'

export function useDesignSetting() {
  const designStore = useDesignSettingStore()

  const getDarkMode: ComputedRef<'light' | 'dark'> = computed(() => designStore.darkMode)

  const getAppTheme: ComputedRef<string> = computed(() => designStore.appTheme)

  const getAppThemeList = computed(() => designStore.appThemeList)

  const getIsPageAnimate = computed(() => designStore.isPageAnimate)

  const getPageAnimateType = computed(() => designStore.pageAnimateType)

  const getTransitionName: ComputedRef<string> = computed(() => unref(getIsPageAnimate) ? unref(getPageAnimateType) : '')

  return {
    getDarkMode,
    getAppTheme,
    getAppThemeList,
    getIsPageAnimate,
    getPageAnimateType,
    getTransitionName,
  }
}
