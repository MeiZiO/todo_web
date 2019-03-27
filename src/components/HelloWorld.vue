<template>
  <div class="aspectratio">
    <div class="aspectratio-content">
      我是来测试的哇我是来测试的哇我是来测试的哇我是来测试的哇我是来测试的哇我是来测试的哇我是来测试的哇我是来测试的哇
      我是来测试的哇我是来测试的哇我是来测试的哇
      我是来测试的哇我是来测试的哇我是来测试的哇我是来测试的哇
      我是来测试的哇我是来测试的哇我是来测试的哇我是来测试的哇我是来测试的哇
      我是来测试的哇我是来测试的哇我是来测试的哇我是来测试的哇我是来测试的哇
      我是来测试的哇我是来测试的哇我是来测试的哇我是来测试的哇
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
[aspectratio] {
    position: relative;
}
[aspectratio]::before {
    content: '';
    display: block;
    width: 1px;
    margin-left: -1px;
    height: 0;
}
[aspectratio-content] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}
</style>
