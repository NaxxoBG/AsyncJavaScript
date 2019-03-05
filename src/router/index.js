import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Exercise8_2 from '@/components/Exercise8_2'
import Exercise8_3 from '@/components/Exercise8_3'
import Exercise8_4_1 from '@/components/Exercise8_4_1'
import Exercise8_4_2 from '@/components/Exercise8_4_2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    }, {
      path: '/Exercise8_2',
      name: 'Exercise8_2',
      component: Exercise8_2
    }, {
      path: '/Exercise8_3',
      name: 'Exercise8_3',
      component: Exercise8_3
    }, {
      path: '/Exercise8_4_1',
      name: 'Exercise8_4_1',
      component: Exercise8_4_1
    }, {
      path: '/Exercise8_4_2',
      name: 'Exercise8_4_2',
      component: Exercise8_4_2
    }
  ]
})
