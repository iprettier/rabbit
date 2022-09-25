// 创建一个新的 axios 实例对象
// 2. 请求拦截器，如果有 token 进行头部携带
// 3. 相应拦截器，1.剥离无效数据，2. 处理 token 失效
// 4. 导出一个函数，调用当前的 axios 实例发请求，返回值 promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基本地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 拦截业务逻辑
  // 进行请求配置的修改
  // 如果本地有 token 就在 头部携带
  // 1. 获取用户信息对象
  const {
    profile
  } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(
  // 1.剥离无效数据
  res => res.data,
  err => {
    // 401 状态码，进入该函数

    if (err.response && err.response.status === 401) {
      // 1. 清空本地无效用户信息
      // 跳转到登录页面，
      // 3. 跳转需要携带当前路由地址
      store.commit('user/setUser', {})
      // 当前路由地址
      // 当前路由地址
      // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
      // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
      const fuLlPath = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push(('/login?redirectUrl=' + fuLlPath))
    }
    return Promise.reject(err)
  }
)

const request = function (url, method, submitData) {
  // 负责发请求  请求地址，请求方式，请求数据
  return instance({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
