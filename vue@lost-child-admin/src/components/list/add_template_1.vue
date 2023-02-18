<template>
    
    <div style="zoom:0.9">
     
    <!-- ------------------------------------------------------------------------ -->
    <main class="site-wrapper"  >
 
        <div class="col-xl-12 col-sm-12w col-12" >
          
            <div  class="card border-info text-center border-0 rounded-0 mt-1 text-primary" style="margin-bottom:0.5em;height:5vh;justify-content: center;" >
               <span class="text-info font-weight-bold"><span style="font-size:18px;color:#17a2b8;">  Puppet User  </span>
               <b-badge style="float:right;background-color:#17a2b8;" pill > 1 / 1</b-badge>
               </span> 
            </div>

            <hr style="border-top: 0px dashed #277BC0;border-bottom: 2px dashed #0078AA;"/>

            <div class="card border-primary border-0 rounded-0 mt-1 text-success" style="margin-bottom:0.5em;height:66vh;" >
                <div class="card-content">
                   <div class="card-body">
                    <!-- ----------------------------------------------------------------- -->

                    <div class="card border-2 border-0 rounded-0 shadow-sm mt-2" style="padding:20px">
                      <div class="row">
                          
                          <p class="fake-legend text-success" style="margin-top:-1em;"><span style="font-size:1em;">1. เลือก Prefix และกำหนด Puppet Name</span></p> 
                      </div>
                      
                      <br>
                      <div class="row">
                         
                        <div class="col-md-2">
                            <label for="Rank" class="leftLabel">UID</label> <br/> 
                            <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="Clone From"  autocomplete="new-password" v-model="uid" :state="uid.length>0" readonly/>   
                               

                        </div> 

                        <div class="col-md-2 text-right">
                            <label for="Rank" class="leftLabel">Prefix</label> <br/>
                             
                              <div v-if="lock_select_name==false">
                                <b-form-select id="Rank" v-model="puppet_prefix"  :options="prefix"  class="font-weight-bold border-2 rounded-0 ml-2 mt-1" :style="puppet_prefix.length>0 ? 'background-color: #ffffff;color:blue;border:2px solid green;' : 'background-color: #ffffff;color:blue;border:2px solid red;'" ></b-form-select> 
                              </div>
                              <div v-else style="margin-top:0.5em;"> 
                                <span style="font-weight:bold;text-decoration: underline;text-decoration-style: solid;font-size:1.5em;" class="ml-3">{{user.puppet_prefix}}</span> 
                                <v-icon class="ml-2 text-danger" style="cursor:pointer;margin-top:-0.2em;" @click="fn_remove_lock_username()">mdi-close-box-outline</v-icon> 
                              </div>

                        </div> 

                        <div class="col-md-2">
                          <label for="Name" class="leftLabel">Puppet Name</label>
                            <!--   -->
                              <div v-if="lock_select_name==false">
                                <b-input class="form-control font-weight-bold border-2 rounded-0 ml-0 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="Puppet Name"  autocomplete="new-password" v-model="puppet_name" :state="user.puppet_name.length>0" @keyup.enter="fn_check_username()" />
                              </div>
                              <div v-else style="margin-top:0.5em;"> 
                                <span style="font-weight:bold;text-decoration: underline;text-decoration-style: solid;font-size:1.5em;" class="ml-3">{{user.puppet_name}}</span> 
                                <v-icon class="ml-2 text-danger" style="cursor:pointer;margin-top:-0.2em;" @click="fn_remove_lock_username()">mdi-close-box-outline</v-icon> 
                              </div>

                        </div> 

                        <div class="col-md-3">
                          <label for="Name" class="leftLabel">Clone From</label>
                            <div v-if="mode_clone_from==false">
                              <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="Clone From"  autocomplete="new-password" v-model="user.clone_from_username" :state="user.clone_from_username.length>0" @keyup.enter="fn_clone_from(user.clone_from_username)"/> 
                            </div>
                            <div v-else style="margin-top:0.5em;">
                               
                              <span style="font-weight:bold;text-decoration: underline;text-decoration-style: solid;font-size:1.5em;" class="ml-3">{{user.clone_from_username}}</span> 
                              <v-icon class="ml-2 text-danger" style="cursor:pointer;margin-top:-0.2em;" @click="fn_remove_clone_from_data()">mdi-close-box-outline</v-icon> 
                            </div>

                        </div>

                        <div class="col-md-3">
                          <label for="Name" class="leftLabel">Puppeteer</label>
                            <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="ผู้ชักใย"  autocomplete="new-password" v-model="user.puppeteer" :state="user.puppeteer.length>0" readonly/>
                        </div>

                      </div>
                      
                      <br/> 

                      <div class="row"> 
                          <p class="fake-legend text-success"  ><span style="font-size:1em;">2. กำหนดข้อมูล User / Clone From</span></p> 
                      </div>
                      
                      <br>
                      <div class="row">
                         
                        <div class="col-md-3">
                          <label for="Name" class="leftLabel">ID</label>
                            <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="เลขข้าราชการ"  autocomplete="new-password" v-model="user.ID" :state="user.ID.length>0" :readonly="mode_clone_from==true"/>
                        </div>

                        <div class="col-md-3">
                          <label for="Name" class="leftLabel">PEOPLEID</label>
                            <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="เลขประชาชน"  autocomplete="new-password" v-model="user.PEOPLEID" :state="user.PEOPLEID.length>0" :readonly="mode_clone_from==true"/>
                        </div>

                        <div class="col-md-3">
                        </div>

                        <div class="col-md-2 text-right">
                              <label for="Name" class="leftLabel text-danger">Expire In ( วัน )</label>
                              <div>
                                <b-form-select  v-model="user.expire_in"  :options="expire_option"  class="font-weight-bold border-2 rounded-0 ml-2 mt-1" :style="user.expire_in.length>0 ? 'background-color: #ffffff;color:blue;border:2px solid green;' : 'background-color: #ffffff;color:blue;border:2px solid red;'" ></b-form-select> 
                              </div>
                        </div>
                        <div class="col-md-1">
                              <label for="Name" class="leftLabel text-danger">Limit</label>
                              <b-input  class="form-control font-weight-bold border-2 rounded-0 ml-0 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;border:2px solid red;" type="number" id="Name" placeholder="Limit"  autocomplete="new-password" v-model="user.limit"  readonly/> 
                        </div>

                      </div>

                      <br>

                      <div class="row">
                         
                        <div class="col-md-3">
                          <label for="Name" class="leftLabel">RankID</label>
                            <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="รหัส ยศ"  autocomplete="new-password" v-model="user.RankID" :state="user.RankID.length>0"/>
                        </div>

                        <div class="col-md-3">
                          <label for="Name" class="leftLabel">RANK</label>
                            <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="ยศ"  autocomplete="new-password" v-model="user.RANK" :state="user.RANK.length>0"/>
                        </div>

                        <div class="col-md-3">
                          <label for="Name" class="leftLabel">FIRSTNAME</label>
                            <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="ชื่อ"  autocomplete="new-password" v-model="user.FIRSTNAME" :state="user.FIRSTNAME.length>0"/>
                        </div>

                        <div class="col-md-3">
                          <label for="Name" class="leftLabel">LASTNAME</label>
                            <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="นามสกุล"  autocomplete="new-password" v-model="user.LASTNAME" :state="user.LASTNAME.length>0"/>
                        </div> 
                      </div>

                      <br>

                      <div class="row">
                         
                        <div class="col-md-6">
                          <label for="Name" class="leftLabel">POSITION</label>
                            <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="ตำแหน่ง"  autocomplete="new-password" v-model="user.POSITION" :state="user.POSITION.length>0"/>
                        </div>

                        <div class="col-md-3">
                          <label for="Name" class="leftLabel">UNITCODE</label>
                            <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="รหัส หน่วย"  autocomplete="new-password" v-model="user.UNITCODE" :state="user.UNITCODE.length>0"/>
                        </div>

                        <div class="col-md-3">
                          <label for="Name" class="leftLabel">UNITNAME</label>
                            <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="ชื่อหน่วย"  autocomplete="new-password" v-model="user.UNITNAME" :state="user.UNITNAME.length>0"/>
                        </div>  

                      </div>
                      
                       
                    </div>
                    

                    <!-- ----------------------------------------------------------------- -->   
                   </div>
                </div>
            </div>

            <hr style="border-top: 0px dashed #277BC0;border-bottom: 2px dashed #0078AA;"/>

            <div class="card bbtn border-info border-0 text-success rounded-0" style="margin-bottom:0.5em;height:10vh;justify-content: center;" >
            
              <b-row class="mt-0">
                  <b-col sm=1></b-col>
                  <b-col align="right">
                       
                      <v-btn
                          class="mt-3 rounded-0 border-2 text-danger"
                          outlined   
                          large
                          block
                          @click="fn_process_close()" 
                      >
                      <v-icon>mdi-close-box-outline</v-icon><span class="font-weight-bold ml-2">Exit</span>
                      </v-btn>

                  </b-col>

                  <b-col align="right" sm=1></b-col>

                  <b-col align="left">    
                      
                      <v-btn
                          class="mt-3 rounded-0 border-2 text-primary ma-2"
                          outlined  
                          large
                          block
                          @click="fn_add_new_puppet_user()" 
                          :disabled="puppet_prefix.length == 0 || puppet_name.length == 0 || lock_select_name == false"
                      >
                      <v-icon>mdi-account-plus</v-icon><span class="font-weight-bold ml-2">Add New Puppet User</span>
                      </v-btn>

                  </b-col>
                  <b-col sm=1></b-col>
              </b-row>

            </div>

             
             

        </div>
 
    </main>

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

      <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------- -->

        <b-modal v-model="process_ok" size="sm"  centered no-close-on-backdrop hide-header hide-header-close  title="Login"  >
            <div class="row text-center text-success" style="margin-top:2em;"> 
              
                <span ><v-icon class="text-success" style=" font-size:4em;">mdi-checkbox-marked-circle-outline</v-icon></span>
                <span style=" font-size:1em;margin-top:0.5em;"> Process-Complete </span> 
              
            </div>

            <template v-slot:modal-footer="{ }"> 
               <v-btn
                    class="mt-3 rounded-0 border-2 text-success"
                    outlined  
                    @click="fn_process_ok()"
              >
              <v-icon>mdi-close-box-outline</v-icon><span class="font-weight-bold ml-2">Exit</span>
              </v-btn>
            </template>
        </b-modal>
        
        <!-- ------------------------------------------------------------------------------------------------------------------------------------------- -->
     
    </div> 
    <!-- ------------------------------------------------------------------------ -->

