<template>
  <Modal v-model="flag" width="40%">
      <p slot="header" class="addHeader">
          <Icon type="ios-body" size="30"/>
          <span>新的ToDo</span>
      </p>
      <div style="text-align:center">
      <div class="addContent">
          <Row>
            <Col span="4">
              做什么:
            </Col>      
            <Col span="8">
              <!-- <Input v-model="addData.name" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="edit.name" /> -->
              <Poptip trigger="focus">
                <Input v-model="addData.name" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入想做的事情" />
                <div slot="content">{{ addname }}</div>
              </Poptip>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span="4">
              type: 
            </Col>
            <Col span="3">
            <RadioGroup v-model="addData.priority" vertical @on-change="handleMark">
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
            <div class="mark">
            <Icon type="md-bulb" size="100" :color="markColor"/>
          </div>
          <Divider />
          <Row>
            <Col span="4">
              标签:
            </Col>
            <Col span="20">
             <Tag v-for="item in addData.tagData" :key="item" :name="item" closable @on-close="addHandleDelteTag">{{item}}</Tag> 
            </Col>
          </Row>
          <Row>
            &nbsp;
          </Row>
          <Row>
            <Col span="24">
              <div v-show="showMore" @click="showMore=!showMore" >
                <!-- <a href="javascript:void(0)"> -->
                <span style="color:#2d8cf0;">更多<Icon type="ios-arrow-down" /></span>
                <!-- </a> -->
              </div>
              <div v-show="!showMore" @click="showMore=!showMore">
                <a href="javascript:void(0)">
                  收起<Icon type="ios-arrow-up" />
                </a>
              </div>
            </Col>
          </Row>
          <div v-show="!showMore">
            <Row>
              <Col span="4">
                &nbsp;
              </Col>
              <Col span="4">
                <Input placeholder="快速查找标签" v-model="searchTagKey" @keyup.native="filtrateTag"></Input>
              </Col>
              <Col span="4" v-show="tagAddButton">
                <Button type="info" ghost @click.native="addTag" :loading="addLoad">新增此标签</Button>
              </Col>
              <Col span="4">
                &nbsp;
              </Col>
              <Col span="4" v-show="tagSubmitFlag">
                <Button type="info" @click="checkTag">添加选中的标签</Button>
              </Col>
            </Row>
            <Row>
              &nbsp;
            </Row>
            <Row>
              <Transfer
                :data="showTagData"
                :target-keys="targetTagData"
                :render-format="renderTag"
                @on-change="handleSelectTag"
                not-found-text="暂无标签"
                :titles="['可选标签','选中的标签']">
              </Transfer>
            </Row>
          </div>
          <Divider />
          <Row>
            <Col span="4">
              如何提醒你:
            </Col>
            <Col span="10">
              <RadioGroup v-model="addData.repeatType" @change.native="handleType">
                <Radio label="y">
                    <span>按年</span>
                </Radio>
                <Radio label="m">
                    <span>按月</span>
                </Radio>
                <Radio label="d">
                    <span>按天</span>
                </Radio>
                <!-- <Radio label="ymd">
                    <span>组合形式</span>
                </Radio> -->
            </RadioGroup>
            </Col>
          </Row>
          <Row>&nbsp;</Row>
          <Row>
            <Col span="4">&nbsp;</Col>
            <Col span="9" v-show="showTypeFlag">
              <Select v-model="addData.type" style="width:200px">
                <Option v-for="item in showType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row>&nbsp;</Row>
          <Row v-show="addData.type == 'own' && addData.repeatType != 'ymd'">
            <Col span="3">
              时间范围：
            </Col>
            <Col span="4">
              <InputNumber :min="1" v-model="addData.ownRange"></InputNumber>
            </Col>
            <Col span="3">
              重复间隔：
            </Col>
            <Col>
            </Col>
            <Col span="4">
              <InputNumber :min="0" v-model="addData.ownInterval"></InputNumber>
            </Col>
          </Row>
          <div v-show="addData.repeatType == 'ymd'">
            <!-- 年 -->
            <Divider />
            <Row >
              <Col span="4">&nbsp;</Col>
              <Col span="4">
                年重复类型：
              </Col>
              <Col span="9">
                <Select v-model="addData.item1" style="width:200px">
                  <Option v-for="item in yearType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
            </Row>
            <Row>&nbsp;</Row>
            <Row v-show="addData.item1 == 'own'">
              <Col span="4">&nbsp;</Col>
              <Col span="4">
                时间范围：
              </Col>
              <Col span="4">
                <InputNumber :min="1" v-model="addData.item1Range"></InputNumber>
              </Col>
              <Col span="4">
                重复间隔：
              </Col>
              <Col>
              </Col>
              <Col span="4">
                <InputNumber :min="0" v-model="addData.item1Interval"></InputNumber>
              </Col>
            </Row>
            <Row>&nbsp;</Row>
            <!-- 月 -->
            <Divider />
            <Row>
              <Col span="4">&nbsp;</Col>
              <Col span="4">
                月重复类型：
              </Col>
              <Col span="9">
                <Select v-model="addData.item2" style="width:200px">
                  <Option v-for="item in monthType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
            </Row>
            <Row>&nbsp;</Row>
            <Row v-show="addData.item2 == 'own'">
              <Col span="4">&nbsp;</Col>
              <Col span="4">
                时间范围：
              </Col>
              <Col span="4">
                <InputNumber :min="1" v-model="addData.item2Range"></InputNumber>
              </Col>
              <Col span="4">
                重复间隔：
              </Col>
              <Col>
              </Col>
              <Col span="4">
                <InputNumber :min="0" v-model="addData.item2Interval"></InputNumber>
              </Col>
            </Row>
            <Row>&nbsp;</Row>
            <!-- 日 -->
            <Divider />
            <Row>
              <Col span="4">&nbsp;</Col>
              <Col span="4">
                日重复类型：
              </Col>
              <Col span="9">
                <Select v-model="addData.item3" style="width:200px">
                  <Option v-for="item in dayType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
            </Row>
            <Row>&nbsp;</Row>
            <Row v-show="addData.item3 == 'own'">
              <Col span="4">&nbsp;</Col>
              <Col span="4">
                时间范围：
              </Col>
              <Col span="4">
                <InputNumber :min="1" v-model="addData.item3Range"></InputNumber>
              </Col>
              <Col span="4">
                重复间隔：
              </Col>
              <Col>
              </Col>
              <Col span="4">
                <InputNumber :min="0" v-model="addData.item3Interval"></InputNumber>
              </Col>
            </Row>
          </div>
          <Divider />
          <Row v-if="addData.type != 'once' && addData.type != 'every'">
            <Col span="4">
              重复次数：
            </Col>
            <Col span="4">
            <RadioGroup v-model="addData.times">
                <Radio label="no">无限</Radio>
                <Radio label="yes">有限</Radio>
              </RadioGroup>
            </Col>
            <Col span="4" v-show="addData.times == 'yes'">
              <InputNumber :min="1" v-model="addData.ownNum"></InputNumber>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span="4">提醒时间点：</Col>
            <Col span="4">
              <RadioGroup v-model="addData.isDeadline">
                <Radio label="no">无时间点</Radio>
                <Radio label="yes">有时间点</Radio>
              </RadioGroup>
            </Col>
            <Col span="4" v-show="addData.isDeadline == 'yes'">
              <TimePicker type="time" v-model="addData.deadline" placeholder="请选择时间点" style="width: 168px"></TimePicker>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span="4">开始提醒的时间：</Col>
            <Col span="4">
            <DatePicker type="date" :options="options" placeholder="请选择时间" style="width: 200px" v-model="addData.startTime"></DatePicker>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span="4">备注：</Col>
            <Col span="8">
              <Input v-model="addData.remark" type="textarea" :maxlength="225" :autosize="{minRows: 2,maxRows: 5}" placeholder="可以具体描述你想做的事情，也可以空置此处" />
            </Col>
          </Row>
        </div>
      </div>
      <div slot="footer">
          <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
        <Button type="info" long @click= "sumbitAdd">加油干噢</Button>
        <br><br>
        <Button type="warning" @click="flag = !flag" long>我不要了</Button>
      </div>
    </Modal>
