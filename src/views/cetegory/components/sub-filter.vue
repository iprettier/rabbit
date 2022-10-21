<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <!-- <a href="javascript:;"></a> -->
        <a
        :class="{active:item.id === filterData.brands.selectedBrand}"
        @click="changeBrand(item.id)"
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
        @click="changeProp(item,sub.id)"
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
  setup(props,{emit}) {
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
    // 获取筛选参数的函数
    const getFilterParams = () => {
      const obj = {brandId: null,attrs: []}
      // 品牌
      obj.brandId = filterData.value.brands.selectedBrand
      // 销售属性
      filterData.value.saleProperties.forEach((item) => {
        if(item.selectedAttr) {
          const prop = item.properties.find(prop => prop.id == item.selectedAttr)

          obj.attrs.push({groupName: item.name,perprotyName:prop.name})
        }
      })
      if(obj.attrs.length === 0) obj.attrs = null
      return obj
    }
    // 记录当前选择的品牌
    const changeBrand = (brandId) => {
      if(filterData.value.brands.selectedBrand === brandId) return
        filterData.value.brands.selectedBrand = brandId
        emit('filter-change',getFilterParams())
    }

    // 记录你选择的销售属性
    const changeProp = (item,propId) => {
      if(item.selectedAttr === propId) return
      item.selectedAttr = propId
      emit('filter-change',getFilterParams())
    }
    return { filterData, filterLoading,changeBrand,changeProp };
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