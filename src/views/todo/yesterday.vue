<template>
    <div>
      <Row>
        <Col span="6">
          <Input placeholder="请输入名称" search enter-button @on-search="getDataByName" v-model="searchName"/>
        </Col>
        <Col span="16">&nbsp;</Col>
        <!-- <Col span="2">
          <Button shape="circle" type="success" ghost @click.native="addToday">加入今日</Button>
        </Col> 
        <Col span="2">
          <Button shape="circle" type="info" ghost>加入明日</Button>
        </Col>
        <Col span="2">
          <Button shape="circle" type="warning" ghost @click="pause">暂停本事件</Button>
        </Col> -->
        <Col span="2">
          <Button shape="circle" type="error" @click="deleteAll" ghost>删除所有记录</Button>
        </Col>
      </Row>
      <Row>&nbsp;</Row>
      <Table stripe border ref="selection" :columns="columns4" :data="data1" tooltip @on-row-click="cliclRow" class="animated bounceInUp"></Table>
      <Row>&nbsp;</Row>
      <!-- <div class="floatR animated bounceInUp">
        <Page :total="40" size="small" show-elevator show-sizer show-total :page-size-opts="[5, 10, 20, 50]"/>
      </div> -->
      <div class="floatR animated bounceInUp">
        <Page :total="total" size="small" show-elevator show-sizer show-total :page-size-opts="[5, 10, 20, 50]"
          :page-size="params.rows"
          :current = "params.page"
          @on-page-size-change= "pageSizeHandle"
          @on-change="pageHandle"/>
      </div>
      <Drawer title="详细信息" placement="left" :closable="false" v-model="showDeatilFlag" width="600">
        <div class="detailContent">
          <Collapse simple>
            <Panel name="1">
              名称：<span class="content">{{temp.name}}</span>
              <p slot="content">{{temp.name}}</p>
            </Panel>
            <Panel name="2">
              备注：<span class="content">{{temp.remark}}</span>
              <p slot="content">{{temp.remark}}</p>
            </Panel>
            <Panel name="3">
              事件创建时间：<span class="content">{{temp.eventCreateTime}}</span>
              <p slot="content">{{temp.eventCreateTime}}</p>
            </Panel>
            <Panel name="5">
              剩余提醒次数：<span class="content">{{temp.remaining}}</span>
              <p slot="content">{{temp.remaining}}</p>
            </Panel>
            <Panel name="6">
              提醒方式：<span class="content">{{temp.alertType}}</span>
              <p slot="content">{{temp.alertType}}</p>
            </Panel>
            <Panel name="7">
              标签：<span class="content">{{temp.tags}}</span>
              <p slot="content">{{temp.tags}}</p>
            </Panel>
            <!-- <Panel name="6">
              提醒记录：<span class="content">{{temp.alertHistroy}}</span>
              <p slot="content">{{temp.alertHistroy}}</p>
            </Panel>   -->
          </Collapse>
        </div>
      </Drawer>
      <!-- <Button type="primary" @click="modal1 = true">Display dialog box</Button> -->
      <Modal
          v-model="modal1"
          title="删除所有提醒记录"
          @on-ok="ok"
          @on-cancel="cancelDeleteAll">
          <p>您想要删除所有的提醒记录吗，一旦删除将无法再恢复</p>
      </Modal>
    </div>
</template>

<script>
import { constants } from 'crypto';
// import {hisLogStatus} from 'filters';

