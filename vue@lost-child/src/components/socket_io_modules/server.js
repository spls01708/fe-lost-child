/* eslint-disable */
 
const axios = require('axios')
const server_config = require('./config')


// ------------------------------------------------------------------------------------

const fn_send_process_to_user_by_socket_id = async function( server_socket_io_api, socket_io_option, process_data ) {


    return new Promise((resolve, reject) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        let requestBody = {                                
            
            "client_socket_id" : socket_io_option.client_socket_id == undefined ? '' : socket_io_option.client_socket_id,
            "process_ref" : socket_io_option.process_ref == undefined ? '0' : socket_io_option.process_ref,
            "process_name" : socket_io_option.process_name == undefined ? '' : socket_io_option.process_name,
            "process_data" : process_data

        }
  
        const json = JSON.stringify(requestBody) 
   
        let end_point = server_socket_io_api+"/v1/socket/emit/process"
  
        axios.post( end_point, json, config )
        .then(response => {
    
                resolve()
  
        }).catch((err) => { 
  
                reject(err)
  
        })
  
    })
                            
                           

}
 
const fn_get_process_data_by_ref = async function( server_socket_io_api, client_socket_id, process_ref ) {


    return new Promise((resolve, reject) => { 

        let end_point = server_socket_io_api+"/v1/socket/get/process/"+client_socket_id+"/"+process_ref

        axios.get( end_point )
        .then(response => {
        
            resolve( response.data.data )

        }).catch( (e) => {
                                
            reject(e)    
        
        })
  
    })
                            
                           

}
// ------------------------------------------------------------------------------------

module.exports = { 

    fn_send_process_to_user_by_socket_id,
    fn_get_process_data_by_ref
     
};

  