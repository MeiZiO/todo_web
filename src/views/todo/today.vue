<template>
  <div>
    <div class="btgroup">
      <ButtonGroup shape="circle">
        <Button @click="add"><Icon type="ios-add" size="26"/></Button>
        <Button @click="sortByType"><Icon type="ios-aperture-outline" size="26"/></Button>
        <Button @click="sortByTime"><Icon type="ios-time-outline" size="26"/></Button>
        <!-- <Button @click="toClassification"><Icon type="ios-apps-outline" size="26"/></Button> -->
        <Poptip placement="right" width="400">
          <Button class="tailBt"><Icon type="ios-apps-outline" size="26"/></Button>
          <div class="api" slot="content">
            <CheckboxGroup v-model="searchData">
              <Checkbox v-for="item in serachTagData" :label="item.label" :key="item.key"></Checkbox>
            </CheckboxGroup>
          </div>
        </Poptip>
      </ButtonGroup>
    </div>
    <!-- <div class="theAll addbgc">
      <div class="child">
        <span class="add"><Icon type="md-add" /></span>
      </div>
    </div> -->
    <transition-group name="fade" enter-active-class="animated bounceInUp"
        leave-active-class="animated zoomOutDown">
      <template v-for="item in things">
        <div :class="'theAll animated bounceInUp '+item.type" :key="item.id">
          <div class="child">
            <span class="name">{{item.name}}</span>
            <span :class="checkClass" @click="doIt(item.id)"><Icon type="md-checkmark" /></span>
            <span class="handle" @click="showDetail(item)"><Icon type="ios-alert-outline" /></span>
            <span class="fontcolor"><Time :time="time3" type="relative" :interval="1"/></span>
          </div>
        </div>
      </template>
    </transition-group>
    <add-modal ref="addModal"></add-modal>
    <detail-dra ref="detailDra"></detail-dra>
    
  </div>
</template>



<script>
import addModal from './component/toDayAdd';
import detailDra from './component/toDayDrawer'
export default {
  data(){
    return {
      searchTagFlag: false,
      searchData: [],
      time3: (new Date()).getTime()+1000*6,
      rules: this.rules(),
      things: [
        {name:'待做任务1', type:'alert', id: "1"},
        {name:'待做任务2', type:'need', id: "2"},
        {name:'待做任务3', type:'free', id: "3"}
      ],
      checkClass: 'handle',
      serachTagData: [
        { "key": "1", "label": "已有标签1", "disabled": false },
        { "key": "2", "label": "已有标签2", "disabled": true },
        { "key": "3", "label": "已有标签3", "disabled": false }
      ],
    }
  },
  methods:{
    add () {
      this.addData={};
      this.addFlag = true;
      this.$refs.addModal.show();
    },
    sortByType () {
      this.$Message.success('按照程度统一排序');
    },
    sortByTime () {
      this.$Message.success('按照时间优先排序');
    },
    toClassification () {
      this.searchTagFlag = !this.searchTagFlag;
    },
    doIt () {
      this.things =  [
        {name:'待做任务2', type:'need', id: "2"},
        {name:'待做任务3', type:'free', id: "3"}
      ];
    },
    showDetail (item) {
      this.detailFlag = true;
      this.$refs.detailDra.show();
      this.$refs.detailDra.init(item);
    },
  },
  computed: {

  },
  components : {
    addModal,detailDra
  },
}
</script>

<style scoped>
  .theAll {
    width:80%;
    height: 50px;
    margin: 0 auto;
    margin-bottom: 14px;
    border-radius:20px;
    position: relative;
    box-shadow: rgb(216, 216, 216) 5px 5px 5px 2px ;
    transition: all .3s ease-in-out;
  }
  .theAll:hover {
    width:86%;
    height: 60px;
    box-shadow: rgb(216, 216, 216) 5px 5px 5px 5px ;
  }
  .alert {
    background: #ffa3a6
  }
  .need {
    background:#dcffc4
  }
  .free {
    background:#d3f5ff
  }
  .child {
    height: 50px;
    line-height: 50px;
  }
  .child:hover {
    height: 60px;
    line-height: 60px;
  }
  .name {
    /* position:absolute;
    width: 70%;
    top:50%;
    left: 100px;
    transform:translate(-50%,-50%); */
    float: left;
    width: 70%;
    text-align: left;
    padding-left: 30px;
    overflow: hidden;
    text-overflow:ellipsis;
    font-size: 16px;
    color: #786370;
  }
  .handle {
    float: left;
    border: #d3f5ff 2px;
    font-size: 30px;
    color:#ffffff;
    padding-left: 30px;
  }
  .check {
    color:#4ffb5b;
  }
  .add {
    font-size: 40px;
    color:#4ffb5b;
  }
  .addbgc {
    background:#8aa3ac;
  }
  .btgroup {
    text-align: right;
    padding-bottom: 26px;
    transform:translate(-10%);
  }
  .fontcolor {
    color: #a09da4;  }
  .tailBt {
    border-radius: 0 32px 32px 0!important;
  }
</style>

