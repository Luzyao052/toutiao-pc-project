import axios from 'axios'
import auth from '@/utils/auth.js'
import router from '@/router'
// 基准地址配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头token配置
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 获取本地的token，如果有token咱们就追加即可
  const user = auth.getUser()
  if (user.token) config.headers.Authorization = `Bearer ${user.token}`
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  if (error.response && error.response.status === 401) {
    // 拦截到登录
    // 大家代码：this.$router.push('/login')
    // this 一定不是vue实例，只有vue实例才能调用 $router或者$route
    // $router 就是路由实例，我们在router/index.js 初始化过路由实例
    // $router === router/index.js  理解吗？
    // window.location.href|hash 这样的跳转，可能不会触发路由的相关功能
    router.push('/login')
  }
  return Promise.reject(error);
});

export default axios