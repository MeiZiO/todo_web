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
          <Divider />
          <Row>
            <Col span="4">
              标签:
            </Col>
            <Col span="20">
             <Tag v-for="item in addData.tagData" :key="item" closable @on-close="addHandleDelteTag">{{item}}</Tag> 
            </Col>
          </Row>
          <Row>
            &nbsp;
          </Row>
          <Row>
            <Col span="24">
              <div v-show="showMore" @click="showMore=!showMore">
                <a href="javascript:void(0)">
                  更多<Icon type="ios-arrow-down" />
                </a>
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
                <Button type="info" ghost @click.native="addTag">新增此标签</Button>
              </Col>
              <Col span="4">
                &nbsp;
              </Col>
              <Col span="4" v-show="tagSubmitFlag">
                <Button type="info">添加选中的标签</Button>
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
                <Radio label="year">
                    <span>按年</span>
                </Radio>
                <Radio label="month">
                    <span>按月</span>
                </Radio>
                <Radio label="day">
                    <span>按天</span>
                </Radio>
                <Radio label="combination">
                    <span>组合形式</span>
                </Radio>
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
          <Row v-show="addData.type == 'own' && addData.repeatType != 'combination'">
            <Col span="4">&nbsp;</Col>
            <Col span="4">
              重复次数：
            </Col>
            <Col span="4">
              <InputNumber :min="1" v-model="addData.ownNum"></InputNumber>
            </Col>
            <Col span="4">
              重复间隔：
            </Col>
            <Col>
            </Col>
            <Col span="4">
              <InputNumber :min="0" v-model="addData.ownInterval"></InputNumber>
            </Col>
          </Row>
          <div v-show="addData.repeatType == 'combination'">
            <!-- 年 -->
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
            <Row>
              <Col span="4">&nbsp;</Col>
              <Col span="4">
                重复次数：
              </Col>
              <Col span="4">
                <InputNumber :min="1" v-model="addData.item1num"></InputNumber>
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
            <Row >
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
            <Row>
              <Col span="4">&nbsp;</Col>
              <Col span="4">
                重复次数：
              </Col>
              <Col span="4">
                <InputNumber :min="1" v-model="addData.item2Num"></InputNumber>
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
            <Row >
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
            <Row>
              <Col span="4">&nbsp;</Col>
              <Col span="4">
                重复次数：
              </Col>
              <Col span="4">
                <InputNumber :min="1" v-model="addData.item3Num"></InputNumber>
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
            <Col span="4">备注：</Col>
            <Col span="8">
              <Input v-model="addData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="可以具体描述你想做的事情，也可以空置此处" />
            </Col>
          </Row>
        </div>
      </div>
      <div slot="footer">
          <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
        <Button type="info" long>加油干噢</Button>
        <br><br>
        <Button type="warning" @click="flag = !flag" long>我后悔了</Button>
      </div>
    </Modal>
</template>

<script>
const yearType = [
  {label: '一年', value: 'onceY' },
  {label: '每年', value: 'everyY' },
  {label: '奇数', value: 'oddY' },
  {label: '偶数', value: 'evenY' },
  {label: '自定义间隔', value: 'own' },
];
const monthType = [
  {label: '奇数', value: 'oddM' },
  {label: '偶数', value: 'evenM' },
  {label: '春', value: 'spring' },
  {label: '夏', value: 'summer' },
  {label: '秋', value: 'autumn' },
  {label: '冬', value: 'winter' },
  {label: '上学', value: 'schcoolDay' },
  {label: '寒假', value: 'winHol' },
  {label: '暑假', value: 'sumHol' },
  {label: '自定义间隔', value: 'own' },
];
const dayType = [
  {label: '一次', value: 'onceD' },
  {label: '工作日', value: 'workday' },
  {label: '周末', value: 'weekend' },
  {label: '每天', value: 'everyD' },
  {label: '奇数', value: 'oddD' },
  {label: '偶数', value: 'evenD' },
  {label: '自定义间隔', value: 'own' },
];
export default {
  props: {

  },
  data () {
    return {
      showType: [],
      showTypeFlag: false,
      yearType,
      monthType,
      dayType,
      flag: false,
      addData: {
        tagData:['娱乐', '工作', '兴趣', '其他']
      },
      markColor: '#ffffff',
      enterFlag: false,
      newTag: '',
      originalTagData: [
        { "key": "1", "label": "已有标签1", "disabled": false },
        { "key": "2", "label": "已有标签2", "disabled": true },
        { "key": "3", "label": "已有标签3", "disabled": false }
      ],
      showTagData:  [
        { "key": "1", "label": "已有标签1", "disabled": false },
        { "key": "2", "label": "已有标签2", "disabled": true },
        { "key": "3", "label": "已有标签3", "disabled": false }
      ],
      targetTagData: [],
      searchTagKey: '',
      tagAddButton: false,
      tagSubmitFlag: false,
      showMore: false,
    }
  },
  methods: {
    handleType () {
      this.showTypeFlag = false;
      switch (this.addData.repeatType) {
        case 'year':
          this.showType = this.yearType;
          this.showTypeFlag = true;
          break;
        case 'month':
          this.showType = this.monthType
          this.showTypeFlag = true;
          break;
        case 'day':
          this.showType = this.dayType
          this.showTypeFlag = true;
          break;
      };
    },
    addTag () {
      let temp = {};
      temp.label = this.searchTagKey;
      temp.key = (this.originalTagData.length+1).toString();
      this.disabled = false;
      this.originalTagData.push(temp);
      this.searchTagKey='';
      this.filtrateTag();
    },
    filtrateTag () {
      this.tagAddButton = false;
      if (this.searchTagKey.length>0){
        this.showTagData = this.originalTagData.filter( item => {
          return item.label.includes(this.searchTagKey);
        });
        if (this.showTagData == 0) {
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
      console.log(this.showTagData,'this.showTagData');
      console.log(this.targetTagData, 'this.targetTagData');
    },
    renderTag (item) {
      return item.label;
    },
    show () {
      this.flag = true;
    },
    selectTag () {

    },
    addHandleDelteTag (event, name) {
      const index = this.addData.tagData.indexOf(name);
      this.addData.tagData.splice(index, 1);
    },
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
  },
  computed: {
    addname () {
      if (this.addData.name === '') return '请输入想做的事情';
      return this.addData.name ;
    },
  },
}
</script>
<style scoped>
  .mark {
    float:right;
    transform:translate(-200%,-140%);
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


