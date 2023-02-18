<template>

    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;" >
    <div class="m-2" style="height:55vh;"> 
    
            <div class="card border-info text-center border-0 rounded-0 mt-1 text-primary" style="margin-bottom:0.5em;height:5vh;justify-content: center;background-color:#eee;" >
               <span class="text-info font-weight-bold"><span style="font-size:18px;color:#17a2b8;">  ข้อมูลผู้ใช้งาน  </span>
               <b-badge style="float:right;background-color:#17a2b8;" pill > 1 / 1</b-badge>
               </span> 
            </div>
 
            <div class="card border-2 rounded-0 mt-1" style="margin-bottom:0.5em;height:75vh;border:2px solid skyblue;background-color:#eee;" >
                <div class="card-content">
                   <div class="card-body">
                      <div class="media d-flex" > 
                        
                        <b-row>
                            <b-col sm="3" class="text-right">
                                <div class="align-self-center" >
                                    
                                    <b-row class="text-center">
                                        <b-col style="min-height:200px;margin-left:2em;"><img :src="qr" height="200" /></b-col>
                                    </b-row>
                                    <b-row class="text-center">
                                        <b-col><span style="font-size:0.7em;color:black;"><b>{{qr_text}}</b></span></b-col>
                                    </b-row>
                                        
                                </div>
                            </b-col>

                            <b-col sm="9" class="text-left" style="border:0px solid skyblue;">
                        
                                <div class="media-body text-left ml-2 mt-4" > 
                                     
                                    <div class="row">
                                        
                                        <div class="col-md-8"> 
                                            <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="ชื่อ-สกุล"  autocomplete="new-password" v-model="user_name" :state="user_name.length>0" readonly/>
                                        </div> 

                                         
                                        
                                    </div> 
                                    
                                    <div class="row">   
                                        <div class="col-md-8"> 
                                             <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="ตำแหน่ง"  autocomplete="new-password" v-model="user_position" :state="user_position.length>0" readonly/>
                                        </div> 
                                        <div class="col-md-3"> 
                                             <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="หน่วย"  autocomplete="new-password" v-model="user_unitname" :state="user_unitname.length>0" readonly/>
                                        </div>
                                        
                                    </div>
                                    
                                </div>

                            </b-col>
                        </b-row> 
                      </div>
                        
                         

                   </div>
                </div>
            </div>
     

    </div> 
     
     
    <!-- ----------------------------------------------------------------------------------------------------------------------------------------------------------- -->
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
 
import {server}  from '../login_modules' 

// import { vueTopprogress } from 'vue-top-progress'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import axios from 'axios'
 
import myConfig from '../config.js'

import { encrypt_js } from "sw-rtaf-encrypted-js"

const { server_publicKey } = require('../server_publicKey');

import { socket_io } from '../socket_io_modules'
 
import { custome_socket_io } from '../send_to_socket_io_modules'

import QRCode from 'qrcode'

