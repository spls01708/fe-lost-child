<template>
  <div class="app noselect" style="height:100vh;border:0px solid red;">
  
  <div>
    <!-- <b-button v-b-toggle.sidebar-1 block squared> 
       <b-icon-list></b-icon-list><span class="ml-1">Menu</span>
    </b-button> -->
    <b-sidebar id="sidebar-1" title="Menu" shadow>
      <b-list-group class="rounded-0">

        <b-list-group-item @click="go_home()" style="cursor:pointer;">หน้าแรก</b-list-group-item>
        <b-list-group-item @click="go_search()" style="cursor:pointer;">ค้นหา</b-list-group-item>
      
    </b-list-group>
    </b-sidebar>
  </div>

  <div>
  <b-card class="rounded-0">
   
          <b-table-simple small caption-top stacked>           
            <b-tbody>
              <b-tr >
                <b-td style="border:0px solid red;">
                  <b-row class="text-center" >
                    <b-col class="text-center" v-show="pass_data.image!='1'">
                      
                        <div v-show="captures.length==0" style="cursor:pointer;">
                          <video ref="video" id="video" autoplay @click="capture()" style="width:240px;object-fit: cover;"></video> 
                          
                        </div>
                        
                        <canvas v-show="captures.length>0" ref="canvas" id="canvas" :width="canvas_width" :height="canvas_height" style="margin-top:1em;"></canvas>
                        <div v-show="captures.length>0">
                          <img v-bind:src="captures[0]"  />
                        </div>
                        
                        <hr style="border-top:0px;border-bottom:0.1px dashed #b5b5b5;"/>
                        <div class="video-options" style="margin-top:1em;margin-bottom:1em;" v-show="true">
                            <select name="" id="" class="custom-select" @onchange="startStream(value)"> 
                                <option value="">Select camera</option>
                            </select>
                        </div>
                        <hr style="border-top:0px;border-bottom:0.1px dashed #b5b5b5;" v-show="false"/>
                    </b-col>
                    <b-col class="text-center" v-show="pass_data.image=='1'" >
                        
                        <div v-show="captures.length>0">
                          <img v-bind:src="captures[0]" />
                        </div>
                        
                        <hr style="border-top:0px;border-bottom:0.1px dashed #b5b5b5;"/>
                    </b-col>
                  </b-row>
                </b-td>
              </b-tr>
              <b-tr v-if="captures.length>0">
                
                <!-- <b-th stacked-heading="ลำดับ" class="text-left" variant="success">{{pass_data.Vol}}</b-th> -->
                <!-- <b-td stacked-heading="ยศ">{{pass_data.Rank}}</b-td> -->
                <b-td  style="border:0px solid red;margin-top:1em;">
                  
                  <b-form-input  placeholder="ชื่อ..." 
                          style="margin-left:0em;height:2em;"  
                          type="text" v-model="name"
                          :state="( name.length > 0 ) && ( name != '-' )"                          
                  ></b-form-input>

                </b-td>
                <!-- <b-td stacked-heading="สังกัด">{{pass_data.division}}</b-td> -->
                <!-- <b-td  >
                  <b-form-input  placeholder="เลขหมายโทรศัพท์..." 
                          style="margin-left:0em;height:2em;"  
                          type="text" v-model="registration_mobile"
                          :state="( registration_mobile.length > 0 ) && ( registration_mobile != '-' )"                          
                  ></b-form-input>

                </b-td> -->
                <br/>
                <!-- <b-td stacked-heading="ลงทะเบียนประชุม" >

                  <b-form-checkbox v-model="pass_data.morning_registration" name="check-button" switch></b-form-checkbox>
                  
                </b-td>
                <b-td stacked-heading="ลงทะเบียนงานเลี้ยง" >
                   <b-form-checkbox v-model="pass_data.evening_registration" name="check-button" switch></b-form-checkbox>
                </b-td> -->
                <hr style="border-top:0px;border-bottom:0.1px dashed #b5b5b5;margin-top:0.4em;margin-bottom:0.4em;"/>
              </b-tr>
              
              <!-- ------------------------------------------------------------------------- -->
              <b-container style="box-shadow: none;margin-top:0em;" >
                <b-row>
                  <b-col>
                    <b-button variant="primary"  block outline >
                      <!-- <b-icon icon="camera" aria-hidden="true"></b-icon> -->
                      <span class="material-symbols-outlined" v-if="!connect">wifi_off</span>
                      <span class="material-symbols-outlined" v-else>wifi</span>
                       
                    </b-button>
                  </b-col>
                  <b-col >
                    
                    <b-button variant="success"  block outline  @click="fn_take_camera()" :disabled="!connect">
                      <!-- <b-icon icon="cloud-upload" aria-hidden="true"></b-icon> -->
                      <span class="material-symbols-outlined">photo_camera</span>
                       
                    </b-button>

                     
                    
                  </b-col> 
                  <b-col>
                    
                    <b-button variant="primary"  block outline style="" @click="close()">
                        <!-- <b-icon icon="reply-all-fill" aria-hidden="true"></b-icon> -->
                        <span class="material-symbols-outlined">directions_run</span>
                         
                    </b-button>
                  </b-col>
                  
                </b-row>
              
              </b-container>

              <!-- ------------------------------------------------------------------------------ -->
            </b-tbody>
            <b-tfoot>
            
            </b-tfoot>
          </b-table-simple>
         
  </b-card>  
  </div>
  
  </div>
