<template>
  <div>
    <Spin size="large" fix v-if="spinShow">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <div class="btgroup">
      <ButtonGroup shape="circle">
        <Button @click="add"><Icon type="ios-add" size="26"/></Button>
        <Button @click="sortByType"><Icon type="ios-aperture-outline" size="26"/></Button>
        <Button @click="sortByTime"><Icon type="ios-time-outline" size="26"/></Button>
        <!-- <Button @click="toClassification"><Icon type="ios-apps-outline" size="26"/></Button> -->
        <!-- <div style="z-index:100;"> -->
        <Poptip placement="right" width="400" word-wrap transfer>
          <Button class="tailBt" @click="getTagData"><Icon type="ios-apps-outline" size="26"/></Button>
          <div class="selectTag" slot="content">
            <CheckboxGroup v-model="searchData" indeterminate>
              <div class="showTagContent" v-for="item in serachTagData" :key="item.key">
              <Checkbox :label="item.label"></Checkbox>
              </div>
            </CheckboxGroup>
            <div class="showTagContent">
              <Button shape="circle" icon="ios-search" @click="sortByTag"></Button>
            </div>
            <div class="showTagContent">
              <Button shape="circle" icon="md-close" @click="cancelTag"></Button>
            </div>
          </div>
        </Poptip>
        <!-- </div> -->
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
            <span class="fontcolor" v-show="item.timepoint != 0"><Time :time="item.timepoint" type="relative" :interval="1"/></span>
            <!-- v-show="item.timepoint" -->
          </div>
        </div>
      </template>
    </transition-group>
    <Row>&nbsp;</Row>
      <div class="floatR animated bounceInUp">
        <Page :total="total" size="small" show-elevator show-sizer show-total :page-size-opts="[5, 10, 20, 50]"
          :page-size="params.rows"
          :current = "params.page"
          @on-page-size-change= "pageSizeHandle"
          @on-change="pageHandle"/>
      </div>
    <add-modal ref="addModal"></add-modal>
    <detail-dra ref="detailDra" ></detail-dra>
  </div>
</template>



<script>
import addModal from './component/toDayAdd';
import detailDra from './component/toDayDrawer'
import { constants } from 'crypto';
export default {
  data(){
    return {
      spinShow: true,
      searchTagFlag: false,
      searchData: [],
      time3: (new Date()).getTime()+1000*6,
      rules: this.rules(),
      checkClass: 'handle',
      serachTagData: [
        { "key": "1", "label": "已有标签1", "disabled": false },
        { "key": "2", "label": "已有标签2", "disabled": true },
        { "key": "3", "label": "已有标签3", "disabled": false },
      ],
      // things: [
      //   {name:'待做任务1', type:'alert', id: "1", remark:'我是备注'},
      //   {name:'待做任务2', type:'need', id: "2", remark:'我是备注'},
      //   {name:'待做任务3', type:'free', id: "3", remark:'我是备注'}
      // ],
      things: [],
      params: {
        page: 1,
        rows: 5,
        type: '',
      },
      total: 0,
    }
  },
  methods:{
    cancelTag () {
      this.searchData=[];
      this.params.type = '';
      this.getData();
    },
    sortByTag () {
      this.$nextTick(() => {
        this.params.type = 'tag';
        this.params.tagData = this.searchData;
        this.getData();
      });
    },
    getTagData(){
      this.initTagData();
    },
    pageSizeHandle (size) {
      this.params.rows = size;
      this.params.page = 1;
      this.getData();
    },
    pageHandle (index) {
      this.params.page = index;
      this.getData();
    },
    getDataHandle () {
      this.params = {
        page: 1,
        rows: 5,
      };
      this.getData ();
    },
    getData () {
      this.params.userId = localStorage.getItem("userId");
      this.$axios({
        method: 'post',
        url: '/list/todo/today',
        data: this.params
      }).then( data => {
        if(data.data.success){
          this.spinShow = false;
          this.things = data.data.data;
          this.total = data.data.total;
        }else {
          this.$Message.error('查询失败，请刷新');
        }
      });
    },
    add () {
      this.addData={};
      this.addFlag = true;
      this.$refs.addModal.show();
      this.$refs.addModal.initTagData();
    },
    sortByType () {
      this.$nextTick(() => {
        if (this.params.type == 'type') {
          this.params.type = '';
        }else{
          this.params.type = 'type';
        }
        this.getData();
      });
    },
    sortByTime () {
      this.$nextTick( () => {
        if (this.params.type == 'time') {
          this.params.type = '';
        }else{
          this.params.type = 'time';
        }
        console.log(this.params.type,'leo');
        this.getData();
      });
    },
    toClassification () {
      this.searchTagFlag = !this.searchTagFlag;
    },
    doIt (id) {
      console.log(id,'id');
      this.$axios({
        method: 'post',
        url: '/today/doit',
        data: {'id': id, 'userid': localStorage.getItem('userId')}
      }).then( data => {
        if(data.data.success) {
          this.$Message.success('恭喜你！just do it!');
          this.getData();
        }
      });
    },
    showDetail (item) {
      // this.$refs.detailDra.show();
      this.$refs.detailDra.init(item.id);
    },
    // 初始化可选标签数据
    initTagData () {
       this.$axios({
        method: 'POST',
        url: '/tagData/list',
      }).then(data => {
        if (data.data.success) {
          this.serachTagData = data.data.data;
        }else{
          this.$Message.error('标签刷新失败，请重试');
        }
      });
    },
  },
  computed: {

  },
  components : {
    addModal,detailDra
  },
  mounted () {
    this.spinShow = true;
    this.$axios({
      method: 'post',
      url: '/init',
      data:{'userid': localStorage.getItem('userId')}
    }).then( data => {
      this.getDataHandle();
    });
  },
  created() {
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
  .selectTag {
    padding: 14px 10px 6px 10px;
  }
  .showTagContent {
    float: left;
    width: 110px;
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
  }
  .a {
    box-shadow: rgb(216, 216, 216) 5px 5px 5px 5px ;
    
  }
  .floatR {
  float: right;
  /* color: #80ff80; */
}
</style>

