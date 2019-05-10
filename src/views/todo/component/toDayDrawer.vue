<template>
    <Drawer :closable="false" width="640" v-model="flag">
      <div class="demo-drawer-profile">
        <Row>
          <Col span="8"><Button type="warning" ghost @click="cancelEvent">取消本次提醒</Button></Col>
          <Col span="8"><Button type="success" ghost @click = "editSubmit">确认事件信息</Button></Col>
          <Col span="8"><Button type="error" ghost @click="deleteEvent">删除本事件</Button></Col>
        </Row>
      </div>
      <Divider />
      <div class="drawerBase">
        <Row>
          <Col span="4">
          做什么：
          <span  @click="editNameFlag=!editNameFlag"><Icon type="md-create" /></span>
          </Col>
          <Col span="8" v-show="!editNameFlag">
            {{edit.name}}
          </Col>
          <Col span="8" v-show="editNameFlag">
          <!-- <Input @on-blur="handleNameEdit" autofocus v-model="edit.name" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="edit.name" /> -->
          <Poptip trigger="focus">
           <Input @on-blur="handleNameEdit" autofocus v-model="edit.name" :autosize="{minRows: 2,maxRows: 5}" :placeholder="edit.name" />                
            <div slot="content">{{ editname }}</div>
          </Poptip>
          </Col>
        </Row>
        <!-- <Divider />
        <Row>
          <Col span="12">
            id: {{edit.id}}
          </Col>
        </Row> -->
        <Divider />
        <Row>
          <Col span="4">
            type: 
          </Col>
          <Col span="8">
           <RadioGroup v-model="edit.type" vertical>
              <Radio label="0">
                <Icon type="social-apple"></Icon>
                <span>紧急</span>
              </Radio>
              <Radio label="1">
                <Icon type="social-android"></Icon>
                <span>一般</span>
              </Radio>
              <Radio label="2">
                <Icon type="social-windows"></Icon>
                <span>闲暇</span>
              </Radio>
            </RadioGroup>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span="4">
            标签:
          </Col>
          <Col span="20">
            <Tag v-for="item in tagData" :key="item.key">{{item.label}}</Tag> 
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span="4">备注：</Col>
          <Col span="8">
            <Input v-model="edit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="可以具体描述你想做的事情，也可以空置此处" />
          </Col>
        </Row>
        <Divider />
      </div>
    </Drawer>
</template>



<script>
import { constants } from 'crypto';
export default {
  data () {
    return {
      flag: false,
      edit: {},
      editNameFlag: false,
      // tagData: [
      //   { "key": "1", "label": "已有标签1", "disabled": false },
      //   { "key": "2", "label": "已有标签2", "disabled": true },
      //   { "key": "3", "label": "已有标签3", "disabled": false },
      // ],
      tagData: [],
      oldName: '',
    }
  },
  methods: {
    editSubmit () {
       this.$axios({
        method: 'post',
        url: '/list/todo/totady/edit',
        data: this.edit,
        // options: {
        //   noParam: true
        // }
      }).then( data => {
        if(data.data.success){
          this.$Message.success('修改成功！');
          this.flag = false;
          this.$parent.getData();
        }else {
          this.$Message.error('修改失败，请稍后重试');
        }
      });
    },
    deleteEvent() {
      this.$axios({
        method: 'post',
        url: '/list/todo/today/delete',
        data: {'id': this.edit.id}
      }).then( data => {
        if(data.data.success){
          this.$Message.success('删除成功！');
          this.flag = false;
          this.$parent.getData();
        }else {
          this.$Message.error('删除失败，请稍后重试');
        }
      });
    },
    cancelEvent () {
       this.$axios({
        method: 'post',
        url: '/list/todo/today/cancel',
        data: {'id': this.edit.id}
      }).then( data => {
        if(data.data.success){
          this.$Message.success('取消成功！');
          this.flag = false;         
          this.$parent.getData();
        }else {
          this.$Message.error('取消失败，请稍后重试');
        }
      });
    },
    handleNameEdit () {
      this.editNameFlag = !this.editNameFlag;
    },
    show () {
      this.flag = true;
    },
    init (id) {
      this.edit.id = id;
      this.$axios({
        method: 'post',
        url: '/list/todo/detail',
        data: {'id': id}
      }).then( data => {
        console.log(data,'data');
        if(data.data.success){
          this.edit = data.data;
          this.edit.oldName = name; 
          this.tagData = this.edit.tagData;
          this.show();
        }else {
          this.$Message.error('获取详情失败，请稍后重试');
        }
      });
    },
  },
  computed: {
    editname () {
      if (this.edit.name === '') return '请输入想做的事情';
      return this.edit.name ;
    }
  },
}
</script>

<style scoped>
  .edit {
    padding-left: 15x;
  }
   .drawerBase {
    font-size: 16px;
  }
</style>

