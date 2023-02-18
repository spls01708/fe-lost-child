<template>

     <div class="" style="height:100vh;">
 
        <b-row class="m-2" >

          <b-col sm=4 >

            <div style="height:78vh;overflow:hidden;padding:5px;" :style="true ? 'border: 2px solid;box-shadow: 3px 3px;' : 'border: 2px solid #bbb;box-shadow: 3px 3px #bbb;'">
              <ol style="list-style-type: circle;font-size:1em;color:#21094E;" class="ml-5 p-3" >

                  <li > <span style="float:left;font-size:1.1em;color:#21094E;"><b>ภาพจากกล้อง</b></span> <span style="font-size:0.9em;float:right;font-weight:bold;"> </span></li>
                  
              </ol>
                    
              <div class="text-center" v-show="captures.length==0 || capture_mode==false">
                    <video id="peer-camera" ref="peerCamera" width="100%" autoplay="autoplay" class="center-block" controls></video>
                    <span class="label label-info" id="connected_peer"></span>
              </div>

              <div class="text-center" v-show="captures.length>0 || capture_mode==true" >

                <canvas v-show="false" ref="canvas" id="canvas" :width="canvas_width" :height="canvas_height" style="margin-top:1em;border:0px solid red;"></canvas>
                <div v-show="captures.length>0">
                  <img v-bind:src="captures[0]"  style="border:0px solid red;"/>
                </div>

              </div>

               

            
            </div>

          </b-col>

          <b-col sm=8 > 

            <div style="height:78vh;overflow:hidden;padding:5px;" :style="true ? 'border: 2px solid;box-shadow: 3px 3px;' : 'border: 2px solid #bbb;box-shadow: 3px 3px #bbb;'">
            
              <ol style="list-style-type: circle;font-size:1em;color:#21094E;" class="ml-5 p-3" >

                  <li > <span style="float:left;font-size:1.1em;color:#21094E;"><b>ข้อมูลเบื้องต้น</b></span> <span style="font-size:0.9em;float:right;font-weight:bold;"> </span></li>
                  
              </ol>

              <div class="media-body text-left ml-2 mt-3" >
 
                <div class="row">
                    
                    <div class="col-md-6"> 
                        <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="ชื่อ..."  autocomplete="new-password" v-model="user_name" :state="user_name.length>0" />
                    </div> 

                      
                    
                </div> 
                
                <div class="row">   
                    <div class="col-md-9"> 
                          <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="พบที่..."  autocomplete="new-password" v-model="user_position" :state="user_position.length>0" />
                    </div> 
                     
                    
                </div>

                <div class="row">   
                    <!-- <div class="col-md-9"> 
                          <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="เวลา..."  autocomplete="new-password" v-model="user_time" :state="true" readonly/>
                    </div> 
                    <div class="col-md-3"> 
                           
                    </div> -->

                    
                    
                </div>

                <hr style="border-top: 0px dashed #000;border-bottom: 2px dashed #0078AA;margin-top:2em;margin-left:0.5em;margin-right:1em;"/>

                <div class="row w-100">
                  <div class="col-sm-3"> 
                    <b-button block :variant="capture_mode ? 'danger' : 'success'"  @click="capture_picture()" class="rounded-0 mt-4 w-100" style="color:#fff;margin-left:0.5em;" >
                          
                      <span class="material-symbols-outlined" >photo_camera</span> <span class="ml-2">จับภาพ</span>
                          
                    </b-button>

                  </div>
                  
                  <div class="col-sm-7" > 

                    <b-button block variant="success"  @click="send__lost_child_data()" class="rounded-0 mt-4 w-100" style="color:#fff;margin-left:1em;" :disabled="user_name.length == 0 || user_position.length == 0 || captures.length == 0">
                          
                      <span class="material-symbols-outlined">move_to_inbox</span> <span class="ml-2">บันทึก</span>
                          
                    </b-button>

                  </div>
                  <!-- <div class="col-sm-3"> </div> -->
                </div>

                
              </div>

            
            </div>


          </b-col>

        </b-row>

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

        <b-modal v-model="socket_monitor_dialog" size="sm-success"  centered no-close-on-backdrop hide-header hide-header-close  title="Login"  >
            <div class="row text-center text-success" style="margin-top:2em;"> 
                
                <span style="font-size:4em;"><i class="fa fa-exclamation-triangle" ></i></span>
                <span style="font-size:1em;margin-top:0.5em;"> {{socket_monitor_msg}} </span> 
                
            </div>

            <template v-slot:modal-footer="{ }"> 
                
                <v-btn
                        class="mt-3 rounded-0 border-2 text-success"
                        outlined  
                        @click="socket_monitor_dialog = false"
                        
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

