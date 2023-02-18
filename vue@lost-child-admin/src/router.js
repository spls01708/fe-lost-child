/* eslint-disable */  
import Vue from 'vue'
import Router from 'vue-router'

import index from './components/main'
import dashboard from './components/dashboard/index'
import underconstruction from './components/underconstruction'
import list from './components/list'
import qr from './components/qr'

import monitor from './components/monitor'
  
 


Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/monitor',
      name: 'monitor',
      component: monitor
    },   

    {
      path: '/',
      name: 'index',
      component: index
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },

    {
      path: '/list',
      name: 'list',
      component: list

    }, 
    {
      path: '/qr',
      name: 'qr',
      component: qr

    }, 

    {
      path: '*',
      component: underconstruction
    }
     
     

  ]
})