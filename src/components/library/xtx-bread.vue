
<script>
// import { render } from 'vue';
import {h} from 'vue'
export default {
  name:'XtxBread',
  render(proxy) {
    // h函数的第一个参数，标签名，第二个参数：标签属性对象，第三个参数：子节点
    // 需求：
        // 1. 创建 xtx-bread 父容器，
        // 2. 获取当前组件的默认插槽内容
        // 3. 去除 item 组件的 i 标签，应该由 render 函数创建
        // 4. 遍历插槽中的 item,得到一个动态创建的节点，最后一个 item 不加 i 标签
        // 5. 把动态创建的节点渲染在 xtx-bread 标签中
    // console.log(proxy);
    const items = proxy.$slots.default()
    // console.log(item);
    const dymanicItems = []
    items.forEach( (item,index) => {
        dymanicItems.push(item)
        if(index < (items.length - 1)) {
            dymanicItems.push(h('i',{class: 'iconfont icon-angle-right'}))
        }
        
    });
    
    return h('div',{class:'xtx-bread'},dymanicItems)
  }
}
</script>


<style lang='less'>
@import '../../assets/style/variables.less';
.xtx-bread {
    display: flex;
    padding: 25px 10px;
    &-item {
        a {
            color: #666;
            transition: all .4s;
            &:hover {
                color: @xtxColor;
            }
        }
    }
    i {
        font-size: 12px;
        margin-left: 5px;
        margin-right: 5px;
        line-height: 22px;
    }
}
</style>