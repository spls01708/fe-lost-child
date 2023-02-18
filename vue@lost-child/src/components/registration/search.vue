<template>
<div class="app noselect" >
  
  <div>
    <!-- <b-button v-b-toggle.sidebar-1 block squared> 
       <b-icon-list></b-icon-list><span class="ml-1">Menu</span>
    </b-button> -->
    <b-sidebar id="sidebar-1" title="Menu" shadow>
      <b-list-group  class="rounded-0">

        <b-list-group-item @click="go_home()" style="cursor:pointer;">หน้าแรก</b-list-group-item>
        <b-list-group-item active>ค้นหา</b-list-group-item>
      
    </b-list-group>
    </b-sidebar>
  </div>

  

  <b-card
       
      title="ค้นหาเด็กหลง"
      class="rounded-0"
      style="border:0px solid red;height:95vh;overflow:auto;"
    >
      <div class="mb-2">
        <b-form-input
            id="input-live"
            v-model="search_string"
            :state="search_string.length>0"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="ใส่ชื่อ..."
            trim
            @keyup.enter="_search_string()"
        ></b-form-input>
      </div>

      <div>
        <b-table-simple hover small caption-top stacked style="">
           
            <b-tr>
              <b-td class="text-right" style="border:none;">
                ผลการค้นหา : <b>{{myArray1.length}}</b>
              </b-td>
            </b-tr>
          <b-tbody>
            <b-tr v-for="(value, key) in myArray1" :key="key">              
              <b-th stacked-heading="ลำดับ" class="text-left" variant="success">{{key+1}}</b-th>
              
              <b-td stacked-heading="รูป"><img style='display:block; width:100px;height:100px;' :src='value.picture' /></b-td>

              <b-td stacked-heading="ชื่อ">{{value.name}}</b-td>
              <b-td stacked-heading="พบที่">{{value.position}}</b-td>
               
              <b-td stacked-heading="เวลา">{{value.createdTime}}</b-td>
              <b-td stacked-heading="สถานะ" v-if="value.status =='lost'">สูญหาย</b-td>
              <b-td stacked-heading="สถานะ" v-if="value.status =='found'">พบแล้ว</b-td>
              <b-td stacked-heading="ผู้ปกครองมา" v-if="value.status =='found'">{{value.foundTime}}</b-td>

              <hr style="border-top:0px;border-bottom:0.1px dashed #b5b5b5;margin-top:0.4em;margin-bottom:0.4em;"/>
            </b-tr>
            
           
          </b-tbody>
          <b-tfoot>
           
          </b-tfoot>
        </b-table-simple>
        
      </div>
    </b-card>

     

    <span style="color:red;margin-left:1em;">{{err}}</span>
  
    
</div>


</template>

<script>
/* eslint-disable */

import store from '@/store/'
import axios from 'axios'
import Vue from 'vue'
import myPicture from './take_picture.vue'

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const qs = require('querystring')

