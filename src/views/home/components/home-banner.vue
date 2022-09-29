<template>
  <div class="home-banner">
    <XtxCarousel :slideers="slideers"></XtxCarousel>
  </div>
</template>

<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'
export default {
  name: 'HomeBanner',
  setup() {
    // 获取轮播图数据
    const slideers = ref([])
    findBanner().then(data => {
      slideers.value = data.result
    })
    return { slideers }
  }
}
</script>

<style scoped lang='less'>
.home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;
}
// 覆盖样式
.xtx-carousel {
  :deep(.carousel-btn.prev) {
    left: 270px !important;
  }
  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>
