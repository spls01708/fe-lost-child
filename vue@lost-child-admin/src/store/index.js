/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    open_process : false, 
    isLoading : false, 
    isMain : true,
    working_path : [],
    open_add_user_dialog : false,
    _psss_user : '',
    _peer_connect : {},
    _current_socket_id : 0,
    _current_socket_on_call : {

      from_socket_id : 0,
      to_socket_id : 0,
      from_peer_id : 0,
      to_peer_id : 0

    },

    _snap_picture_data : {

      socket_id : 0,
      peer_id : 0

    },

    _search_string : ''
    
  },
  mutations: {
    set__search_string(state, data) {
      state._search_string = data;
    },

    set__snap_picture_data(state, data) {
      state._snap_picture_data = data;
    },

    set__current_socket_on_call(state, data) {
      state._current_socket_on_call = data;
    },
    set__current_socket_id(state, data) {
      state._current_socket_id = data;
    },
    set__peer_connect(state, data) {
      state._peer_connect = data;
    },

    set__psss_user(state, data) {
      state._psss_user = data;
    },

    set_open_process(state, data) {
      state.open_process = data;
    },

    set_isLoading(state, data) {
      state.isLoading = data;
    }, 

    set_isMain(state, data) {
      state.isMain = data;
    }, 

    set_working_path(state, data) {
      state.working_path = data;
    }, 

    set_open_add_user_dialog(state, data) {
      state.open_add_user_dialog = data;
    }, 

  },
  actions: {},
  getters: {}
});
