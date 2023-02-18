<template>
<div class="app noselect" style="height:100vh;">
  
  <div>
    
    <!-- <b-button v-b-toggle.sidebar-1 block squared> 
       <b-icon-list></b-icon-list><span class="ml-1">Menu</span>
    </b-button> -->
    <b-sidebar id="sidebar-1" title="Menu" shadow>
      <b-list-group class="rounded-0">
        <b-list-group-item active>Call</b-list-group-item>
        <b-list-group-item @click="go_search()" style="cursor:pointer;">ค้นหา</b-list-group-item>
      
    </b-list-group>
    </b-sidebar>
  </div>

  <div>
    
      <b-card style="border:0px solid black;">
       
       <b-card-text style="text-align:center;">  
          <b-row class="text-center" >

            <b-col>
              <b-img
                  :src="require('@/assets/colour-01-removebg-preview.png')"
                  
                  contain
                  height="200"
                  style="margin-top:1em;margin-bottom:1em;"
                ></b-img>
            </b-col>
      
          </b-row>
          <b-row class="text-center" style="margin-top:-1em;">
            <b-col>
              <div style="border:0px solid red;padding:1em;">
                <span style="color:#0F3D3E;font-size:1.1em;font-weight:bold;">ลงทะเบียนเด็กหลง-กองทัพอากาศ</span><br/>
                <!-- <span style="color:#0F3D3E;font-size:1.1em;">เด็กหลง-กองทัพอากาศ</span> -->
              </div>  
            </b-col>
          </b-row>

          <b-row class="mt-3" v-show="!disable_camera" >
            <b-col>
                <b-button variant="outline-success rounded-0" style="border:2px solid;font-weight:bold;" size="lg" block @click="fn_camera()">ถ่ายรูป</b-button>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col> 
                <b-button variant="outline-success rounded-0" style="border:2px solid;font-weight:bold;" size="lg" block @click="fn_search()">Call</b-button>
            </b-col>
          </b-row>
                

       </b-card-text>
      </b-card >
    </div>

</div>


</template>

<script>
/* eslint-disable */

import store from '@/store/'
import axios from 'axios'
import Vue from 'vue'

import myConfig from '../config'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const qs = require('querystring')

