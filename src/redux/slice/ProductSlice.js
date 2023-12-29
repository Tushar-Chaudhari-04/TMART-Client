import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/AxiosClient"

export const getProducts=createAsyncThunk("product/getProducts",async(body)=>{
    try {
        const productResponse=await axiosClient.post(`${process.env.REACT_APP_BASE_URL}/product/getProduct`);
        console.log("first productResponse ...",productResponse)
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
            console.log("state.productData",state.productData,"action.payload",action.payload)
            state.productData=action.payload;
        })
    }
})

export default productSlice.reducer;