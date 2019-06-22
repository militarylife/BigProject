import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import User from '../components/user/user.vue'
Vue.use(Router)

export default new Router({
  routes: [
    // 登入路由
    { path: '/login',name :'login', component: Login },
    // 首页路由
    { path: '/', name: 'home', component: Home,
    children:[
      { path: '/user', component: User}
    ]
  }
  ]
})
