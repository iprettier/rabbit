<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item :to="`/category/${goods.categories[1].id}`">{{goods.categories[1].name}}</xtx-bread-item>
        <xtx-bread-item :to="`/category/sub/${goods.categories[0].id}`">{{goods.categories[0].name}}</xtx-bread-item>
        <xtx-bread-item>{{goods.name}}</xtx-bread-item>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 商品信息左边 -->
        <div class="goods-info-left">
          <GoodsImage :images="goods.mainPictures"></GoodsImage>
          <GoodsSales></GoodsSales>
        </div>
        <!-- 商品信息右边 -->
        <div class="goods-info-right">
          <GoodName :goods="goods"></GoodName>
          <!-- SKU 组件 -->
          <GoodsSku :goods="goods"></GoodsSku>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant v-if="goods"></GoodsRelevant>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { findGoods } from "@/api/goods";
import { nextTick, ref, watch } from "vue";
import GoodsRelevant from "./components/goods-relevant.vue";
import GoodsImage from './components/goods-image.vue'
import GoodsSales from "./components/goods-sales.vue"
import GoodName from "./components/goods-name.vue" 
import GoodsSku from "./components/goods-sku.vue";
import { useRoute } from "vue-router";
export default {
  name: "XtxGoodsPage",
  components: { GoodsRelevant,GoodsImage,GoodsSales,GoodName, GoodsSku  },
  setup() {
    // 获取商品详情，渲染面包屑
    const goods = useGoods();
    return { goods };
  },
};
// 获取商品详情
const useGoods = () => {
  const goods = ref(null);
  // 出现路由地址的商品id 发生变化，但是 不会重新初始化组件
  const route = useRoute();
  watch(
    () => route.params.id,
    (newVal) => {
      if(newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then((data) => {
        // console.log(data);
        goods.value = null
        nextTick(() => {
          goods.value = data.result;
        })
      })
      }
    },
    {immediate:true}
  );

  return goods;
};
</script>

<style lang="less" scoped>
.goods-info {
  min-height: 600px;
  background-color: #fff;
  display: flex;
  .goods-info-left {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .goods-info-right {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  margin-top: 20px;
  display: flex;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background-color: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>