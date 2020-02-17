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
          <div v-loading="isLoading">
            <!-- 按钮 -->
            <el-radio-group v-model="reqParams.collect" @change="changeCollect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <!-- 列表 -->
            <div class="img-list">
              <div class="img-item" v-for="item in images" :key="item.id">
                <img :src="item.url" alt />
              </div>
            </div>
            <!-- 分页 -->
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="this.reqParams.per_page"
              :current-page="this.reqParams.page"
              @current-change="pager"
              hide-on-single-page
            ></el-pagination>
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
      },
      total: 0,
      images: [],
      // 加载
      isLoading: false
    };
  },
  methods: {
    // 切换全部与收藏
    changeCollect() {
      this.reqParams.page = 1;
      this.getImages();
    },
    openDialog() {
      this.dialogVisible = true;
      this.getImages();
    },
    //获取列表
    async getImages() {
      // 开始加载
      this.isLoading = true
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      // console.log(res);
      // 加载完成
      this.isLoading = false
      this.images = res.data.data.results;
      this.total = res.data.data.total_count;
    },
    //切换分页
    pager(newPage) {
      // console.log(newPage);
      this.reqParams.page = newPage;
      this.getImages();
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