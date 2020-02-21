// 这是vue-cli的配置  不是webpack的配置
// 但是vue-cli是基于webpack的，提供了配置选项：configureWebpack
module.exports = {
  lintOnSave: false,
  // 书写webpack配置的地方
  configureWebpack: {
    // 排除import 导入的包，不去进行打包
    externals: {
      // key 包名  value 包暴露全局位置
      echarts: 'echarts'
    }
  }
}
