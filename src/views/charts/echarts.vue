<template>
  <div class="xxx" :id="id" :style="style"></div>
</template>

<script>
export default {
  props: {
    id:{
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String
    },
    option: {
      type: Object
    }
  },
  data () {
    return {
      MyEcharts: "" //echarts实例
    }
  },
  computed:{
    style () {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  watch: {
     //要监听的对象 option
    //由于echarts采用的数据驱动，所以需要监听数据的变化来重绘图表
    option: {
      handler (newVal, oldVal) {
        if (this.MyEcharts) {
          if (newVal) {
            this.MyEcharts.setOption(newVal, true);
          } else {
            this.MyEcharts.setOption(oldVal, true);
          }
        } else {
          this.InitCharts();
        }
      },
      deep: true  //对象内部属性的监听，关键。
    }
  },
  mounted () {
    this.InitCharts();
  },
  methods: {
    InitCharts () {
      this.MyEcharts = this.echarts.init(document.getElementById(this.id));
      /*
       * 此方法适用于所有项目的图表，但是每个配置都需要在父组件传进来，相当于每个图表的配置都需要写一遍，不是特别的省代码，主要是灵活度高
       * echarts的配置项，你可以直接在外边配置好，直接扔进来一个this.option
      */
      this.MyEcharts.clear();
      this.MyEcharts.setOption(this.option, true);
      let _this = this;
      window.addEventListener("resize", function() {
        _this.MyEcharts.resize();
      });
      
    }
  }
}
</script>
