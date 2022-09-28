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
</template>

<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner
  },
  setup () {

  }
}
</script>

<style lang="less" scoped>
</style>