</template>



<script>

/* eslint-disable */


import moment from 'moment'
import Vue from 'vue'
  
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'  
import { VueEditor, Quill } from "vue2-editor";
  
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
import axios from 'axios'
import myConfig from '../config.js'
  
export default {
  name: 'template',
  components: {
		 
    
	},
  data() {
            return {  
                
              // prefix : [
              //     "swc",
              //     "swc-2",
              //     "swc-3",
              //     "admin",
              //     "admin-2",
              //     "admin-3",
              //     "test",
              //     "test-2",
              //     "test-3",
              //     "custom",
              //     "custom-2",
              //     "custom-3"
              // ],
              prefix: [ 
                {
                  label: 'Software',
                  options: [
                    "swc-1",
                    "swc-2",
                    "swc-3",
                  ]
                },
                {
                  label: 'Admin',
                  options: [
                    "admin-1",
                    "admin-2",
                    "admin-3",
                  ]
                },
                {
                  label: 'Test',
                  options: [
                    "test-1",
                    "test-2",
                    "test-3",
                  ]
                },
                {
                  label: 'Custom',
                  options: [
                    "custom-1",
                    "custom-2",
                    "custom-3",
                  ]
                },
                {
                  label: 'IOT',
                  options: [
                    "iot-1",
                    "iot-2",
                    "iot-3",
                  ]
                }
              ],
              expire_option : [
                  1,
                  3,
                  7 
              ],
              puppet_prefix : '',
              puppet_name : '',
              user : {
                      
                      uid : 0,
                      puppet_name : "",
                      puppet_prefix : "",

                      puppeteer : "",
                      clone_from_username : "", 

                      ID : "",
                      PEOPLEID : "",
                      RankID : "",
                      RANK : "",
                      FIRSTNAME : "",
                      LASTNAME : "",
                      POSITION : "",
                      UNITCODE : "",
                      UNITNAME : "",

                      expire_in : 1,
                      limit : 10
              },
              error_log : '',
              login_error : false,
              mode_clone_from : false,
              lock_select_name : false,
              process_ok:false,

              uid : "00 - 000 - 000"
               

            }
              
    },
        
    
    methods: {
         
         async fn_process_ok () {

           this.process_ok=false
           this.$store.commit('set_open_add_user_dialog', false); 

         },
         async fn_add_new_puppet_user ( ){
           
            
            
           let __data = await this.fn_add__puppet_user ()
           
          if( __data.result == 'Process-Complete' ){

            this.$store.commit('set__psss_user', JSON.parse(JSON.stringify(this.user)) ); 

            this.process_ok = true

          }else{

            this.error_log = __data.error
            this.login_error = true
            this.lock_select_name = false
            
          }


         },
         async fn_check_username ( ) {

           if( ( this.puppet_name.length > 0 ) && ( this.puppet_prefix.length > 0 ) ){

              let _check = await this.fn_check__by_username( this.puppet_prefix, this.puppet_name )
            
              if( _check.result == 'Process-Complete' ){

                this.user.puppet_prefix  =  this.puppet_prefix 
                this.user.puppet_name  =  this.puppet_name 
                this.lock_select_name = true
              
              }else{

                this.error_log = _check.error
                this.login_error = true
                this.lock_select_name = false

              }

           }else{

              this.error_log = ['Prefix-isNull', 'Username-isNull']
              this.login_error = true
              this.lock_select_name = false
           }


         },
         fn_remove_lock_username () {

              this.lock_select_name = false

         },
         async fn_remove_clone_from_data () {

            let _UID = await this.fn_get_UID()

            if( _UID.result == 'Process-Complete' ){

              this.user.uid = _UID.uid
              this.user.ID = ''
              this.user.PEOPLEID = ''
              this.user.RankID = ''
              this.user.RANK = ''
              this.user.FIRSTNAME = ''
              this.user.LASTNAME = ''
              this.user.POSITION = ''
              this.user.UNITCODE = ''
              this.user.UNITNAME = ''
              this.user.expire_in = 1
              this.user.limit = 10

              this.user.clone_from_username = ''
 
              this.mode_clone_from = false

            }

         },
         fn_process_close () {

           this.$store.commit('set_open_add_user_dialog', false); 

         },
         async fn_clone_from ( username ) {

            let _username = JSON.parse(JSON.stringify( username ));
            
            let _clone_data = await this.fn_clone_from_by_username( _username )
           
            if( _clone_data.result == 'Process-Complete' ){

              this.user.ID = _clone_data.data.ID
              this.user.PEOPLEID = _clone_data.data.PEOPLEID
              this.user.RankID = _clone_data.data.RankID
              this.user.RANK = _clone_data.data.RANK
              this.user.FIRSTNAME = _clone_data.data.FIRSTNAME
              this.user.LASTNAME = _clone_data.data.LASTNAME
              this.user.POSITION = _clone_data.data.POSITION
              this.user.UNITCODE = _clone_data.data.UNITCODE
              this.user.UNITNAME = _clone_data.data.UNITNAME

              this.user.expire_in = 1 
              this.user.limit = 10

              this.mode_clone_from = true

            }else{

              let _UID = await this.fn_get_UID()

              if( _UID.result == 'Process-Complete' ){

                this.user.uid = _UID.uid 
                this.user.ID = ''
                this.user.PEOPLEID = ''
                this.user.RankID = ''
                this.user.RANK = ''
                this.user.FIRSTNAME = ''
                this.user.LASTNAME = ''
                this.user.POSITION = ''
                this.user.UNITCODE = ''
                this.user.UNITNAME = ''
                this.user.clone_from_username = ''

                this.user.expire_in = 1
                this.user.limit = 10

              }

              this.error_log = _clone_data.error
              this.login_error = true
              this.mode_clone_from = false

            }
             
            

         },
         async get_UID () {

            let _UID = await this.fn_get_UID()

            if( _UID.result == 'Process-Complete' ){

              this.user = {
                        uid : _UID.uid,

                        puppet_name : "",
                        puppet_prefix : "",

                        puppeteer : window.localStorage.getItem('$login@user_name'),
                        clone_from_username : "", 

                        ID : "",
                        PEOPLEID : "",
                        RankID : "",
                        RANK : "",
                        FIRSTNAME : "",
                        LASTNAME : "",
                        POSITION : "",
                        UNITCODE : "",
                        UNITNAME : "",
                        
                        expire_in : 1,
                        limit : 10
                        
                }

              this.uid = this.user.uid[0]+this.user.uid[1]+' - '+this.user.uid[2]+this.user.uid[3]+this.user.uid[4]+' - '+this.user.uid[5]+this.user.uid[6]+this.user.uid[7]

            }

         },
         async fn_add__puppet_user () {

            return new Promise((resolve, reject) => { 

                this.$store.commit('set_isLoading', true); 

                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                let requestBody = {                                
                    
                    "puppet_data" : this.user, 
                    "token" : window.localStorage.getItem('$login@token')
                    
                }
 
                const json = JSON.stringify(requestBody) 
                
                let end_point = myConfig.server_domain+"/v1/puppet/user/I6WyJzaWduIl0sImV4dCI6dHJ1ZSwiZCI6IkFSZ2MtNVM/add/puppet"
                
                axios.post( end_point, json, config )
                .then(response => { 

                        this.$store.commit('set_isLoading', false); 
                        resolve( response.data )

                }).catch( (e) => {

                        this.$store.commit('set_isLoading', false); 
                        reject(e)    
                })

            })

         },
         async fn_clone_from_by_username ( _username ) {

            return new Promise((resolve, reject) => { 

                this.$store.commit('set_isLoading', true); 

                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                let requestBody = {                                
                    
                    "username" : _username, 
                    "token" : window.localStorage.getItem('$login@token')
                    
                }
 
                const json = JSON.stringify(requestBody) 
                
                let end_point = myConfig.server_domain+"/v1/puppet/user/I6WyJzaWduIl0sImV4dCI6dHJ1ZSwiZCI6IkFSZ2MtNVM/clone/from"
                
                axios.post( end_point, json, config )
                .then(response => { 

                        this.$store.commit('set_isLoading', false); 
                        resolve( response.data )

                }).catch( (e) => {

                        this.$store.commit('set_isLoading', false); 
                        reject(e)    
                })

            })

         },
         async fn_check__by_username ( puppet_prefix, puppet_name ) {

            return new Promise((resolve, reject) => { 

                this.$store.commit('set_isLoading', true); 

                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                let requestBody = {                                
                    
                    "puppet_prefix" : puppet_prefix, 
                    "puppet_name" : puppet_name,
                    "token" : window.localStorage.getItem('$login@token')
                    
                }
 
                const json = JSON.stringify(requestBody) 
                
                let end_point = myConfig.server_domain+"/v1/puppet/user/I6WyJzaWduIl0sImV4dCI6dHJ1ZSwiZCI6IkFSZ2MtNVM/check/username"
                
                axios.post( end_point, json, config )
                .then(response => { 

                        this.$store.commit('set_isLoading', false); 
                        resolve( response.data )

                }).catch( (e) => {

                        this.$store.commit('set_isLoading', false); 
                        reject(e)    
                })

            })

         },
         async fn_get_UID ( ) {

            return new Promise((resolve, reject) => { 

                this.$store.commit('set_isLoading', true); 

                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                let requestBody = {    
                     
                    "token" : window.localStorage.getItem('$login@token')
                    
                }
 
                const json = JSON.stringify(requestBody) 
                
                let end_point = myConfig.server_domain+"/v1/puppet/user/I6WyJzaWduIl0sImV4dCI6dHJ1ZSwiZCI6IkFSZ2MtNVM/get/uid"
                
                axios.post( end_point, json, config )
                .then(response => { 

                        this.$store.commit('set_isLoading', false); 
                        resolve( response.data )

                }).catch( (e) => {

                        this.$store.commit('set_isLoading', false); 
                        reject(e)    
                })

            })

         },
    
    },
    mounted() {

      this.mode_clone_from = false
      this.lock_select_name = false

      this.get_UID() 

         
    },
    watch: {

          
        
    },
    computed: {
          

    },
    created() {
      
    },
    beforeDestroy() {

         

    },
    
    
}
 
// ----------------------------------------------------------------
 
function generateUID(){
    let text = "";
    let possible = "0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
</script>
 
 

<style lang="scss" >
 
 // -------------------------------------------------------------
// Fiill the space between two text elements with dots
// https://stackoverflow.com/questions/39438026/fiill-the-space-between-two-text-elements-with-dots

section {
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
}
section > * {
  padding: 0;
  margin: 0;
}
span.aa {
  flex: 1;
  margin-left:1em;
  margin-right:1em;
  border-bottom: 1.5px dashed #17a2b8;
}

span.aa-none {
  flex: 1;
  margin-left:1em;
  margin-right:1em;
  border-bottom: 0.5px dashed #bbb;
}


canvas {
 position: absolute;
 top: 0px;
 left: 0px;
}
 
 </style>