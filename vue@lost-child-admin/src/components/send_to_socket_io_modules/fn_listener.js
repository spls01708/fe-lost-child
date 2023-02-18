/* eslint-disable */
const server_config = require('./config')
const { socket_io } = require('../socket_io_modules');
const ECDSA = require('../pki__sign_verify__modules')
// =======================================================================================

const fn_custom_listener_socket = async ( __server_socket_io_domain, __server_socket_io_api, __client_name, __channel, 
    
    callback_connected,
    callback_succeed,  
    callback_disconnect,
    callback_authenticated,

) => {
    
    let __client_pki = ECDSA.user_pki()
    let __socket_id = '0'
 
    let __socket = new socket_io( '', __server_socket_io_domain, __server_socket_io_api, __client_name, '', __channel,
              
        async ( socket_id ) => { 

            callback_connected( 
                JSON.parse(JSON.stringify(socket_id)), 
                __socket
            ) 

            __socket_id = socket_id

            let data_origin = JSON.stringify({
                
                ref : __client_pki.ref, 
                time : new Date(),
            
            })

            let data_sign =  await ECDSA.sign_message( __client_pki.privateKey, data_origin )

            let obj = {
                channel : 'client-identify',
                message : {
                    
                    pki_verify_ref :__client_pki.ref,
                    data_origin : data_origin,
                    base64_signature : data_sign.base64_signature,

                },
                protocal : 'identify'
            }

            __socket.emit_message( obj.channel, obj, 'none' , ( err ) => { }, ( succeed ) => { } );

        },
        async ( succeed ) => { 
            
            callback_succeed( 
                JSON.parse(JSON.stringify(succeed)), 
                __socket
            ) 

        },
        async ( reason ) => { callback_disconnect( reason ) },
        async ( ping ) => { 
            
            if( ping.data != undefined ){
            
                __socket.emit_message('ping', ping.data, 'all', ( err ) => {}, ( succeed ) => {}) 
            }

        },
        async ( authenticated ) => { 

            callback_authenticated( 
                JSON.parse(JSON.stringify(authenticated)), 
                __socket, 
                JSON.parse(JSON.stringify(__socket_id)), 
                JSON.parse(JSON.stringify(__client_name)), 
                JSON.parse(JSON.stringify(__channel))  
            )

        }, 
    )     

}  
// ------------------------------------------------------------------------------------

module.exports = { 
    
    fn_custom_listener_socket,

};

  