<template>
  <div class="goods-image">
    <!-- 大图 -->
    <div
        class="large"
        :style="[
        { backgroundImage: `url(${images[currentIndex]})` },
        largePosition,
      ]"
        v-show="show"
    ></div>
    <!-- 中图 -->
    <div class="middle" ref="target">
      <img :src="images[currentIndex]" alt="" />
      <div class="layer" :style="layerPosition" v-show="show"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li
          v-for="(img, i) in images"
          :key="img"
          :class="{ active: i === currentIndex }"
      >
        <img :src="img" alt="" @click="currentIndex = i" />
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";
export default {
  name: "GoodsImage",
  props: {
    images: {
      type: String,
      default: "",
    },
  },
  setup() {
    const currentIndex = ref(0);

    // 1. 是否显示遮罩和大图容器
    let show = ref(false);
    // 2. 控制遮罩层的坐标(样式)
    const layerPosition = reactive({
      left: 0,
      top: 0,
    });

    // 3. 大图的背景定位
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0,
    });

    // 4. 使用 useMouseInEmenent 得到基于元素左上角的左边，是否进入元素和离开元素
    const target = ref(null);
    const { elementX, elementY, isOutside } = useMouseInElement(target);
    watch([elementX, elementY, isOutside], () => {
      // 5. 根据得到数据设置样式数据和是否显示数据
      show.value = !isOutside.value
      // 计算坐标
      const position = { x: 0, y: 0 }
      if (elementX.value < 100) position.x = 0
      else if (elementX.value > 300) position.x = 200
      else position.x = elementX.value - 100
      if (elementY.value < 100) position.y = 0
      else if (elementY.value > 300) position.y = 200
      else position.y = elementY.value - 100
      // 给样式赋值
      layerPosition.left = position.x + 'px'
      layerPosition.top = position.y + 'px'
      largePosition.backgroundPositionX = -2 * position.x + 'px'
      largePosition.backgroundPositionY = -2 * position.y + 'px'
    })

    return { currentIndex, show, largePosition, layerPosition, target };
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/variables.less";
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
    overflow: hidden;
    z-index: 401px;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>