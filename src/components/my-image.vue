<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog()">
      <img :src="value||defaultImageUrl" alt />
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
              <div
                @click="selectedImage(item.url)"
                class="img-item"
                :class="{selected:selectedImageUrl===item.url}"
                v-for="item in images"
                :key="item.id"
              >
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
        <el-tab-pane label="本地上传" name="upload">
          <el-upload
            class="avatar-uploader"
            name="image"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers="uploadHeaders"
          >
            <img v-if="UploadImageUrl" :src="UploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import auth from "@/utils/auth.js";
// 主动导入 使用这种方法可以解决动态绑定图片时，默认图片不显示的问题
import defaultImg from "@/assets/imgs/default.png";
export default {
  name: "my-image",
  props: ["value"],
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
      isLoading: false,
      // 当前选中的素材图片地址
      selectedImageUrl: null,
      // 上传图片请求头
      uploadHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      },
      // 上传素材图片地址
      UploadImageUrl: null,
      // 默认图片地址
      defaultImageUrl: defaultImg
    };
  },
  methods: {
    // 确定图片
    confirmImage() {
      // 如何判断此时是激活的  素材库还是上传图片
      if (this.activeName === "list") {
        // 素材库
        if (!this.selectedImageUrl)
          return this.$message.warning("最少选择一张照片");
        // this.defaultImageUrl = this.selectedImageUrl;
        // 传给父元素
        this.$emit('input',this.selectedImageUrl)
      } else {
        // 上传
        if (!this.UploadImageUrl)
          return this.$message.warning("请上传一张素材图片");
        // this.defaultImageUrl = this.UploadImageUrl;
        // 传给父元素
        this.$emit('input',this.UploadImageUrl)
      }
      // 关闭对话框
      this.dialogVisible = false;
    },
    // 上传图片成功函数
    handleSuccess(res) {
      // 预览
      this.UploadImageUrl = res.data.url;
    },
    // 选中图片
    selectedImage(url) {
      this.selectedImageUrl = url;
    },
    // 切换全部与收藏
    changeCollect() {
      this.reqParams.page = 1;
      this.getImages();
    },
    openDialog() {
      this.dialogVisible = true;
      this.getImages();
      // 重置数据
      // 默认激活第一个选项卡
      this.activeName = "list";
      this.selectedImageUrl = null;
      this.UploadImageUrl = null;
    },
    //获取列表
    async getImages() {
      // 开始加载
      this.isLoading = true;
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      // console.log(res);
      // 加载完成
      this.isLoading = false;
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
      position: relative;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      &.selected::after {
        // .img-item 的后伪元素
        // &符号 less语法，连接符，连接 上一级选择和当前的选择器。
        // 此时不加&：.img-item ::after{}  解析后：后代选择器
        // 加上&符后：.img-item::after{}   解析后：交集选择器
        // .img-item.selected::after{} 满足这个选择器样式生效
        // 当你想选中效果：给.img-item加上selected类即可。
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.3) url(../assets/imgs/selected.png)
          no-repeat center / 50px auto;
      }
    }
  }
}
</style>