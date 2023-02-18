/* eslint-disable */

const fn_pki = require('./pki')
const fn_aes = require('./aes')


// ------------------------------------------------------------------------------------
 
const fn_buffer_pki_decrypted_data = async function( buffer_privateKey, buffer_message  ) {

    return new Promise((resolve, reject) => { 
  
      window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
            //label: Uint8Array([...]) //optional
        },
        buffer_privateKey, //from generateKey or importKey above
        buffer_message //ArrayBuffer of the data
      )
      .then(function(decrypted){
        //returns an ArrayBuffer containing the decrypted data
        resolve(new Uint8Array(decrypted));
        // resolve( decrypted )
  
      })
      .catch(function(err){
        
        reject(err);
  
      });
  
  
                         
  
    })
    
  }

  const fn_buffer_AES_CBC_from_obj = async function( key_obj  ) {

    return new Promise((resolve, reject) => { 
  
         
        window.crypto.subtle.importKey(
            "jwk", //can be "jwk" or "raw"
            key_obj,
            {   //this is the algorithm options
                name: "AES-CBC",
            },
            false, //whether the key is extractable (i.e. can be used in exportKey)
            ["encrypt", "decrypt"] //can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
        )
        .then(function(key){
            //returns the symmetric key
             
            resolve(key);
            
        })
        .catch(function(err){
            
            reject(err);
  
        });
  
  
                         
  
    })
    
  }

  const fn_buffer_aes_decrypted_data = async function( key_obj, iv, buffer_message  ) {

    return new Promise((resolve, reject) => { 
  
      window.crypto.subtle.decrypt(
        {
            name: "AES-CBC",
              iv: iv, //The initialization vector you used to encrypt
          },
          key_obj, //from generateKey or importKey above
          buffer_message //ArrayBuffer of the data
      )
      .then(function(decrypted){
          //returns an ArrayBuffer containing the decrypted data
           
          resolve( new Uint8Array(decrypted) ) 
      })
      .catch(function(err){
          
          reject(err);
  
      });
  
  
                         
  
    })
    
  }

  const fn_obj_message_decrypted = async ( buffer_privateKey, buffer_encryption_key, buffer_message_encrypted ) => { 
    
    try{

        let k_base64 = await fn_buffer_pki_decrypted_data( buffer_privateKey, buffer_encryption_key )

        let tmp = Buffer.from( k_base64 , 'base64').toString() 
        let obj = JSON.parse( Buffer.from( tmp , 'base64').toString() )

        let k_tmp = JSON.parse( Buffer.from( obj.key , 'base64').toString() )

        let k = await fn_buffer_AES_CBC_from_obj( k_tmp  )
        let iv = Buffer.from( obj.iv , 'base64')  
        
        let d = await fn_buffer_aes_decrypted_data(  k , iv , buffer_message_encrypted )

        return d
             

    }catch(e){

        throw e

    }

}

// ------------------------------------------------------------------------------------

module.exports = { 
    
     
    fn_buffer_pki_decrypted_data,
    fn_obj_message_decrypted

};
  