export default {
  data ()　{
    return {
      modal1: false,
      searchName: '',
      temp: {},
      showDeatilFlag: false,
      columns4: [
        // {
        //     type: 'selection',
        //     width: 60,
        //     align: 'center'
        // },
        
        {
          title: '记录id',
          key: 'hisId',
          ellipsis: true,
          tooltip: true,
        },
        {
            title: '事件id',
            key: 'id',
            ellipsis: true,
            tooltip: true,
        },
        {
            title: '事件',
            key: 'name',
            ellipsis: true,
            tooltip: true,
        },
        {
            title: '事件状态',
            key: 'eventIsSleep'
        },
        {
            title: '提醒结果',
            key: 'loges'
        },
        {
          title: '记录日期',
          key: 'createTime',
        },
        {
          title: '提醒开始日期',
          key: 'startTime',
        },
        {
          title: '提醒结束日期',
          key: 'endTime',
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 290,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                },
                on: {
                  click: (item) => {
                    this.showDetail(params.row.id);
                  },
                },
              }, ' 详情 '),
              h('span', {
                props: {
                  width: 1,
                },
              },'   '),
               h('Button', {
                props: {
                },
                on: {
                  click: (item) => {
                    this.pause(params.row.id);
                  },
                },
              }, ' 暂停本事件 '),
              h('span', {
                props: {
                  width: 1,
                },
              },'   '),
               h('Button', {
                props: {
                },
                on: {
                  click: (item) => {
                    this.delete(params.row.hisId);
                  },
                },
              }, ' 删除本记录 ')
          ]);
        }
        }
      ],
      data1: [],
      params: {
        page: 1,
        rows: 5,
      },
      total: 0,
      // data1: [
      //   {
      //       name: '我是任务名1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      //       status: '已完成',
      //       creatTime: '2016-10-03',
      //       alertType: '不知道',
      //       remark: '我是备注呀9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
      //       startTime: '开始的时间呢',
      //       alertHistroy: '暂无记录',
      //       happenTime: '2018-8-9'
      //   },
      //    {
      //       name: '我是任务名1',
      //       status: '已完成',
      //       creatTime: '2016-10-03',
      //       alertType: '不知道',
      //       remark: '我是备注呀',
      //       startTime: '开始的时间呢',
      //       alertHistroy: '暂无记录'
      //   },
      //    {
      //       name: '我是任务名1',
      //       status: '已完成',
      //       creatTime: '2016-10-03',
      //       alertType: '不知道',
      //       remark: '我是备注呀',
      //       startTime: '开始的时间呢',
      //       alertHistroy: '暂无记录'
      //   },
      //    {
      //       name: '我是任务名1',
      //       status: '已完成',
      //       creatTime: '2016-10-03',
      //       alertType: '不知道',
      //       remark: '我是备注呀',
      //       startTime: '开始的时间呢',
      //       alertHistroy: '暂无记录'
      //   },
      // ]     
    }
  },
  methods: {
    ok () {
      this.$axios({
        method: 'post',
        url: '/list/history/deleteAll'
      }).then( data => {
        if(data.data.success){
          this.params.page =1;
          this.getData();
        }else {
          this.$Message.error('删除所有的记录失败，请稍后重试');
        }
      });
    },
    cancelDeleteAll () {
      this.modal1 = false;
    },
    deleteAll () {
      this.modal1 = true;
    },
    delete (id) {
      this.params.id = id;
      this.$axios({
        method: 'post',
        url: '/list/history/delete',
        data: this.params
      }).then( data => {
        if(data.data.success){
          this.params.page =1;
          this.getData();
        }else {
          this.$Message.error('删除记录失败，请稍后重试');
        }
      });
    },
    pause (id) {
      this.params.id =id;
      this.$axios({
        method: 'post',
        url: '/list/history/pause',
        data: this.params
      }).then( data => {
        if(data.data.success){
          this.params.page =1;
          this.getData();
        }else {
          this.$Message.error('暂停事件失败，请稍后重试');
        }
      });
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
    getDataByName () {
      this.params.name = this.searchName;
      this.params.userId = localStorage.getItem('userId');
      this.$axios({
        method: 'post',
        url: '/list/todo/yesterdayByName',
        data: this.params
      }).then( data => {
        if(data.data.success){
          this.data1 = data.data.data;
          this.total = data.data.total;
        }else {
          this.$Message.error('查询失败，请稍后刷新');
        }
      });
    },
    getData () {
      this.params.userId = localStorage.getItem('userId');
      this.$axios({
        method: 'post',
        url: '/list/todo/yesterday',
        data: this.params
      }).then( data => {
        if(data.data.success){
          this.data1 = data.data.data;
          this.total = data.data.total;
        }else {
          this.$Message.error('查询失败，请稍后刷新');
        }
      });
    },
    addToday () {
      // this.$http({
      //     method: 'POST',
      //     url: '/todo/add',
      //     data: '{id:123}'
      //   }).then(data => {
      //     if (data.success) {
      //       
      //     }
      //   });

      this.$axios({
        method: 'POST',
        url: '/todo/add',
        data: {'id': '123'},
      }).then(data => {
       
      });
    },
    cliclRow (item) {
      // this.temp = item;
    },
    showDetail (id) {
      this.$axios({
        method: 'POST',
        url: '/list/todo/detail',
        data: {'id': id},
      }).then(data => {
        if(data.data.success){
          this.temp = data.data;
          this.temp.tags = [];
          this.temp.tagData.forEach(element => {
            this.temp.tags.push(element.label);
          });
          this.showDeatilFlag = true;
        }else{
          this.$Message.error('查询失败，请稍后刷新');
        }
      });
    },
  },
  mounted() {
  },
  created() {
    this.getData();
  },
}
</script>

<style scoped>
#container {
  min-width: 310px;
  max-width: 800px;
  margin: 0 auto
}
.detailContent {
  width: 580px;
  height: 100%;
  padding: 10px 40px 10px 40px;
  font-size: 14px;
}
.content {
  float: right;
  width: 200px;
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
}
.floatR {
  float: right;
}
</style>
