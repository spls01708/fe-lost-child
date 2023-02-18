/* eslint-disable */
const { io } = require("socket.io-client");

const fn_login = require('./login')
const fn_qr = require('./qr')
const fn_verify = require('./verify')
const fn_publickey = require('./publickey')
const fn_socket_io = require('./socket_io')
// ------------------------------------------------------------------------------------
  
class server {

    constructor( _server_mfa_domain_api , _server_socket_io_domain='', _server_socket_io_api='', callback_start, callback_succeed, callback_disconnect ) {
        
        this._server_mfa_domain_api = _server_mfa_domain_api;
        this._server_socket_io_api = _server_socket_io_api

        if( _server_socket_io_domain == '' ){

            this._server_socket = null
            this._client_socket_id = null

        }else{

                this._server_socket = io.connect( _server_socket_io_domain, { 
                    
                    reconnection: true,
                    query: {
                        client_name: 'mfa-login'
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
        
                this._server_socket.on('disconnect', function (reason) {
                    
                    callback_disconnect( reason )
        
                });
        
                this._server_socket.on('id', (data) => {
                    
                    this._client_socket_id = data
                    callback_start( data ) 
        
                });
        
                this._server_socket.on('login-succeed', (data) => {
                    
                    callback_succeed( data ) 
        
                });

                

                

        }

        
         
    }

    
    server_domain() {
        return this._server_mfa_domain_api;
    } 

    async admin_login ( user, pass, request ) {

 
        return fn_login.fn_admin_login( this._server_mfa_domain_api, user, pass, request )
    }
    
    async login  ( user, pass, request ) {
    
     
        return fn_login.fn_login( this._server_mfa_domain_api, user, pass, request )
    }
    
    async encrypt_login  ( encryption_data, sender_publicKey ) {
    
     
        return fn_login.fn_encrypt_login( this._server_mfa_domain_api, encryption_data, sender_publicKey )
    }

    async admin_encrypt_login  ( encryption_data, sender_publicKey ) {
    
     
        return fn_login.fn_admin_encrypt_login( this._server_mfa_domain_api, encryption_data, sender_publicKey )
    }
    
    async get_qr  ( request, socket_id ) {
    
     
        return fn_qr.fn_get_qr( this._server_mfa_domain_api, request, socket_id )
    }
    
    async admin_verify  ( token, socket_io_option={} ) {
    
     
        return fn_verify.fn_admin_verify( this._server_mfa_domain_api, token, socket_io_option )
    }
    
    async verify  ( token ) {
    
     
        return fn_verify.fn_verify( this._server_mfa_domain_api, token )
    }
    
    async create_connection_key  ( ) {
    
     
        return fn_publickey.fn_create_connection_key( this._server_mfa_domain_api )
    }

    async connection_server_key  ( ) {
    
     
        return fn_publickey.fn_server_connection_key( this._server_mfa_domain_api )
    }

    async client_disconnect ( ) { 
        
        if( this._server_socket == null ){
            
            return false

        }else{

            return fn_socket_io.fn_client_disconnect( this._server_socket )
            
        }
        
    } 
    
}



// ------------------------------------------------------------------------------------

module.exports.server = server;
  