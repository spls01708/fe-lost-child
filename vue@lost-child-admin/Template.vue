<template>

    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;" >
 
      
    </div>

</template>

<script>
/* eslint-disable */  
 
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
 
import {server}  from '../login_modules'
 

import { vueTopprogress } from 'vue-top-progress'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
import axios from 'axios'
 
import myConfig from '../config.js'

import { encrypt_js } from "sw-rtaf-encrypted-js"

const { server_publicKey } = require('../server_publicKey');

import { socket_io } from '../socket_io_modules'
 
import { custome_socket_io } from '../send_to_socket_io_modules'

export default {
  name: 'index',
  components: {
		vueTopprogress,
       
	},
  data() {
            return {     
                 
                socket : [],
                 
               
            }
              
    },
        
    
    methods: {
         
        
           
    
    },
    mounted() {

         

    },
    created () {

         

       
    },
    beforeDestroy() {
        
        setTimeout(() => {

            this.socket.forEach((_socket) => {

                _socket.client_disconnect()

            })

        } , 100);

    },
    watch: {

         

        

    },
    computed: {

        
            

    },
    
    
}

</script>

<style>
    @import "../../assets/dist/css/app.css";
     
</style>
