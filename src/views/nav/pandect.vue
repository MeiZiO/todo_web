<template>
  <div>
    <Row>
      <Col span="12">
        <div class="contentFather">
          <span v-if="!hasYesterday"  class="content">
            无昨日数据
          </span>
        </div>
      </Col>
      <Col span="12">
        <temp id="container" class="floatL" :style="{width: '100%', height: '600px'}" :option="chartOptionY" @click="show" v-if="hasYesterday"></temp>
      </Col>
      <Col span="12">
        <temp id="container2" class="floatL" :style="{width: '100%', height: '600px'}" :option="chartOption" @click="show"></temp>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <div v-if="hasYesterday" class="title">
          昨天的情况概览
        </div>
        <div v-if="!hasYesterday">
          &nbsp;
        </div>
      </Col>
      <Col span="12">
        <div class="title">
          今天的情况概览
        </div>
      </Col>
    </Row>
  </div>
</template>



<script>
import temp from '../charts/echarts.vue'
export default {
  data() {
    return {
      hasYesterday: true,
      chartOption: {},
      data: [],
      names: [],
      chartOptionY: {},
      datay: [],
      namesy: [],
    };
  },
  components :{
    temp
  },
  methods: {
    show (item) {
      console.log(item, 'item');
    },
    // 查询今天的统计
    initCharts () {
      this.$axios({
        method: 'post',
        url: '/pandect',
        data:{'userid': localStorage.getItem('userId')}
      }).then( data => {
        if(data.data.success) {
          this.data = data.data.data;
          this.names = data.data.names;
          this.chartOption = {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} <br/>占比：({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:this.names
            },
            title: [{
              text: '今日进度图',
              top:'47%',
              left:'40%',
              textStyle:{
                  color: '#808080',
                  fontSize: 28,
                  fontWeight: 'normal',
              }
            }],
            series: [
                {
                    color:['#ff80ff','#808080','#fad797'],
                    // name:'访问来源',
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
                    data:this.data 
                }
            ],
          };
        }
      });
      

      this.$axios({
        method: 'post',
        url: '/pandect/Yestday',
        data:{'userid': localStorage.getItem('userId')}
      }).then( data => {
        if(data.data.success) {
          this.dataY = data.data.data;
          this.namesY = data.data.names;
          console.log(this.data, 'this.data')
          console.log(this.names,'this.names');
          this.chartOptionY = {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} <br/>占比：({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:this.namesY
            },
            title: [{
              text: '今日进度图',
              top:'47%',
              left:'40%',
              textStyle:{
                  color: '#808080',
                  fontSize: 28,
                  fontWeight: 'normal',
              }
            }],
            series: [
                {
                    color:['#ff80ff','#808080','#fad797'],
                    // name:'访问来源',
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
                    data:this.dataY 
                }
            ]
          };
        }else {
          this.hasYesterday = false;
        }
      });
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
.title {
   font-size: 28px;
   color: #808080;
}
.contentFather {
    height: 600px;
  }
.content {
  font-size: 28px;
  color: #808080;
  line-height: 600px;
}
</style>


