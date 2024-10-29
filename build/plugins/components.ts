import { VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function createComponents() {
  return Components({
    dts: true,
    directoryAsNamespace: true,
    resolvers: [VantResolver({ importStyle: false })],
    types: [{
      from: 'vue-router',
      names: ['RouterLink', 'RouterView'],
    }],
  })
}
