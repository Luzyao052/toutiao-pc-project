import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

//导入
import auth from '@/utils/auth.js';
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Welcome = () => import('@/views/welcome')
const NotFound = () => import('@/views/404')
const Article = () => import('@/views/article')
const Image = () => import('@/views/image')
const Publish = () => import('@/views/publish')
const Comment = () => import('@/views/comment')
const Fans = () => import('@/views/fans')
const Setting = () => import('@/views/setting')

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', component: Welcome },
        { path: '/article', component: Article },
        { path: '/image', component: Image },
        { path: '/publish', component: Publish },
        { path: '/comment', component: Comment },
        { path: '/fans', component: Fans },
        { path: '/setting', component: Setting }
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