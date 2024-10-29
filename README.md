# vue3 vant4模版
## 依赖
* Typescript
* 状态管理 `pinia` + `pinia-plugin-persistedstate`持久化
* 样式库 unocss
* 工具库 `lodash-es` `vueuse`
* 代码风格 `eslint` `@antfu/eslint-config`
* UI库 arco `vant4` + 自动引入 `unplugin-vue-components`
* GZIP压缩 `vite-plugin-compression`
* 请求库 `alova`

## 全局状态管理pinia
`stores/user.ts`

示例使用setup语法,持久化插件.

## api封装
`composables/useHttp.ts`

简单封装alova,使用拦截器请求添加token认证,错误拦截处理,使用hook方式导出.

## 屏幕适配
`postcss-mobile-forever`

使用postcss插件,自动px转vw单位,最大宽度750px,适配PC端.