import { BootstrapVue, IconsPlugin , BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
 
import myConfig from '../config.js'

export default {
  name: 'index',
  components: {
    // myPicture
  },  
  data() {                                                                                
            return {  
                    
                text:'',
                myArray1:[],
                err:'',
                currentPage: 1,
                perPage: 5,
                totalRows:0,
                search_string : '',

              }
  },
  methods: {
      close(){  
           
          this.$router.push( { path: '/', query: { challenge: this.$route.query.challenge  } } );

      }, 
      go_home(){
        
        
        this.$router.push( { path: '/', query: { challenge: this.$route.query.challenge  } } );
      }, 
      search_byName(){

      },
       
          search_byId(id){
            this.err=''
            let api_server = window.localStorage.getItem('$host_api');
            
            let myPin = this.$route.query.pin
            this.myArray1=[]
            

            if(  id == '')return;
            
            

            let end_point=api_server+"/person/search/pin/"+myPin+"/1/10/id/"+id
            
            this.$store.dispatch('isLoading', true )
            
            axios.get( end_point )
            .then(response => {
                this.$store.dispatch('isLoading', false )
                this.myArray1=[]

                if( response.data=='PIN ERR' ){
                  this.bank_myArray1()
                  this.err=response.data
                  this.$store.dispatch('isLoading', false )
                  return;
                }

                for(let i=0;i<response.data.length;i++){
                    
                     
                    let obj = {
                            '_id':response.data[i]._id,
                             
                            'name':response.data[i].name,                            
                            'position':response.data[i].position,
                             
                            'picture':response.data[i].picture,
                             
                    }    

                    console.log( obj )
                    
                    this.myArray1.push( obj ) 
                    
                }

                if( response.data.length == 0 ){
                    this.bank_myArray1() 
                }

                
                
              })
              .catch(err => {
                this.bank_myArray1()
                this.err=err
                this.$store.dispatch('isLoading', false )
              })
        },
        bank_myArray1(){
            
            this.myArray1=[
                        {
                            'Vol':'-', 
                            'Rank':'-', 
                            'full_name':'-',
                            'register_mobile':'-',
                            'OfficerID':'-',
                            'division':'-',
                            'register':'-',
                            'register_date':'-',
                            'image':'-',
                            'registration_mobile':'-',
                            'morning_registration':'-',
                            'morning_registration_date':'-',
                            'evening_registration':'-',
                            'evening_registration_date' :'-',
                            'ClubMember':0,
                        }
            ]

        },
        set_api_host(ip){
            window.localStorage.setItem('$host_api',ip)
        },
        open_modal01 (data) {

            
          store.dispatch('pass_modal01_data', JSON.parse(JSON.stringify( data ) ) );
          setTimeout(() => {
            
            this.$router.push( { path: '/take_picture', query: { id: data._id } } );
          },200)

        },  
        async fn_() {

            let response = await this.fn_get_my_puppet () 

            // console.log( response )
            this.myArray1 = []
           
            if( response.result == 'Process-Complete' ){ 
               
              for(let i=0;i<response.data.length;i++){

                  if( response.data[i].status == 'lost'){

                      let obj = {
                              '_id':response.data[i]._id,
                                
                              'name':response.data[i].name,                            
                              'position':response.data[i].position,
                                
                              'picture':response.data[i].picture,
                              'status' : response.data[i].status
                                
                      }    

                      obj.createdTH = new Date( response.data[i].created  ).toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric', })
                      obj.createdTime = new Date( response.data[i].created  ).toLocaleTimeString();

                      obj.foundTH = new Date( response.data[i].found  ).toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric', })
                      obj.foundTime = new Date( response.data[i].found  ).toLocaleTimeString();
                      
                      
                      this.myArray1.push( obj ) 

                  }
                  
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
        
        async _search_string () {
            
            this.myArray1 = []

            let response = await this.fn_search_string ( this.search_string )
             
           
            
           
            if( response.result == 'Process-Complete' ){ 
               
              for(let i=0;i<response.data.length;i++){

                  if( response.data[i].status == 'lost'){

                      let obj = {
                              '_id':response.data[i]._id,
                                
                              'name':response.data[i].name,                            
                              'position':response.data[i].position,
                                
                              'picture':response.data[i].picture,
                              'status' : response.data[i].status
                                
                      }    

                      obj.createdTH = new Date( response.data[i].created  ).toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric', })
                      obj.createdTime = new Date( response.data[i].created  ).toLocaleTimeString();

                      obj.foundTH = new Date( response.data[i].found  ).toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric', })
                      obj.foundTime = new Date( response.data[i].found  ).toLocaleTimeString();
                      
                      
                      this.myArray1.push( obj ) 

                  }
                  
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
  computed: {
    
    
  },
  watch: {
        

  },
  mounted(){
      
      
      this.$store.dispatch('isLoading', false )
      this.fn_()

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

<style>
   @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0");
</style>
