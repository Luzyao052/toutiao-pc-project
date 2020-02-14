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
        <el-button style="float:right" type="success" size="small">成功按钮</el-button>
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
      },
      // 素材列表
      images: [],
      //总条数
      total: 0
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    //删除素材-- 确认框
    async delImage(id) {  
      this.$confirm("是否要删除该篇文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        //删除请求
          try {
            await this.$http.delete(`user/images/${id}`)
            this.$message.success("删除成功!");
            this.getImages()
          } catch (e) {
            this.$message.error("删除失败");
          }
        }).catch(() => {});
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