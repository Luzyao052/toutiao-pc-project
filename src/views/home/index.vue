<template>
<el-container class="container-home">
  <el-aside class="my-aside" width="200px">Aside</el-aside>
  <el-container>
    <el-header class="my-header">Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
name:''
}
</script>

<style scoped lang="less">
.container-home{
  width:100%;
  height:100%;
  position: absolute;
  left: 0;
  top: 0;
  .my-aside{
    background-color: #B52624;
  }
  .my-header{
    border-bottom: 1px solid #000;
  }
}
</style>