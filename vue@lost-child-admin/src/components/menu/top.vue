<template>

   <div>  

        <v-breadcrumbs :items="working_path" style="margin-left:1em;">
            <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
        <hr style="border-top:0px solid red !important;border-bottom:2px solid #000 !important;"/>


        <div style="float:right;top:-3.8em;right:1em;position:relative;z-index:999;" v-if="isMain==false"> 

          <div class="my-2" @click="go_home()">
            <v-btn
               
              fab
              x-small
              dark
            >
              <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
          </div>

        </div>

        <div style="float:right;top:-3.8em;right:10%;position:relative;z-index:999;" v-if="isMain==false"> 

           <b-input class="form-control font-weight-bold border-2 rounded-0 ml-2 mt-1" style="width:350px;cursor:pointer;background-color: #ffffff;color:blue;" type="text" id="Name" placeholder="ค้นหา..."  autocomplete="new-password"  v-model="user_name" :state="user_name.length>0" @keyup.enter="search()"/>

        </div>

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
 

export default {
  name: 'index',
  components: {
		 
       
	},
  data() {
            return {    
                
                items: [],
                user_name : ''
               
            }
              
    },
        
    
    methods: {
         
        go_home () {

          this.$router.push('/')

        },
        search () {
          
          this.$store.commit('set__search_string', JSON.parse(JSON.stringify(this.user_name)));

        }
           
    
    },
    mounted() {

         

    },
    created () {

         
       
    },
    beforeDestroy() {
        
       

    },
    watch: { 

        

    },
    computed: {

      isMain () {
 
        return JSON.parse(JSON.stringify( this.$store.state.isMain )) 
      },  

      working_path () {
        
        try{
          return JSON.parse(JSON.stringify( this.$store.state.working_path )) 
        }catch(e){
          return []
        }
         
      },
            

    },
    
    
}

</script>

<style>
    
</style>
