<!--  -->
<template>
  <div class="nav">
    <el-radio-group v-model="selectLabel" @change="daychange" class="radio">
    <el-radio-button label="sale_">销量</el-radio-button>
    <el-radio-button label="_money">销售额</el-radio-button>

  </el-radio-group>

  <el-select v-model="selectDay" class="m-2" placeholder="Select" @change="daychange">
    <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value" />
  </el-select>
  </div>
  
  <div id="pie"></div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, watch, defineProps } from 'vue'
import * as echarts from 'echarts'

import { ElRadio, ElRadioGroup, ElRadioButton } from 'element-plus'


const props = defineProps<{
  data: {}[]
}>()

const state = reactive({
  selectLabel: '_money',
  selectDay: 'today',
  options: [{
    name: '今天',
    value: 'today'
  }, {
    name: '昨天',
    value: 'yesterday'
  }, {
    name: '前三天',
    value: 'three_days'
  }, {
    name: '前7天',
    value: 'seven_days'
  }]
})
const { selectDay, selectLabel, options } = toRefs(state)
const daychange = () => {
  init()
}

// let myChart:echarts.ECharts 
const init = () => {
  let key = ''
  if (selectLabel.value === '_money') {
    key = selectDay.value + selectLabel.value
  } else {
    key = selectLabel.value + selectDay.value
  }
  const arr = props.data.map((item: { [key: string]: string }) => ({ value: item[key], name: item.name }))


  //初始化echarts实例
  let myChart = echarts.init(document.getElementById('pie') as HTMLElement);

  const option = {
    legend: {
      top: 'top',
      height: 100
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [80, 150],
        center: ['50%', '50%'],
        // roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        labelLine: {
          length: 30
        },
        data: arr
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

//生命周期：父组件先 beforecreate created beforemount 然后子组件beforecreate created beforemount mount 然后父组件mount
//父组件在setup发送异步请求 生命周期继续走 当子组件创建好时 父组件异步请求还没发送完 此时拿不到数据
//解决方案 使用watch

watch(() => props.data, () => {
  init()
})




</script>
<style lang='scss' scoped>
#pie {
  width: 100%;
  height: 550px;
}


.radio{
  margin-right: 100px;
}
</style>