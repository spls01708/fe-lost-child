<template>
<div class="app noselect" >
  
  

</div>


</template>

<script>
/* eslint-disable */

import store from '@/store/'
import axios from 'axios'
import Vue from 'vue'


const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const qs = require('querystring')

import { BootstrapVue, IconsPlugin , BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


var host_api=window.localStorage.getItem('$host_api');
var bypass = window.localStorage.getItem('$bypass');

export default {
  name: 'index',
  components: {
    
  },  
  data() {                                                                                
            return {  
                    

                }
            },
            methods: {
                          

            },
            computed: {
              
              
            },
            watch: {
                

            },
            mounted(){
                
                
                this.$store.dispatch('isLoading', false )
            },


}


function make_tree_id(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 9; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function make_job_trace_id(){
    let text = "";
    let possible = "0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return 'SW'+text;
}



</script>

<style scoped>
   .mm > .modal-dialog > .modal-content > .modal-header {
    background-color: #da2228 !important;
    color: white;
  }
  .app{
    margin:0;
    color:#6a6f8c;
    background:#c8c8c8;
    font-family: 'Athiti', sans-serif;
  }  
  .login-wrap{
    
    width:100%;
    margin:auto;
    margin-top: 2%;
    margin-bottom: 5%;
    max-width:525px;    
    min-height:850px !important;
    position:relative;
    
    box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
    
  }
  

  

</style>
<style>
  @import "https://fonts.googleapis.com/css?family=Open+Sans:600";
</style>

<style>
  @import "https://fonts.googleapis.com/css2?family=Athiti&display=swap";
</style>

<style scoped src='@/assets/css/style.css'>
</style>
