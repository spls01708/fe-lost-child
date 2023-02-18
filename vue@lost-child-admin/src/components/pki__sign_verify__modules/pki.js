/* eslint-disable */
 
const axios = require('axios')
const server_config = require('./config')

// ------------------------------------------------------------------------------------


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
 
 
// ----------------------------------------------------------------------------------------

function _generateRandomRef( perfix='' ){

    return new Promise((resolve, reject) => {
    
        let text = "";
        let possible = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";
  
        for (var i = 0; i < 31; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
  
        if( perfix.length> 0 ){
  
          resolve( perfix+'.'+text )
  
        }else{
  
            resolve( text );
  
        }
  
        
    
    })
}

const fn_ECDSA_generateKey = async ( length ) => {

    return new Promise((resolve, reject) => {

        window.crypto.subtle.generateKey(
            {
                name: "ECDSA",
                namedCurve: "P-521", //can be "P-256", "P-384", or "P-521"
            },
            true, //whether the key is extractable (i.e. can be used in exportKey)
            ["sign", "verify"] //can be any combination of "sign" and "verify"
        )
        .then(function(key){
             
            // console.log(key);
            // console.log(key.publicKey);
            // console.log(key.privateKey);

            resolve( key )
        })
        .catch(function(err){
            
            reject( err );

        }); 
     
  
    })
  
  }
  
  const fn_ECDSA_exportkey = async ( key ) => {
  
    return new Promise((resolve, reject) => {
        
        window.crypto.subtle.exportKey(
            "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
            key //can be a publicKey or privateKey, as long as extractable was true
        )
        .then(function(keydata){
            //returns the exported key data
            let data = Buffer.from( JSON.stringify(keydata) ).toString('base64')  
            resolve( data )
            
        })
        .catch(function(err){
            
            reject( err );

        });

        
    }) 
  
  }
  
  
  const fn_create_ECDSA_key = async ( type ) => { 
    
    let size = 0
     
    try{
         
        let c = await fn_ECDSA_generateKey( size )
  
        console.log( c.privateKey )
        
        let publicKey = await fn_ECDSA_exportkey( c.publicKey )
        let privateKey = await fn_ECDSA_exportkey( c.privateKey )
  
        let _ref = await _generateRandomRef() 
  
        return {
                  ref : _ref, 
                  type : 'ECDSA (sign/verify)',
                  publicKey : publicKey,
                  privateKey : privateKey,
                  
        }
  
    }catch(e){
  
          throw e
  
    }
  
  }

// ------------------------------------------------------------------------------------

module.exports = { 
     
    fn_buffer_key_from_base64, 
    fn_create_ECDSA_key

};

  