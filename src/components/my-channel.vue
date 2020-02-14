<template>
  <!-- label 选项文字  value 选项的值 当你选择某个选项后，该选项的值提供v-model -->
  <el-select clearable @change="changeChannel" :value="value" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "my-channel",
  // v-model="value" 既能赋值，又改值，现在value数据仅读，所有不能使用v-model
  // 只能使用 :value 给el-select赋值
  props: ["value"],
  // 如果不喜欢叫value可以自定义一个
  // model: {
  //   prop: "valueZi"  默认是value
  //    event:'input'   默认是input
  // },
  data() {
    return {
      // 频道id
      // value: null,
      // 频道数组
      channelOptions: []
    };
  },
  created() {
    this.getChannelOptions();
  },
  methods: {
    // 频道改变后
    // value 是选择频道后的频道ID
    changeChannel(value) {
      // if (this.value === '') this.value = null
      // 通知父组件改值  filterData.channel_id
      if (value === "") value = null;
      this.$emit("input", value);
    },
    async getChannelOptions() {
      const res = await this.$http.get("channels");
      // console.log(res);
      this.channelOptions = res.data.data.channels;
    }
  }
};
</script>

<style scoped lang='less'></style>