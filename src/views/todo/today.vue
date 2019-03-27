<template>
  <div>
    <div class="btgroup">
      <ButtonGroup shape="circle">
        <Button @click="add"><Icon type="ios-add" size="26"/></Button>
        <Button @click="sortByType"><Icon type="ios-aperture-outline" size="26"/></Button>
        <Button @click="sortByTime"><Icon type="ios-time-outline" size="26"/></Button>
        <Button @click="toClassification"><Icon type="ios-apps-outline" size="26"/></Button>
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
          </div>
        </div>
      </template>
    </transition-group>
    <Modal v-model="addFlag" width="400">
        <p slot="header" class="addHeader">
            <Icon type="ios-body" size="30"/>
            <span>新的ToDo</span>
        </p>
        <div style="text-align:center">
        <div class="addContent">
            <Row>
              <Col span="6">
                做点什么:
              </Col>      
              <Col span="16">
                <Input v-model="addData.name" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="edit.name" />
              </Col>
            </Row>
            <Row>
            <Col span="4">
              type: 
            </Col>
            <Col span="8">
            <RadioGroup v-model="addData.type" vertical @on-change="handleMark">
                <Radio label="alert">
                  <Icon type="social-apple"></Icon>
                  <span>紧急</span>
                </Radio>
                <Radio label="need">
                  <Icon type="social-android"></Icon>
                  <span>一般</span>
                </Radio>
                <Radio label="free">
                  <Icon type="social-windows"></Icon>
                  <span>闲暇</span>
                </Radio>
              </RadioGroup>
            </Col>
          </Row>
          <div class="mark">
          <Icon type="md-bulb" size="50" :color="markColor"/>
          </div>
        </div>
        </div>
        <div slot="footer">
            <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
          <Button type="info" long>加油干噢</Button>
          <br><br>
          <Button type="warning" long>我后悔了</Button>
        </div>
    </Modal>
   <Drawer :closable="false" width="640" v-model="detailFlag">
      <div class="demo-drawer-profile">
        <Row>
          <Col span="12">
            Full Name: Aresn
          </Col>
          <Col span="12">
            Account: aresn@aresn.com
          </Col>
        </Row>
        <Row>
          <Col span="12">
            City: BeiJing
          </Col>
          <Col span="12">
            Country: China
          </Col>
        </Row>
        <Row>
          <Col span="12">
            Birthday: May 14, 1991
          </Col>
          <Col span="12">
            Website: <a href="https://dev.iviewui.com" target="_blank">https://dev.iviewui.com</a>
          </Col>
        </Row>
        Message: Hello, Developer
      </div>
      <Divider />
      <div class="drawerBase">
        <Row>
          <Col span="4">
          任务名：
          <span  @click="editNameFlag=!editNameFlag"><Icon type="md-create" /></span>
          </Col>
          <Col span="8" v-show="!editNameFlag">
            {{edit.name}}
          </Col>
          <Col span="8" v-show="editNameFlag">
          <Input @on-blur="handleNameEdit" autofocus v-model="edit.name" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="edit.name" />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span="12">
            id: {{edit.id}}
          </Col>
        </Row>
        <Row>
          <Col span="4">
            type: 
          </Col>
          <Col span="8">
           <RadioGroup v-model="edit.type" vertical>
              <Radio label="alert">
                <Icon type="social-apple"></Icon>
                <span>紧急</span>
              </Radio>
              <Radio label="need">
                <Icon type="social-android"></Icon>
                <span>一般</span>
              </Radio>
              <Radio label="free">
                <Icon type="social-windows"></Icon>
                <span>闲暇</span>
              </Radio>
            </RadioGroup>
          </Col>
        </Row>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  data(){
    return {
      things: [
        {name:'待做任务1', type:'alert', id: "1"},
        {name:'待做任务2', type:'need', id: "2"},
        {name:'待做任务3', type:'free', id: "3"}
      ],
      checkClass: 'handle',
      detailFlag: false,
      edit: {},
      editNameFlag: false,
      addFlag: false,
      addData: {},
      markColor: '#ffffff',
    }
  },
  methods:{
    handleMark (value) {
      switch (value) {
        case 'alert': this.markColor ='#ffa3a6'
        break;
        case 'need': this.markColor ='#dcffc4'
        break;
        case 'free': this.markColor ='#d3f5ff'
        break;
      }
    },
    add () {
      this.addFlag = true;
    },
    sortByType () {
      this.$Message.success('按照程度统一排序');
    },
    sortByTime () {
      this.$Message.success('按照时间优先排序');
    },
    toClassification () {},
    doIt () {
      this.things =  [
        {name:'待做任务2', type:'need', id: "2"},
        {name:'待做任务3', type:'free', id: "3"}
      ];
    },
    showDetail (item) {
      this.detailFlag = true;
      this.edit = item;
    },
    handleNameEdit () {
      this.editNameFlag = !this.editNameFlag;
    }
  }
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
    width: 80%;
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
  .drawerBase {
    font-size: 16px;
  }
  .edit {
    padding-left: 15x;
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
  .addHeader {
    color: #8aa3ac;
    text-align: center;
    height: 30px;
  }
  .addContent {
    text-align:center
  }
  .mark {
    float:right;
    transform:translate(-200%,-140%);
  }
</style>

