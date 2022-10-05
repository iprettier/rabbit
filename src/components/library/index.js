// 插件： 扩展 Vue 原有功能： 全局组件，自定义指令，挂载原型方法，过滤器（vue3 已经移除了过滤器）

// Vue2.0 插件的语法要素：
// 导出一个 有 install 方法的对象，默认传入了 Vue 构造函数，在 Vue 的基础上扩展东西
// install 方法的第一个参数是 Vue 构造函数，第二个参数是可选的选项对象

// Vue2.0 插件的语法要素：
// 导出一个 有 install 方法的对象，默认传入了 app 应用实例，在 Vue 的基础上扩展东西

import XtxSkeleton from './xtx-skeleton'
import XtxCarousel from './xtx-carousel'
import XtxMore from './xtx-more'
import XtxBread from './xtx-bread'
import XtxBreadItem from './xtx-bread-item'

import defaultImg from '@/assets/images/200.png'
export default {
  install (app) {
    // 在 app 上进行扩展,app 提供 component 方法，directive 方法
    // 如果想挂载原型，app.config.globalProperties
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name,XtxMore)
    app.component(XtxBread.name,XtxBread)
    app.component(XtxBreadItem.name,XtxBreadItem)
    // 定义指令
    defineDirective(app)
  }
}

// 定义指令
const defineDirective = (app) => {
  // 1. 图片懒加载指令
  // 原理：先存储图片地址不能在 src 上，当图片进入可视区，将 src 的地址换成所存储的地址
  app.directive('lazy',{
    // Vue 2.0 监听使用指令的 dom 是否创建好，钩子函数：inserted
    // Vue 3.0 监听使用指令的 dom 是否创建好，钩子函数：和组件的一样 mounted
    mounted(el,binding) {
      // console.log('mounted');
      // 创建一个观察对象，来观察当前使用指令的元素
      const observer = new IntersectionObserver(([{isIntersecting}]) => {
        if(isIntersecting) {
          // 停止观察
          observer.unobserve(el)
          // 把指令的值 设置给 el的 src 属性,binding.value 就是指令的值
          // 处理图片加载失败 onerror 时图片加载失败的事件，load 时图片加载成功的事件
          el.onerror = () => {
            // 加载失败，设置，默认图
            el.src = defaultImg
          }
          el.src = binding.value
        }
      },{
        threshold: 0
      })
      // 开启观察
      observer.observe(el)
    } 
  })
}
