<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog()">
      <img src="../assets/imgs/default.png" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="730px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="list">
          <!-- 按钮 -->
          <el-radio-group v-model="reqParams.collect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表 -->
          <div class="img-list">
            <div class="img-item" v-for="i in 8" :key="i">
              <img src="../assets/imgs/avatar.jpg" alt />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="本地上传" name="upload">2</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "my-image",
  data() {
    return {
      dialogVisible: false,
      activeName: "list",
      // 获取图片素材对象
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      }
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped lang='less'>
// 组件容器
.my-image {
  display: inline-block;
  margin-right: 20px;
  // 图片按钮
  .img-btn {
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  // 素材列表
  .img-list {
    margin-top: 20px;
    .img-item {
      width: 150px;
      height: 120px;
      border: 1px dashed #ddd;
      display: inline-block;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>