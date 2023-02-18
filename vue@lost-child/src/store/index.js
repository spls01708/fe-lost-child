import Vue from 'vue'
import Vuex from 'vuex'
import StoreUseAll from './store_use_all'


Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {    
    StoreUseAll,
  },
  strict: debug
})