<template>
  <XtxBread>
    <xtx-bread-item to="/">首页</xtx-bread-item>
    <xtx-bread-item v-if="category.top" :to="`/category/${category.top.id}`">{{
      category.top.name
    }}</xtx-bread-item>
    <xtx-bread-item v-if="category.sub">{{ category.sub.name }}</xtx-bread-item>
  </XtxBread>
</template>


<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "SubBread",
  setup() {
    // 通过计算属性 从 vuex 获取顶级分类和二级类目信息
    // 数据对象 {top: {id:'', name},sub:{id,name}}
    const route = useRoute();

    const store = useStore();
    const category = computed(() => {
      const cate = {};
      store.state.category.list.forEach((top) => {
        if (top.children) {
          const sub = top.children.find((sub) => sub.id === route.params.id);
          if (sub) {
            cate.top = { id: top.id, name: top.name };
            cate.sub = { id: sub.id, name: sub.name };
          }
        }
      });
      return cate;
    });
    return { category };
  },
};
</script>


<style scoped lang='less'></style>