import { Peer } from "peerjs";

var peer = null
let __socket = null
let main_call;

export default {
  name: 'index',
  components: {
		vueTopprogress,
       
	},
  data() {
            return {     
                user_name : '',
                user_position : '',
                user_unitname : '',
                
                socket : [], 
                peer_id : 0,
                socket__room_name : '',
                socket_monitor_msg : '',
                my_socket_id : 0,
                current_call : null,

                captures:[],
                canvas_width:240,
                canvas_height:320,
                myPhoto:'',
                video:null,

                capture_mode : false,

                login_error : false,
                error_log : '',

                socket_monitor_dialog : false,
                socket_monitor_msg : 'OK',

            }
              
    },
        
    
    methods: {
        
        async capture_picture () {

          if( this.capture_mode == false ){ 
            
            this.capture_mode = true

            // ---------------------------------------------------

            this.myPhoto=''
            this.canvas = this.$refs.canvas;

            this.video = this.$refs.peerCamera;


            this.canvas_width=this.video.videoWidth / 2
            this.canvas_height=this.video.videoHeight / 2 

            // console.log( this.canvas )
            
            var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0,  this.canvas_width , this.canvas_height );  
                  
            this.captures=[ canvas.toDataURL("image/jpeg") ];

            let canvasData = canvas.toDataURL("image/jpeg")
            this.myPhoto = canvasData


          }else{

            this.capture_mode = false
            this.captures = []
          }
           

        },
        async send__lost_child_data () {

            // console.log( this.captures[0] )

            if( this.captures.length > 0 ){

              let _obj = {

                name : this.user_name,
                position : this.user_position,
                picture : this.captures[0]

              }

              // console.log( _obj )

              let d = await this.fn_send__lost_child_data ( _obj )
              if( d.result == 'Process-Complete' ){


                this.socket_monitor_msg = 'บันทึกเรียบร้อย'
                this.socket_monitor_dialog = true

                this.capture_mode = false
                this.captures = []

                this.user_name = ''
                this.user_position = ''

              }else{

                this.error_log = d.error    
                this.login_error=true

              }


            }

        },
        async fn_send__lost_child_data ( data ) {

          return new Promise((resolve, reject) => { 

              const config = {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              }
              let requestBody = {                                
                  
                  "lost_child_data" : data 
                  
              }
              
              const json = JSON.stringify(requestBody) 
              
              let end_point = myConfig.server_domain+"/v1/lost_child_data/upload" 

              axios.post( end_point, json, config )
              .then(response => {

                      resolve( response.data )

              }).catch(()=>{ reject() })  

          }) 

        },
        async connect_peer ( socket ) {

          peer = new Peer({host: 'api2-software.rtaf.mi.th', path: '/peerjs' }) 
           

          peer.on('open',  () => {
              
               
              this.peer_id = peer.id  
               
              // console.log( this.peer_id )

              let room_option = {
    
                  room_name : this.socket__room_name, 
                  data :  {
                    action: "update-peer-id",
                    socket_id: this.my_socket_id, 
                    peer_id: peer.id
                  },
                  timeout : 1000,
                  
              }
              
              socket.emit_room_message( room_option , ( err ) => { }, ( succeed ) => { } );

          });

          peer.on('call', function (call) {

              // //console.log( call )
              // let acceptsCall = confirm("Videocall incoming, do you want to accept it ?");

              // if(acceptsCall){
              //     // Answer the call with your own video/audio stream
              //     call.answer(window.localStream);

              //     // Receive data
              //     call.on('stream', function (stream) {
              //         // Store a global reference of the other user stream
              //         // console.log('stream', stream)
              //         window.peer_stream = stream;
              //         // Display the stream of the other user in the peer-camera video element !
              //         onReceiveStream(stream, 'peer-camera');
              //     });

              //     // Handle when the call finishes
              //     call.on('close', function(){
              //         alert("The videocall has finished");
              //     });

              //     // use call.close() to finish a call
              // }else{
              //     console.log("Call denied !");
              // }
          });


        },
        async fn_connect_socket () {

              let server_socket_domain = "https://api2-software.rtaf.mi.th" 
              let client_name = 'client-id-'+generateChallenge()+'-lost-child'
              this.socket__room_name = 'RTAF-LOST-CHILD--PUBLIC-ROOM--01' 

              let socket = new socket_io( '', server_socket_domain, '', client_name, '', '',
          
                      async ( socket_id ) => {  
                      
                          this.socket.push( socket )  

                          this.my_socket_id = socket_id
                          __socket = socket

                          this.$store.commit('set__current_socket_id', JSON.parse(JSON.stringify( socket_id )));

                          socket.join_room( this.socket__room_name, ( err ) => { }, ( succeed ) => { 

                              
                              this.connect_peer( socket )

                          } )
                    
                      },
                      async ( data ) => { },
                      async ( reason ) => { },
                      async ( ping ) => { },
                      async ( authenticated ) => { },
                      async ( __channel_ ) => { },
                      async ( __room_data_ ) => {  

                          if( __room_data_.room_name == this.socket__room_name ){ 

                              // this.socket_monitor_msg = __room_data_.data 
                              if( ( __room_data_.data.action == 'request-client-peer-id' ) ){

                                // console.log( __room_data_.data )
                                if( this.my_socket_id == __room_data_.data.socket_id ){


                                  let room_option = {
    
                                      room_name : this.socket__room_name, 
                                      data :  {
                                        action: "update-peer-id",
                                        socket_id: this.my_socket_id, 
                                        peer_id: this.peer_id
                                      },
                                      timeout : 1000,
                                      
                                  }
                                  
                                  socket.emit_room_message( room_option , ( err ) => { }, ( succeed ) => { } );


                                }

                              }else if( __room_data_.data.action == 'leave-room' ) {  

                                  // console.log( this._peer_connect.socket_id , __room_data_.data.leave_client_id )
                                  if( this._peer_connect.socket_id == __room_data_.data.leave_client_id ){

                                      const audioTrack = createEmptyAudioTrack();
                                      const videoTrack = createEmptyVideoTrack({ width:640, height:480 });
                                      const mediaStream = new MediaStream([audioTrack, videoTrack]);
                                      onReceiveStream(mediaStream, 'peer-camera');

                                      let _obj = {
                
                                        from_socket_id : this.my_socket_id,
                                        to_socket_id : 0,

                                        from_peer_id : this.peer_id,
                                        to_peer_id : 0

                                      }

                                      this.$store.commit('set__current_socket_on_call', JSON.parse(JSON.stringify( _obj )));

                                  }  

                              }else if( __room_data_.data.action == 'snap-picture' ) {  
 
                                  if( this._peer_connect.socket_id == __room_data_.data.socket_id ){

                                    // console.log( __room_data_.data )

                                    let _obj = { 
                                       
                                      socket_id : __room_data_.data.socket_id,
                                      peer_id : __room_data_.data.peer_id

                                    }

                                    this.$store.commit('set__snap_picture_data', JSON.parse(JSON.stringify( _obj )));


                                  }

                              }

                          }
                          
                      } 
                      
              )

          },
          peer_call ( __peer ) {
              
            // console.log( this.peer_id , __peer.peer_id ) 

            this.captures = []
            if( this.peer_id != __peer.peer_id ){
            // if( true ){  

              // let call = peer.call( __peer.peer_id, window.localStream ); 

              const audioTrack = createEmptyAudioTrack();
              const videoTrack = createEmptyVideoTrack({ width:640, height:480 });
              const mediaStream = new MediaStream([audioTrack, videoTrack]);

              window.localStream = mediaStream
               
              try{ 
               
                main_call = peer.call( __peer.peer_id, mediaStream ); 
                // console.log( main_call )
                main_call.on('stream',  (stream) => {
                    window.peer_stream = stream;

                    onReceiveStream(stream, 'peer-camera');

                    this.current_call = main_call

                    // ---------------------------------------------

                    let _obj = {
                  
                      from_socket_id : this.my_socket_id,
                      to_socket_id : __peer.socket_id,

                      from_peer_id : this.peer_id,
                      to_peer_id : __peer.peer_id

                    }

                    this.$store.commit('set__current_socket_on_call', JSON.parse(JSON.stringify( _obj )));

                    // ---------------------------------------------
                    
                    let room_option = {
          
                        room_name : this.socket__room_name, 
                        data :  {
                          action: "update-call-on-stream",
                          socket_id: __peer.socket_id, 
                          peer_id: this.peer_id,
                          traget_peer_id : __peer.peer_id
                        },
                        timeout : 1000,
                        
                    }
                    
                    __socket.emit_room_message( room_option , ( err ) => { }, ( succeed ) => { } );
                    
                });

                 

              }catch(e){

                console.log(e)
              }

            }
             


          } 
           
    
    },
    mounted() { 
         
          this.fn_connect_socket()
          


    },
    created () {

         this.$store.commit('set_isMain', false); 

         let path = [ { text : 'AT' } ,{ text : 'Monitor' } ] 
         this.$store.commit('set_working_path', JSON.parse(JSON.stringify( path )));
       
    },
    beforeDestroy() {
       
        window.localStream.getTracks().forEach(function(track) {
            if (track.readyState == 'live') {
                track.stop();
            }
        });

        setTimeout(() => {

            this.socket.forEach((_socket) => {

                _socket.client_disconnect()

            })

        } , 100);

    },
    watch: {

         
        _peer_connect () {

          // console.log( '_peer_connect', this._peer_connect )

          if( this._peer_connect == '' ){

            // window.localStream.getTracks().forEach( (track) => {

            //     if (track.readyState == 'live') {
            //         track.stop();
            //     }
            // });

          }else{

            this.peer_call( this._peer_connect )

          }
           
          
        },

        _current_socket_on_call () {

          // console.log( '_current_socket_on_call', this._current_socket_on_call )

          if( this._current_socket_on_call.to_peer_id == 'end' ){

            // console.log('call close')

            try{
              this.current_call.close()
              main_call = null
               
            }catch(e){}

          }
          
        },

        _snap_picture_data () {

          this.capture_mode = true 

          this.myPhoto=''
          this.canvas = this.$refs.canvas;

          this.video = this.$refs.peerCamera;


          this.canvas_width=this.video.videoWidth / 2
          this.canvas_height=this.video.videoHeight / 2 

          // console.log( this.canvas )
          
          var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0,  this.canvas_width , this.canvas_height );  
                
          this.captures=[ canvas.toDataURL("image/jpeg") ];

          let canvasData = canvas.toDataURL("image/jpeg")
          this.myPhoto = canvasData

        }
        

    },
    computed: {

        _peer_connect () {

          return JSON.parse(JSON.stringify( this.$store.state._peer_connect ))

        },
        _current_socket_id () {

          return JSON.parse(JSON.stringify( this.$store.state._current_socket_id ))

        },

        _current_socket_on_call  () {

          return JSON.parse(JSON.stringify( this.$store.state._current_socket_on_call ))

        },

        _snap_picture_data   () {

          return JSON.parse(JSON.stringify( this.$store.state._snap_picture_data ))

        },
            

    },
    
    
    
}
 
