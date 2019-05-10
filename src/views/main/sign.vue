<template>
  <div class="login-container">
    <Form :model="loginForm"  ref="loginForm"
             label-position="left"
             class="card-box login-form" @keyup.enter.native="handleLogin" status-icon>
      <div class="form-container">
        <Row class="title-container" :gutter="8">
          <Col :span="10" v-if = "loginIcon">
            <img :src="loginIcon" alt="" class="pull-right" style="height: 40px">
          </Col>
          <Col :span="loginIcon?12:24" style="line-height: 30px">
            <span :class="{'title-center': !loginIcon,'title-text': loginIcon}">{{title}}</span>
          </Col>
        </Row>
        <FormItem prop="username" label="请输入登录名">
          <Input type="text" v-model="addData.username"
                    placeholder="登录账户"></Input>
        </FormItem>
        <FormItem prop="password" label="请输入密码">
          <Input type="password"
                    v-model="addData.password"
                    placeholder="密码"></Input>
        </FormItem>
        <FormItem prop="password2" label="请确认密码">
          <Input type="password"
                    v-model="addData.password2"
                    placeholder="再次输入密码"></Input>
        </FormItem>
        <FormItem prop="email" label="请输入邮箱">
          <Input  type="email"
                    v-model.trim="addData.email"
                    placeholder="邮箱"></Input>
        </FormItem>
        <br>
        <br>
        <Button type="primary" ghost  :loading="loading" @click="handleLogin()" style="width:250px">
          注册新账号
        </Button>
        <br>
        <br>
        <Button type="info" ghost  @click="backLogin()" style="width:250px">
          返回登录界面
        </Button>
      </div>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        addData: {},
        remember: false,
        loginForm: {
          username: '',
          password: ''
        },
        title: '欢迎您选择 定制ToDo',
        loading: false,
        loginIcon: '',
      };
    },
    created () {
     
    },
    methods: {
      backLogin () {
        this.$router.push({name: 'login'});
      },
      handleLogin () {
        if (!this.addData.username) {
          this.$Message.error('请填写登录名');
        }else if (!this.addData.password) {
          this.$Message.error('请填写密码');          
        }else if(!this.addData.email){
          this.$Message.error('请填写注册邮箱'); 
        }else if(this.addData.password != this.addData.password2){
          this.$Message.error('两次输入的密码不一致，请重新输入'); 
          this.addData.password = this.addData.password2 = '';
        }else{
          this.loading = true;
          this.$axios({
            method: 'post',
            url: '/sign',
            data: {
              'username': this.addData.username,
              'password': this.addData.password,
              'email': this.addData.email
            }
          }).then(data => {
              this.loading = false;
              if (data.data.success) {
                this.$Message.success('注册成功，加载登录界面...'); 
                this.backLogin();
              }else {
                this.addData.password = this.addData.password2 = '';
                this.$Message.error(data.data.message);
                if(data.data.data == 'name') {
                  this.$set(this.addData, 'username', '');
                }
                if(data.data.data == 'email') {
                  this.addData.email ='';
                }           
              }
            }).catch(data => {      
            });
          }
      },
    }
  };
</script>

<style scoped>
  .login-container {
    height: 100vh;
    background: url("./img/login3.jpg") #2d3a4b no-repeat;
    background-size: cover;
  }
  
  Input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  
  .login-container .Input {
    display: inline-block;
    height: 30px;
    width: calc(100% - 43px);
    background: rgba(0,0,10,.4);
  }
  
  .login-container Input {
    background: transparent;
    /* border: 2px; */
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 2px 5px 2px 15px;
    color: rgba(2,2,2,.3);
    height: 38px;
  }
  
  .form-container {
    width: 280px;
    margin: 190px auto;
  }
  .title-center {
    color: #ffffff;
    /* float: left; */
    padding: 6px 10px;
    font-size:30px;
    /* text-align: center; */
  }
  .svg-container {
    display: inline-block;
    padding: 1px 5px 1px 15px;
    color: #e2e2e27a;
  }
  
  .svg-container i {
    display: inline-block;
    width: 13px;
  }
  
  .title-container {
    font-size: 18px;
    padding: 10px 0;
    text-align: center;
  }
  
  .title-text {
    color: #eeeeee;
    float: left;
    padding: 6px 10px;
    /*width: calc(100% - 100px);*/
    border-left: 2px solid #eee;
  }
  
  .login-form {
    position: absolute;
    top: calc(20% - 300px);
    /* background: url("./img/login_bg_center.png"); */
    background-size: 100%;
    left: calc(50% - 335px);
    width: 670px;
    height: 670px;
    border-radius: 10px;
    background: rgba(114,136,148,.1);
  }
  
  .login-container .FormItem {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    color: #454545;
  }
  
  .login-container .code-style {
    position: absolute;
    width: 95px;
    top: 6px;
    right: 10px;
    cursor: pointer;
  }

</style>