import { BootstrapVue, IconsPlugin , BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
 
let receiveChannel;
let localConnection = null
let sendChannel = null

const { io } = require("socket.io-client");

export default {
  name: 'index',
  components: {
               
  },  
  data() {                                                                                
            return {  
                    
                  disable_camera : false,
                  socket : [],
                  room_name : '',
                  socket_id : 0
            }
  },
  methods: {
      fn_camera () {
         
        this.$router.push( { path: '/camera', query: { challenge: this.$route.query.challenge } } );
      },
        
      fn_search(){
         
        this.$router.push( { path: '/search', query: { challenge: this.$route.query.challenge } } );
      },

      verify_challenge ( challenge ) {

        console.log( challenge )
      },
      async webRTC_connect ( _server_socket ) {

          const config = {
                'iceServers': [
                    {
                        'urls': [
                            'stun:stun.l.google.com:19302',
                            'stun:stun1.l.google.com:19302',
                            'stun:stun2.l.google.com:19302',
                            'stun:stun3.l.google.com:19302',
                            'stun:stun4.l.google.com:19302', 
                        ]
                    },
                ]
          }

          

          localConnection = new RTCPeerConnection( config );  
 

          const offer = await localConnection.createOffer();
          await localConnection.setLocalDescription(offer); 
          
          sendChannel = localConnection.createDataChannel('sendDataChannel');

          // console.log( sendChannel )

          sendChannel.onopen = onSendChannelStateChange;
          sendChannel.onclose = onSendChannelStateChange;

          // console.log( sendChannel.readyState )

          localConnection.onicecandidate = e => {
             
             console.log( 'onicecandidate', e )

          };

          localConnection.onconnectionstatechange = e => {
             
             console.log( 'connectionstatechange', e )

          };

          localConnection.oniceconnectionstatechange = e => {
             
             console.log( 'iceconnectionstatechange', e )

          };

          console.log( localConnection )


          // localConnection.addEventListener('icecandidate', (e) => {

          //   console.log( 'onicecandidate', e )
          // }); 

          // // localConnection.addEventListener('icecandidate', event => {
          // //     console.log( event, event.candidate )

          // //     if (event.candidate) {
          // //         // signalingChannel.send({'new-ice-candidate': event.candidate});
          // //     }
          // // });

          // localConnection.addEventListener('connectionstatechange', event => {

          //     console.log( event, localConnection.connectionState )
          //     // if (window.localConnection.connectionState === 'connected') {
          //     //     // Peers connected!
          //     // }
          // });


          // localConnection.addEventListener('iceconnectionstatechange', (e) => { });
          

          let room_option = {
    
              room_name : this.room_name, 
              data :  {
                action: "broadcast-offer",
                socket_id: this.socket_id,
                iceCandidate : offer
              },
              timeout : 1000,
              
          }

          // console.log( room_option )
            
          _server_socket.timeout( room_option.timeout ).emit( 'send-room-message' , room_option.room_name, room_option.data, (err, responses) => { }) 


      },
      test () {

          let server_socket_domain = "https://api2-software.rtaf.mi.th" 
          let _server_socket = io.connect( server_socket_domain, {  reconnection: true }); 
          this.room_name = 'RTAF-webRTC--PUBLIC-ROOM--01'

          _server_socket.on('id', (socket_id, ack) => {
            
              this.socket_id = socket_id

              this.socket.push( _server_socket )  
              _server_socket.timeout(2000).emit('join-room', this.room_name, (err, responses) => { 
              
              this.webRTC_connect( _server_socket )

            })

          })

          _server_socket.on('receive-room-message',  async (__room_data_) => { 
                
              if( ( __room_data_.room_name == this.room_name ) ){
                  // console.log( __room_data_.data )

                  if( ( __room_data_.data.action == 'broadcast-offer' ) ){

                     

                    // localConnection.setRemoteDescription(new RTCSessionDescription( __room_data_.data.iceCandidate ));
                    // const answer = await localConnection.createAnswer();
                    // await localConnection.setLocalDescription(answer);

                    // let room_option = {
    
                    //     room_name : this.room_name, 
                    //     data :  {
                    //       action: "broadcast-answer",
                    //       socket_id: this.socket_id,
                    //       iceCandidate : answer
                    //     },
                    //     timeout : 1000,
                        
                    // }

                    // // console.log( room_option )
                      
                    // _server_socket.timeout( room_option.timeout ).emit( 'send-room-message' , room_option.room_name, room_option.data, (err, responses) => { }) 


                  }else if( ( __room_data_.data.action == 'broadcast-answer' ) ){

                     
 

                    const remoteDesc = new RTCSessionDescription( __room_data_.data.iceCandidate );
                    await localConnection.setRemoteDescription(remoteDesc);


                    console.log( 'answer', remoteDesc )

                    // setTimeout(() => {

                    //   sendChannel.send('data');

                    // },5000)
                     


                  }

              }

          });
        
      }
              

  },
  beforeDestroy() { 
                  
      setTimeout(() => {

          this.socket.forEach((_socket) => {

              _socket.emit('client_force_disconnect');

          })

      } , 100);

    },
  computed: {
      
    
  },
  watch: {
        
      '$route.query.challenge': {
        handler: function ( challenge ) {

          if( challenge ){

            this.verify_challenge ( challenge )

          }else{
            this.disable_camera = true
          }
           
          
        },
        deep: true,
        immediate: true
      },
  },
  mounted(){
      
       
       

      this.test() 

      // ---------------------------------------------------------------------------------------------------
  },


}
  
function onSendChannelStateChange() {
  const readyState = sendChannel.readyState;
  console.log('Send channel state is: ' + readyState);
  if (readyState === 'open') {
     
  } else {
     
  }
}

function onIceStateChange( event ) {
   
    console.log('ICE state change event: ', event);
  
}

async function onIceCandidate( event ) {
   
   console.log( event.candidate )

}

function generateChallenge(){
    let text = "";
    let possible = "123456789abcdefghijklmnpqrstuvwxyz";

    for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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
    background:white;
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
