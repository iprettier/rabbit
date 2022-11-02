<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle()" :class="{active:visible}">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <span class="ellipsis" v-for="i in 24" :key="i">北京市</span>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import axios from 'axios';

export default {
  name: "XtxCity",
  setup() {
    // 显示隐藏数据
    const visible = ref(false)

    // 提供打开和关闭行为方法
    const open = () => {
      visible.value = true
      // 这里获取城市地区数据
      getCityData().then(data => {
        
      })
    }
    // 关闭的方法
    const close = () => {
      visible.value = false
    }

    // 提供一个切换函数给 select 使用
    const toggle = () =>{
      visible.value ? close() : open()
    } 

    // 点击组件外部元素关闭对话框
    const target = ref(null)
    
    /**
     * 参数1： 监听的哪个元素
     * 参数2：点击了该元素外的其他地方触发的函数
     */
    onClickOutside(target,() => {
      close()
    })

    // 获取省市区数据函数
    const getCityData = () => {
      // 数据
      // 1。 当本地没有缓存，发情求获取数据
      // 2. 当本地有缓存，取出本地数据
      // 返回一个 Promise，再 then 中获取数据
      return new Promise((resolve,reject) => {
        // 约定 数据存储再 window 全局变量上 cityData
        if(window.cityData) {
          resolve(window.cityData)
        } else {
          const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
          axios.get(url).then(res => {
            // 缓存
            window.cityData = res.data
            resolve(res.data)
          })
        }
      })
    } 
    return { visible,toggle,target }
  }
};
</script>


<style scoped lang='less'>
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>