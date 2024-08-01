import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const userSlice = createSlice({
 name:"user",
 initialState:{
    user:null,
    token:null
 },
 reducers:{
    setUser:(state,action)=>{
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    removeUser:(state,action)=>{
      state.user = null;
      state.token = null;
    }
 }

}) 

export const {setUser, removeUser} =userSlice.actions;
export default userSlice.reducer;