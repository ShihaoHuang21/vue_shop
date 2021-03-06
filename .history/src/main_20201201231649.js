import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
// 导入全局样式表
import './assets/css/global.css'
// 字体图标
import './assets/font/iconfont.css'
import './plugins/element.js'
import router from './router'
Vue.prototype.$http=axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
