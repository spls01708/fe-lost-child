import Vue from 'vue'
import Router from 'vue-router'


import index from './components/index'

import web_call from './components/web_call'
import web_answer from './components/web_answer'

import search from '@/components/registration/search'
import camera from '@/components/registration/take_picture'
// import admin_report from './components/admin/report'
// import admin_member from './components/admin/member'
// import approve from './components/admin/approve'
// import print_queue from './components/admin/print_queue'
// import forget_password from './components/forget_password'
// import reset_password from './components/reset'

// import users_user from './components/users/user'
// import users_detail from './components/users/detail'
// import users_extend from './components/users/extend'

// import add from './components/users/add'
// import activate_info from './components/activate_info'
// // import add_member from './component/users/add_member'

// import users_dataEdit from './components/users/edit'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }, 
    {
      path: '/index',
      name: 'index',
      component: index
    }, 

    {
      path: '/web_call',
      name: 'web_call',
      component: web_call
    },
    {
      path: '/web_answer',
      name: 'web_answer',
      component: web_answer
    },

    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/camera',
      name: 'camera',
      component: camera
    },   
    
    

  ]
})