export const createEmptyAudioTrack = () => {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    const track = dst.stream.getAudioTracks()[0];
    return Object.assign(track, { enabled: false });
};

export const createEmptyVideoTrack = ({ width, height }) => {
  const canvas = Object.assign(document.createElement('canvas'), { width, height });
  canvas.getContext('2d').fillRect(0, 0, width, height);

  const stream = canvas.captureStream();
  const track = stream.getVideoTracks()[0];

  return Object.assign(track, { enabled: false });
};


function generateChallenge(){
    let text = "";
    let possible = "123456789abcdefghijklmnpqrstuvwxyz";

    for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function onReceiveStream(stream, element_id) {
    // Retrieve the video element according to the desired
    let video = document.getElementById(element_id);
    // Set the given stream as the video source
    video.srcObject = stream;

    // Store a global reference of the stream
    window.peer_stream = stream;
}

function requestLocalVideo(callbacks) {
        // Monkeypatch for crossbrowser geusermedia
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // Request audio an video
        navigator.getUserMedia({ audio: true, video: true }, callbacks.success , callbacks.error);
}

// requestLocalVideo({
//     success: function(stream){
//         window.localStream = stream;
//         onReceiveStream(stream, 'my-camera');
//     },
//     error: function(err){
//         alert("Cannot get access to your camera and video !");
//         console.error(err);
//     }
// });

</script>

<style>
    @import "../../assets/dist/css/app.css";
     
</style>


<style>
   @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0");
</style>

 