import designSetting from '@/settings/designSetting'
import { defineStore } from 'pinia'

function storeSetup() {
  const darkMode = ref<'light' | 'dark'>(designSetting.darkMode)
  const getDarkMode = computed(() => darkMode.value)
  const setDarkMode = (mode: 'light' | 'dark'): void => {
    darkMode.value = mode
  }

  const appTheme = ref<string>(designSetting.appTheme)
  const getAppTheme = computed(() => appTheme.value)

  const appThemeList = ref<string[]>(designSetting.appThemeList)
  const getAppThemeList = computed(() => appThemeList.value)

  const isPageAnimate = ref<boolean>(designSetting.isPageAnimate)
  const getIsPageAnimate = computed(() => isPageAnimate.value)

  const pageAnimateType = ref<string>(designSetting.pageAnimateType)
  const getPageAnimateType = computed(() => pageAnimateType.value)
  const setPageAnimateType = (type: string) => {
    pageAnimateType.value = type
  }

  return {
    darkMode,
    appTheme,
    appThemeList,
    isPageAnimate,
    pageAnimateType,
    getDarkMode,
    setDarkMode,
    getAppTheme,
    getAppThemeList,
    getIsPageAnimate,
    getPageAnimateType,
    setPageAnimateType,
  }
}

export const useDesignSettingStore = defineStore('app-design-setting', storeSetup, {
  persist: {
    pick: ['darkMode'],
  },
})
