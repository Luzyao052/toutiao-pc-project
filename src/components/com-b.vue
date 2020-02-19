<template>
  <div class='container-comb'>
    B组件：<button @click="fn">点击传值</button>
  </div>
</template>

<script>
import eventBus from '@/eventBus.js'
export default {
  data() {
    return{
      res: 'B的数据啊'
    }
  },
  methods:{
    fn(){
      eventBus.$emit('b2a',this.res)
    }
  }
}
</script>

<style scoped lang='less'></style>