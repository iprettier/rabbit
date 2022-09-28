// 插件： 扩展 Vue 原有功能： 全局组件，自定义指令，挂载原型方法，过滤器（vue3 已经移除了过滤器）

// Vue2.0 插件的语法要素：
// 导出一个 有 install 方法的对象，默认传入了 Vue 构造函数，在 Vue 的基础上扩展东西
// install 方法的第一个参数是 Vue 构造函数，第二个参数是可选的选项对象

// Vue2.0 插件的语法要素：
// 导出一个 有 install 方法的对象，默认传入了 app 应用实例，在 Vue 的基础上扩展东西

import XtxSkeleton from './xtx-skeleton'
export default {
  install (app) {
    // 在 app 上进行扩展,app 提供 component 方法，directive 方法
    // 如果想挂载原型，app.config.globalProperties
    app.component(XtxSkeleton.name, XtxSkeleton)
  }
}
