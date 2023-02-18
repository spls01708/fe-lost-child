import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

import store from '@/store/index'

import vuetify from '@/plugins/vuetify' // path to vuetify export 

Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
