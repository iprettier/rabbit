import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

// export default createStore({
//   state: {
//     username: '张三'
//   },
//   getters: {
//     newName(state) {
//       return state.username+'acavava'
//     }
//   },
//   mutations: {
//     updateName(state,data) {
//       state.username = data
//     }
//   },
//   actions: {
//     updateN({commit},data) {
//       setTimeout(() => {
//         commit('updateName',data)
//       },3000)
//     }
//   },
//   modules: {
//   }
// })

// // A模块
// const moduleA = {
//   state: ()=>{
//     return {
//       username: 'moduleA'
//     }
//   },
//   getters: {
//     changeName(state) {
//       return state.username + '南帅帅'
//     }
//   },
//   mutations: {
//     updateName(state) {
//       state.username = '王五'
//     }
//   }
// }
// // B模块
// const moduleB = {
//   namespaced:true,
//   state: ()=>{
//     return {
//       username: 'moduleB'
//     }
//   },
//   getters: {
//     newName() {
//       return '你好啊'
//     }
//   },
//   mutations: {
//     updateName(state) {
//       state.username = '北京你好啊'
//     }
//   }
// }

export default createStore({
  modules: {
    cart,
    user,
    category
  },
  // 配置插件
  plugins: [createPersistedstate({
    // 本地存储名字
    key: 'erabbit',
    paths: ['user', 'cart']
  })]
})
