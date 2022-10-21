<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选分区 -->
      <SubFilter @filter-change="filterChange"></SubFilter>
      <!-- 商品分区 -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange"></SubSort>
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id">
            <GoodsItem :goods="item"></GoodsItem>
          </li>
        </ul>
        <XtxInfiniteLoading
          @infinite="getData"
          :loading="loading"
          :finished="finished"
        ></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
import SubBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
import SubSort from "./components/sub-sort.vue";
import GoodsItem from "./components/goods-item.vue";
import { findSubCategoryGoods } from "@/api/category";
import { useRoute } from "vue-router";

export default {
  name: "SubCategory",
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup() {
    const route = useRoute();
    // 加载中
    const loading = ref(false);
    // 是否加载完毕
    const finished = ref(false);
    // 商品列表数据
    const goodsList = ref([]);
    // 请求参数
    let requestParams = {
      page: 1,
      pageSize: 20,
    };
    const getData = () => {
      loading.value = true;
      // 发请求时，设置分类 id
      requestParams.categoryId = route.params.id;
      findSubCategoryGoods(requestParams).then(({ result }) => {
        // 获取数据成功
        if (result.items.length) {
          // 有数据就追加
          goodsList.value.push(...result.items);
          // 将 page 改成下一页的页码
          requestParams.page ++
        } else {
          // 没有数据，代表加载完成
          finished.value = true;
          loading.value = false
        }
        loading.value = false;
      });
    };
    // 再更改了二级分类之后，徐娅萍重新加载数据
    watch(()=>route.params.id,(newVal) => {
      if(newVal && `/category/sub/${newVal}` === route.path) {
        finished.value = false
        goodsList.value = []
        requestParams = {
          page: 1,
          pageSize: 20 
        }
      }
    })
    // 更改排序组件的筛选数据,重新请求
    const sortChange = (sortParams) => {
      finished.value = false
      
      // 合并请求参数，保留之前的参数
      requestParams = {...requestParams,...sortParams}
      requestParams.page = 1
      goodsList.value = []
    }

    // 更改筛选组件的筛选数据，重新请求
    const filterChange = (filterParams) => {
      // console.log(val);
      finished.value = false
      // 和并请求参数 保留之前的参数
      requestParams = {...requestParams,...filterParams}
      requestParams.page = 1
      goodsList.value = []
      }
    return { getData, loading, finished, goodsList,sortChange,filterChange };
  },
};
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    padding: 0 5px;
    flex-wrap: wrap;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
