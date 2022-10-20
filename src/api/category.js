// 定义API函数
// 定义首页需要的接口函数
import request from '@/utils/request'
/**
 * 获取首页头部分类数据
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}


/**
 * 获取顶级分类信息
 * @param {String} id 顶级分类的 id 
 * @returns 
 */
export const findTopCategory = (id) => {
  return request('/category','get', {id})
}

/**
 * 获取顶级类目信息，(children 属性) 就是各个子分类
 * @param {String} id  顶级类目的 ID 
 * @returns 
 */
export const findSubFilter = (id) => {
  return request('/category/sub/filter','get',{id:id})
}

/**
 * 获取二级类目的筛选条件数据
 * @param {*} id 二级类目 id
 * @returns 
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter','get',{id:id})
} 

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档 
 * @returns 
 */
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary','post',params)
} 

