<template>
  <HomePanel title="热门品牌" subTitle="国际经典 品质保证">
    <template v-slot:right>
      <a href="javascript:;" class="iconfont icon-angle-left prev" @click="toggle(-1)" :class="{disabled:index===0}"></a>
      <a href="javascript:;" class="iconfont icon-angle-right next" @click="toggle(1)" :class="{disabled:index===1}"></a>
    </template>
    <!-- 默认插槽 -->
    <div class="box">
      <ul class="list" :style="{transform:`translateX(${-index*1240}px)`}">
        <li v-for="item in brands" :key="item.id">
          <RouterLink to="/">
            <img
              :src="item.picture"
              alt=""
            />
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>


<script>
import { ref } from 'vue-demi';
import HomePanel from "./home-panel.vue";
import { fiindBrands } from '@/api/home';
export default {
  name: "HomeBrand",
  components: { HomePanel },
  setup() {
    // 获取数据
    const brands = ref([])
    fiindBrands(10).then(data => {
      brands.value = data.result
    })

    // 切换效果：只有两页
    // 1. 当我点击上一张
    // 2. 当我点击下一张
    const index = ref(0)
    const toggle = (step) => {
      const newIndex = index.value + step
      if(newIndex < 0 || newIndex > 1) return
      index.value = newIndex
    }
    return { brands,toggle,index }
  }
};
</script>

<style scoped lang="less">
@import "../../../assets/style/variables.less";
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
    