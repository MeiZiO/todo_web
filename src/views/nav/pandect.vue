<template>
  <div>
    <temp id="container" class="floatL" :style="{width: '40%', height: '600px'}" :option="chartOption" @click="show"></temp>
    <temp id="container2" class="floatL" :style="{width: '40%', height: '600px'}" :option="chartOption" @click="show"></temp>
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
    show (item) {
      console.log(item, 'item');
    },
    initCharts () {
       
this.chartOption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','aa']
    },
    series: [
        {
            color:['#ff80ff','#ff8080','#fad797','#808080','#80ff80'],
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:135, name:'aa'},
            ]
        }
    ]
};





    },
    
  },
  mounted() {
    this.initCharts();
  },
}
</script>

<style>
.floatL{
  float: left;
}
</style>


