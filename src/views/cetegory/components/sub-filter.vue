<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <!-- <a href="javascript:;"></a> -->
        <a
        :class="{active:item.id === filterData.brands.selectedBrand}"
          href="javascript:;"
          v-for="item in filterData.brands"
          :key="item.id"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <a 
        :class="{active:sub.id === item.selectedAttr}"
          href="javascript:;" v-for="sub in item.properties" :key="sub.id">{{
          sub.name
        }}</a>
      </div>
    </div>
  </div>
  <div class="sub-filter" v-else>
    <XtxSkeleton class="item" width="800px" height="20px" />
    <XtxSkeleton class="item" width="800px" height="20px" />
    <XtxSkeleton class="item" width="600px" height="20px" />
    <XtxSkeleton class="item" width="600px" height="20px" />
    <XtxSkeleton class="item" width="600px" height="20px" />
  </div>
</template>


<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { findSubCategoryFilter } from "@/api/category";
export default {
  name: "SubFilter",
  setup() {
    // 监听二级类目 id 变化 ，获取筛选数据
    const filterData = ref({});
    const route = useRoute();
    const filterLoading = ref(false);
    watch(
      () => route.params.id,
      (newVal, oldVal) => {
        //    变化后的 id 有值，处在二级路由下
        if (newVal && `/category/sub/${newVal}` === route.path) {
          filterLoading.value = true;
          // 发请求获取数据
          findSubCategoryFilter(route.params.id).then((data) => {
            // 每一组可选的筛选条件缺失 全部的筛选条件，处理数据，加上全部
            // 给每一组数据加上一个选中的 id
            // 1. 品牌
            data.result.brands.selectedBrand = null
            data.result.brands.unshift({ id: null, name: "全部" });
            data.result.saleProperties.forEach((item) => {
              item.selectedAttr = null
              item.properties.unshift({ id: null, name: "全部" });
            });
            filterData.value = data.result;
            filterLoading.value = false;
          });
        }
      },
      { immediate: true }
    );
    return { filterData, filterLoading };
  },
};
</script>


<style scoped lang='less'>
@import "../../../assets/style/variables.less";
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
  .xtx-skeleton {
    margin-top: 10px;
  }
}
</style>