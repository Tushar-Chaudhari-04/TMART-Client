import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/AxiosClient"

export const getUserInfo=createAsyncThunk("user/getUserInfo",async(body)=>{
    try {
        const userResponse=await axiosClient.get(`${process.env.REACT_APP_BASE_URL}/user/getUserInfo`);
        console.log("first userResponse...",userResponse)
        return userResponse?.data?.result;
    } catch (err) {
        console.log("Error in getUserInfo Slice data",err)
        Promise.reject(err);
    }
})

const userSlice=createSlice({
    name:'userSlice',
    initialState:{
        userInfo:{}
    },
    reducers:{
        resetUser:(state,action)=>{
            state.userInfo={}
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getUserInfo.fulfilled,(state,action)=>{
            console.log("state.userInfo",state.userInfo,"action.payload",action.payload)
            state.userInfo=action.payload;
            console.log("state.userInfo",state.userInfo,"action.payload",action.payload)
        })
    }
})

export default userSlice.reducer;
export const {resetUser}=userSlice.actions;
