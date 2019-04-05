<template>
<div>
  <div id="container" style="min-width:400px;height:400px"></div>
</div>
</template>

<script>
var Highcharts = require('highcharts');
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts);
// 创建图表

export default {
  mounted () {
    Highcharts.chart('container', { 
      /*Highcharts 配置*/
      chart: {
        type: 'column'
    },
    title: {
        text: '分公司效率优化嵌套图'
    },
    xAxis: {
        categories: [
            '杭州总部',
            '上海分部',
            '北京分部'
        ]
    },
    yAxis: [{
        min: 0,
        title: {
            text: '雇员'
        }
    }, {
        title: {
            text: '利润 (millions)'
        },
        opposite: true
    }],
    legend: {
        shadow: false
    },
    tooltip: {
        shared: true
    },
    plotOptions: {
        column: {
            grouping: false,
            shadow: false,
            borderWidth: 0
        }
    },
    series: [{
        name: '雇员',
        color: 'rgba(165,170,217,1)',
        data: [150, 73, 20],
        pointPadding: 0.3, // 通过 pointPadding 和 pointPlacement 控制柱子位置
        pointPlacement: -0.2
    }, {
        name: '优化的员工',
        color: 'rgba(126,86,134,.9)',
        data: [140, 90, 40],
        pointPadding: 0.4,
        pointPlacement: -0.2
    }, {
        name: '利润',
        color: 'rgba(248,161,63,1)',
        data: [183.6, 178.8, 198.5],
        tooltip: {  // 为当前数据列指定特定的 tooltip 选项
            valuePrefix: '$',
            valueSuffix: ' M'
        },
        pointPadding: 0.3,
        pointPlacement: 0.2,
        yAxis: 1  // 指定数据列所在的 yAxis
    }, {
        name: '优化的利润',
        color: 'rgba(186,60,61,.9)',
        data: [203.6, 198.8, 208.5],
        tooltip: {
            valuePrefix: '$',
            valueSuffix: ' M'
        },
        pointPadding: 0.4,
        pointPlacement: 0.2,
        yAxis: 1
    }]
});
  }
}

</script>
