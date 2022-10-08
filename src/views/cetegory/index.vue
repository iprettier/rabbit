<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem :to="{path:'/'}">首页</XtxBreadItem>
        <transition name="fade-right">
          <XtxBreadItem :key="topCategory.id" :is="topCategory.id">{{topCategory.name}}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel style="height: 500px;" :slideers="slideers"></XtxCarousel>
      <!-- 全部分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="">
              <img :src="item.picture" alt="">
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类推荐商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>{{sub.name}}</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <xtxMore :path="`/category/sub/${sub.id}`"/>
        </div>
        <div class="body">
          <GoodsItem v-for="goods in sub.goods" :key="goods.id" :goods="goods"></GoodsItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue'
import { findBanner } from '@/api/home'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import GoodsItem from './components/goods-item.vue'
import { findTopCategory } from '@/api/category'


export default {
    name: "TopCategory",
    components: { GoodsItem },
    setup() {
      // 轮播图
      const slideers = ref([])
      findBanner().then(data => {
        slideers.value = data.result
      })
      // 面包屑+ 所有子分类
      
      const store = useStore()
      const route = useRoute()
      

      const topCategory = computed(() => {
        // 当前的顶级分类 = 根据路由上的 id 去 vuex 中 查找\\
        let cate = {}
        const item =  store.state.category.list.find(item => {
          return item.id === route.params.id
        }) 

        if (item) {
          cate = item
        }

        return cate
      })
      
      // 获取各个子类目
      const subList = ref([])
      const getSubList = () => {
        findTopCategory(route.params.id).then(data => {
          subList.value = data.result.children
        })
      }

      watch(()=>route.params.id,(newVal,oldVal) => {
        newVal && getSubList()
      },{immediate: true})

      return { slideers,topCategory,subList }
    },
}
</script>

<style scoped lang='less'>
@import '../../assets/style/variables.less';


// 进入 从右侧 20px 位移，透明度伪 0
.fade-right {
  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  &-enter-active,
  &-leave-active {
    transition: all 0.5s;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
}

.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

// 推荐商品
.ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  } 
</style>
