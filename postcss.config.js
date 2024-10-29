import autoprefixer from 'autoprefixer'
import viewport from 'postcss-mobile-forever'

export default {
  plugins: [
    autoprefixer(),
    // https://github.com/wswmsword/postcss-mobile-forever
    viewport({
      appSelector: '#app',
      viewportWidth: file => file.includes('vant') ? 375 : 750,
      maxDisplayWidth: 750,
      border: true,
      rootContainingBlockSelectorList: [
        'van-tabbar',
        'van-popup',
      ],
    }),
  ],
}
