import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

//导入
import Login from '@/views/login'
export default new VueRouter({
  routes: [
    { path: '/login', component: Login }
  ] // 路由规则
})