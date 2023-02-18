/* eslint-disable */

const server_config = require('./config')
const fn_pki = require('./pki')
const fn_sign_message = require('./sign_message')
const fn_verify_message = require('./verify_message')
const {

    _server_pki
  
} = require('./_server_pki_sign');
  
  const {
  
    _all_server_pki
  
} = require('./_all_server_pki_sign');

// ------------------------------------------------------------------------------------

const server_otp_publicKey = server_config.server_otp_publicKey

const user_pki = ( ) => { 
 
    return JSON.parse(JSON.stringify( _server_pki ));
}

const create_ECDSA_key = async ( ) => { 
    
    return fn_pki.fn_create_ECDSA_key( )

}

const generateChallenge = () => {

    let text = "";
    let possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";

    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
    
}

// -------------------------------------------------------------------------------------
 
const sign_message = async ( base64_privateKey, data ) => { 
 
    return fn_sign_message.fn_sign_message( base64_privateKey, data )
}

const verify_message = async ( base64_publicKey, base64_signature, data ) => { 
 
    return fn_verify_message.fn_verify_message( base64_publicKey, base64_signature, data )
}


// ------------------------------------------------------------------------------------

module.exports = { 

    create_ECDSA_key,
    sign_message,
    verify_message,
    user_pki,
    generateChallenge

};

  