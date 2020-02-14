<template>
  <div class='container-publish'>
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">富文本</el-form-item>
        <el-form-item label="封面：">封面组件</el-form-item>
        <el-form-item label="频道：">频道组件</el-form-item>
        <el-form-item></el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'my-publish',
  data() {
    return {
      articleForm:{
        // 文章数据
        title: ''
      }
    }
  }
}
</script>

<style scoped lang='less'></style>