</template>

<script>
import { constants } from 'crypto';
const yearType = [
  {label: '一年', value: 'once' },
  {label: '每年', value: 'every' },
  {label: '奇数', value: 'odd' },
  {label: '偶数', value: 'even' },
  {label: '自定义间隔', value: 'own' },
];
const monthType = [
  {label: '一次', value: 'once' },
  {label: '每月', value: 'every' },
  {label: '奇数', value: 'odd' },
  {label: '偶数', value: 'even' },
  // {label: '春', value: 'spring' },
  // {label: '夏', value: 'summer' },
  // {label: '秋', value: 'autumn' },
  // {label: '冬', value: 'winter' },
  // {label: '上学', value: 'schoolDay' },
  // {label: '寒假', value: 'winHol' },
  // {label: '暑假', value: 'sumHol' },
  {label: '自定义间隔', value: 'own' },
];
const dayType = [
  {label: '一次', value: 'once' },
  {label: '工作日', value: 'workday' },
  {label: '周末', value: 'weekend' },
  {label: '每天', value: 'every' },
  {label: '奇数', value: 'odd' },
  {label: '偶数', value: 'even' },
  {label: '自定义间隔', value: 'own' },
];
export default {
  props: {

  },
  data () {
    return {
      options: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      addLoad: false,
      yearType,
      showType: yearType,
      showTypeFlag: true,
      monthType,
      dayType,
      flag: false,
      addData: {
        tagData:[],
        ownRange: 1,
        ownNum: 1,
        ownInterval: 0,
        isDeadline: 'no',
        times: 'no',
        deadline: '',
        priority: '0',
        repeatType: 'y',
        type:'once',
        // // 组合类型中的年
        // item1Range: 1,
        // item1Interval: 0,
        // // 组合类型中的月
        // item2Range: 1,
        // item2Interval: 0,
        // // 组合类型中的日
        // item3Range: 1,
        // item3Interval: 0,
      },
      markColor: '#ffffff',
      enterFlag: false,
      newTag: '',
      originalTagData: [
        { "key": "1", "label": "已有标签1", "disabled": false },
        { "key": "2", "label": "已有标签2", "disabled": true },
        { "key": "3", "label": "已有标签3", "disabled": false }
      ],
      showTagData: [],
      targetTagData: [],
      searchTagKey: '',
      tagAddButton: false,
      tagSubmitFlag: false,
      showMore: false,
    }
  },
  methods: {
    // 新增Todo的确定按钮
    sumbitAdd () {
      this.addData.userId = localStorage.getItem('userId');
      if (this.addData.name == '' || this.addData.name == undefined) {
        this.$Message.error('请填写你想做的事情');
        return;
      }
      if (this.addData.tagData.length < 1) {
        this.$Message.error('至少选择一个标签');
        return;
      }
      this.flag = false;
      this.$axios({
        method: 'post',
        url: '/todo/addEvent',
        data: this.addData
      }).then( data => {
        if (data.data.success) {
          this.$parent.getDataHandle();
          this.$Message.success('添加成功');
          this.searchTagKey = '';
          this.targetTagData = [];
          this.addData={};
          this.addData = {
            tagData:[],
            ownRange: 1,
            ownNum: 1,
            ownInterval: 0,
            isDeadline: 'no',
            times: 'no',
            deadline: '',
            priority: 0,
            repeatType: 'y',
            type:'once',
            // // 组合类型中的年
            // item1Range: 1,
            // item1Interval: 0,
            // // 组合类型中的月
            // item2Range: 1,
            // item2Interval: 0,
            // // 组合类型中的日
            // item3Range: 1,
            // item3Interval: 0,
          };
          this.showType = this.yearType;
          this.showTypeFlag = true;
        }
        else{
          this.$Message.error('添加失败,请认真填写信息');
        }
      });
    },
    // 取消选中的标签
    addHandleDelteTag (event, name) {
      const index = this.addData.tagData.indexOf(name);
      this.addData.tagData.splice(index, 1);
    },
    // 增加新的标签
    addTag () {
      this.addLoad = true;
      this.$axios({
        method: 'post',
        url: '/tagData/add',
        data: {'name': this.searchTagKey}
      }).then(data => {
        if (data.data.success) {
          this.addLoad = false;
          this.initTagData();
        }
      });
    },
    // 确认选中的标签
    checkTag () {
      this.addData.tagData = this.targetTagData;
    },
    // 初始化可选标签数据
    initTagData () {
       this.$axios({
        method: 'POST',
        url: '/tagData/list',
      }).then(data => {
        if (data.data.success) {
          this.originalTagData = data.data.data;
          this.showTagData = this.originalTagData;
          if(this.searchTagKey != '') {
            this.filtrateTag();
          }
        }
      });
    },
    handleType () {
      this.showTypeFlag = false;
      switch (this.addData.repeatType) {
        case 'y':
          this.showType = this.yearType;
          this.showTypeFlag = true;
          break;
        case 'm':
          this.showType = this.monthType
          this.showTypeFlag = true;
          break;
        case 'd':
          this.showType = this.dayType
          this.showTypeFlag = true;
          break;
      };
    },
    filtrateTag () {
      console.log('leo');
      this.tagAddButton = false;
      if (this.searchTagKey.length>0){
        this.showTagData = this.originalTagData.filter( item => {
          return item.label.includes(this.searchTagKey);
        });
        if (this.showTagData == 0) {
          this.tagAddButton = true;
        }
        let data = this.originalTagData.filter( item => {
          return item.label == this.searchTagKey;
        });
        if (data.length == 0) {
          this.tagAddButton = true;
        }
      }
      if (this.searchTagKey.length==0) {
        this.showTagData = this.originalTagData;
      }
    },
    handleSelectTag (newTargetKeys) {
      this.targetTagData = newTargetKeys;
      this.tagSubmitFlag = (this.targetTagData.length>0);
    },
    renderTag (item) {
      return item.label;
    },
    show () {
      this.flag = true;
    },
    selectTag () {
    },
    handleMark (value) {
      switch (value) {
        case '0': this.markColor ='#ffa3a6'
        break;
        case '1': this.markColor ='#dcffc4'
        break;
        case '2': this.markColor ='#d3f5ff'
        break;
      }
    },
  },
  computed: {
    addname () {
      if (this.addData.name === '') return '请输入想做的事情';
      return this.addData.name ;
    },
  },
  mounted () {
    
  },
}
</script>
<style scoped>
  .mark {
    float:right;
    transform:translate(-270%,-100%);
  }
  .addHeader {
    color: #8aa3ac;
    text-align: center;
    height: 30px;
  }
  .addContent {
    text-align:center
  }
</style>


