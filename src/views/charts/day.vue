<template>
    <div class="container">
        <Timeline class="animated fadeIn">
            <TimelineItem>
                <p class="time">1976年</p>
                <p class="content">Apple I 问世11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</p>
            </TimelineItem>
            <TimelineItem>
                <p class="time">1984年</p>
                <p class="content">发布 Macintosh</p>
            </TimelineItem>
            <TimelineItem>
                <p class="time">2007年</p>
                <p class="content">发布 iPhone</p>
            </TimelineItem>
            <TimelineItem>
                <p class="time">2010年</p>
                <p class="content">发布 iPad</p>
            </TimelineItem>
            <TimelineItem>
                <p class="time">2011年10月5日</p>
                <p class="content">史蒂夫·乔布斯去世</p>
            </TimelineItem>
            <TimelineItem>
                <Icon type="md-walk" size="40" color="#797289" slot="dot"></Icon>
                <p class="content">今日还未流逝,还要继续努力噢</p>
            </TimelineItem>
        </Timeline>
    </div>
</template>



<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    
    
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
