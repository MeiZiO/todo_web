<template>
    <Drawer :closable="false" width="640" v-model="flag">

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
</template>



<script>
export default {
  data () {
    return {
      flag: false,
      edit: {},
      editNameFlag: false,
    }
  },
  methods: {
    handleNameEdit () {
      this.editNameFlag = !this.editNameFlag;
    },
    show () {
      this.flag = true;
    },
    init (item) {
      this.edit = item;
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

