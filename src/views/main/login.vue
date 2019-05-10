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
        <FormItem prop="username" label="请输入用户名">
          <Input name="email" type="text" v-model.trim="loginForm.username" autoComplete="on"
                    placeholder="登录账户"></Input>
        </FormItem>
        <FormItem prop="password" label="请输入密码">
          <Input name="password" type="password"
                    v-model.trim="loginForm.password" autoComplete="on"
                    placeholder="密码"></Input>
        </FormItem>
        <Checkbox v-model="remember" class="m-b-sm text-white"><span>记住密码</span></Checkbox>
        <br>
        <br>
        <Button type="primary" ghost  :loading="loading" @click="handleLogin()" style="width:250px">
          登录
        </Button>
        <br>
        <br>
        <Button type="info" ghost  @click="handleSign()" style="width:250px">
          注册
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
        remember: false,
        loginForm: {
          username: '',
          password: ''
        },
        title: '定制ToDo登录',
        loading: false,
        loginIcon: '',
      };
    },
    created () {
      let local = localStorage.getItem('LoginData');
      if (local) {
        let obj = JSON.parse(local);
        this.loginForm.username = obj.username;
        this.loginForm.password = obj.password;
        this.remember = true;
      }
    },
    methods: {
      handleSign () {
        this.$router.push({name: 'sign'});
      },
      handleLogin () {
        if (!this.loginForm.username) {
          this.$Message.error('请填写登录名');
        }else if (!this.loginForm.password) {
          this.$Message.error('请填写密码');          
        }else{
          this.loading = true;
        this.$axios({
          method: 'post',
          url: '/login',
          data: {
            'username': this.loginForm.username,
            'password': this.loginForm.password
          }
        }).then(data => {
            if (data.data.success) {
              if (this.remember) {
                let obj = {
                  username: this.loginForm.username,
                  password: this.loginForm.password
                };
                localStorage.setItem('LoginData', JSON.stringify(obj));
              } else {
                localStorage.removeItem('LoginData')
              }
              localStorage.setItem('userId', data.data.id);
              this.loading = false;
              this.$router.push({name: 'index'});
            } else {
              this.$Message.error(data.data.messags); 
              this.refreshCode();
            }
          }).catch(data => {         
            this.refreshCode();
          });
        }
      },
      refreshCode () {
        this.loading = false;
        this.loginForm.username = '';
        this.loginForm.password = '';
      }
    }
  };
</script>

<style>
  .login-container {
    height: 100vh;
    background: url("./img/login2.jpg") #2d3a4b no-repeat;
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
  }
  
  .login-container Input {
    background: transparent;
    /* border: 2px; */
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 2px 5px 2px 15px;
    color: #020202;
    height: 47px;
  }
  
  .form-container {
    width: 280px;
    margin: 190px auto;
  }
  .title-center {
    color: #5097a3;
    /* float: left; */
    padding: 6px 10px;
    font-size:30px;
    /* text-align: center; */
  }
  .svg-container {
    display: inline-block;
    padding: 1px 5px 1px 15px;
    color: #728894;
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
    top: calc(50% - 335px);
    /* background: url("./img/login_bg_center.png"); */
    background-size: 100%;
    left: calc(50% - 335px);
    width: 670px;
    height: 670px;
    border-radius: 10px;
  }
  
  .login-container .FormItem {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
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

</stylesc>
