<template>
  <div class="home-banner">
    <XtxCarousel></XtxCarousel>
  </div>
</template>

<script>
export default {
  name: 'HomeBanner'
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
