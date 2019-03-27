<template>
  <div>
     <div class="theAll addbgc">
      <div class="child">
        <span class="add"><Icon type="md-add" /></span>
      </div>
    </div>
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
    }
  },
  methods:{
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
    width:90%;
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
</style>

