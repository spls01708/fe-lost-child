/* eslint-disable */

const server_config = require('./config')
const fn_send = require('./fn_send') 
const fn_listener_socket = require('./fn_listener') 

// ------------------------------------------------------------------------------------
class server {

    constructor(  
                _server_socket_io_domain, 
                _server_socket_io_api
            ) {
        
         
        this.server_socket_io_domain = _server_socket_io_domain
        this.server_socket_io_api = _server_socket_io_api 

    }  

    async send_once_to_socket ( __client_name, __channel_name, __monitor_socket_id, __data, callback_error, callback_succeed ) { 
 
        return fn_send.fn_send_to_socket ( this.server_socket_io_domain, this.server_socket_io_api, __client_name, __channel_name, __monitor_socket_id, __data, callback_error, callback_succeed )
    }
    
    async custom_fn__send_to_socket ( __client_name, __channel_name, __monitor_socket_id, callback_custom_fn ) { 
     
        return fn_send.fn_custom_send_to_socket ( this.server_socket_io_domain, this.server_socket_io_api, __client_name, __channel_name, __monitor_socket_id, callback_custom_fn )
    } 

    async listener__socket ( __client_name, __channel_name, callback_connected, callback_succeed, callback_disconnect, callback_authenticated ) { 
     
        return fn_listener_socket.fn_custom_listener_socket( this.server_socket_io_domain, this.server_socket_io_api,
            __client_name, 
            __channel_name,
    
            callback_connected,
            callback_succeed,  
            callback_disconnect,
            callback_authenticated,
        )
    } 
    
}

// ------------------------------------------------------------------------------------ 
module.exports.custome_socket_io = server;  