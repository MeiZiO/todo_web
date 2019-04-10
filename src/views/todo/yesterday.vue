<template>
    <div>
      <Row>
        <Col span="6">
          <Input placeholder="请输入名称" search enter-button/>
        </Col>
        <Col span="2">
          <Button shape="circle" type="success" ghost @click.native="addToday">加入今日</Button>
        </Col>
        <Col span="2">
          <Button shape="circle" type="info" ghost>加入明日</Button>
        </Col>
        <Col span="2">
          <Button shape="circle" type="warning" ghost>暂停本事件</Button>
        </Col>
        <Col span="2">
          <Button shape="circle" type="error" ghost>删除本记录</Button>
        </Col>
      </Row>
      <Row>&nbsp;</Row>
      <Table border ref="selection" :columns="columns4" :data="data1" tooltip @on-row-click="cliclRow" class="animated bounceInUp"></Table>
      <Row>&nbsp;</Row>
      <div class="floatR animated bounceInUp">
        <Page :total="40" size="small" show-elevator show-sizer show-total :page-size-opts="[5, 10, 20, 50]"/>
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
              创建时间：<span class="content">{{temp.createTime}}</span>
              <p slot="content">{{temp.createTime}}</p>
            </Panel>
            <Panel name="4">
              状态：<span class="content">{{temp.status}}</span>
              <p slot="content">{{temp.status}}</p>
            </Panel>
            <Panel name="5">
              提醒方式：<span class="content">{{temp.alertType}}</span>
              <p slot="content">{{temp.alertType}}</p>
            </Panel>
            <Panel name="6">
              提醒记录：<span class="content">{{temp.alertHistroy}}</span>
              <p slot="content">{{temp.alertHistroy}}</p>
            </Panel>  
          </Collapse>
        </div>
      </Drawer>
    </div>
</template>

<script>
import { constants } from 'crypto';

export default {
  data ()　{
    return {
      temp: {},
      showDeatilFlag: false,
      columns4: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '事件',
            key: 'name',
            ellipsis: true,
            tooltip: true,
        },
        {
            title: '状态',
            key: 'status'
        },
        {
            title: '描述',
            key: 'remark',
            ellipsis: true,
            tooltip: true,
        },
        {
          title: '记录日期',
          key: 'happenTime',
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small',
                },
                on: {
                  click: (item) => {
                    console.log(item, 'item');
                    this.showDetail();
                  },
                },
              }, '详情')
          ]);
        }
        }
      ],
      data1: [
        {
            name: '我是任务名1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            status: '已完成',
            creatTime: '2016-10-03',
            alertType: '不知道',
            remark: '我是备注呀9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
            startTime: '开始的时间呢',
            alertHistroy: '暂无记录',
            happenTime: '2018-8-9'
        },
         {
            name: '我是任务名1',
            status: '已完成',
            creatTime: '2016-10-03',
            alertType: '不知道',
            remark: '我是备注呀',
            startTime: '开始的时间呢',
            alertHistroy: '暂无记录'
        },
         {
            name: '我是任务名1',
            status: '已完成',
            creatTime: '2016-10-03',
            alertType: '不知道',
            remark: '我是备注呀',
            startTime: '开始的时间呢',
            alertHistroy: '暂无记录'
        },
         {
            name: '我是任务名1',
            status: '已完成',
            creatTime: '2016-10-03',
            alertType: '不知道',
            remark: '我是备注呀',
            startTime: '开始的时间呢',
            alertHistroy: '暂无记录'
        },
      ]     
    }
  },
  methods: {
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
        data: {'id': '123'}
      }).then(data => {
       
      });
    },
    cliclRow (item) {
      this.temp = item;
    },
    showDetail () {
      this.showDeatilFlag = true;
    },
  },
  mounted() {
	}
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
