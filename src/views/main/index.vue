<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="2" on-select="handleNavClick">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1" :to="{name:'pandect'}">
              <Icon type="md-pie" />
              总览
            </MenuItem>
            <MenuItem name="2" :to="{name:'today'}">
              <Icon type="md-clipboard"/>
              今日
            </MenuItem>
            <MenuItem name="4" :to="{name:'us'}">
              <Icon type="md-book" />
              关于我们
            </MenuItem>
            <MenuItem name="3">
              <!-- <Icon type="md-person" />
              个人中心 -->
               <Dropdown @on-click="handlePersonl">
                  <a href="javascript:void(0)">
                    <span class="personl">个人中心  <Icon type="ios-arrow-down"></Icon></span>
                  </a>
                  <DropdownMenu slot="list">
                      <DropdownItem name="edit">修改密码</DropdownItem>
                      <DropdownItem name="quit">退出登录</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0 50px'}">
        <!-- <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb> -->
        <!-- <Progress :style="{margin: '16px 0'}" :percent="25" stroke-color="#f3baf7"/> -->
        <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu theme="light" width="auto" :accordion="true"  on-select="handleSideClick">
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="md-checkmark" />
                    ToDo  
                  </template>
                  <MenuItem name="1-1" :to="{name:'yesterday'}"><Icon type="ios-notifications-off" />曾经</MenuItem>
                  <MenuItem name="1-2" :to="{name:'today'}"><Icon type="md-bicycle" />现在</MenuItem>
                  <!-- <MenuItem name="1-3" :to="{name:'tomorrow'}"><Icon type="md-notifications-outline" />未来</MenuItem> -->
                </Submenu>
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="md-stats" />
                    统计
                  </template>
                  <MenuItem name="2-1" :to="{name:'day'}"><Icon type="ios-happy-outline"/>今日历程</MenuItem>
                  <MenuItem name="2-5" :to="{name:'dayBefore'}"><Icon type="ios-happy-outline"/>往日历程</MenuItem>
                  <!-- <MenuItem name="2-2" :to="{name:'week'}"><Icon type="ios-beer-outline" />周</MenuItem> -->
                  <!-- <MenuItem name="2-3" :to="{name:'month'}"><Icon type="ios-thumbs-up-outline" />月</MenuItem> -->
                  <MenuItem name="2-4" :to="{name:'event'}"><Icon type="md-clipboard" />事件清单</MenuItem>
                </Submenu>
                <!-- <Submenu name="3">
                  <template slot="title">
                    <Icon type="ios-calendar-outline" />
                    某天
                  </template>
                  <MenuItem name="1-1"><Icon type="md-heart" />回忆</MenuItem>
                  <MenuItem name="1-2"><Icon type="md-headset" />眼前</MenuItem>
                  <MenuItem name="1-3"><Icon type="md-heart-outline" />展望</MenuItem>
                </Submenu> -->
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
               <router-view></router-view> 
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2019 &copy; 杨鑫梅</Footer>
    </Layout>
    <Modal
        v-model="editFlag"
        title="修改个人信息"
        @on-ok="ok"
        @on-cancel="cancel"
        :mask-closable="false">
        <div v-show="!showPassword">
          <p>请先输入邮箱进行验证</p>
          <Row>
            <Col span="18">
            <Input type="email" v-model="email" clearable></Input>
            </Col>
            <Col span="2">&nbsp;</Col>
            <Col span="4">
              <Button type="info" ghost @click="checkEamil">验证</Button>
            </Col>
          </Row>
        </div>
        <div v-show="showPassword">
          <p>请先输入新的密码</p>
          <Row>
           <Col span="18">
           <Input type="password" v-model="password" clearable></Input>
          </Col>
          </Row>
          <Row>&nbsp;</Row>
          <p>请输入确认密码</p>
          <Row>
           <Col span="18">
           <Input type="password" v-model="password2" clearable></Input>
          </Col>
          </Row>
        </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editFlag: false,
      email: '',
      showPassword:false,
      password: '',
      password2: '',
    }
  },
  methods: {
    checkEamil() {
      if (!this.email) {
        this.$Message.error('请先输入邮箱'); 
      }else{
        this.$axios({
        method: 'POST',
        url:'/edituser',
        data: {'id': localStorage.getItem("userId"), 'email': this.email}
      }).then( data => {
        if (data.data.success) {
          this.showPassword = true;
        }else{
          this.$Message.error('邮箱错误！'); 
          this.email = '';
        }
      });
      }
    },
    ok () {
      // this.$Message.info('Clicked ok');
      if(!this.password) {
         this.$Message.error('请输入密码'); 
         this.password2 = '';
      }else if(!this.password2){
         this.$Message.error('请输入确认密码'); 
      }else if(this.password != this.password2) {
         this.$Message.error('两次密码不一致，请重新输入'); 
         this.password = this.password2 = '';
      }else{
        this.$axios({
          method: 'POST',
          url: '/editpassword',
          data:{'id':localStorage.getItem("userId"), 'ps': this.password, 'email': this.email} 
        }).then(data => {
          if(data.data.success){
             this.$Message.success('密码修改成功！请您牢记新密码'); 
             this.email = this.password = this.password2 = '';   
          }else{
             this.$Message.success('密码修改失败！请稍后重试');                         
          }
        });
      }
    },
    cancel () {
      // this.$Message.info('Clicked cancel');
      this.email = '';
      this.showPassword =false;
    },
    handlePersonl (name) {
      if (name == 'edit') {
        this.editFlag = true;
        this.email = this.password = this.password2 = ''; 
      }
      if (name == 'quit') {
        localStorage.removeItem('userId');
        this.$router.push({name: 'login'});
      }
    },
    handleNavClick (name) {
      console.log('我出发了');
      console.log(name);
    },
    handleSideClick () {
       console.log('我触发了');
    },
  },
  created () {
    this.$router.push({name: 'today'});
  },
}
</script>


<style scoped>
.personl {
  display: inline-block;
  color: #d7dde4;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 430px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}

</style>