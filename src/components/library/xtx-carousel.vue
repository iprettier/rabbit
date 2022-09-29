<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li class="carousel-item" v-for="(item,i) in slideers" :key="item.id" :class="{fade:index===i}">
        <RouterLink to="/">
          <img
            :src="item.imgUrl"
            alt=""
          />
        </RouterLink>
      </li>
    </ul>
    <!-- 上一张 -->
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <!-- 下一张 -->
    <a href="javascript:;" class="carousel-btn next" @click="toggle(1)">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <!-- 激活点 -->
      <span v-for="(item,i) in slideers" :key="i" :class="{active:index===i}" @click="index=i"></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref,watch } from 'vue'

export default {
  name: 'XtxCarousel',
  props: {
    slideers: {
      type: Array,
      default: []
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 间隔时间
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup(props) {
    // 控制显示图片的索引
    const index = ref(0)
    // 自动轮播的逻辑
    let timer = null
    const autoPaayFn = () => {
      // 自动播放的逻辑每隔多少秒每个多长时间切换索引
      clearInterval(timer) // 防止定时器重复调用
      timer = setInterval(() => {
        index.value++
        if(index.value >= props.slideers.length) {
          index.value = 0
        }
      },props.duration)
    }
    // 条件之一
    // 需要就监听 slideers 数据变化，判断如果有数据且 autoPlay 是 true
    watch(() => props.slideers,(newVal) => {
      if(newVal.length && props.autoPlay) {
        autoPaayFn()
      }
    },{ immediate: true })

    // 鼠标进入，暂停，离开，开启(开启条件)自动播放
    const stop = () => {
      if(timer) {
        clearInterval(timer)
      }
    }

    const start = () => {
      if(props.slideers.length && props.autoPlay) {
        autoPaayFn()
      }
    }

    // 点击点 可以切换
    // 点击侧边按钮
    const toggle = (step) => {
      // 将要改变的索引
      const newIndex = index.value + step
      if(newIndex > (props.slideers.length - 1)) {
        index.value = 0
        return
      }
      if(newIndex < 0) {
        index.value = props.slideers.length - 1
        return
      }
      // 正常情况
      index.value = newIndex
    }

    // 组件销毁时，清除定时器
    onUnmounted(() => {
      clearInterval(timer)
    })

    return { index,stop,start,toggle }
  }
}
</script>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
