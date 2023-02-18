/* eslint-disable */
 
// ------------------------------------------------------------------------------------


const fn_buffer_key_from_base64 = async function( key_base64, flag = ["encrypt"] ) {

    return new Promise((resolve, reject) => { 

        let jwk = JSON.parse( ( Buffer.from( key_base64 , 'base64') ).toString() )

        window.crypto.subtle.importKey(
                "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
                jwk,
        {   //these are the algorithm options
                    name: "RSA-OAEP",
                    hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
                },
                false, //whether the key is extractable (i.e. can be used in exportKey)
                flag //"encrypt" or "wrapKey" for public key import or
                            //"decrypt" or "unwrapKey" for private key imports
        ).then(function( buffer_key ){
                 
            resolve( buffer_key );


        }).catch(function(err){

            reject( err );
        
        });


                         

    })
    
}



const fn_RSA_OAEP_encrypt_message = async function( buffer_publicKey, buffer_message  ) {

    return new Promise((resolve, reject) => { 

        window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP",
                //label: Uint8Array([...]) //optional
            },
            buffer_publicKey, //from generateKey or importKey above
            buffer_message //ArrayBuffer of data you want to encrypt
        )
        .then(function(encrypted){
            //returns an ArrayBuffer containing the encrypted data
            resolve( new Uint8Array(encrypted) );
        })
        .catch(function(err){

            reject(err);
        
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

const fn_RSA_generateKey = async ( length ) => {

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
  
  const fn_RSA_exportkey = async ( key ) => {
  
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
  
  
  const fn_create_RSA_key = async () => {
  
    
    let size = 4096
     
    try{
         
        let c = await fn_RSA_generateKey( size )
  
        // console.log( c )
  
        let publicKey = await fn_RSA_exportkey( c.publicKey )
        let privateKey = await fn_RSA_exportkey( c.privateKey )
  
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
     
    fn_buffer_key_from_base64,
    fn_RSA_OAEP_encrypt_message,
    fn_create_RSA_key

};

  