<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="评论状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" v-if="scope.row.comment_status" type="danger">关闭评论</el-button>
            <el-button size="small" v-else type="success">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px;"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app-comment",
  data() {
    return {
      comments: [],
      reqParams: {
        response_type: "comment",
        page: 1,
        per_page: 20
      },
      // 总条数
      total: 0
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    // 分页
    pager(newPage) {
     this.reqParams.page = newPage
     this.getComments()
    },
    // 获取
    async getComments() {
      const res = await this.$http.get("articles", { params: this.reqParams });
      // console.log(res);
      this.comments = res.data.data.results;
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang='less'></style>