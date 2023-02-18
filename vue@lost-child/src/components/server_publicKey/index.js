/* eslint-disable */
const fn_publickey = require('./publickey')
const const_all_server_publicKey = require('./_all_server_publicKey')

// ------------------------------------------------------------------------------------
  
class server_publicKey {

    constructor( _server_domain ) {
        
        this._server_domain = _server_domain;
         
    } 
    
    connection_otp_server_key = async function ( ) { 
     
        return JSON.parse(JSON.stringify( const_all_server_publicKey._otp_publicKey ) )
    }

    connection_cms_km_server_key = async function ( ) { 

        return JSON.parse(JSON.stringify( const_all_server_publicKey._cms_km_publicKey ) )
    }

    connection_db_swc_server_key = async function ( ) { 

        return JSON.parse(JSON.stringify( const_all_server_publicKey._db_swc_publicKey ) )
    }

    connection_spms_server_key = async function ( ) { 

        return JSON.parse(JSON.stringify( const_all_server_publicKey._spms_publicKey ) )
    }

    connection_lost_child_server_key = async function ( ) { 

        return JSON.parse(JSON.stringify( const_all_server_publicKey._lost_child_publicKey ) )
    }
    
}



// ------------------------------------------------------------------------------------

module.exports.server_publicKey = server_publicKey;
  