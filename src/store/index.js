// store.js
import {configureStore} from '@reduxjs/toolkit';
import inboxReducer from './inbox';
import authReducer from './auth'
import sentboxReducer from './sentbox'
const store=configureStore({
   reducer:{
    inbox:inboxReducer,
    auth:authReducer,
    sentbox:sentboxReducer,
   } 
})
export default store;