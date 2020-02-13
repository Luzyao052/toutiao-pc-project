<template>
  <div class="container-image">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right" type="success" size="small">成功按钮</el-button>
      </div>
      <!-- 列表 -->
      <div class="img-list">
        <div class="img-item" v-for="i in 10" :key="i">
          <img src="../../assets/imgs/avatar.jpg" alt />
          <div class="option">
            <span class="el-icon-star-off"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app-image",
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      }
    };
  }
};
</script>

<style scoped lang='less'>
.img-list {
  margin-bottom: 20px;
  .img-item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-top: 20px;
    margin-right: 60px;
    img {
      width: 100%;
      height: 100%;
    }
    .option {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        color: #fff;
        margin: 0 30px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>