<template>
  <div>
    <Table border :columns="columns7" :data="data6" class="animated bounceInUp"></Table>
      <Row>&nbsp;</Row>
      <div class="floatR animated bounceInUp">
        <Page :total="40" size="small" show-elevator show-sizer show-total :page-size-opts="[5, 10, 20, 50]"/>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns7: [
        {
          title: '事件',
          key: 'name',
        },
        {
          title: '备注',
          key: 'remark',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '到期时间',
          key: 'nextTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 400,
          align: 'center',
          render: (h, params) => {
            return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    ghost: true
                  },
                  style: {
                    marginBottom: '5px',
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.addToday(params.index)
                    }
                  }
                }, '加入今日'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    ghost: true
                  },
                  style: {
                    marginBottom: '5px',
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.completePre(params.index)
                    }
                  }
                }, '提前完成'),
                h('Button', {
                    props: {
                        type: 'warning',
                        size: 'small',
                        ghost: true
                    },
                    style: {
                      marginBottom: '5px',
                      marginRight: '5px',
                    },
                    on: {
                        click: () => {
                            this.remove(params.index)
                        }
                    }
                }, '取消本次提醒'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    ghost: true
                  },
                  style: {
                    marginBottom: '5px',
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.pauseIt(params.index)
                    }
                  }
                }, '暂停本事件'),
              ]);
          }
        }
      ],
      data6: [
        {
          name: '待做任务一',
          remark: '我是备注！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！',
          nextTime: '明日'
        },
        {
          name: '待做任务一',
          remark: '我是备注！！！！！！！！！！！！！！！！！！！！！',
          nextTime: '明日'
        },
        {
          name: '待做任务一',
          remark: '我是备注！！！！！！！！！！！！！！！！！！！！！',
          nextTime: '明日'
        },
        {
          name: '待做任务一',
          remark: '我是备注！！！！！！！！！！！！！！！！！！！！！',
          nextTime: '明日'
        },
        {
          name: '待做任务一',
          remark: '我是备注！！！！！！！！！！！！！！！！！！！！！',
          nextTime: '明日'
        },
        {
          name: '待做任务一',
          remark: '我是备注！！！！！！！！！！！！！！！！！！！！！',
          nextTime: '明日'
        },
      ]
}
    
  },
  methods: {
    pauseIt (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `暂停的事件`
      })
    },
    completePre (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `提前完成的事件`
      })
    },
    addToday (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `加入本日的事件`
      })
    },
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1);
    }
  },
}
</script>

<style>
.floatR {
  float: right;
}
</style>


