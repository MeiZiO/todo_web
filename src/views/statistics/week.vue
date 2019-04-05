<template>
  <div>
    <temp id="container" :style="{width: '100%', height: '450px'}" :option="chartOption"></temp>
  </div>
</template>



<script>
import temp from '../charts/echarts.vue'
export default {
  data() {
    return {
      chartOption: {}
    };
  },
  components :{
    temp
  },
  methods: {
    initCharts () {
      var bgColor = '#c7becd';
      this.chartOption =  {
        // backgroundColor: bgColor,
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',

                data: [{
                  name:'本周',
                  children:[
                    {
                  name:'周一',
                  children:[
                    {name: '2'},
                    {name: '3'}
                  ]
                },{
                  name:'周二',
                  children:[
                    {name: '2'},
                    {name: '3'}
                  ]
                },{
                  name:'周三',
                  children:[
                    {name: '2'},
                    {name: '3'}
                  ]
                },{
                  name:'周四',
                  children:[
                    {name: '2'},
                    {name: '3'}
                  ]
                },{
                  name:'周五',
                  children:[
                    {name: '2'},
                    {name: '3'}
                  ]
                },{
                  name:'周六',
                  children:[
                    {name: '2'},
                    {name: '3'}
                  ]
                },{
                  name:'周日',
                  children:[
                    {name: '2'},
                    {name: '3'}
                  ]
                }
                  ]
                }],

                top: '18%',
                bottom: '14%',

                layout: 'radial',

                symbol: 'emptyCircle',

                symbolSize: 7,

                initialTreeDepth: 3,

                animationDurationUpdate: 750

            }
        ]
      }
    },
    
  },
  mounted() {
    this.initCharts();
  },
}
</script>

