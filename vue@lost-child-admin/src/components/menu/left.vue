<template>

   <div>  

      <div> 
        <img alt="Midone - HTML Admin Template" class="w-1 mt-3 ml-1" :src="require('@/assets/dist/images/login_At.svg')"/>
      </div>

      <hr style="border-bottom:2px solid #eee;" class="mt-4"/>

      <div class="mt-4">
        <v-list 
          style="padding:0em;border-radius:5px;"
          class="rounded-2"
        >
          <v-list-item-group 
            color="primary"
          >
            <v-list-item
              v-for="(item, i) in sub_menu_2"
              :key="i"
              :class="item.select ? 'selection_ele-3' : 'selection_ele-2'"
              @click="select_item( item )"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"  :style="item.select ? 'color:#fff;' : 'color:#000;'"></v-icon>
              </v-list-item-icon>

              
              <span> <v-list-item-content style="margin-left:2em;"><v-list-item-title>{{ item.title }}</v-list-item-title></v-list-item-content> </span>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        
         
      </div>

      <div class="mt-1">
        <v-list 
          style="padding:0em;border-radius:5px;"
          class="rounded-2"
        >
          <v-list-item-group 
            color="primary"
          >
            <v-list-item
              v-for="(item, i) in sub_menu_1"
              :key="i"
              :class="item.select ? 'selection_ele-3' : 'selection_ele-2'"
              @click="select_item( item )"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"  :style="item.select ? 'color:#fff;' : 'color:#000;'"></v-icon>
              </v-list-item-icon>

              
              <span> <v-list-item-content style="margin-left:2em;"><v-list-item-title>{{ item.title }}</v-list-item-title></v-list-item-content> </span>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        
         
      </div>

      <!-- ------------------------------------------------------------------------------------ -->
      <!-- <div class="mt-1">
        <v-card
          class="pa-12 rounded-2"
          color="indigo darken-2 border-2"
          flat  
           
        >
         
            <v-navigation-drawer
              floating
              permanent
               
            >
              
              <v-list-item-group v-model="items" mandatory color="indigo" style="zoom:0.9;"> 
                
                <v-list-group
                  :value="false"
                  prepend-icon="mdi-shield-outline"
                  class="text-dark"
                >
                  <template v-slot:activator>
                    <v-list-item-title>QR Google Auth</v-list-item-title>
                  </template>

                  <v-list-item
                    v-for="(item, i) in sub_menu_2"
                    :key="i" 
                    link
                    style="margin-left:0em;padding-left:2em;"
                    :class="item.select ? 'selection_ele-3' : 'selection_ele-2'"
                    @click="select_item( item )"
                  >
                    
                    <v-list-item-icon>
                      <v-icon :style="item.select ? 'color:#fff;' : 'color:#000;'">{{ item.icon }}</v-icon>
                    </v-list-item-icon> 
                    
                    <span > <v-list-item-content style="margin-left:1em;"><v-list-item-title>{{ item.title }}</v-list-item-title></v-list-item-content> </span> 
                    
                    
                  </v-list-item>

                </v-list-group>

              </v-list-item-group>

            </v-navigation-drawer>
          </v-card>
         
      </div> -->

      <!-- ------------------------------------------------------------------------------------ -->
      <!-- <div class="mt-1" v-if="user_role == 'ADMIN'">
        <v-card
          class="pa-12 rounded-2"
          color="indigo darken-2 border-2"
          flat  
           
        >
         
            <v-navigation-drawer
              floating
              permanent
               
            >
              
              <v-list-item-group v-model="items" mandatory color="indigo" style="zoom:0.9;"> 
                
                <v-list-group
                  :value="false"
                  prepend-icon="mdi-account-multiple"
                  class="text-dark"
                >
                  <template v-slot:activator>
                    <v-list-item-title>Puppet Users</v-list-item-title>
                  </template>

                  <v-list-item
                    v-for="(item, i) in sub_menu_1"
                    :key="i" 
                    link
                    style="margin-left:0em;padding-left:2em;"
                    :class="item.select ? 'selection_ele-3' : 'selection_ele-2'"
                    @click="select_item( item )"
                  >
                    
                    <v-list-item-icon>
                      <v-icon :style="item.select ? 'color:#fff;' : 'color:#000;'">{{ item.icon }}</v-icon>
                    </v-list-item-icon> 
                    
                    <span > <v-list-item-content style="margin-left:1em;"><v-list-item-title>{{ item.title }}</v-list-item-title></v-list-item-content> </span> 
                    
                    
                  </v-list-item>

                </v-list-group>

              </v-list-item-group>

            </v-navigation-drawer>
          </v-card>
         
      </div> -->

      <div class="mt-1">
        <v-card
          class="pa-12 rounded-2"
          color="indigo darken-2 border-2"
          flat  
          v-if="sub_menu_3.length > 0"  
        >
         
            <v-navigation-drawer
              floating
              permanent
               
            >
              
              <v-list-item-group v-model="items" mandatory color="indigo" style="zoom:0.85;"> 
                
                <v-list-group
                  :value="true"
                  prepend-icon="mdi-account-multiple"
                  class="text-dark"
                >
                  <template v-slot:activator>
                    <v-list-item-title>Users</v-list-item-title>
                  </template>
                  

                  <v-list-item
                    v-for="(item, i) in sub_menu_3"
                    :key="i" 
                    link
                    style="margin-left:0em;padding-left:1em;"
                    :class="item.select ? 'selection_ele-3' : 'selection_ele-2'"
                    @click="select_item( item )"
                  >
                    
                    <v-list-item-icon>
                      <v-icon :style="item.select ? 'color:#fff;' : 'color:#000;'">{{ item.icon }}</v-icon>
                    </v-list-item-icon> 
                    
                    <span > <v-list-item-content style="margin-left:0.5em;"><v-list-item-title>{{ item.title }}</v-list-item-title></v-list-item-content> </span> 
                    
                    
                  </v-list-item>

                </v-list-group>

              </v-list-item-group>

            </v-navigation-drawer>
          </v-card>
         
      </div>

      <!-- ------------------------------------------------------------------------------------ -->

       
    </div>

