<template>
  <div class='container-coma'>
    A组件：将要接收的值==> {{msg}}
  </div>
</template>

<script>
import eventBus from '@/eventBus.js'
export default {
  data() {
    return {
      msg: ''
    }
  },
  created() {
    eventBus.$on('b2a',(data)=>{
      this.msg = data
    })
  }
}
</script>

<style scoped lang='less'></style>