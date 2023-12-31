import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/AxiosClient"

export const getUserInfo=createAsyncThunk("user/getUserInfo",async(body)=>{
    try {
        const userResponse=await axiosClient.get(`/user/getUserInfo`);
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
            state.userInfo=action.payload;
        })
    }
})

export default userSlice.reducer;
export const {resetUser}=userSlice.actions;
