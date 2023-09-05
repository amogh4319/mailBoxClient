import { createSlice } from "@reduxjs/toolkit";
const inboxSlice=createSlice({
  name:'inbox',
  initialState:{messages:[],isMessageRead:false,readStatus: {},unreadCount: 0,  },
  reducers:{
     loadMessages(state,action){
      state.messages=action.payload;
      // Calculate initial unreadCount
      state.unreadCount = action.payload.reduce((count, message) => {
        return message.isRead ? count : count + 1;
      }, 0);
    },
    messageRead(state){
      
      state.isMessageRead=true;
    },
    updateReadStatus(state, action) { // Add an action to update readStatus
      const { messageId, isRead } = action.payload;
      state.readStatus[messageId] = isRead;
       // Update unreadCount when a message is marked as read
       if (!isRead) {
        state.unreadCount -= 1;
      }
    },
   
    updateUnreadCount(state, action) {
      state.unreadCount = action.payload;
      localStorage.setItem('unreadCount', state.unreadCount);
    },
    deleteMessage(state, action) {
      const messageId = action.payload;

      // Remove the deleted message from the messages array
      state.messages = state.messages.filter((message) => message.id !== messageId);

      // Update the unreadCount if the deleted message was unread
      if (!state.readStatus[messageId]) {
        state.unreadCount -= 1;
      }

      // Remove the message from readStatus
      delete state.readStatus[messageId];
    },
    
   

  }
})

export const  inboxActions=inboxSlice.actions;
export default inboxSlice.reducer;