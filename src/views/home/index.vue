<template>

    <!-- 首页入口和广告区 -->
    <div class="home-enter">
      <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
      <HomeBanner></HomeBanner>
      
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew></HomeNew>
  <!-- 人气推荐 -->
  <HomeHot></HomeHot>
  <!-- 热门品牌 -->
  <HomeBrand></HomeBrand>
</template>

<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'

export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand
  },
  setup () {

  }
}
</script>

<style lang="less" scoped>
</style>
