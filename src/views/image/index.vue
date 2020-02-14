<template>
  <div class="container-image">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn-box">
        <el-radio-group @change="changeCollect()" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" style="float:right" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 列表 -->
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option" v-if="!reqParams.collect">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{red : item.is_collected}"
            ></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        @current-change="pager"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="30%">
      <!-- el-upload 上传组件容器 -->
      <!-- class="avatar-uploader" 需要，而且需要对应样式 -->
      <!-- action="上传地址" 图片上传是组件自己发请求，不会使用axios-->
      <!-- 不会自动携带token，需要自己来设置请求头，携带token -->
      <!-- :show-file-list="false" 不需要显示选择的文件列表 -->
      <!-- :on-success="handleSuccess" 成功的回调函数 -->
      <!-- :before-upload="beforeAvatarUpload" 上传前的回调函数 -->
      <!-- name="file" 提交给后台图片数据的字段名称  需要和上传接口的字段名称统一-->
      <!-- headers 属性，对象 -->
      <el-upload
        class="avatar-uploader"
        name="image"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="uploadHeaders"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import auth from "@/utils/auth.js";
export default {
  name: "app-image",
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      //总条数
      total: 0,
      dialogVisible: false,
      //上传图片
      imageUrl: "",
      // 得自行设置请求头，拿到token
      uploadHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      }
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    // 上传成功
    handleSuccess(res, file, fileList) {
      // console.log(res);
      // console.log(file);
      // console.log(fileList);
      // 提示 + 预览
      this.$message.success("上传成功");
      this.imageUrl = res.data.url;
      // 关闭对话框 + 更新当前列表
      window.setTimeout(() => {
        this.dialogVisible = false;
        this.getImages();
      }, 3000);
    },
    //显示对话框
    openDialog() {
      // 1. 准备一个对话框
      // 2. 再来打开对话框
      this.dialogVisible = true;
      // 清空预览图
      this.imageUrl = null
    },
    //删除素材-- 确认框
    async delImage(id) {
      this.$confirm("是否要删除该篇文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //删除请求
          try {
            await this.$http.delete(`user/images/${id}`);
            this.$message.success("删除成功!");
            this.getImages();
          } catch (e) {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {});
    },
    //添加收藏和取消收藏
    async toggleStatus(item) {
      try {
        const res = await this.$http.put(`user/images/${item.id}`, {
          collect: !item.is_collected
        });
        // console.log(res);
        // res.data.data.collect 就是当前素材状态
        this.$message.success(res.data.data.collect ? "添加成功" : "取消成功");
        // item 就是素材数据  is_collected 显示收藏图标的 颜色
        item.is_collected = res.data.data.collect;
      } catch (e) {
        this.$message.error("操作失败");
      }
    },
    //切换全部和收藏
    changeCollect() {
      (this.reqParams.page = 1), this.getImages();
    },
    //切换分页
    pager(newPage) {
      // console.log(newPage);
      this.reqParams.page = newPage;
      this.getImages();
    },
    //获取列表
    async getImages() {
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      // console.log(res);
      this.images = res.data.data.results;
      this.total = res.data.data.total_count;
    }
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