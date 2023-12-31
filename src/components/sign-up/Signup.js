import React, { useLayoutEffect, useState } from 'react'
import "./SignUp.scss"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import loginImg from "../../assets/login3.avif"
import { message } from 'antd';
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom'
import {Spin} from 'antd'
import { axiosClient } from '../../utils/AxiosClient'

const Signup = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading,setLoading]=useState(false);

  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window && window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(userData => ({
      ...userData, [name]: value,
    }))
  }

  const validateInput = () => {

    //FirstName Field
    if (!user.firstName) {
      message.error("FirstName is requried feild");
      return false;
    }
    if (user.firstName.length < 6 || user.firstName.length > 15) {
      message.error("FirstName must be atleast 6 characters and at most 15 characters");
      return false;
    }

    //LastName Feild
    if (!user.lastName) {
      message.error("LastName is requried feild");
      return false;
    }

    if (user.lastName.length < 6 || user.lastName.length > 15) {
      message.error("LastName must be atleast 6 characters and at most 15 characters");
      return false;
    }

    //Email Field
    if (!user.email) {
      message.error("FirstName is requried feild");
      return false;
    }
    if (user.email.length < 6 || user.email.length > 30) {
      message.error("Email must be atleast 6 characters and at most 30 characters");
      return false;
    }

    //Password Field
    if (!user.password) {
      message.error("Password is requried feild");
      return false;
    }
    if (user.password.length < 6 || user.password.length > 15) {
      message.error("Password must be atleast 6 characters and at most 15 characters");
      return false;
    }

    if (!user.confirmPassword) {
      message.error("ConfirmPassword is Requried Feild");
      return false;
    }
    if (user.confirmPassword.length < 6 || user.confirmPassword.length > 15) {
      message.error("Confirm Password must be atleast 6 characters and at most 15 characters");
      return false;
    }

    if (user.password !== user.confirmPassword) {
      message.error("Password does not match.Please fill same password for both");
      return false;
    }

    return true;
  }

  const performAPICall =async () => {
    let response = {};
    let errored = false;
    try {
      const response = await axiosClient.post(`/auth/register`,
      {
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        password:user.password,
      })
     setLoading(false);
     return response;
    } catch (err) {
      errored=true;
    }
  }

  const handleSignUp =async  () => {
    if (validateInput()) {
      setLoading(true);
     const response =await performAPICall();
     if(response?.data?.statusCode===201){
      message.success(response?.data?.result);
      navigate("/login")
     }else{
      message.error(response?.data?.result);
      navigate("/register")
     }
    }
  }

  return (
    <div className='signup'>
      <Spin size="large"  tip="Loading" spinning={loading} fullscreen={loading}>
      <Navbar />
      <div className='login-section'>
        <div className='login-image'>
          <img src={loginImg} />
        </div>

        <div className='login-data'>
          <h2 style={{ color: "var(--primary-color)" }}>SignUp</h2>
          <div className='email-section'>
            <h6>Enter FirstName</h6>
            <input className="login-email" type='text' placeholder='Enter FirstName'
              name="firstName" value={user.firstName} onChange={handleChange} />
          </div>
          <div className='email-section'>
            <h6>Enter LastName</h6>
            <input className="login-email" type='text' placeholder='Enter LastName'
              name="lastName" value={user.lastName} onChange={handleChange} />
          </div>
          <div className='email-section'>
            <h6>Email</h6>
            <input className="login-email" type='email' placeholder='Enter Email'
              name="email" value={user.email} onChange={handleChange} />
          </div>

          <div className='password-section'>
            <h6>Password</h6>
            <input className="login-password" type="password" placeholder='Enter Password'
              name="password" value={user.password} onChange={handleChange} />
          </div>

          <div className='password-section'>
            <h6>Confirm Password</h6>
            <input className="login-password" type="password" placeholder='Confirm Password'
              name="confirmPassword" value={user.confirmPassword} onChange={handleChange} />
          </div>
          <button className='btn btn-success login-btn' onClick={handleSignUp}>SignUp</button>
        </div>
      </div>
      <Footer />
      </Spin>
    </div>
  )
}

export default Signup