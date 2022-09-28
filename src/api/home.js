// 首页相关 API 接口函数
import request from '@/utils/request'
// 获取品牌
/**
 * 获取品牌
 * @param {Intgear} limit - 品牌个数
 * @returns promise
 */
export const fiindBrands = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}

export const findBanner = () => {

}
