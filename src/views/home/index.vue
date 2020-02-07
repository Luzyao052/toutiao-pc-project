<template>
  <el-container class="container-home">
    <el-aside class="my-aside" :width="isOpen? '200px':'64px'">
      <div class="logo" :class="{minLogo:!isOpen}"></div>
      <!-- element-ui侧边栏 -->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#f0f0f0"
        text-color="#000"
        active-text-color="#b52624"
        style="border-right:none"
        :collapse="!isOpen"
        :collapse-transition="false"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">內容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span @click="toggleMenu()" class="icon" :class="isOpen? 'el-icon-s-fold':'el-icon-s-unfold'"></span>
        <span class="text">头条新闻,你感兴趣的头条</span>
        <!-- 头部下拉  element-UI -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <!-- 头像 -->
            <img class="user-img" src="../../assets/imgs/avatar.jpg" alt />
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
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "app-home",
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  }
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
    background-color: #f0f0f0;
    .logo {
      width: 100%;
      height: 60px;
      // background: ...    背景图定位/背景图尺寸
      background: #fff url(../../assets/imgs/logo_index.png) no-repeat center /
        200px auto;
    }
    .minLogo {
      background-image: url(../../assets/imgs/logo_indexmin.png);
      background-size: 45px;
    }
  }
  .my-header {
    border-bottom: 1px solid #f0f0f0;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 15px;
    }
    .my-dropdown {
      float: right;
      .user-img {
        width: 40px;
        height: 30px;
        vertical-align: middle;
      }
      .user-name {
        vertical-align: middle;
        padding-left: 10px;
      }
    }
  }
}
</style>