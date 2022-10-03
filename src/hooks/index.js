// 提供复用逻辑的函数

import { useIntersectionObserver } from "@vueuse/core"
import { ref } from "vue"


/**
 * 数据懒加载函数
 * @param {Object} target - Dom 对象
 * @param {Function} apiFn - api 函数
 */
export const useLazyData = (apiFn) => {
    const result = ref([])
    const target = ref(null)
    // stop 停止观察
    const { stop } = useIntersectionObserver(
        // 监听的目标元素
        target,
        ([{isIntersecting}],observerElement) => {
            // isIntersecting 是否进入可视区
            if(isIntersecting) {
                
                // 调用 Api 接口获取数据
                apiFn().then(data => {
                    result.value = data.result
                })
                // 停止观察
                stop()    
            }
        },
        // 配置选项：相交的比例 大于 0 就触发
        {threshold: 0}
    )
    return {target,result}
}