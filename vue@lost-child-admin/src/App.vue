<template>
  <div id="app" style="height:100vh;overflow:hidden;background-color: #0F3D3E;">
      
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress> 
    <div> 
      
      <b-row :class="isMain==false ? 'm-0' : ''" > 
     
        <b-col sm=2 v-if="isMain==false" style="border:0px solid red;background-color: #0F3D3E;border-radius:0 0 30px;">

            <menuLeft/>
         
        </b-col>
        <b-col :sm="isMain==true ? 12 : 10">
          <div class="row header"  :style="isMain==true ?  'height:0em;' : 'height:5em;border-radius:30px 0 0;background-color: #eee;border:0px solid red;'"  >  

            <menuTop /> 
       
          </div>
           

          <router-view  :style="isMain==true ? 'overflow:hidden;height:calc(100vh - 20px)' : 'overflow:hidden;height:calc(100vh - 8.3em);margin-left:-12px;margin-right:-12px;margin-top:12px;border:0px solid red;background-color: #eee;'" ></router-view>

        </b-col>

      </b-row>
     

    </div>

    <div class="footer" style="z-index:9999;border:0px solid red;">
      <div v-if="isMain==true">
          <p style="font-size:14px;font-weight:bold;float:left;margin-left:10px;margin-top:0.8em;color:#0F3D3E;color:#FFFFFF;">{{version_string}}</p>
          <p style="font-size:14px;font-weight:bold;float:right;margin-right:10px;margin-top:0.8em;color:#0F3D3E;color:#FFFFFF;">{{copyright_string}}</p>      
      </div> 
      <div v-else>
          <p style="font-size:14px;font-weight:bold;float:left;margin-left:10px;margin-top:0.8em;color:#0F3D3E;color:#FFFFFF;">{{version_string}}</p>
          <p style="font-size:14px;font-weight:bold;float:right;margin-right:10px;margin-top:0.8em;color:#0F3D3E;color:#FFFFFF;">{{copyright_string}}</p>      
      </div>  
       

    </div>

    
  </div>
</template>


<script>
/* eslint-disable */ 
 
import { vueTopprogress } from 'vue-top-progress' 

import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue) 

import menuTop from '../src/components/menu/top.vue'
import menuLeft from '../src/components/menu/left.vue'

const { server_publicKey } = require('./components/server_publicKey');

import { socket_io } from './components/socket_io_modules'
 
import { custome_socket_io } from './components/send_to_socket_io_modules'

