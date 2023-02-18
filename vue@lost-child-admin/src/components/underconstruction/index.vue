<template>

    <div style="height:100vh;border:0px solid red;margin-top:0em;margin-left:0em;margin-right:0em;" >
        
        <b-row class="w-100 text-center">
            <b-col sm=12>

                <img :src="require('@/assets/underconstruction-removebg-preview.png')" style="height:100vh;zoom:0.8;margin-left:20em;float:left;"/>

            </b-col>
        </b-row>

         

    </div>

</template>

<script>
/* eslint-disable */  
  

export default {
  name: 'index',
  components: {
	 
       
  },
  data() {
            return {     
                 
                socket : [], 

            }
              
    },
        
    
    methods: {
         
        
           
    
    },
    mounted() {

         

    },
    created () {

         this.$store.commit('set_isMain', false); 

         let path = [ { text : 'AT' } ,{ text : 'PageNotFound' } ] 
         this.$store.commit('set_working_path', JSON.parse(JSON.stringify( path )));
       
    },
    beforeDestroy() {
        
         

    },
    watch: {

         

        

    },
    computed: {

        
            

    },
    
    
}

</script>

<style>
    @import "../../assets/dist/css/app.css";
     
</style>
