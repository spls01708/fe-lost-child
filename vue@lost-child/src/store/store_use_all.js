
const state={

    
        
        isLoading:false,
        open_dialog:false,
        pass_debris:[],
        pass_user:[],
        pass_user_option:[],
        open_modal01:false,
        pass_modal01_data:[],
        update_modal01_data:[],

}


const mutations = {
        pass_debris_change (state,payload){

                state.pass_debris = payload;
    
        },
        isLoading_change (state,payload){

                state.isLoading = payload;
    
        },
        open_dialog_change (state,payload){

                state.open_dialog = payload;
    
        },
        pass_user_change (state,payload){

                state.pass_user = payload;
    
        },
        pass_user_option_change (state,payload){

                state.pass_user_option = payload;
    
        },
        open_modal01_change (state,payload){

                state.open_modal01 = payload;
    
        },
        pass_modal01_data_change (state,payload){

                state.pass_modal01_data = payload;
    
        },
        update_modal01_data_change (state,payload){

                state.update_modal01_data = payload;
    
        },
        

}

const actions = {
        pass_debris ({ commit },payload){

                commit('pass_debris_change',payload)
    
        },
        isLoading ({ commit },payload){

                commit('isLoading_change',payload)
    
        },
        open_dialog ({ commit },payload){

                commit('open_dialog_change',payload)
    
        },
        pass_user ({ commit },payload){

                commit('pass_user_change',payload)
    
        },
        pass_user_option ({ commit },payload){

                commit('pass_user_option_change',payload)
    
        },
        pass_modal01_data ({ commit },payload){

                commit('pass_modal01_data_change',payload)
    
        },
        update_modal01_data ({ commit },payload){

                commit('update_modal01_data_change',payload)
    
        },
        open_modal01 ({ commit },payload){

                commit('open_modal01_change',payload)
    
        },
       
                   
}

const getters = {
        pass_debris (state) {

                return state.pass_debris
            
        },
        isLoading (state) {

                return state.isLoading
            
        },
        open_dialog (state) {

                return state.open_dialog
            
        },
        pass_user (state) {

                return state.pass_user
            
        },
        pass_user_option (state) {

                return state.pass_user_option
            
        },
        pass_modal01_data (state) {

                return state.pass_modal01_data
            
        },
        update_modal01_data  (state) {

                return state.update_modal01_data
            
        },
        open_modal01 (state) {

                return state.open_modal01
            
        },

}

export default {
                    state,
                    getters,
                    mutations,
                    actions
                }