// store.js
import {configureStore} from '@reduxjs/toolkit';
import inboxReducer from './inbox';
import authReducer from './auth'
const store=configureStore({
   reducer:{
    inbox:inboxReducer,
    auth:authReducer
   } 
})
export default store;