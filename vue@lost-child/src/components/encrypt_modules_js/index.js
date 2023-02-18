/* eslint-disable */

const server_config = require('./config')
const fn_pki = require('./pki')
const fn_aes = require('./aes')
const fn_message = require('./encrypt_message')
const fn_decrypt_message = require('./decrypt_message')
const fn_publickey = require('./publickey')

// ------------------------------------------------------------------------------------
 

class encrypt_js {

    constructor( _server_domain , _server_publicKey ) {
        
        this._server_domain = _server_domain;
        this._server_publicKey = _server_publicKey;
         
    }

    server_domain() {
        return this._server_domain;
    }

    server_publicKey() {
        return this._server_publicKey;
    }

    // ------------------------------------------------------------------------------------
    
    async create_publicKey ( )  { 
 
        return fn_pki.fn_create_RSA_key( )
    
    }
    
    async buffer_key_from_base64 ( key_base64 , flag  )  { 
     
        return fn_pki.fn_buffer_key_from_base64( key_base64 , flag )
    }
    
    
    
    async buffet_RSA_OAEP_encrypt_data ( buffer_publicKey, buffer_message )  { 
     
        return fn_pki.fn_RSA_OAEP_encrypt_message( buffer_publicKey, buffer_message )
    }
    
    async buffet_to_base64 ( buffer )  { 
     
        return Buffer.from( buffer ).toString('base64')
    } 
    
    async generateRandomKey ()  { 
     
        return fn_aes._generateRandomKey()
    } 
    
    async base64_AES_CBC_encrypt_data ( buffer_key, buffer_message )  { 
        
        return fn_aes.fn_base64_AES_CBC_encrypt( buffer_key, buffer_message )
        
    
    }
    
    async buffer_AES_CBC_from_base64 ( key_base64 )  { 
     
        return fn_aes.fn_buffer_AES_CBC_from_base64( key_base64 )
    }
    
    async message_encrypted ( buffer_publicKey, buffer_message )  { 
     
        return fn_message.fn_obj_message_encrypted( buffer_publicKey, buffer_message )
    }
    
    
    async message_decrypted ( buffer_privateKey, buffer_encryption_key, buffer_message_encrypted )  { 
     
        return fn_decrypt_message.fn_obj_message_decrypted( buffer_privateKey, buffer_encryption_key, buffer_message_encrypted )
    } 

    async create_connection_key  ( ) {
    
     
        return fn_publickey.fn_create_connection_key()
    }

}



// ------------------------------------------------------------------------------------

module.exports.encrypt_js = encrypt_js;
  

  