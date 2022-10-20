<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i class="iconfont icon-checked" v-if="checked"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span v-if="$slots.default"><slot></slot></span>
  </div>
</template>
<script>
import { ref, watch } from 'vue';
import { useVModel } from '@vueuse/core';

export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props,{emit}) {

    // 使用 useVModel 实现双向数据绑定 v-model 指令
      // 1. 使用 props 接收 modelValue
      // 2. 使用 useVModel 来包装 props 中的 modelValue 属性数据
      // 3. 在使用 checked.value 就是 父组件数据
      // 4. 在使用 checked.value = '数据' 赋值，触发 emit('update:ModelValue','数据')
    const checked = useVModel(props,'modelValue',emit)
    const changeChecked = () => {
      const newVal = !checked.value
      checked.value = newVal
      // 让组件支持 change 事件
      emit('change',newVal)
    }
    watch(() => props.modelValue,() => {
      checked.value = props.modelValue
    },{immediate:true})
    return {checked,changeChecked}
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/variables.less';
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  cursor: pointer;
  user-select: none;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>