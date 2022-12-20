<!--  -->
<template>
  <MyPie :data="state.salePie"></MyPie>
  <MyMap :data="state.saleMap"></MyMap>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, defineComponent } from 'vue'

import MyPie from './components/myPie.vue'
import MyMap from './components/myMap.vue'
import axios from 'axios';



    const getAdminStat = (): Promise<IndexRes> => axios.get('http://kumanxuan1.f3322.net:8360/admin/stat')

    const state = reactive<{
      salePie: {}[],
      saleMap: {}[]
    }>({
      salePie: [],
      saleMap: []
    })

    getAdminStat().then(res => {

      if (res.data.errno === 0) {
        state.salePie = res.data.data.salePie
        state.saleMap = res.data.data.saleMap

      }
    })




</script>
<style lang='scss' scoped>

</style>