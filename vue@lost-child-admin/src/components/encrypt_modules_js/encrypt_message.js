/* eslint-disable */

const fn_pki = require('./pki')
const fn_aes = require('./aes')


// ------------------------------------------------------------------------------------
const buffet_to_base64 = async ( buffer ) => { 
 
    return Buffer.from( buffer ).toString('base64')
} 

const fn_obj_message_encrypted = async ( buffer_publicKey, buffer_message ) => { 
    
    try{

     
            let base64_aes_key = await fn_aes._generateRandomKey()
            let buffer_key = await fn_aes.fn_buffer_AES_CBC_from_base64( base64_aes_key )

            let str_encrypted_base64 = await fn_aes.fn_base64_AES_CBC_encrypt( buffer_key, buffer_message )

            let aes_key_obj = {

                key : base64_aes_key,
                iv : str_encrypted_base64.iv
            
            }
            
            let base64_aes_key_obj = Buffer.from( JSON.stringify( aes_key_obj ) ).toString('base64')

            
            
            let buffer_aes_key_obj_encrypted = await fn_pki.fn_RSA_OAEP_encrypt_message( buffer_publicKey, Buffer.from( base64_aes_key_obj ) )
            let base64_aes_key_obj_encrypted = await buffet_to_base64( buffer_aes_key_obj_encrypted )
            
            return {
                
                encryption_key : base64_aes_key_obj_encrypted,
                encryption_message : str_encrypted_base64.data

            }

    }catch(e){

        throw e

    }

}

// ------------------------------------------------------------------------------------

module.exports = { 
    
     
    fn_obj_message_encrypted,

};

  