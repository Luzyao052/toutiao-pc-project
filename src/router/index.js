import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

//导入
import Login from '@/views/login'
import Home from '@/views/home'

export default new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/', component: Home }
  ] // 路由规则
})