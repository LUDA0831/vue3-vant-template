<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'vant'

const routeStore = useRouteStore()
const { getDarkMode, getAppTheme, getTransitionName } = useDesignSetting()

// 修改基础变量
const getStyle = { '--van-primary-color': getAppTheme.value }

function getThemeVars(): ConfigProviderThemeVars {
  const appTheme = unref(getAppTheme)
  const darkenStr = darken(appTheme, 25)
  const lightenStr = lighten(appTheme, 10)

  return {
    floatingBubbleBackground: appTheme,
    actionSheetCancelTextColor: appTheme,
    buttonPrimaryBackground: appTheme,
    buttonPrimaryBorderColor: appTheme,
    radioCheckedIconColor: appTheme,
    sliderActiveBackground: appTheme,
    cascaderActiveColor: appTheme,
    checkboxCheckedIconColor: appTheme,
    numberKeyboardButtonBackground: appTheme,
    pickerLoadingIconColor: appTheme,
    calendarRangeEdgeBackground: appTheme,
    calendarRangeMiddleColor: appTheme,
    calendarSelectedDayBackground: appTheme,
    stepperButtonRoundThemeColor: appTheme,
    switchOnBackground: appTheme,
    dialogConfirmButtonTextColor: appTheme,
    dropdownMenuOptionActiveColor: appTheme,
    dropdownMenuTitleActiveTextColor: appTheme,
    notifyPrimaryBackground: appTheme,
    circleColor: appTheme,
    noticeBarBackground: lightenStr,
    noticeBarTextColor: darkenStr,
    progressColor: appTheme,
    progressPivotBackground: appTheme,
    stepActiveColor: appTheme,
    stepFinishLineColor: appTheme,
    swipeIndicatorActiveBackground: appTheme,
    tagPrimaryColor: appTheme,
    paginationItemDefaultColor: appTheme,
    sidebarSelectedBorderColor: appTheme,
    tabsDefaultColor: appTheme,
    tabsBottomBarColor: appTheme,
    tabbarItemActiveColor: appTheme,
    treeSelectItemActiveColor: appTheme,
    navBarIconColor: appTheme,
    navBarTextColor: appTheme,
  }
}
</script>

<template>
  <VanConfigProvider :theme="getDarkMode" :theme-vars="getThemeVars()" :style="getStyle" min-h-screen>
    <RouterView v-slot="{ Component, route }">
      <Transition :name="getTransitionName" appear mode="out-in">
        <KeepAlive :include="routeStore.getKeepAliveComponents">
          <component :is="Component" :key="route.name" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </VanConfigProvider>
</template>
