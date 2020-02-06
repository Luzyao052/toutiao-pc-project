// 导入包（包括第三方 | 自己的）
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from '@/router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 配置vue框架的日志级别  productionTip
// false 开发环境级别的日志，日志详细
// true 生产环境级别的日志，上线之后部署服务器之后，日志简单
Vue.config.productionTip = false
Vue.prototype.$http = axios
// 根实例
new Vue({
  render: h => h(App),
  router
}).$mount('#app')

// main.js的职责
// 1.项目依赖需要的资源（公共功能模块，需要导入main.js）
// 2.创建一个vue根实例

