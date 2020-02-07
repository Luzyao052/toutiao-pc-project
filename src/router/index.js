import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

//导入
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'

export default new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        {path : '/' , component : Welcome}
      ]
    }
  ] // 路由规则
})