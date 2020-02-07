<template>
  <el-container class="container-home">
    <el-aside class="my-aside" width="200px">Aside</el-aside>
    <el-container>
      <el-header class="my-header">
        <span class="icon el-icon-s-fold"></span>
        <span class="text">头条新闻,你感兴趣的头条</span>
        <!-- 头部下拉  element-UI -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <!-- 头像 -->
            <img class="user-img" src="../../assets/imgs/avatar.jpg" alt="">
            <!-- 用户名称 -->
            <span class="user-name">特洛耶·希文</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: ""
};
</script>

<style scoped lang="less">
.container-home {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .my-aside {
    background-color: #b52624;
  }
  .my-header {
    border-bottom: 1px solid #000;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 15px;
    }
    .my-dropdown{
      float: right;
      .user-img{
        width: 40px;
        height: 30px;
        vertical-align: middle;
      }
      .user-name{
        vertical-align: middle;
        padding-left: 10px;
      }
    }
  }
}
</style>