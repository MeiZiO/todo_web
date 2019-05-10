<template>
  <div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {},
    }
  },
  methods: {
    getUserData () {
      this.$axios({
        url :'/userData',
        method: 'POST',
        data: {'id': localStorage.getItem('userId')}
      }).then( data => {
        if (data.data.success) {
          this.userData = data.data.data;
        }else{
          this.$Message.error('刷新失败，请稍后重试');          
        }
      });
    },
  },
  created () {
    this.getUserData();
  },
}
</script>
