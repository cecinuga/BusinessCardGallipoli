import { createStore } from '@reduxjs/toolkit'

const initialState = {
    logged: false,
    filters: [],
    houses:[]
}
const rootReducer = (state=initialState, action) => { 
    switch (action.type){
        case 'LOGGEDIN':
            state.logged = true;
            state.email = action.data.email;
            state.holcode = action.data.holcode;  
            
            return state;
        case 'LOGGEDOUT':  
            state = {
                logged: false,
                filters: [],
                houses:[]
            }

            return state;
        case 'NOTLOGGEDIN':
            state.logged = false;
            
            return state;
        case 'FETCHFILTERS':
            if(state.filters.length>0) return state;
            state.filters = action.data

            return state;
        case 'FETCHHOUSES':
            if(state.houses.length>0) return state;
            state.houses = action.data

            return state;
        case 'CHGFILTERS':
            state.filters.map((f)=>{ if(f.label===action.data.label) f.value=action.data.value })            
            
            return state;
        default:
            
            return state;
    }
}

const store = createStore(rootReducer)

export default store;