export default {
  name: 'index',
  components: {
		 
       
	},
  data() {
            return {     
                 
                socket : [],
                items: [
                    { title: 'Dashboard', icon: 'mdi-view-dashboard' },
                    { title: 'Photos', icon: 'mdi-image' },
                    { title: 'About', icon: 'mdi-help-box' },
                ],
                right: null,
                arr : [],
                currentPage: 1,
                perPage: 10,
                totalRows:0,

                __psss_user : '',

                counter : 1, 

                login_error:false,
                error_log:'',

                qr:'',
                qr_text:'', 
                
                hris_picture:'',

                user_name : '',
                user_unitname : '',
                user_position : '',

                change_user_qr : false
               
            }
              
    },
        
    
    methods: { 

         async test () {

             

        },
         
        async user_verify( socket_option={} ){

            this.token = window.localStorage.getItem('$login@token') 
             
            let _server_mfa_api  = myConfig.server_domain
            this.mfa = new server( _server_mfa_api ) 
           
            let d = await this.mfa.admin_verify( this.token, socket_option )

            console.log( d )
            
            if( d.result == 'Process-Complete' ){
                
                window.localStorage.setItem('$login@challenge', d.data.challenge)

                this.user_name = window.localStorage.getItem('$login@name') 
                this.user_unitname = d.data.unit
                this.user_position = window.localStorage.getItem('$login@position') 


                this.test() 
                this.username_info( d.data.challenge )

            }else{

                this.error_log = d.error    
                this.login_error=true
                this.user_has_login=false 
                
            }

        },
        async username_info( challenge ) { 

                this.qr = ''
                this.qr_text = challenge

                let _qr = 'https://lost-child.rtaf.mi.th/call/#/?challenge='+challenge

                QRCode.toDataURL( _qr )
                .then(url => {
                        
                    this.qr=url
                })
                .catch(err => {
                    console.error(err)
                }) 


        //     // --------------------------------------------------------------------------------------------------- 
        //     let _server_publicKey = new server_publicKey('')
        //     let __server_publicKey = await _server_publicKey.connection_otp_server_key()

        //     let encrypt = new encrypt_js( '', __server_publicKey )
        //     let my_connection_key = await encrypt.create_connection_key()

            
        //     let buffer_server_publicKey = await encrypt.buffer_key_from_base64( __server_publicKey.publicKey )
            
            
        //     let login_data = {
        //         "token" : window.localStorage.getItem('$login@token'), 
        //         "sender_publicKey" : my_connection_key.publicKey
        //     }
        //     let data_encrypted = await encrypt.message_encrypted( buffer_server_publicKey, Buffer.from( JSON.stringify( login_data ) ) )

            
        // //   // ---------------------------------------------------------------------------------------------------
        //     this.$store.commit('set_isLoading', true); 

        //     let d = await this.user_retrieve_qr(data_encrypted, '0', 'test')

        //     this.$store.commit('set_isLoading', false); 

        // //   // ---------------------------------------------------------------------------------------------------
             
            
        //     if( d.result == 'Process-Complete' ){ 

        //         let p = await encrypt.buffer_key_from_base64( my_connection_key.privateKey , ["decrypt"] )

        //         let str = await encrypt.message_decrypted( p , Buffer.from( d.data.encryption_key , 'base64'), Buffer.from( d.data.encryption_message , 'base64') )
        //         let decrypt_str = Buffer.from( str ).toString() 
        //         let qr = JSON.parse( decrypt_str )


        //         this.user_name = qr.user_name
        //         this.user_unitname = qr.unitname
        //         this.user_position = qr.position

        //         this.qr = ''
        //         this.qr_text = qr.qr_formattedKey.data_decrypted.split(' ')[0]

        //         QRCode.toDataURL( qr.qr_Uri.data_decrypted )
        //         .then(url => {
                        
        //             this.qr=url
        //         })
        //         .catch(err => {
        //             console.error(err)
        //         }) 

        //     }else{

        //     this.error_log = d.error    
        //     this.login_error=true
                
        //     }

            // ---------------------------------------------------------------------------------------------------
            
            

        },
        
         
           
    
    },
    mounted() {
         
         this.user_verify() 
          

    },
    created () {

         this.$store.commit('set_isMain', false); 

         let path = [ { text : 'AS' } ,{ text : 'QR / Authenticator' } ] 
         this.$store.commit('set_working_path', JSON.parse(JSON.stringify( path )));
       
    },
    beforeDestroy() {
        
        // this.$store.commit('set_isMain', true);

        setTimeout(() => {

            this.socket.forEach((_socket) => {

                _socket.client_disconnect()

            })

        } , 100);

    },
    watch: {

         
        _psss_user () {

            console.log( this.__psss_user ) 

        }
        

    },
    computed: {

         
        _psss_user () {
            
            this.__psss_user =  JSON.parse(JSON.stringify( this.$store.state._psss_user )) 

            return this.__psss_user
        },
            

    },
    
    
}
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
    @import "../../assets/dist/css/app.css";
     
</style>
 
