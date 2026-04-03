import { createSlice } from '@reduxjs/toolkit';
import tokenService from '../../services/tokenService';
const slice=createSlice({name:'auth',initialState:{token:tokenService.getToken(),user:null},reducers:{loginSuccess:(s,a)=>{s.token=a.payload.token;s.user=a.payload.user;tokenService.setToken(a.payload.token);},logout:(s)=>{s.token=null;s.user=null;tokenService.clearToken();}}});
export const {loginSuccess,logout}=slice.actions; export default slice.reducer;
