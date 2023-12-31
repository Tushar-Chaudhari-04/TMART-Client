import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/AxiosClient"

export const getProducts=createAsyncThunk("product/getProducts",async(body)=>{
    try {
        const productResponse=await axiosClient.post(`/product/getProduct`);
        return productResponse?.data?.result;
    } catch (err) {
        console.log("Error in getUserInfo Slice data",err)
        Promise.reject(err);
    }
})

const productSlice=createSlice({
    name:'productSlice',
    initialState:{
        productData:{}
    },
    extraReducers:(builder)=>{
        builder.addCase(getProducts.fulfilled,(state,action)=>{
            state.productData=action.payload;
        })
    }
})

export default productSlice.reducer;