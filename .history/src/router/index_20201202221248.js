import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})
//挂载路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path==='/login') return next()
  const tokenStr=window.sessionStorage.getItem("token",res.data.token)
  if(!tokenStr) return next('/login')
})

export default router
