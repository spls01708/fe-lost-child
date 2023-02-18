/* eslint-disable */
const crypto = require('crypto') 
const axios = require('axios')
const server_config = require('./config')
 

const fn_pki = require('./pki')
 
// ------------------------------------------------------------------------------------
const buffer_to_base64 = async ( buffer ) => { 
 
  return Buffer.from( buffer ).toString('base64')

} 

const fn_buffer_pki_sign_data = async function( buffer_privateKey, buffer_data ) {

    return new Promise((resolve, reject) => { 

        window.crypto.subtle.sign(
            {
                name: "ECDSA",
                hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
            },
            buffer_privateKey, //from generateKey or importKey above
            buffer_data //ArrayBuffer of data you want to sign
        )
        .then(function(signature){
            //returns an ArrayBuffer containing the signature
            resolve(new Uint8Array(signature));
             
        })
        .catch(function(err){
            
            reject( err );

        });

  
    })
    
  }
 

  const fn_buffer_key_from_base64 = async function( key_base64 , flag = ["verify"]  ) {

    return new Promise((resolve, reject) => { 

        let jwk = JSON.parse( ( Buffer.from( key_base64 , 'base64') ).toString() )
 
        window.crypto.subtle.importKey(
            "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
            jwk,
            {   //these are the algorithm options
                name: "ECDSA",
                namedCurve: "P-521", //can be "P-256", "P-384", or "P-521"
            },
            false, //whether the key is extractable (i.e. can be used in exportKey)
            flag //"verify" for public key import, "sign" for private key imports
        )
        .then(function(buffer_key){
            //returns a publicKey (or privateKey if you are importing a private key)
            resolve( buffer_key );
        })
        .catch(function(err){
             
            reject( err );

        });      

    })
    
  }

  const fn_sign_message = async ( base64_privateKey, data ) => { 
    
    try{
        
        let buffer_privateKey = await fn_buffer_key_from_base64( base64_privateKey, ["sign"] )
        let buffer_data = Buffer.from( data ) 
 
        let d = await fn_buffer_pki_sign_data( buffer_privateKey, buffer_data )
        const hash = crypto.createHash('md5').update( Buffer.from( data ) ).digest('hex');

        return {
            
            base64_signature : await buffer_to_base64( d ),
            message_hash : hash,

        }
             

    }catch(e){
        console.log( e )
        throw e

    }

}

// ------------------------------------------------------------------------------------

module.exports = { 
     
    fn_buffer_pki_sign_data,
    fn_sign_message

};

  