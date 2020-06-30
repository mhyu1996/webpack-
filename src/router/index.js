import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/projectA',
      name: 'projectA',
      component: () => import('@/views/projectA/test')
    },
    {
      path: '/projectA1',
      name: 'projectA1',
      component: () => import('@/views/projectA/test1')
    },
    {
      path: '/projectA2',
      name: 'projectA2',
      component: () => import('@/views/projectA/test2')
    },
    {
      path: '/projectA3',
      name: 'projectA3',
      component: () => import('@/views/projectA/test3')
    },
    {
      path: '/projectB',
      name: 'projectB',
      component: () => import('@/views/projectB/test')
    },
    {
      path: '/projectB1',
      name: 'projectB1',
      component: () => import('@/views/projectB/test1')
    },
    {
      path: '/projectB2',
      name: 'projectB2',
      component: () => import('@/views/projectB/test2')
    },
    {
      path: '/projectB3',
      name: 'projectB3',
      component: () => import('@/views/projectB/test3')
    },
    {
      path: '/projectC',
      name: 'projectC',
      component: () => import('@/views/projectC/test')
    },
    {
      path: '/projectC1',
      name: 'projectC1',
      component: () => import('@/views/projectC/test1')
    },
    {
      path: '/projectC2',
      name: 'projectC2',
      component: () => import('@/views/projectC/test2')
    },
    {
      path: '/projectC3',
      name: 'projectC3',
      component: () => import('@/views/projectC/test3')
    },
  ]
})