</template>

<script>
/* eslint-disable */  
 
import Vue from 'vue' 
 
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { vueTopprogress } from 'vue-top-progress'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import axios from 'axios'
 
import myConfig from '../config'
import {server}  from '../login_modules' 
 
import { socket_io } from '../socket_io_modules'
  
let __socket = null
export default {
  name: 'index',
  components: {
		 
       
	},
  data() {
            return {  
                items :'',  
                root_path: { text : 'AT' },
                sub_menu_0: [ 

                  { title: 'Dashboard', code : '000_001', icon : 'mdi-chart-donut', select : false, link : 'dashboard' }, 
                  
                ],

                sub_menu_1: [ 

                  { title: 'แสดงรายชื่อ', code : '001_001', icon : 'mdi-format-list-bulleted', select : false, link : 'list' }, 
                ],

                sub_menu_2: [ 

                  { title: 'QR ของฉัน', code : '002_001', icon : 'mdi-qrcode-scan', select : false, link : 'qr' }, 
                ],

                sub_menu_3: [ 
 
                ],

                 

                user_role : 'USER',

                socket : [], 
                peer_id : 0,
                socket__room_name : '',
                socket_monitor_msg : '',
                client_socket_id_arr : [],
               
            }
              
    },
        
    
    methods: {
         
              select_item ( item ){

                 

                this.sub_menu_0.forEach( async(v, i, a) => {

                  if( item.code == v.code ){

                        v.select = true
                        this.sub_menu_0.splice( i, 1, v) 

                        // let path = [ { text :'AT'} ,{ text : v.title } ] 
                        // this.$store.commit('set_working_path', JSON.parse(JSON.stringify( path )));
                        this.$router.push(v.link)

                  }else{

                      v.select = false
                      this.sub_menu_0.splice( i, 1, v) 

                  }
                
                })

                this.sub_menu_1.forEach( async(v, i, a) => {

                  if( item.code === v.code ){

                        v.select = true
                        this.sub_menu_1.splice( i, 1, v) 

                        // let path = [ { text :'AT'} ,{ text : 'รายชื่อ' }, { text : v.title } ] 
                        // this.$store.commit('set_working_path', JSON.parse(JSON.stringify( path )));
                        this.$router.push(v.link)

                  }else{

                      v.select = false
                      this.sub_menu_1.splice( i, 1, v) 

                  }
                
                })

                this.sub_menu_2.forEach( async(v, i, a) => {

                  if( item.code === v.code ){

                        v.select = true
                        this.sub_menu_2.splice( i, 1, v) 

                        // let path = [ { text :'AT'} ,{ text : 'Google Auth' }, { text : v.title } ] 
                        // this.$store.commit('set_working_path', JSON.parse(JSON.stringify( path )));
                        this.$router.push(v.link)

                  }else{

                      v.select = false
                      this.sub_menu_2.splice( i, 1, v) 

                  }
                
                })

                 

                // this.sub_menu_3.forEach( async(v, i, a) => {

                //   if( v.icon == 'mdi-cast-connected' ){

                          
                         
                //         if( this._current_socket_on_call.to_socket_id != 0 ){

                //           let room_option = {
      
                //               room_name : this.socket__room_name, 
                //               data :  {
                //                 action: "disconnect-client-on-call",
                //                 from_socket_id: this._current_socket_on_call.from_socket_id,
                //                 to_socket_id: this._current_socket_on_call.to_socket_id,
                //                 from_peer_id: this._current_socket_on_call.from_peer_id,
                //                 to_peer_id: this._current_socket_on_call.to_peer_id,
                //               },
                //               timeout : 1000,
                              
                //           }
                //           __socket.emit_room_message( room_option , ( err ) => { }, ( succeed ) => { } );

                //           // v.icon = 'mdi-lan-pending'
                //           // this.sub_menu_3.splice( i, 1, v)    

                //           let _obj = {
                
                //             from_socket_id : 0,
                //             to_socket_id : 0,

                //             from_peer_id : 0,
                //             to_peer_id : 'end'

                //           }

                //           this.$store.commit('set__current_socket_on_call', JSON.parse(JSON.stringify( _obj )));

                //         }
                        

                //   } 
                
                // })
                
                // console.log( this._current_socket_on_call.to_socket_id )
                if( this._current_socket_on_call.to_socket_id != 0 ){

                    let room_option = {

                        room_name : this.socket__room_name, 
                        data :  {
                          action: "disconnect-client-on-call",
                          from_socket_id: this._current_socket_on_call.from_socket_id,
                          to_socket_id: this._current_socket_on_call.to_socket_id,
                          from_peer_id: this._current_socket_on_call.from_peer_id,
                          to_peer_id: this._current_socket_on_call.to_peer_id,
                        },
                        timeout : 1000,
                        
                    }
                    __socket.emit_room_message( room_option , ( err ) => { }, ( succeed ) => { } );

                    
                    let _obj = {
          
                      from_socket_id : 0,
                      to_socket_id : 0,

                      from_peer_id : 0,
                      to_peer_id : 'end'

                    }

                    this.$store.commit('set__current_socket_on_call', JSON.parse(JSON.stringify( _obj )));

                }

                this.sub_menu_3.forEach( async(v, i, a) => {

                  if( item.code === v.code ){

                        v.select = true
                        this.sub_menu_3.splice( i, 1, v)   
                        
                        this.$store.commit('set__peer_connect', JSON.parse(JSON.stringify( '' )));
                        
                        // ---------------------------------------------------------------------------
                         
                        // if( this._current_socket_on_call.to_socket_id != 0 ){

                        //   let room_option = {
      
                        //       room_name : this.socket__room_name, 
                        //       data :  {
                        //         action: "disconnect-client-on-call",
                        //         from_socket_id: this._current_socket_on_call.from_socket_id,
                        //         to_socket_id: this._current_socket_on_call.to_socket_id,
                        //         from_peer_id: this._current_socket_on_call.from_peer_id,
                        //         to_peer_id: this._current_socket_on_call.to_peer_id,
                        //       },
                        //       timeout : 1000,
                              
                        //   }
                        //   __socket.emit_room_message( room_option , ( err ) => { }, ( succeed ) => { } );

                        //   v.icon = 'mdi-lan-pending'
                        //   this.sub_menu_3.splice( i, 1, v)    

                        //   let _obj = {
                
                        //     from_socket_id : 0,
                        //     to_socket_id : 0,

                        //     from_peer_id : 0,
                        //     to_peer_id : 0

                        //   }

                        //   this.$store.commit('set__current_socket_on_call', JSON.parse(JSON.stringify( _obj )));

                        // }
                        // ---------------------------------------------------------------------------

                         

                        this.$router.push('monitor')

                        setTimeout(() => {

                          this.$store.commit('set__peer_connect', JSON.parse(JSON.stringify( v ))); 
                        },500)


                  }else{

                      v.select = false
                      this.sub_menu_3.splice( i, 1, v) 

                  }
                
                })


              },
              async user_verify( socket_option={} ){

                this.token = window.localStorage.getItem('$login@token') 
                
                let _server_mfa_api  = myConfig.server_domain
                this.mfa = new server( _server_mfa_api ) 
              
                let d = await this.mfa.admin_verify( this.token, socket_option )
                
                if( d.result == 'Process-Complete' ){
    
                   this.user_role = d.data.role ? d.data.role : 'USER'

                   this.fn_connect_socket()

                } 

            },
            async fn_connect_socket () {

              let server_socket_domain = "https://api2-software.rtaf.mi.th" 
              let client_name = 'client-id-'+generateChallenge()+'-lost-child-menu'
              this.socket__room_name = 'RTAF-LOST-CHILD--PUBLIC-ROOM--01' 
              let my_socket_id = 0

              let socket = new socket_io( '', server_socket_domain, '', client_name, '', '',
          
                      async ( socket_id ) => {  
                      
                          this.socket.push( socket )  
                          my_socket_id = socket_id

                          __socket = socket

                          socket.join_room( this.socket__room_name, ( err ) => { }, ( succeed ) => { 

                              // let room_option = {

                              //     room_name : this.socket__room_name, 
                              //     data : 'say hi!',
                              //     timeout : 2000,
                                  
                              // }

                              // socket.emit_room_message( room_option , ( err ) => { }, ( succeed ) => { } );
                               

                          } )
                    
                      },
                      async ( data ) => { },
                      async ( reason ) => { },
                      async ( ping ) => { },
                      async ( authenticated ) => { },
                      async ( __channel_ ) => { },
                      async ( __room_data_ ) => {  

                          if( __room_data_.room_name == this.socket__room_name ){ 

                              this.socket_monitor_msg = __room_data_.data 

                              // console.log( __room_data_.data )

                              if( ( __room_data_.data.action == 'join-room' ) ){

                                // let tmp = JSON.parse(JSON.stringify( this.sub_menu_3 ))

                                // this.sub_menu_3 = []

                                for(let i=0;i<__room_data_.data.client_id_arr.length;i++){

                                  if( __room_data_.data.client_id_arr[i].client_name.includes('-menu') == false ){
                                    
                                    if( this.client_socket_id_arr.includes( __room_data_.data.client_id_arr[i].client_id ) == false ){

                                      this.client_socket_id_arr.push( __room_data_.data.client_id_arr[i].client_id )
                                      // -------------------------------------------------------------------------------------
                                      let room_option = {
    
                                          room_name : this.socket__room_name, 
                                          data :  {
                                            action: "request-client-peer-id",
                                            socket_id: __room_data_.data.client_id_arr[i].client_id
                                          },
                                          timeout : 1000,
                                          
                                      }
                                      socket.emit_room_message( room_option , ( err ) => { }, ( succeed ) => { } );
                                      // -------------------------------------------------------------------------------------

                                      if( this._current_socket_id != __room_data_.data.client_id_arr[i].client_id ){

                                        this.sub_menu_3.push(

                                          { 
                                              title: __room_data_.data.client_id_arr[i].client_id, 
                                              socket_id : __room_data_.data.client_id_arr[i].client_id,
                                              code : generateChallenge(), 
                                              icon : 'mdi-lan-disconnect', 
                                              select : false, 
                                              peer_id : 0,
                                              
                                          }

                                        )

                                      }
                                       

                                    }
                                     

                                  }
                                   

                                }

                                 

                              }else if( __room_data_.data.action == 'leave-room' ) { 

                                 this.sub_menu_3.forEach( (v, i, a) => {

                                  if( v.socket_id == __room_data_.data.leave_client_id ){

                                      
                                      this.sub_menu_3.splice( i, 1) 

                                  }

                                }) 


                              }else if( ( __room_data_.data.action == 'update-peer-id' ) ){

                                // console.log( __room_data_.data )

                                this.sub_menu_3.forEach( (v, i, a) => {

                                  if( v.socket_id == __room_data_.data.socket_id ){

                                      v.icon = 'mdi-lan-pending'
                                      v.peer_id = __room_data_.data.peer_id
                                      this.sub_menu_3.splice( i, 1, v) 

                                  }

                                })

                              }else if( ( __room_data_.data.action == 'update-call-on-stream' ) ){

                                 this.sub_menu_3.forEach( (v, i, a) => {

                                  if( v.socket_id == __room_data_.data.socket_id ){

                                      v.icon = 'mdi-cast-connected'
                                      v.peer_id = __room_data_.data.peer_id
                                      this.sub_menu_3.splice( i, 1, v) 

                                  }else{

                                      v.icon = 'mdi-lan-pending' 
                                      this.sub_menu_3.splice( i, 1, v) 

                                  }

                                })

                              }

                               

                          }
                          
                      } 
                      
              )

          }, 

    
    },
    mounted() {

        // try{

        //  let path = [ this.root_path ,{ text : this.sub_menu_0[0].title } ] 
        //  this.$store.commit('set_working_path', JSON.parse(JSON.stringify( path )));
        
        // }catch(e){}
        this.sub_menu_3 = []
        this.client_socket_id_arr = []
        this.user_verify()

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

        _current_socket_id () {

          return JSON.parse(JSON.stringify( this.$store.state._current_socket_id ))

        },
        _current_socket_on_call () {

          return JSON.parse(JSON.stringify( this.$store.state._current_socket_on_call ))

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

</script>

<style>
    
</style>
