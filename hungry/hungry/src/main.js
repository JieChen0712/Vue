// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './routes'
import axios from 'axios'
import promise from 'es6-promise'
import {formatDate} from './common/js/Date.js'

promise.polyfill(App)

Vue.prototype.$http = axios

Vue.use(VueRouter)

Vue.filter('changeDate', function (value) {
  let time = new Date(value)
  return formatDate(time, 'YYYY-MM-dd hh:mm')
})

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes,
  linkActiveClass: 'active' // 修改默认当前状态的类为active
})

/* eslint-disable */
const app = new Vue({
	el:'#app',
  router,
  render: function(h){  //es6的写法是h => h(App)
    return h(App)
  }
}).$mount('#app')// 这里的.$mount('#app')和el:'#app'相等

//默认跳转到 '/goods'
router.push('/goods');
