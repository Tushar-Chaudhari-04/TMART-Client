import React, { useState } from 'react'
import "./CartItem.scss"
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { addToCart, removeItemFromCart } from '../../redux/slice/CartSlice';
import { useDispatch, useSelector } from 'react-redux';

const CartItem = ({data}) => {
  const dispatch=useDispatch();
  const userData = useSelector((state) => state?.UserReducer?.userInfo);

  const [counter, setCounter] = useState(data?.productQty);
  const [addProductFlag, setAddProductFlag] = useState(false);
  const [removeProductFlag, setRemoveProductFlag] = useState(false);
  const handleMinusCounter = () => {
    if(counter>0){
      setCounter(counter - 1);
      setRemoveProductFlag(true);
    }
  }

  const handleAddCounter = () => {
      setCounter(counter + 1);
      setAddProductFlag(true);
  }

  if(addProductFlag){
    dispatch(addToCart({...data,counter,userData}));
    setAddProductFlag(false);
  }
  
  if(removeProductFlag){
    dispatch(removeItemFromCart({...data,counter,userData}));
    setRemoveProductFlag(false);
  }

  return (
    <div className='cart-item'>
      <div className='product-info'>
        <div className='img-section'>
          <img className='item-img' src={data.url}/>
        </div>
        <div className='item-desc'>
          <p className='item-name'>{data.name}</p>
          <p className='item-qty'>{data.qty}</p>
          <p className='item-sale'><strong>₹{data.price} </strong> <span className='item-mrp'>₹{data.mrp}</span></p>
        </div>
      </div>
      <div className='add-section'>
        <div className='counter-section'>
          <p className='qty-minus' onClick={handleMinusCounter}><FaMinus /></p>
          <p className='qty'>{counter}</p>
          <p className='qty-add' onClick={handleAddCounter}><FaPlus /></p>
        </div>
      </div>
    </div>
  )
}

export default CartItem