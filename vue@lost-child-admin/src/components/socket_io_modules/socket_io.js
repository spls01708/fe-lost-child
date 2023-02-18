/* eslint-disable */
 
const axios = require('axios')
const server_config = require('./config')


// ------------------------------------------------------------------------------------
 
const fn_client_disconnect= async function( socket ) {

    return socket.emit('client_force_disconnect');

}

const fn_client_identify = async function( socket, signature, error_cb, succeed_cb ) {

    let emit_option = {

        channel_name : 'client-identify',
        from : socket.id,
        to : 'all',
        data : signature,
        timeout : 40*1000,
        
    }

    

    socket.timeout( emit_option.timeout ).emit(emit_option.channel_name, emit_option, (err, responses) => {

        if (err) {
            
            setTimeout(function(){
                socket.timeout( emit_option.timeout ).emit(emit_option.channel_name, emit_option, (err, responses) => {

                    if (err) {
                        
                        setTimeout(function(){
                            socket.timeout( emit_option.timeout ).emit(emit_option.channel_name, emit_option, (err, responses) => {
            
                                if (err) {
                                    
                                    setTimeout(function(){
                                        socket.timeout( emit_option.timeout ).emit(emit_option.channel_name, emit_option, (err, responses) => {
                        
                                            if (err) {
                                                console.log( 'emit-error => ' , err)
                                                error_cb( err )
                                                
                                            }else { 
                                                succeed_cb( responses )
                                                
                                            }
                                        
                                        })
                                    },500)
                                    
                                }else { 
                                    succeed_cb( responses )
                                    
                                }
                            
                            })
                        },500)
                        
                    }else { 
                        succeed_cb( responses )
                        
                    }
                
                })
            },500)
             
        }else { 
 
            succeed_cb( responses )
             
        }
    
    })


}

const fn_emit_message= async function( socket, channel, message, to, error_cb, succeed_cb ) {

    let emit_option = {

        channel_name : channel,
        from : socket.id,
        to : to,
        data : message,
        timeout : 40*1000,
        
    }

    

    socket.timeout( emit_option.timeout ).emit(emit_option.channel_name, emit_option, (err, responses) => {

        if (err) {
            // console.log( 'emit-error => ' , err)
            // error_cb( err )
            setTimeout(function(){
                socket.timeout( emit_option.timeout ).emit(emit_option.channel_name, emit_option, (err, responses) => {

                    if (err) {
                        
                        setTimeout(function(){
                            socket.timeout( emit_option.timeout ).emit(emit_option.channel_name, emit_option, (err, responses) => {
            
                                if (err) {
                                    
                                    setTimeout(function(){
                                        socket.timeout( emit_option.timeout ).emit(emit_option.channel_name, emit_option, (err, responses) => {
                        
                                            if (err) {
                                                console.log( 'emit-error => ' , err)
                                                error_cb( err )
                                                
                                            }else { 
                                                succeed_cb( responses )
                                                
                                            }
                                        
                                        })
                                    },500)
                                    
                                }else { 
                                    succeed_cb( responses )
                                    
                                }
                            
                            })
                        },500)
                        
                    }else { 
                        succeed_cb( responses )
                        
                    }
                
                })
            },500)
             
        }else { 

            // console.log( responses )
            succeed_cb( responses )
             
        }
    
    })


}

const fn_emit_room_message = async function( socket, room_option, error_cb, succeed_cb ) { 

    
    socket.timeout( room_option.timeout ).emit( 'send-room-message' , room_option.room_name, room_option.data, (err, responses) => {
                    
        if (err) {
            console.log( 'emit-error => ' , err)
            error_cb( err )
            
        }else { 
            succeed_cb( responses )
            
        }
    
    }) 

    

}

const fn_join_room = async function( socket, room_name, error_cb, succeed_cb ) { 

    socket.timeout(2000).emit('join-room', room_name, (err, responses) => {
                        
        if (err) {
            console.log( 'emit-error => ' , err)
            error_cb( err )
            
        }else { 
            succeed_cb( responses )
            
        }
    
    }) 

}
// ------------------------------------------------------------------------------------

module.exports = { 
 
    fn_client_disconnect,
    fn_emit_message,
    fn_client_identify,
    fn_emit_room_message,
    fn_join_room

};
  