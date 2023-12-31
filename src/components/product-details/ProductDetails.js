import React, { useEffect, useState } from 'react'
import "./ProductDetails.scss"
import WorkingProcessSection from '../working-process-section/WorkingProcessSection';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeItemFromCart } from '../../redux/slice/CartSlice';
import { USER, getItem } from '../../utils/localStorageManager';
import { useNavigate } from 'react-router-dom';
import {message} from "antd";

const ProductDetails = ({ data }) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [user,setUser]=useState();
  const [addFlag, setAddFlag] = useState(false);
  const [counter, setCounter] = useState(0);
  const [addProductFlag, setAddProductFlag] = useState(false);
  const [removeProductFlag, setRemoveProductFlag] = useState(false);

  const userData = useSelector((state) => state?.UserReducer?.userInfo);
 
  const offerPercent = Math.round(((data?.mrp - data?.price) / data?.mrp) * 100);

  useEffect(() => {
    setUser(getItem(USER))
  }, [])
  
  const handleMinusCounter=()=>{
    if(counter>=1)
      setCounter(counter-1); 
    setRemoveProductFlag(true);
  }

  const handleAddCounter=()=>{
    setCounter(counter+1);
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

  const handleAddBtn=()=>{
    setAddFlag(true);
    if(!user)
    message.warning("You are not Logged In.Please login to add products");
   //alert("")
  }

  return (
    <div className='productdetails'>
      <div className='section1'>
        <div className='product-img-section'>
          <img src={data?.url} />
        </div>
      </div>
      <div className='section2'>
        <h2 className='product-name'>{data?.name}</h2>
        <p className='product-name'>{data?.qty}</p>
        <div className='price-section'>
          <h3 className='sale-price'>{data?.price}</h3>
          <h4 className='mrp-price'>{data?.mrp}</h4>
          <p className='offer-percent'>{offerPercent}% off</p>
        </div>
        {
          addFlag && user?
          <div style={{display:"flex",gap:"20px"}}>
             <div className='counter-section'>
              <p className='qty-minus' onClick={handleMinusCounter}><FaMinus/></p>
              <p className='qty'>{counter}</p>
              <p className='qty-add' onClick={handleAddCounter}><FaPlus/></p>
            </div>
            <div className='counter-section' onClick={()=>{navigate("/cart")}}>Buy Now</div>
          </div>
            :
            <button className='product-add-btn' onClick={handleAddBtn}>Add</button>
        }


      </div>
    </div>
  )
}

export default ProductDetails