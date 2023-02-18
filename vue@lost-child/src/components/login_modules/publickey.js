/* eslint-disable */
 
const axios = require('axios')
const server_config = require('./config')


// ------------------------------------------------------------------------------------

const fn_create_connection_key = async function( server_domain ) {


                    return new Promise((resolve, reject) => { 

                        let end_point = server_domain+"/v5/pki/connection/key"

                        axios.get( end_point )
                        .then(response => {
                            
                             
                            resolve( response.data.data )

                        }).catch( (e) => {
                                
                            reject(e)    
                        })


                    })
                            
                           

}

const fn_server_connection_key = async function( server_domain ) {


    return new Promise((resolve, reject) => { 

        let end_point = server_domain+"/v5/pki/connection/server/key"

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

    fn_create_connection_key,
    fn_server_connection_key

};

  