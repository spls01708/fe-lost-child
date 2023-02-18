<template>

    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;" >
    <div class="m-2" style="height:73vh;">
         
        <table  cellpadding=3 class="center outline striped text-dark" width=100%  style="margin-top:-0.5em;" >
            <thead>
            <tr class="header font-weight-bold text-primary text-center " @click="select_all_tle()">
                
                <th class='small' style="color:#82cbfc;"></th>
                <th class=small >รูป</th>
                
                <th class=small >ชื่อเด็ก</th>
                <th class=small >สถานที่พบ</th> 

                <th class=small >พบเมื่อ</th>
                <th class=small >สถานะ</th>
                <th class=small >ผู้ปกครองรับ</th> 
                 
                </tr>
            </thead>

            <tbody>

                <tr align=center v-for="(data,index) in arr" :key="index" @click="select_tr( data )" style="cursor:pointer;" :class=" data.status =='lost' ? 'text-danger' : 'text-success'">

                    <td class="small" style="cursor:pointer;zoom:0.8" >
                        <v-icon v-if="data.selected==true">mdi-checkbox-marked-outline</v-icon>
                        <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
                    </td>
                     
                    <td  style="width:15%;">
                        <img style='display:block; width:100px;height:100px;' :src='data.picture' />
                    </td>     
                    <td  style="width:25%;">{{data.name}}</td> 
                    <td  class="small">{{data.position}}</td> 
                    
                    

                    <td :class="false ? 'small text-danger text-decoration-line-through' : 'small '" style="width:10%;">{{data.createdTH}}<br/>{{data.createdTime}}</td>
                    <td  style="width:10%;">
                         
                        <span class="text-danger" v-if="data.status =='lost'" style="font-weight:bold;">สูญหาย</span>
                        <span class="text-success " v-if="data.status =='found'" style="font-weight:bold;">พบแล้ว</span>

                    </td>
                    <td  style="width:10%;" :class="false ? 'small text-danger text-decoration-line-through' : 'small '">
                         
                        <span class="text-danger" v-if="data.status =='lost'"  >-</span>
                        <span class="text-success " v-if="data.status =='found'"  >{{data.foundTH}}<br/>{{data.foundTime}}</span>

                    </td>
                     
                </tr> 

            </tbody>
        </table> 
    </div>

    <!-- ------------------------------------------------------------------------------------ -->
    <div style="margin:2em;zoom:0.9;">
        <b-pagination 
            :container-class="'pagination'"
            :pageClass="'page-item'"
            :pageLinkClass="'page-link-item'"
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"  
        >
        </b-pagination>
    </div>
      
     
    <!-- ----------------------------------------------------------------------------------------------------------------------------------------------------------- -->
    <b-modal v-model="open_add_user_dialog"  dialog-class="modal-lg" centered no-close-on-backdrop hide-footer hide-header hide-header-close  title="info"   >
        
        <div  class="card border-info text-center border-0 rounded-0 mt-1 text-primary" style="margin-bottom:0.5em;height:5vh;justify-content: center;" >
            <b-row>
            <b-col  >  
                <span class="text-info font-weight-bold ml-4"><span style="font-size:18px;color:navy;">ข้อมูลเบื้องต้น <span style="font-size:0.9em;">(ID : {{user_id}})</span></span></span> 
            </b-col>

            <b-col sm=1  > 
                <v-btn fab x-small dark  style="margin-top:-0.6em;float:right;"> <v-icon style=" font-size:2.5em;" class="text-light" @click="open_add_user_dialog = false">mdi-close-outline</v-icon> </v-btn>
            </b-col>

            </b-row>

        </div>

        <hr style="border-top: 0px dashed #277BC0;border-bottom: 2px dashed #0078AA;"/>

        <b-row class="m-2" >

          <b-col sm=4 >

            <div style="height:60vh;overflow:hidden;padding:5px;" :style="true ? 'border: 2px solid;box-shadow: 3px 3px;' : 'border: 2px solid #bbb;box-shadow: 3px 3px #bbb;'">
              <ol style="list-style-type: circle;font-size:1em;color:#21094E;" class="ml-5 p-3" >

                  <li > <span style="float:left;font-size:1.1em;color:#21094E;"><b>ภาพจากกล้อง</b></span> <span style="font-size:0.9em;float:right;font-weight:bold;"> </span></li>
                  
              </ol> 

              <img v-bind:src="capture"  style="border:0px solid red;"/>  
            
            </div>

          </b-col>

          <b-col sm=8 > 
        
            <div style="height:60vh;overflow:hidden;padding:5px;" :style="true ? 'border: 2px solid;box-shadow: 3px 3px;' : 'border: 2px solid #bbb;box-shadow: 3px 3px #bbb;'">
            
              <ol style="list-style-type: circle;font-size:1em;color:#21094E;" class="ml-5 p-3" >

                  <li > <span style="float:left;font-size:1.1em;color:#21094E;"><b>ข้อมูลเบื้องต้น</b></span> <span style="font-size:0.9em;float:right;font-weight:bold;"> </span></li>
                  
              </ol>

              <div class="media-body text-left ml-2 mt-3" >
 
                <div class="row">
                    
                    <div class="col-md-6"> 
                        <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="ชื่อ..."  autocomplete="new-password" v-model="user_name" :state="user_name.length>0" readonly />
                    </div>  
                    
                </div> 
                
                <div class="row">   
                    <div class="col-md-9"> 
                          <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="พบที่..."  autocomplete="new-password" v-model="user_position" :state="user_position.length>0" readonly/>
                    </div> 
                     
                    
                </div>

                <hr style="border-top: 0px dashed #000;border-bottom: 2px dashed #0078AA;margin-top:2em;margin-left:0.5em;margin-right:1em;"/>

                <div class="row w-100">
                  <div class="col-sm-4"> 
                    <b-button block :variant="status == 'lost' ? 'danger' : 'success'"  class="rounded-0 mt-4 w-100" style="color:#fff;margin-left:0.5em;" 
                        @click="toggle__lost_child_status()"
                    >
                          
                      <!-- <span class="material-symbols-outlined" >photo_camera</span> <span class="ml-2">{{status}}</span> -->
                       
                        <span class="material-symbols-outlined" v-if="status =='lost'">face_retouching_off</span> <span class="ml-2" v-if="status =='lost'">สูญหาย</span>
                        <span class="material-symbols-outlined" v-if="status =='found'">escalator_warning</span> <span class="ml-2" v-if="status =='found'">พบแล้ว</span>
               
                    </b-button>

                  </div>
                  
                  <div class="col-sm-7" > 

                    <!-- <b-button block variant="success"  @click="send__lost_child_data()" class="rounded-0 mt-4 w-100" style="color:#fff;margin-left:1em;" disabled>
                          
                      <span class="material-symbols-outlined">move_to_inbox</span> <span class="ml-2">บันทึก</span>
                          
                    </b-button> -->

                    <b-button block variant="success"  @click="open_add_user_dialog = false" class="rounded-0 mt-4 w-100" style="color:#fff;margin-left:1em;"  >
                          
                       <span class="mr-2">Exit</span> <span class="material-symbols-outlined">directions_run</span> 
                          
                    </b-button>

                  </div>

                  <div class="col-sm-3" > 

                     

                  </div>
                  
                </div> 

              </div>
            </div>
          </b-col>
        </b-row>
 
       

        <template v-slot:modal-footer="{ }">  
        <b-row  class="w-100" style="margin-bottom:1em;">  
            <b-col cols="3">
            </b-col>
            <b-col  cols="3"></b-col>
            <b-col  cols="3"> </b-col> 
            <b-col  cols="3">
            </b-col>
        </b-row>
        </template>


    </b-modal>   

     

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
                perPage: 5,
                totalRows:0,

                __psss_user : '',

                counter : 1, 

                login_error:false,
                error_log:'',

                open_add_user_dialog : false,

                user_position : '',
                user_name : '',
                capture :'',
                status : 'lost',
                user_id : 0,
               
            }
              
    },
        
    
    methods: {
        async toggle__lost_child_status () {

            this.arr.forEach( async(v, i, a) => {

                if( this.user_id == v._id ){
                     
                    if( v.status == 'lost' ){

                        v.status = 'found' 
                        this.status = 'found' 
                        this.arr.splice( i, 1, v)

                        this.fn_change__lost_child_status( JSON.parse(JSON.stringify( v )) )

                    }else if( v.status == 'found' ){

                        v.status = 'lost' 
                        this.status = 'lost' 
                        this.arr.splice( i, 1, v)

                        this.fn_change__lost_child_status( JSON.parse(JSON.stringify( v )) )

                    }   
                     
                } 
            
            })

        },
        select_tr ( data ){
             
            this.arr.forEach( async(v, i, a) => {

                if( data._id == v._id ){
                     
                    v.selected = true
                    this.arr.splice( i, 1, v)   

                    this.user_name = v.name
                    this.user_position = v.position
                    this.capture = v.picture

                    this.open_add_user_dialog = true
                    this.status = v.status
                    this.user_id = v._id
                }else{

                    v.selected = false
                    this.arr.splice( i, 1, v) 

                }
            
            })

        },
        copyTestingCode ( ref ) { 
          
         navigator.clipboard.writeText( ref ); 
         

        },
        fn_open_add_user_dialog () {

            // this.open_add_user_dialog = true
             
            this.$store.commit('set_open_add_user_dialog', true); 

        },
        async fn_change__lost_child_status( data ){

          return new Promise((resolve, reject) => { 

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {  
                                    "token" : 0 ,
                                    "lost_child_data" : data 
                                }
                              
                                const json = JSON.stringify(requestBody)
                                
                                let end_point = myConfig.server_domain+"/v1/lost_child_data/change/status"
                                
                                 
                                axios.post( end_point, json, config )
                                .then(response => {

                                         
                                        // ====================================================================
                                        resolve( response.data )

                                }).catch(()=>{ reject() })  

                        })

        },
        async get__countDocuments(){

          return new Promise((resolve, reject) => { 

                                const config = {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }
                                let requestBody = {  
                                    "token" : 0 
                                }
                              
                                const json = JSON.stringify(requestBody)
                                
                                let end_point = myConfig.server_domain+"/v1/lost_child_data/countDocuments"
                                
                                 
                                axios.post( end_point, json, config )
                                .then(response => {

                                         
                                        // ====================================================================
                                        resolve( response.data )

                                }).catch(()=>{ reject() })  

                        })

        },
        async get_my_puppet () {

            let d = await this.get__countDocuments()
            
            console.log( d )
            if( d.result == 'Process-Complete' ){ 

                      this.totalRows = Number(d.data) 
                      this.currentPage = 1

            }


            let __data = await this.fn_get_my_puppet () 

            // console.log( __data )
           
            if( __data.result == 'Process-Complete' ){

                 this.arr = []

                 for(let i=0;i<__data.data.length;i++){

                     let obj = __data.data[i]
                     obj.selected = false
                     obj.user_id = __data._id
                    //  obj.mod_ref = obj.uid[0]+obj.uid[1]+' - '+obj.uid[2]+obj.uid[3]+obj.uid[4]+' - '+obj.uid[5]+obj.uid[6]+obj.uid[7]

                     obj.createdTH = new Date( obj.created  ).toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric', })
                     obj.createdTime = new Date( obj.created  ).toLocaleTimeString();

                     obj.foundTH = new Date( obj.found  ).toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric', })
                     obj.foundTime = new Date( obj.found  ).toLocaleTimeString();

                    //  obj.expireTH = new Date( obj.expire  ).toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric', })

                    //  obj.expire_flag = new Date() > new Date( obj.expire ) ? true : false

                     this.arr.push( obj )

                 }

            } 

        },
        async next_list_puppet () {

            let __data = await this.fn_get_my_puppet ()  
           
            if( __data.result == 'Process-Complete' ){

                 this.arr = []

                 for(let i=0;i<__data.data.length;i++){

                     let obj = __data.data[i]
                     obj.selected = false
                     obj.user_id = __data._id
                    //  obj.mod_ref = obj.uid[0]+obj.uid[1]+' - '+obj.uid[2]+obj.uid[3]+obj.uid[4]+' - '+obj.uid[5]+obj.uid[6]+obj.uid[7]

                     obj.createdTH = new Date( obj.created  ).toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric', })
                    //  obj.expireTH = new Date( obj.expire  ).toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric', })

                    //  obj.expire_flag = new Date() > new Date( obj.expire ) ? true : false

                     this.arr.push( obj )

                 }

            } 

        },
        async fn_get_my_puppet() {

            return new Promise((resolve, reject) => {  

                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                let requestBody = {     
                    
                    "token" : 0,
                    "page" : this.currentPage,
                    "page_size" : this.perPage,

                }

                const json = JSON.stringify(requestBody) 
                
                let end_point = myConfig.server_domain+"/v1/lost_child_data/list"
                
                axios.post( end_point, json, config )
                .then(response => { 
 
                        resolve( response.data )

                }).catch( (e) => {
 
                        reject(e)    
                })

            })

        },

        async search_string () {
            
            this.arr = []

            let __data = await this.fn_search_string ( this._search_string )
             
           
            if( __data.result == 'Process-Complete' ){

                  

                 for(let i=0;i<__data.data.length;i++){

                     let obj = __data.data[i]
                     obj.selected = false
                     obj.user_id = __data._id
                    //  obj.mod_ref = obj.uid[0]+obj.uid[1]+' - '+obj.uid[2]+obj.uid[3]+obj.uid[4]+' - '+obj.uid[5]+obj.uid[6]+obj.uid[7]

                     obj.createdTH = new Date( obj.created  ).toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric', })
                    //  obj.expireTH = new Date( obj.expire  ).toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric', })

                    //  obj.expire_flag = new Date() > new Date( obj.expire ) ? true : false

                     this.arr.push( obj )

                 }

            } 


        },
        async fn_search_string( search_string ) {

            return new Promise((resolve, reject) => {  

                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                let requestBody = {     
                    
                    "token" : 0,
                    "page" : this.currentPage,
                    "page_size" : this.perPage,
                    "search_string" : search_string

                }

                const json = JSON.stringify(requestBody) 
                
                let end_point = myConfig.server_domain+"/v1/lost_child_data/search"
                
                axios.post( end_point, json, config )
                .then(response => { 
 
                        resolve( response.data )

                }).catch( (e) => {
 
                        reject(e)    
                })

            })

        },


         
           
    
    },
    mounted() {
         
          this.get_my_puppet()
           

    },
    created () {

         this.$store.commit('set_isMain', false); 

         let path = [ { text : 'AT' } ,{ text : 'List' } ] 
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

        currentPage () { 
             
            this.next_list_puppet( )  

        }, 
        _search_string () {

             
            if( this._search_string == '' ){

                this.get_my_puppet()

            }else{

                this.search_string ()

            }
             
        } 
        

    },
    computed: {

        _search_string () {

          return JSON.parse(JSON.stringify( this.$store.state._search_string ))

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
 
