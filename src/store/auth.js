import { createSlice } from "@reduxjs/toolkit"
const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:'',
        isAuthenticated:false,

    },
    reducers:{
        login(state,action){
           state.token=action.payload 
           state.isAuthenticated=true
        },
        logout(state){
            state.isAuthenticated=false
        }
    }
})
export const authActions=authSlice.actions;
export default authSlice.reducer