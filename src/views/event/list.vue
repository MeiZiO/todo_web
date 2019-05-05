<template>
  <div>
    <Table border :columns="columns" :data="data" class="animated bounceInUp"></Table>
      <Row>&nbsp;</Row>
      <div class="floatR animated bounceInUp">
        <Page :total="total" size="small" show-elevator show-sizer show-total :page-size-opts="[5, 10, 20, 50]"
          :page-size="params.rows"
          :current = "params.page"
          @on-page-size-change= "pageSizeHandle"
          @on-change="pageHandle"/>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      params: {
        page: 1,
        rows: 5,
      },
      total: 0,
      columns: [
        {
          title: 'ID',
          key: 'id',
        },
        {
          title: '名称',
          key: 'name',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '事件优先级',
          key: 'priority',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '提醒类型',
          key: 'unit',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '创建时间',
          key: 'createTime',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '最近提醒时间',
          key: 'nearTime',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '备注',
          key: 'remark',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '状态',
          key: 'status',
          ellipsis: true,
          tooltip: true,
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    ghost: true
                  },
                  style: {
                    marginBottom: '5px',
                    marginRight: '5px',
                    display: params.row.status == '可以触发'?"inline-block":"none",
                  },
                  on: {
                    click: () => {
                      this.pauseIt(params.row.id)
                    }
                  }
                }, '暂停本事件'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    ghost: true
                  },
                  style: {
                    marginBottom: '5px',
                    marginRight: '5px',
                    display: params.row.status != '永久失效'?"inline-block":"none",
                  },
                  on: {
                    click: () => {
                      this.cancelIt(params.row.id)
                    }
                  }
                }, '取消本事件'),
              ]);
          }
        }
      ],
      data: []
}
    
  },
  methods: {
    cancelIt (id) {
      this.params.id = id;
      this.$axios({
        method: 'post',
        url: '/list/history/pause',
        data: this.params
      }).then( data => {
        if(data.data.success){
          this.params.page = 1;
          this.getData();
        }else {
          this.$Message.error('取消事件失败，请稍后重试');
        }
      });
    },
    pauseIt (id) {
      this.params.id = id;
      this.$axios({
        method: 'post',
        url: '/list/history/pause',
        data: this.params
      }).then( data => {
        if(data.data.success){
          this.params.page = 1;
          this.getData();
        }else {
          this.$Message.error('暂停事件失败，请稍后重试');
        }
      });
    },
    getData(){
      this.params.userid =localStorage.getItem('userId');
      this.$axios({
        method: 'post',
        url: '/eventlist',
        data: this.params
      }).then( data => {
        if(data.data.success){
          this.data = data.data.data;
          this.total = data.data.total;
        }else {
          this.$Message.error('查询失败，请刷新');
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
  mounted () {
    this.getData();
  }
}
</script>

<style>
.floatR {
  float: right;
}
</style>


