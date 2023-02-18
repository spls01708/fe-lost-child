<template>
  <div id="app" style="height:100vh;overflow:hidden;background-color: #fff;"> 
      
    <vue-topprogress ref="topProgress" color="#FF0000"></vue-topprogress> 
    <div> 
       
       <router-view/>

    </div>

    <div class="footer" style="z-index:9999;border:0px solid red;"> 

      <div>
          <p style="font-size:14px;font-weight:bold;float:left;margin-left:10px;margin-top:0.8em;color:#0F3D3E;">{{version_string}}</p>
          <p style="font-size:14px;font-weight:bold;float:right;margin-right:10px;margin-top:0.8em;color:#0F3D3E;">{{copyright_string}}</p>      
      </div> 

    </div>

  </div>
  
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex"

import { vueTopprogress } from 'vue-top-progress' 

export default {
name: 'App',
components: {
     
     vueTopprogress
     
},
computed: {
   
},
data() {
      return { 

            version_string : 'Version 0.0.1',
            copyright_string : '©ศูนย์ซอฟต์แวร์กองทัพอากาศ 2565',
            socket : [],  
          
      }
},
methods: {
  
    
},
mounted(){

    window.document.title="ลงทะเบียน เด็กหลง-กองทัพอากาศ"
    
    
},
watch: {
                 

          },
}
</script>

<style>

#app{
  margin:0;
  color:#6a6f8c;
  background:#c8c8c8;
  font-family: 'Athiti', sans-serif;    
}

.ttContent   {
    -webkit-border-radius: 0px !important;
    -moz-border-radius: 0px !important;
    border-radius: 0px !important; 
    border:0px solid red !important; 
    background: transparent !important;
    background: transparent !important;
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    box-shadow: none !important;
}

.ttDialog{
      box-shadow: none !important;
      -webkit-box-shadow: none !important;
      -moz-box-shadow: none !important;
      -moz-transition: none !important;
      -webkit-transition: none !important;
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    /* background-color: #fff;
    color: #0F3D3E !important; */
    text-align: right;
  }

</style>


