import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/cetegory/index')
const SubCategory = () => import('@/views/cetegory/sub')
const Goods = () => import('@/views/goods')

const routes = [
  // 以及路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id',component: Goods}
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到顶部
  scrollBehavior() {
    // vue 2。0 通过 x和 y 控制
    // vue 3.0 通过 left 和 top 控制
    return {left: 0, top: 0}
  }
})

export default router
