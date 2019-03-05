// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
Vue.config.productionTip = false

Vue.filter('date', time => moment(time).format('DD/MM/YY'))
Vue.filter('emailList', ls => (ls.constructor === Array) ? ls.reduce((prev, curr) => prev +', '+ curr) : ls)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
