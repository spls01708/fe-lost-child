/* eslint-disable */
 
const axios = require('axios')
const server_config = require('./config')


// ------------------------------------------------------------------------------------

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

const connection_generateKey = async ( length ) => {

    return new Promise((resolve, reject) => {
  
        window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: length, //can be 1024, 2048, or 4096
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
        },
          true, //whether the key is extractable (i.e. can be used in exportKey)
          ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
  
      ).then(function(keydata){
               
           
          resolve( keydata )
          
      })
      .catch(function(err){
          
          reject( err );
        
      });
  
    })
  
  }

const connection_exportkey = async ( key ) => {

    return new Promise((resolve, reject) => {
  
        window.crypto.subtle.exportKey(
            "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
            key  //can be a publicKey or privateKey, as long as extractable was true
          )
          .then(function(keydata){
               
              let data = Buffer.from( JSON.stringify(keydata) ).toString('base64') 
  
              resolve( data )
              
          })
          .catch(function(err){
              
              reject( err );
            
          });
  
    }) 
  
}

const fn_create_connection_key = async function( ) {


    let size = 4096
   
    try{
  
         
        let c = await connection_generateKey( size )
    
  
        let publicKey = await connection_exportkey( c.publicKey )
        let privateKey = await connection_exportkey( c.privateKey )
  
        let _ref = await _generateRandomRef() 
  
        return {
                  ref : _ref, 
                  size : size,
                  publicKey : publicKey,
                  privateKey : privateKey,
                  
        }
  
    }catch(e){
  
          throw e
  
    }
                            
                           

}
 
// ------------------------------------------------------------------------------------

module.exports = { 

    fn_create_connection_key

};

  