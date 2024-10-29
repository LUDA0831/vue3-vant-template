import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export function createAutoImport() {
  return AutoImport({
    imports: [
      'vue',
      'pinia',
      '@vueuse/core',
      VueRouterAutoImports,
      {
      // add any other imports you were relying on
        'vue-router/auto': ['useLink'],
      },
    ],
    dts: true,
    dirs: ['src/composables', 'src/utils', 'src/stores'],
  })
}
