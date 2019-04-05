<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1" on-select="handleNavClick">
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
            <MenuItem name="3" :to="{name:'info'}">
              <Icon type="md-person" />
              个人中心
            </MenuItem>
            <MenuItem name="4" :to="{name:'us'}">
              <Icon type="md-book" />
              关于我们
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
        <Progress :style="{margin: '16px 0'}" :percent="25" stroke-color="#f3baf7"/>
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
                  <MenuItem name="1-3" :to="{name:'tomorrow'}"><Icon type="md-notifications-outline" />未来</MenuItem>
                </Submenu>
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="md-stats" />
                    统计
                  </template>
                  <MenuItem name="2-1" :to="{name:'day'}"><Icon type="ios-happy-outline"/>天</MenuItem>
                  <MenuItem name="2-2" :to="{name:'week'}"><Icon type="ios-beer-outline" />周</MenuItem>
                  <MenuItem name="2-3" :to="{name:'month'}"><Icon type="ios-thumbs-up-outline" />月</MenuItem>
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
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods :{
    handleNavClick (name) {
      console.log('我出发了');
      console.log(name);
    },
    handleSideClick () {
       console.log('我触发了');
    },
  }
}
</script>


<style scoped>
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