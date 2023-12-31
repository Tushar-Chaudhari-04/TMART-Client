import {createSlice} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"
import { USER, getItem } from "../../utils/localStorageManager";


const cartSlice=createSlice({
    name:"cartSlice",
    initialState:{
        cart:[]
    },
    reducers:{
        addToCart:(state,action)=>{
            let product=action.payload;
            const currentItem=product?{
                id:product?._id,
                name:product?.name,
                qty:product?.qty,
                mrp:product?.mrp,
                price:product?.price,
                url:product?.url,
                categoryId:product?.categoryId,
                productQty:product?.counter,
                userId:product?.userData?._id,
                userName:product?.userData?.firstName+" "+product?.userData?.lastName
                }:action.payload;
                const index=state?.cart?.findIndex(item=>item.name===currentItem.name && item.userId===currentItem?.userId);
                if(index==-1){
                    state.cart.push({...currentItem});
                }else if(currentItem.productQty!==0 ){
                    state.cart[index]=currentItem;
                }
                
        },
        removeItemFromCart:(state,action)=>{
            const productData=action.payload;
            const productIndex=state?.cart?.findIndex(item=>(item.name==productData?.name && item.userId==productData?.userData?._id));
            if(productIndex===-1) return;

            if(productData.counter>0){
                const currentItem=productData?{
                    id:productData?._id,
                    name:productData?.name,
                    qty:productData?.qty,
                    mrp:productData?.mrp,
                    price:productData?.price,
                    url:productData?.url,
                    categoryId:productData?.categoryId,
                    productQty:productData?.counter,
                    userId:productData?.userData?._id,
                    userName:productData?.userData?.firstName+" "+productData?.userData?.lastName
                    }:action.payload;
                    state.cart[productIndex]=currentItem;
            }else{
                state.cart=state.cart.filter((item,index)=>(index!=productIndex));
            }
        },
        resetCart:(state,action)=>{
            state.cart=[]
        }
    }
})

export default cartSlice.reducer;
export const {addToCart,removeItemFromCart,resetCart}=cartSlice.actions;