import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

//导入
import auth from '@/utils/auth.js';
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', component: Welcome }
      ]
    },
    // 通配规则（以上所有的规则不符合的时候，走这个规则）
    { path: '*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  // 如果你不是登录页面，而且你没有token，拦截到登录页面
  if (to.path !== '/login' && !auth.getUser().token) return next('/login')
  //其他情况放行
  next()
})
export default router