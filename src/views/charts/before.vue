<template>
    <div class="container">
      <Row>
        <DatePicker type="date"  @on-change="getData" :options="options" placeholder="请选择时间" style="width: 200px" v-model="startTime"></DatePicker>        
      </Row>
      <Row>&nbsp;</Row>
      <Row>&nbsp;</Row>
      <Row>
        <Timeline class="animated fadeIn"  v-show="!nodataFlag">
            <TimelineItem v-for="(item,index) in data" :key="index">
                <p class="time">{{item.time}}</p>
                <p class="content">{{item.name}}</p>
            </TimelineItem>
        </Timeline>
        <div v-show="nodataFlag">
          <Timeline class="animated fadeIn">
            <TimelineItem>
                <p class="content">当天没有完成的事件</p>
            </TimelineItem>
          </Timeline>
        </div>
      </Row>
    </div>
</template>



<script>
export default {
  data() {
    return {
        data: [],
        nodataFlag: false,
        options: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now() - 86400000;
          }
        },
        startTime: '',
    };
  },
  methods: {
    getData (){
        this.nodataFlag = false;
        this.$axios({
        method: 'post',
        url: '/day/before',
        data:{'userid': localStorage.getItem('userId'), 'time': this.startTime}
      }).then( data => {
        if(data.data.success) {
            this.data = data.data.data;
            if(this.data.length == 0) {
              this.nodataFlag = true;
            }
        }else{
          this.$Message.error('查失败，请稍后重试');
        }
      });
    }
  },
  mounted() {
  },
}
</script>
<style scoped>
    .time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }
    .container {
        width:200px;
        text-align: 0 auto;
        margin-left: 170px; 
        /* color:#c7becd */
    }
</style>