</template>

<script>

/* eslint-disable */

import axios from 'axios'
import store from '../../store'
import Vue from 'vue'

import { socket_io } from '../socket_io_modules'

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
var stream_tmp=null;

import { Peer } from "peerjs";

var peer = null
let conn;

let __socket = null

  export default {
    components: {
      
    },
    
    data() {
      return {
          captures:[],
          video:'',
          checked_1:false,
          checked_2:false,
          myPhoto:'',
          pass_data:[],
          toggle_carmera_picture:0,
          canvas_width:240,
          canvas_height:320,

          name : '',
          registration_mobile : '',

          socket : [], 
           
          socket__room_name : '',
          socket_monitor_msg : '',

          peer_id : 0,
          my_socket_id : 0,

          hide_select : false,

          // current_socket_on_call : {

          //   from_socket_id : 0,
          //   to_socket_id : 0,
          //   from_peer_id : 0,
          //   to_peer_id : 0

          // }

          current_socket_on_call__from_peer_id : 0,
          current_call : null,

          connect : false
          
      }
    },
    methods: {
      capture() {
        if( this.pass_data.image == '1') {
            this.pass_data.image=0
            this.captures=[]
            this.myPhoto = ''
            this.start_video()     
            this.toggle_carmera_picture=0       
            return
        }

          
          this.myPhoto=''
          this.canvas = this.$refs.canvas;

          this.canvas_width=this.video.videoWidth / 2
          this.canvas_height=this.video.videoHeight / 2

          // console.log( this.video.videoWidth , this.video.videoHeight)
          
          var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0,  this.canvas_width , this.canvas_height );          
          this.captures=[ canvas.toDataURL("image/jpeg") ];

          let canvasData = canvas.toDataURL("image/jpeg")
          this.myPhoto = canvasData
          this.pass_data.image=1
      },
      close(){

          if(stream_tmp!=null){
            this.stopBothVideoAndAudio(stream_tmp)
          }
           
          this.$router.push( { path: '/', query: { challenge: this.$route.query.challenge  } } );

      },
      save(){
              this.pass_data.image=1
              this.pass_data.morning_registration= this.pass_data.morning_registration == '-' ? 'false' : this.pass_data.morning_registration
              this.pass_data.evening_registration= this.pass_data.evening_registration == '-' ? 'false' : this.pass_data.evening_registration
              
              store.dispatch('update_modal01_data', JSON.parse(JSON.stringify( this.pass_data ) ) );
              
              this.upload_to_server()
      },
      
      upload_to_server(){
                let api_server = window.localStorage.getItem('$host_api');
                if(!api_server){
                    // alert("err api_server")
                    return;
                }

                this.$store.dispatch('isLoading', true )
                const requestBody = {
                    photo: this.myPhoto,
                    id:this.pass_data._id,   
                    registration_mobile:this.pass_data.registration_mobile,
                    morning_registration:this.pass_data.morning_registration == '-' ? 'false' : this.pass_data.morning_registration ,
                    evening_registration:this.pass_data.evening_registration == '-' ? 'false' : this.pass_data.evening_registration, 
                    image:this.pass_data.image,
                    Rank:this.pass_data.Rank,
                    full_name:this.pass_data.full_name,
                    OfficerID:this.pass_data.OfficerID,
                    division:this.pass_data.division   
                               
                }

                

                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                }

                const json = JSON.stringify(requestBody)   

                let end_point=api_server+"/person/name/"+this.pass_data._id      
                axios.put(end_point, json, config,                
                ).then(response => {

                    console.log(response.data)
                    let end_point2=api_server+"/person/photo/"+this.pass_data._id   
                    axios.put(end_point2, json, config,                
                    ).then(response => {
                        // console.log(response.data)                       
                        this.$store.dispatch('isLoading', false )
                        this.close()
                    }).catch((err) => {
                          this.$store.dispatch('isLoading', false )
                    })

                }).catch((err) => {
                          this.$store.dispatch('isLoading', false )
                })


                

                

      },
       
      go_home(){
                  if(stream_tmp!=null){
                    this.stopBothVideoAndAudio(stream_tmp)
                  }
                  let api_server = window.localStorage.getItem('$host_api');
                  this.$router.push( { path: '/index', query: { id: this.$route.query.id , ip: api_server , pin: this.$route.query.pin } } );
                }, 
      go_search(){
                  if(stream_tmp!=null){
                    this.stopBothVideoAndAudio(stream_tmp)
                  }
                  let api_server = window.localStorage.getItem('$host_api');
                  this.$router.push( { path: '/search', query: { id: this.$route.query.id , ip: api_server , pin: this.$route.query.pin  } } );
                },   
      get_own_photo(){
            
            this.$store.dispatch('isLoading', true )
            this.captures=[]
            let api_server = window.localStorage.getItem('$host_api');
            // if(!api_server){
            //         // alert("err api_server")
            //         return;
            // }

            let end_point=api_server+"/person/photo/"+this.pass_data.OfficerID            
            axios.get( end_point )
            .then(response => {
              if( response.data.length>0 ){
                if( response.data[0].image != undefined){
                  this.captures.push( response.data[0].image )
                  this.myPhoto = response.data[0].image
                }
              }
              
              
              this.$store.dispatch('isLoading', false )
            }).catch((err) => {
                          this.$store.dispatch('isLoading', false )
            })

      },
      
      start_video(){ 

        if( this.pass_data.image != '1') {
          
          // this.$store.dispatch('isLoading', false )

          const cameraOptions = document.querySelector('.video-options>select');

          this.video = this.$refs.video;
          if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) { 
              
              let _options = 0 

              navigator.mediaDevices.enumerateDevices().then(devices => {
                  
                   
                  const videoDevices = devices.filter(device => device.kind === 'videoinput');  

                  _options =  videoDevices.length

                  const options = videoDevices.map(videoDevice => {
                    return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
                  });
                  cameraOptions.innerHTML = options.join('');
                  

              }); 
              // ----------------------------------------------------------------------------------------
              setTimeout( () => {

                  // alert( _options )
                  if( _options > 1 ){

                    this.hide_select = true
                    // กล้องหลัง
                    navigator.mediaDevices.getUserMedia({
                      audio: false,
                      video: {
                        facingMode: {
                            exact: 'environment'
                        }
                      }
                    })
                    .then(stream => {
                      stream_tmp=stream
                      this.video.src = video.srcObject=stream;
                      
                      this.video.play();

                    })
                    .catch(console.error);

                  }else{
                    this.hide_select = false

                    // defalut
                    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => { 

                        stream_tmp=stream
                        this.video.src = video.srcObject=stream;
                        
                        this.video.play();
                        // this.$store.dispatch('isLoading', false )
                    });

                  }

              },100)

              cameraOptions.onchange = () => {
                
                 
                let constraints = { deviceId: { exact: cameraOptions.value } }; 

                navigator.mediaDevices.getUserMedia( { video: constraints } ).then(stream => {  
                    
                    stream_tmp=stream
                    this.video.src = video.srcObject=stream;
                    
                    this.video.play();
                    // this.$store.dispatch('isLoading', false )
                }).catch( e => {

                  // alert(e)

                  if(stream_tmp!=null){
                    this.stopBothVideoAndAudio(stream_tmp)


                    navigator.mediaDevices.getUserMedia( { video: constraints } ).then(stream => {  
                    
                        stream_tmp=stream
                        this.video.src = video.srcObject=stream;
                        
                        this.video.play();
                        // this.$store.dispatch('isLoading', false )
                    })


                  }


                })      
                

              };

          }
        }else{

          this.get_own_photo()
        }
        

        

      },
      fn_take_camera () { 
          
        if( this.connect ){

          let room_option = {

              room_name : this.socket__room_name, 
              data :  {
                action: "snap-picture",
                socket_id: this.my_socket_id, 
                peer_id: this.peer_id
              },
              timeout : 1000,
              
          }

          __socket.emit_room_message( room_option , ( err ) => { }, ( succeed ) => { } );

        } 
         

      },
      stopBothVideoAndAudio(stream) {
          stream.getTracks().forEach(function(track) {
              if (track.readyState == 'live') {
                  track.stop();
              }
          });
      },
      startStream(value){

        console.log( value )
          
      },
      async connect_peer ( socket ) {

        this.connect = false
        
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

        peer.on('call', (call) => {

            console.log( call )
            // let acceptsCall = confirm("Videocall incoming, do you want to accept it ?"); 
            let acceptsCall = true
             
            if(acceptsCall){

                // console.log( call.peer  )

                this.connect = true

                this.current_call = call

                this.current_socket_on_call__from_peer_id = call.peer

                // Answer the call with your own video/audio stream
                call.answer( stream_tmp );

                // Receive data
                call.on('stream', function (stream) {
                    // Store a global reference of the other user stream
                    // console.log('stream', stream)
                    // window.peer_stream = stream;
                    // Display the stream of the other user in the peer-camera video element !
                    // onReceiveStream(stream, 'peer-camera');
                });

                // Handle when the call finishes
                call.on('close', function(){
                    // alert("The videocall has finished");
                    this.connect = false
                });

                // use call.close() to finish a call
            }else{
                console.log("Call denied !");
                this.connect = false
            }
        });



      },
      async fn_connect_socket () {

              let server_socket_domain = "https://api2-software.rtaf.mi.th" 
              let client_name = 'client-id-'+generateChallenge()+'-lost-child'
              this.socket__room_name = 'RTAF-LOST-CHILD--PUBLIC-ROOM--01' 
              this.my_socket_id = 0

              let socket = new socket_io( '', server_socket_domain, '', client_name, '', '',
          
                      async ( socket_id ) => {  

                          __socket = socket
                      
                          this.socket.push( socket )  
                          this.my_socket_id = socket_id

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

                              this.socket_monitor_msg = __room_data_.data 

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

                              }else if( ( __room_data_.data.action == 'disconnect-client-on-call' ) ){
 

                                if( ( this.my_socket_id == __room_data_.data.to_socket_id ) && ( this.current_socket_on_call__from_peer_id == __room_data_.data.from_peer_id ) ){

                                  // console.log( __room_data_.data )
                                  // https://github.com/peers/peerjs/issues/832

                                  this.current_call.close();

                                  // if(stream_tmp!=null){
                                  //   this.stopBothVideoAndAudio(stream_tmp)

                                  //   setTimeout(() => {

                                  //     this.start_video()

                                  //     this.connect_peer( socket )

                                  //   },100)

                                  // }

                                  setTimeout(() => {

                                    // this.start_video()

                                    this.connect_peer( socket )

                                  },100)

                                }

                              }
 

                          }
                          
                      } 
                      
              )

          }, 
       
       
    },
    computed: {
        open_modal01: {
                  get() { return store.getters.open_modal01; },
                  set(value) { store.dispatch('open_modal01', value ); },
        },
        pass_modal01_data: {
                  get() { return store.getters.pass_modal01_data; },
                  set(value) {  },
        },
        valid_save_btn () {
               
              return this.captures.length > 0 && this.name.length > 0 
              //  return this.myPhoto == '' || 
              //  this.r_registration_mobile ||               
              //  (this.r_morning_registration==false && this.r_evening_registration==false) ? true : false
        },
        r_morning_registration () {
          if( this.pass_data.morning_registration=='-' || this.pass_data.morning_registration=='false' || this.pass_data.morning_registration==false )return false;
          return true
        },
        r_evening_registration () {
          if( this.pass_data.evening_registration=='-' || this.pass_data.evening_registration=='false' || this.pass_data.evening_registration==false )return false;
          return true
        },
        r_registration_mobile () {

          if( this.pass_data.registration_mobile=='-' || this.pass_data.registration_mobile == '' || isNaN(this.pass_data.registration_mobile) )return true;
          return false

        }
        
    },
    
    mounted(){

                this.pass_data = JSON.parse(JSON.stringify( this.pass_modal01_data ) )  
                
                this.captures=[]
                this.myPhoto = ''
                this.start_video()

                this.fn_connect_socket()
                 
    },
    beforeDestroy() {

                  if(stream_tmp!=null){
                    this.stopBothVideoAndAudio(stream_tmp)
                  }

                  setTimeout(() => {

                      this.socket.forEach((_socket) => {

                          _socket.client_disconnect()

                      })

                  } , 100);

    },
    watch: {
         
        '$route.query.challenge': {
          handler: function ( challenge ) {

            if( challenge ){ 

            }else{
              this.$router.push( { path: '/' } );
            }
            
            
          },
          deep: true,
          immediate: true
        },        
                
    },
  
  }
function onReceiveStream(stream, element_id) {
    // Retrieve the video element according to the desired
    let video = document.getElementById(element_id);
    // Set the given stream as the video source
    video.srcObject = stream;

    // Store a global reference of the stream
    window.peer_stream = stream;
}

function generateChallenge(){
    let text = "";
    let possible = "123456789abcdefghijklmnpqrstuvwxyz";

    for (var i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function make_tree_id(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 30; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

let s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
let guid = () => s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4()
</script>

<style scoped>
 
    body {
        background-color: #F0F0F0;
    }
    #app {
        text-align: center;
        /* color: #2c3e50; */
        margin-top: 60px;
        
    }
    #video {
        background-color: #000000;
    }
    #canvas {
        display: none;
    }
    li {
        display: inline;
        padding: 5px;
    }
</style>

<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css";
</style>

<style>
  @import "https://fonts.googleapis.com/css2?family=Kanit&display=swap";
</style>

<style scoped src='@/assets/css/style.css'>
</style>
 

<style>
   @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0");
</style>
 