export default {
  name: 'App',
  components: {
     
    vueTopprogress,
    menuTop,
    menuLeft
  },
   
  data() {
            return { 
              version_string : 'Version 0.0.1',
              copyright_string : '©ศูนย์ซอฟต์แวร์กองทัพอากาศ ๒๕๖๕',
              socket : [],  

            }
  },
  methods: {

    async test () {

            let server_socket_domain = "https://api2-software.rtaf.mi.th" 
            let client_name = 'client-pki-'+generateChallenge()+'-lost-child'
             
            let room_name = 'LOST-CHILD--RTAF-Application'

            let socket = new socket_io( '', server_socket_domain, '', client_name, '', '',
        
                    async ( socket_id ) => {  
       						 
                        this.socket.push( socket )  

                        socket.join_room( room_name, ( err ) => { }, ( succeed ) => { 

                            let room_option = {

                                room_name : room_name, 
                                data : 'test',
                                timeout : 2000,
                                
                            }

                            socket.emit_room_message( room_option , ( err ) => {  }, ( succeed ) => { console.log(succeed) } );

                        } )
        				 
                    },
                    async ( data ) => { },
                    async ( reason ) => { },
                    async ( ping ) => { },
                    async ( authenticated ) => { },
                    async ( __channel_ ) => { },
                    async ( __room_data_ ) => {   

                        if( __room_data_.room_name == 'system-info-01' ){}
                        else if( __room_data_.room_name == room_name ){

                            console.log( __room_data_.data )

                        }
                        else{

                            //console.log( __room_data_ )

                        }
                    } 
                    
            )

        },
     
  },
  computed: {
    
    isLoading () {
 
      return JSON.parse(JSON.stringify( this.$store.state.isLoading )) 
    },

    isMain () {
 
      return JSON.parse(JSON.stringify( this.$store.state.isMain )) 
    },

  },
  watch: {

    isLoading () { 
       
      if( this.isLoading == true ) {

        this.$refs.topProgress.start()
         

      }else{

        this.$refs.topProgress.done()
         
      }

    }

  },
  mounted(){  

    this.test()
    
     
  },
  created () { 
       
  },
  beforeDestroy() {
        
        // this.$store.commit('set_isMain', true);

        setTimeout(() => {

            this.socket.forEach((_socket) => {

                _socket.client_disconnect()

            })

        } , 100);

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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
   
}
</style>

<style>
   @import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
</style>

<style>
   @import url("https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css");
</style>


<style lang="scss">
// ----------------------------------------------------------
// Fiill the space between two text elements with dots
// https://stackoverflow.com/questions/39438026/fiill-the-space-between-two-text-elements-with-dots

section {
  display: flex !important;
  align-items: baseline !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important;
}
section > * {
  padding: 0;
  margin: 0;
}
span.aaa {
  flex: 1;
  margin-left:1em;
  margin-right:1em;
  border-bottom: 1px dashed #999 !important;
}

span.aa-none {
  flex: 1;
  margin-left:1em;
  margin-right:1em;
  border-bottom: 1px dashed #bbb !important;
}

.modal-dialog {
   

  .modal-content {
    
    border-radius: 0px;
     
  } 

}

.modal-m-1 {
    max-width: 95% !important;

    .modal-content {
    
       border : 2px solid #1572A1;
      
    } 
}

.modal-lg{
    max-width: 80% !important;

    .modal-content {
    
       border : 2px solid #1572A1;
      
    } 
}

.modal-xl-1 {
    max-width: 96% !important;

    .modal-content {
    
       border : 2px solid #1572A1;
      
    } 
    
}

.modal-sm-error {
    max-width: 20% !important;

    .modal-content {
    
       border : 2px solid #a12815;
      
    } 
    
}

.modal-sm-ok {
    max-width: 20% !important;

    .modal-content {
    
       border : 2px solid #08f62c;
      
    } 
    
}
 
.border-1 {

  border-width: 1px !important;

}

.border-2 {

  border-width: 2px !important;

}

.selection_ele:hover {

  background-color: #bcffb5;
  border : 2px dashed #0b9c62;
   

}
.selection_ele {

  text-align : center; 
  display: inline-block;
  min-width: 5em;

}
 
.fake-legend-1{
  height: 15px;
  width:100%;
  /* border-bottom: solid 2px #e5e4e4; */
  border-bottom: solid 2px #474A8A;
  text-align: center;
  /* margin: 1em 0; */
  margin-top:1em;
  margin-bottom:1.5em;
}
.fake-legend-1 span {
  background: #fff;
   
  position: relative;
  top: -0.2em;
  padding: 0 20px;
 
  line-height:30px;
  color:#474A8A;
  font-weight:bold;
  font-size: 1.1em;
}

.selection_ele-2:hover {
  background-color: #bcffb5;
  border : 2px dashed #0b9c62; 
  // border-bottom : 2px dashed #0b9c62; 
  font-weight: bold; 
  // color: #0b9c62 !important;
}
 

.selection_ele-2 i.icon-find{
  visibility:hidden;
}
.selection_ele-2:hover i.icon-find {
 visibility:visible;
}


.selection_ele-3 {
  background-color: #0078AA;
  // border : 2px dashed #293462;  
  border : 1px solid #fff;
  font-weight: bold;  
  color: #fff !important;
  border-radius: 5px !important;
}

.selection_ele-3:hover {
  background-color: #bcffb5;
  border : 2px dashed #0b9c62;  
  font-weight: bold; 
  color: #0078AA !important;
  // border-radius: 0px !important;
   
}

.selection_ele-4:hover {
  background-color: #bcffb5;
  border : 1px dashed #0b9c62; 
   
  font-weight: bold; 
   
}

.pagination { 

}

.pagination ul {
  text-align: right;
}
      
.pagination li {
          float: right !important;
}

.pagination .page-item {
        color: red !important;
}

.pagination .page-link {
        color: #0078AA !important;
        border:2px solid #0078AA !important;
        border-radius: 0px !important;
}

.pagination .page-item.active .page-link {
        color: #FFF !important;
        background-color:#0078AA !important;
        border:2px solid #0078AA !important;
        border-radius: 0px !important;
        font-weight: bolder !important;
}

.fake-legend {
  height: 15px;
  width:100%;
  /* border-bottom: solid 2px #e5e4e4; */
  border-bottom: solid 3px #413F42;
  text-align: center;
  /* margin: 1em 0; */
  margin-top:1em;
  margin-bottom:1.5em;
}
.fake-legend span {
  background: #fff;
  position: relative;
  top: -2px;
  padding: 0 20px;
  line-height:30px;
  color:#413F42;
  font-weight:bold;
}

 

</style>

<style>
  @import "./assets/style_1.css";
</style>