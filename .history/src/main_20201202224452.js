//导入axios
import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
// 导入全局样式表
import './assets/css/global.css'
// 字体图标
import './assets/font/iconfont.css'
import './plugins/element.js'
import router from './router'
//请求根路径
axios.defaults.baseURL='http://timemeetyou.com:8889/api/private/v1/'
Vue.prototype.$http=axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
