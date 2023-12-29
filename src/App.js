import { useState, useRef, useLayoutEffect } from 'react';
import './App.css';
import About from './components/about/About';
import Notfound from './components/notfound/Notfound';
import Home from './pages/home/Home';
import {
  BrowserRouter,
  Link,
  Outlet,
  useRoutes,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ProductsDetailSection from './pages/products-details-section/ProductsDetailSection';
import CartSection from './pages/cart-section/CartSection';
import Signup from './components/sign-up/Signup';
import Login from './components/login/Login';
import CategoryProducts from './components/category-products/CategoryProducts';
import ProductByCategorySection from './pages/product-by-category-section/ProductByCategorySection';
import { useEffect } from 'react';
import AdminSection from './components/admin-section/AdminSection';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from './redux/slice/UserSlice';
import { getProducts } from './redux/slice/ProductSlice';
import { USER, getItem } from './utils/localStorageManager';
import Payment from './components/payment/Payment';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getProducts());
  }, [])


  const userData = useSelector((state) => state?.UserReducer?.getUserInfo);
  console.log("user data ...",userData)
 console.log("USER",getItem(USER),getItem(USER))
 const data1=getItem(USER);
 console.log("data1",data1?.firstName)  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/logout' element={<Home/>} />
          <Route path='/' element={<Home />} />
          <Route path='/categories/:categoryId' element={<ProductByCategorySection/>}/>
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<Home />} />
          <Route path='/contact-us' element={<Home />} />
          <Route path='/products/:productId' element={<ProductsDetailSection />} />
          <Route path='/cart' element={<CartSection />} />
          <Route path='/payment/:status' element={<Payment />} />
          <Route path='/admin-section' element={<AdminSection/>}/>
          <Route path='*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
