/* eslint-disable */
 
// ------------------------------------------------------------------------------------
function _generateRandomKey(  ){

    return new Promise((resolve, reject) => {
    
        window.crypto.subtle.generateKey(
            {
                name: "AES-CBC",
                length: 256, //can be  128, 192, or 256
            },
            true, //whether the key is extractable (i.e. can be used in exportKey)
            ["encrypt", "decrypt"] //can be "encrypt", "decrypt", "wrapKey", or "unwrapKey"
        )
        .then(function(key){
            //returns a key object

            window.crypto.subtle.exportKey(
                "jwk", //can be "jwk" or "raw"
                key //extractable must be true
            )
            .then(function(keydata){
                //returns the exported key data
                resolve( Buffer.from( JSON.stringify( keydata ) ).toString('base64') )
            })
            .catch(function(err){
                
                reject( err );

            });
            
             
        })
        .catch(function(err){
            
            reject( err );

        });
  
        
    
    })
}

const fn_buffer_AES_CBC_from_base64 = async function( key_base64  ) {

    return new Promise((resolve, reject) => { 

        let jwk_key = JSON.parse( ( Buffer.from( key_base64 , 'base64') ).toString() )

        window.crypto.subtle.importKey(
            "jwk", //can be "jwk" or "raw"
            jwk_key,
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

const fn_base64_AES_CBC_encrypt = async function( buffer_key, buffer_message  ) {

    return new Promise((resolve, reject) => { 

        let iv = window.crypto.getRandomValues(new Uint8Array(16))
        window.crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                //Don't re-use initialization vectors!
                //Always generate a new iv every time your encrypt!
                iv: iv,
            },
            buffer_key, //from generateKey or importKey above
            buffer_message //ArrayBuffer of data you want to encrypt
        )
        .then(function(encrypted){
            //returns an ArrayBuffer containing the encrypted data
            // new Uint8Array(encrypted)
            resolve({
                data : Buffer.from( new Uint8Array(encrypted) ).toString('base64') ,
                iv : Buffer.from( new Uint8Array(iv) ).toString('base64')
            });
        })
        .catch(function(err){
            
            reject( err );

        });

                         

    })
    
}

// ------------------------------------------------------------------------------------

module.exports = { 
    
    _generateRandomKey,
    fn_base64_AES_CBC_encrypt,
    fn_buffer_AES_CBC_from_base64

};

  