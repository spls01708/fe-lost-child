/* eslint-disable */
const server_config = require('./config')
const { socket_io } = require('../socket_io_modules');

// =======================================================================================
const fn_send_to_socket = async ( __server_socket_io_domain, __server_socket_io_api, _client_name, _channel, monitor_socket_id, _data, callback_error, callback_succeed ) => {

    let server_socket_domain = __server_socket_io_domain
    let server_socket_api = __server_socket_io_api
     
    let socket = new socket_io( '', server_socket_domain, server_socket_api, _client_name, '', _channel,

            async ( socket_id ) => { 
                    
                    socket.emit_message( _channel, _data, monitor_socket_id , ( err ) => { socket.client_disconnect(); callback_error( err ) }, ( succeed ) => { socket.client_disconnect(); callback_succeed( succeed ) } );
            },
            async ( data ) => { },
            async ( reason ) => { },
            async ( ping ) => { 
                if( ping.data != undefined ){
                            
                    socket.emit_message('ping', ping.data, 'all', ( err ) => {}, ( succeed ) => {}) 
                }
            },
            async ( authenticated ) => { }  
    ) 

}

const fn_custom_send_to_socket = async ( __server_socket_io_domain, __server_socket_io_api, _client_name, _channel, monitor_socket_id, callback_custom_fn ) => {

    let server_socket_domain = __server_socket_io_domain
    let server_socket_api = __server_socket_io_api
    
    let socket = new socket_io( '', server_socket_domain, server_socket_api, _client_name, '', _channel,
  
            async ( socket_id ) => {  

                callback_custom_fn( socket, socket_id, monitor_socket_id, _channel ) 

            },
            async ( data ) => { },
            async ( reason ) => { },
            async ( ping ) => { 
                if( ping.data != undefined ){
                            
                    socket.emit_message('ping', ping.data, 'all', ( err ) => {}, ( succeed ) => {}) 
                }
            },
            async ( authenticated ) => { }  
    ) 

} 

// ------------------------------------------------------------------------------------

module.exports = { 
    
  fn_send_to_socket,
  fn_custom_send_to_socket

};

  