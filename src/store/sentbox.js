import { createSlice } from "@reduxjs/toolkit";

const sentboxSlice=createSlice({
    name:'sentbox',
    initialState:{sentMessages:[]},
    reducers:{
        loadMessages(state,action){
            state.sentMessages=action.payload;
        }
    }
})
export const sentboxActions=sentboxSlice.actions
export default sentboxSlice.reducer;