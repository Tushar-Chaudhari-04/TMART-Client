import React, { useEffect, useLayoutEffect, useState } from 'react'
import "./CartSection.scss"
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import CartArea from '../../components/cart-area/CartArea'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { USER, getItem } from '../../utils/localStorageManager'

const CartSection = () => {
  const navigate=useNavigate();
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window && window.scrollTo(0, 0);
  }, [location.pathname]);
  const [user, setUser] = useState({}); 
 const userData = useSelector((state) => state?.UserReducer?.userInfo);
  const cartDataAll = useSelector((state) => state?.CartReducer?.cart);
  const cartData=cartDataAll.filter(item=>item?.userId==userData?._id)

  useEffect(() => {
    setUser(JSON.parse(getItem(USER)));
}, [])

  return (
    <div className='cart-section'>
      <Navbar />
      {(cartData.length > 0 && user!=null) ? <CartArea cartData={cartData}/> : 
      <div className='empty-cart-section'>
        <img className='empty-cart-img' src={"https://cdn.zeptonow.com/app/images/empty-bag.png?tr=w-640,q-70"} />
        <h6 className='empty-cart-head'>Your cart is empty</h6>
        <button className='btn btn-warning empty-cart-btn' onClick={()=>navigate("/")}>Browse Products</button>
      </div>
      }
      <Footer />
    </div>
  )
}

export default CartSection