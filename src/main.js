import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入自己的 UI 组件库
import UI from '@/components/library/index'

// 重置样式
import 'normalize.css'
import '@/assets/style/common.less'

createApp(App).use(store).use(router).use(UI).mount('#app')
