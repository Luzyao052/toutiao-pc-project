<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- :to="{ path: '/' }" 和 router-link to 属性一致  -->
    <!-- { path: '/' } 使用对象和  to="/"  作用一致 -->
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <slot></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name:'my-bread'
};
</script>

<style scoped lang='less'></style>