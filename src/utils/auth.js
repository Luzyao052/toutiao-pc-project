// 提供了用户信息（token）操作相关函数
// 使用 sessionStorage 存储用户信息
// 约定：
// key 是 hm-toutiao-pc-93-user
// value 是 json字符串

//setItem(key,value) getItem(key) removeItem(key)。
const KEY = 'toutiao-pc-user'
//存储用户信息
const setUser = (user) => {
  window.sessionStorage.setItem(KEY, JSON.stringify(user))
}
//获取
const getUser = () => {
  // 考虑：有可能之前未存储过用户信息 获取到的值 null
  // 返回：最好是对象，需要转换成对象，所以如果没有获取到值 默认一个 {} 对象即可
  return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
}
//删除
const delUser = () => {
  window.sessionStorage.removeItem(KEY)
}
//导出
export default {
  setUser,
  getUser,
  delUser
}