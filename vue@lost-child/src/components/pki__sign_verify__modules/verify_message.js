/* eslint-disable */
const crypto = require('crypto')
const axios = require('axios')
const server_config = require('./config')
 
const fn_pki = require('./pki')
 

// ------------------------------------------------------------------------------------
const buffet_to_base64 = async ( buffer ) => { 
 
  return Buffer.from( buffer ).toString('base64')

} 

const fn_buffer_pki_verify_data = async function( buffer_publicKey, buffer_signature, buffer_data ) {

    return new Promise((resolve, reject) => { 

      window.crypto.subtle.verify(
          {
              name: "ECDSA",
              hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
          },
          buffer_publicKey, //from generateKey or importKey above
          buffer_signature, //ArrayBuffer of the signature
          buffer_data //ArrayBuffer of the data
      )
      .then(function(isvalid){
          //returns a boolean on whether the signature is true or not
          resolve(isvalid);
      })
      .catch(function(err){
          
          reject(err);

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

  const fn_verify_message = async ( base64_publicKey, base64_signature, data ) => { 
    
    try{

        let buffer_publicKey = await fn_buffer_key_from_base64( base64_publicKey, ["verify"] )
        let buffer_signature = Buffer.from( base64_signature , 'base64')
        let buffer_data = Buffer.from( data )
 
        
        let d = await fn_buffer_pki_verify_data( buffer_publicKey, buffer_signature, buffer_data )
 
        return {
            
          verify : d 

        }

         

    }catch(e){

      throw e

    }

}

// ------------------------------------------------------------------------------------

module.exports = { 
    
     
    fn_buffer_pki_verify_data,
    fn_verify_message

};

  