/* eslint-disable */
 
const axios = require('axios')
const server_config = require('./config')


// ------------------------------------------------------------------------------------
 
const fn_client_disconnect= async function( socket ) {

    return socket.emit('client_force_disconnect');

}


// ------------------------------------------------------------------------------------

module.exports = { 
 
    fn_client_disconnect

};

  