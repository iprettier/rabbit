<template>
  <div class="sub-sort">
    <div class="sort">
      <a href="javascript:;" :class="{active:sortParams.sortField === null}" @click="changeSort(null)">默认排序</a>
      <a href="javascript:;" :class="{active:sortParams.sortField === 'publishTime'}" @click="changeSort('publishTime')">最新商品</a>
      <a href="javascript:;" :class="{active:sortParams.sortField === 'orderNum'}" @click="changeSort('orderNum')">最高人气</a>
      <a href="javascript:;" :class="{active:sortParams.sortField === 'evaluateNum'}" @click="changeSort('evaluateNum')">评论最多</a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i class="arrow up" :class="{active:sortParams.sortField ==='price'&&sortParams.sortMethod === 'asc'}"></i>
        <i class="arrow down" :class="{active:sortParams.sortField ==='price'&&sortParams.sortMethod === 'desc'}"></i>
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="sortParams.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>


<script>
import { reactive } from 'vue-demi'
export default {
  name:'SubSort',
  setup() {
    // 实现交互
    // 明确交互所产生的数据
    const sortParams = reactive({
      inventory:false,
      onlyDiscount:false,
      sortField:null,
      sortMethod:null
    })

    // 绑定按钮的点击事件 修改排序字段和排序方式
    const changeSort = (sortField) => {
      if(sortField === 'price') {
        sortParams.sortField = sortField
        // 处理排序
        if(sortParams.sortMethod === null) {
          sortParams.sortMethod= 'desc'
        } else {
          sortParams.sortMethod = sortParams.sortMethod === 'desc'?'asc':'desc'
        }
      } else {
        // 如果已经选中，阻止选中
        if(sortParams.sortField === sortField) {
          
          return
        }
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
      
    }
    // 返回模板使用 
    return { sortParams,changeSort }
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/style/variables.less';
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transform-style: all 0.3s;
      &.active {
        background-color: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        right: 8px;
        border: 5px solid transparent;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-right: 20px;
      color: #999;
    }
  }
}
</style>