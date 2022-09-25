<template>
  <div>App</div>
  <p>{{ $store.state.username }}</p>
  <!-- <p>{{ $store.getters.newName }}</p> -->
  <p>{{ $store.getters['newName'] }}</p>
  <button @click="update">点我更新 state</button>
  <button @click="updata">点我测试 action</button>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    const store = useStore()
    console.log(store.state.username)
    console.log(store.getters.newName)
    const update = function () {
      store.commit('updateName')
    }
    const updata = function () {
      store.dispatch('updateN', 'aaa')
    }
    return { update, updata }
  }
}

</script>

<style lang="less">

</style>
