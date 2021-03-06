import Vue from 'vue'
import App from './App.vue'
// 导入全局样式表
import './assets/css/global.css'
import './plugins/element.js'
import router from './router'
// 字体图标
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
