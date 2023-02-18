<template>

    <div style="height:calc(100vh - 35px);border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;">
 
    <div class="login" >
        <div class="container sm:px-10">
            <div class="block xl:grid grid-cols-2 gap-4" style="margin-top:-5em;">
                <!-- BEGIN: Login Info -->
                <div class="hidden xl:flex flex-col min-h-screen">

                    <div style="z-index:9999;float:top;margin-top:10em;margin-left:2.5em;margin-bottom:-6em;">
                        <img :src="require('@/assets/swc-gif.e3c58640.gif')" style="height:130px;"/>
                         
                    </div>   
                    
                    <a class="-intro-x flex items-center"> 
                        <img alt="SPMS Logo" class="w-1"  :src="require('@/assets/dist/images/login_At.svg')">
                        <!-- <span style="z-index:9999;color:#fff;font-size:5em;margin-left:0em;">LOGIN@</span> -->
                    </a>
                    <div class="my-auto"  >
                        <img alt="Midone - HTML Admin Template" class="-intro-x w-1 -mt-16" :src="require('@/assets/dist/images/illustration.svg')" >
                    </div>
                </div>
                <!-- END: Login Info -->
                <!-- BEGIN: Login Form -->
                 
                <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0" style="margin-top:1em;margin-left:5em;">
                    <div class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                        <!-- <img :src="require('@/assets/swc-gif.e3c58640.gif')" style="height:80px;"/>  -->
                        
                        <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                            กรุณาเข้าสู่ระบบ
                        </h2>
                        <div class="intro-x mt-8">
                            <input type="text" class="intro-x login__input form-control py-3 px-4 block border-2" placeholder="อีเมล ทอ." v-model="user" :disabled="disable_input_password">
                            <input type="password" class="intro-x login__input form-control py-3 px-4 block mt-4 border-2" placeholder="รหัสผ่าน" v-model="pass" @keyup.enter="login_()" :disabled="disable_input_password">
                        </div>
                        <div class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                            
                        </div>
                        <div class="intro-x mt-3 xl:mt-8 text-center xl:text-left"  >
                            <button  class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top w-100" @click="login_()" :disabled="disable_input_password" >เข้าสู่ระบบ</button>
                            
                        </div>
                            
                        <!-- <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                            กรุณาเข้าสู่ระบบ
                        </h2>
                        <div class="intro-x mt-8">
                            <input type="text" class="intro-x login__input form-control py-3 px-4 block border-2" placeholder="อีเมล ทอ.">
                            <input type="password" class="intro-x login__input form-control py-3 px-4 block mt-4 border-2" placeholder="รหัสผ่าน">
                        </div>
                        <div class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                            
                        </div>
                        <div class="intro-x mt-3 xl:mt-8 text-center xl:text-left"  >
                            <button  class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top w-100" @click="login_()">เข้าสู่ระบบ</button>
                             
                        </div> -->
                        <!-- <div class="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left"> ท่านสามารถอ่าน <a class="text-primary dark:text-slate-200" href="">ระเบียบข้อบังคับ</a> และ <a class="text-primary dark:text-slate-200" href="">ข้อกำหนดในการใช้งาน</a> </div> -->
                    </div>
                </div>
                <!-- END: Login Form -->
            </div>
        </div>
        
    </div>

    <b-modal v-model="login_error" size="sm-error"  centered no-close-on-backdrop hide-header hide-header-close  title="Login"  >
        <div class="row text-center text-danger" style="margin-top:2em;"> 
            
            <span style="font-size:4em;"><i class="fa fa-exclamation-triangle" ></i></span>
            <span style="font-size:1em;margin-top:0.5em;"> Error, {{error_log}} </span> 
            
        </div>

        <template v-slot:modal-footer="{ }"> 
            
            <v-btn
                    class="mt-3 rounded-0 border-2 text-danger"
                    outlined  
                    @click="login_error=false"
            >
            <v-icon>mdi-close-box-outline</v-icon><span class="font-weight-bold ml-2">Exit</span>
            </v-btn>

        </template>
    </b-modal>

    </div>

</template>

<script>
/* eslint-disable */  
 
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
 
import {server}  from './login_modules'
 

import { vueTopprogress } from 'vue-top-progress'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
import axios from 'axios'
 
import myConfig from './config.js'

import { encrypt_js } from "sw-rtaf-encrypted-js"

const { server_publicKey } = require('./server_publicKey');

