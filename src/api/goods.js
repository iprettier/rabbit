import request from "@/utils/request";


/**
 * 获取相拼详情
 * @param {String} id 商品 id 
 * @returns 
 */
export const findGoods = (id) => {
  return request('/goods','get',{id})
}