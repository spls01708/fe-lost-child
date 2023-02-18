/* eslint-disable */
const { io } = require("socket.io-client");

const fn_socket_io = require('./socket_io')
const fn_publickey = require('./publickey')
const fn_server = require('./server')

// ------------------------------------------------------------------------------------
  
class server {

    constructor( 
                _server_domain , 
                _server_socket_io_domain, 
                _server_socket_io_api, 
                client_name, 
                process_name, 
                hook_server_process_name, 

                callback_start, 
                callback_succeed, 
                callback_disconnect,
                callback_ping,
                callback_authenticated,
                callback_channel,
                callback_room,
            ) {
        
        this._server_domain = _server_domain;
        this._server_socket_io_domain = _server_socket_io_domain
        this._server_socket_io_api = _server_socket_io_api

        this._server_socket = io.connect( _server_socket_io_domain, { 
            
            reconnection: true,
            query: {
                client_name: client_name,
                channel_name: hook_server_process_name
            },
            //-----------------------------------------------------------------------------------------------------
            // Fix --  xhr poll error on Nodejs server is Client
            // https://stackoverflow.com/questions/47696304/node-js-app-fails-to-connect-using-socket-io-client
            // secure: true, 
            // rejectUnauthorized: false
            //-----------------------------------------------------------------------------------------------------
             
        });

        this._server_socket.on('connect', function (data) {
             
        });

        this._server_socket.on('reconnect', function () {
            console.log('you have been reconnected'); 
            this._server_socket.emit('client-reconnected', this._client_socket_id);
        });

        this._server_socket.on('connect_error', (err) => {
            
            // console.log(err instanceof Error); // true
            // console.log(err.message); // not authorized
            console.log( err ); // { content: "Please retry later" }

          });

        this._server_socket.on('disconnect', function (reason) {
             
            callback_disconnect( reason )

        });

        this._server_socket.on('id', (data, ack) => {
               
            this._client_socket_id = data
            callback_start( data ) 

            if(ack){
                let _ack_obj = {
                    client_socket_id : data,
                    data : "<client id> acknowledge from client",
                    hash : '0'
                }
                ack( _ack_obj );
            }
 
        });  

        
        if( process_name.length > 0  ){

            this._server_socket.on(process_name, (data) => {
             
                callback_succeed( data ) 
     
            });

        }

        if( hook_server_process_name.length > 0  ){
 
            this._server_socket.on(hook_server_process_name, (data, ack) => {
                 
                callback_succeed( data ) 
    
                    if(ack){
                        let _ack_obj = {
                            
                            data : "<channel> acknowledge from client",
                            time : new Date(), 
                            hash : '0'
                        }
                        ack( _ack_obj );

                    }
            
            })

        }

        this._server_socket.on('ping', (data, ack) => {
            
            callback_ping( data ) 
                
                if(ack){
                    let _ack_obj = {

                        data : "<ping> acknowledge from client",
                        time : new Date(), 
                        hash : '0'
                    }
                    ack( _ack_obj );

                }
        
        }) 

        this._server_socket.on('authenticated', function (authenticated) {
             
            callback_authenticated( authenticated )

        });

        this._server_socket.on('client-channel', function (__channel_) {
             
            callback_channel( __channel_ )

        });

        this._server_socket.on('receive-room-message', function (__room_data_) {
             
            callback_room( __room_data_ )

        });
         
    }

    
    server_domain() {
        return this._server_domain;
    } 

     
    async client_identify  ( signature, error_cb, succeed_cb  ) { 
     
        return fn_socket_io.fn_client_identify( this._server_socket, signature, error_cb, succeed_cb )
    }

    async emit_message  ( channel, message, to, error_cb, succeed_cb  ) { 
     
        return fn_socket_io.fn_emit_message( this._server_socket, channel, message, to, error_cb, succeed_cb )
    }

    async emit_room_message  ( room_option, error_cb, succeed_cb  ) { 
     
        return fn_socket_io.fn_emit_room_message( this._server_socket, room_option, error_cb, succeed_cb )
    }

    async join_room ( room_name, error_cb, succeed_cb  ) { 
     
        return fn_socket_io.fn_join_room( this._server_socket, room_name, error_cb, succeed_cb )
    }

    async client_disconnect ( ) { 
     
        return fn_socket_io.fn_client_disconnect( this._server_socket )
    } 

    async send_process_to_user_by_socket_id  ( socket_io_option, process_data ) { 
     
        return fn_server.fn_send_process_to_user_by_socket_id( this._server_socket_io_api, socket_io_option, process_data )
    }

    async get_process_data_by_ref  ( client_socket_id, process_ref ) { 
     
        return fn_server.fn_get_process_data_by_ref( this._server_socket_io_api, client_socket_id, process_ref )
    }
    
    // ---------------------------------------------------------------------------------------------
    async create_connection_key  ( ) { 
     
        return fn_publickey.fn_create_connection_key( this._server_domain )
    }

    async connection_server_key  ( ) { 
     
        return fn_publickey.fn_server_connection_key( this._server_domain )
    }

    
    
}



// ------------------------------------------------------------------------------------

module.exports.socket_io = server;
  