import { socket_io } from './socket_io_modules'
 
import { custome_socket_io } from './send_to_socket_io_modules'

export default {
  name: 'main',
  components: {
		vueTopprogress,
       
	},
  data() {
            return {     
                 
                socket : [], 
                user : '',
                pass : '',
                mfa : null,
                login_ok:false,
                login_error:false,
                error_log:'',

                disable_input_password : false,
               
            }
              
    },
        
    
    methods: {
        async login_ () {

                window.localStorage.setItem('$login@user_name', '0')

                this.$store.commit('set_isLoading', true); 
                this.disable_input_password = true

                let _server_publicKey = new server_publicKey('')
                let __server_publicKey = await _server_publicKey.connection_lost_child_server_key()

                let encrypt = new encrypt_js( '', __server_publicKey )
                let my_connection_key = await encrypt.create_connection_key()
                let buffer_server_publicKey = await encrypt.buffer_key_from_base64( __server_publicKey.publicKey )
                
                let login_data = {
                    user : this.user.toLowerCase(),
                    pass : this.pass,
                    request : '0',
                    sender_publicKey : my_connection_key.publicKey
                }
                
                 
                let data_encrypted = await encrypt.message_encrypted( buffer_server_publicKey, Buffer.from( JSON.stringify( login_data ) ) )

                let d = await this.mfa.encrypt_login( data_encrypted, '0') 
                 
                this.$store.commit('set_isLoading', false); 
                
 

                if( d.result == 'Process-Complete' ){


                    let p = await encrypt.buffer_key_from_base64( my_connection_key.privateKey , ["decrypt"] )

                    let str = await encrypt.message_decrypted( p , Buffer.from( d.data.encryption_key , 'base64'), Buffer.from( d.data.encryption_message , 'base64') )
                    let decrypt_str = Buffer.from( str ).toString()
    
                    let data = JSON.parse( decrypt_str )
                    
                    console.log( data )
                    window.localStorage.setItem('$login@token', data.token)
                    window.localStorage.setItem('$login@user_name', data.user)
                    window.localStorage.setItem('$login@name', data.user_name)
                    window.localStorage.setItem('$login@challenge', data.challenge)
                    window.localStorage.setItem('$login@position', data.user_position)
                        

                    this.$router.push('/qr')
                     

                    

                }else{

                    this.error_log = d.error    
                    this.login_error=true
                    this.disable_input_password = false
                    
                    
                }

        }, 
        async test () {

            // let server_socket_domain = "https://api2-software.rtaf.mi.th" 
            // let client_name = 'client-pki-'+generateChallenge()+'-login-at'
             
            // let room_name = '5555'

            // let socket = new socket_io( '', server_socket_domain, '', client_name, '', '',
        
            //         async ( socket_id ) => {  
       						 
            //             this.socket.push( socket )  

            //             socket.join_room( '5555', ( err ) => { }, ( succeed ) => { 

            //                 let room_option = {

            //                     room_name : room_name, 
            //                     data : 'test',
            //                     timeout : 2000,
                                
            //                 }

            //                 socket.emit_room_message( room_option , ( err ) => {  }, ( succeed ) => { console.log(succeed) } );

            //             } )
        				 
            //         },
            //         async ( data ) => { },
            //         async ( reason ) => { },
            //         async ( ping ) => { },
            //         async ( authenticated ) => { },
            //         async ( __channel_ ) => { },
            //         async ( __room_data_ ) => {   

            //             if( __room_data_.room_name == 'system-info-01' ){}
            //             else if( __room_data_.room_name == room_name ){

            //                 console.log( __room_data_.data )

            //             }
            //             else{

            //                 console.log( __room_data_ )

            //             }
            //         } 
                    
            // )

        }
           
    
    },
    mounted() { 

          let _server_mfa_api  = myConfig.server_domain
          this.mfa = new server( _server_mfa_api ) 

          this.test()

          this.user = window.localStorage.getItem('$login@user_name');
          this.disable_input_password = false

          

    },
    created () {

         this.$store.commit('set_isMain', true); 

       
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
// ---------------------------------------------------------------------------------------------------------
function generateChallenge(){
    let text = "";
    let possible = "123456789abcdefghijklmnpqrstuvwxyz";

    for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
// ---------------------------------------------------------------------------------------------------------
</script>


<style>
    @import "../assets/dist/css/app.css";
     
</style>