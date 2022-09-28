<template>
  <div class="container">
    <!-- 首页入口和广告区 -->
    <div class="home-enter">
      <!-- 左侧分类 -->
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
    </div>
  </div>
</template>

<script>
import HomeCategory from './components/home-category.vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory
  },
  setup () {}
}
</script>

<style lang="less" scoped>
</style>
