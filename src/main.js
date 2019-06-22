// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入样式
import '../src/assets/css/index.css'
// 引入element-ui
import Element from 'Element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$http=axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
