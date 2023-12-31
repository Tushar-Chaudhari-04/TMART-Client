import { React, useLayoutEffect, useState } from 'react'
import "./Login.scss"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import loginImg from "../../assets/login2.jpg"
import { USER, ACCESS_TOKEN, setItem, USER_LAST_NAME, USER_FIRST_NAME } from '../../utils/localStorageManager';
import { message } from "antd"
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '../../redux/slice/UserSlice'
import { axiosClient } from '../../utils/AxiosClient'

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

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

    //Email Field
    if (!user.email) {
      message.error("Email is requried feild");
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

    return true;
  }

  const performAPICall = async () => {
    let response = {};
    let errored = false;
    try {
      const response = await axiosClient.post(`/auth/login`,
        {
          email: user.email,
          password: user.password,
        })
      setLoading(false);
      return response;
    } catch (err) {
      errored = true;
      console.log("err", err);
    }
  }

  const handleLogin = async () => {
    if (validateInput()) {
      setLoading(true);
      const response = await performAPICall();
      const responseData = response?.data;
      if (responseData?.statusCode === 200) {
        setItem(USER, JSON.stringify(responseData?.result));
        setItem(ACCESS_TOKEN,JSON.stringify(responseData?.result?.jwt_token))
        setUser({
          email: "",
          password: ""
        });
        setTimeout(()=>{
          setLoading(false);
        },1000)
        dispatch(getUserInfo());
        message.success(responseData?.message)
        navigate("/")
      } else if ((responseData?.statusCode!==200)) {
        setTimeout(()=>{
          setLoading(false);
        },1000)
        message.error(responseData?.result?responseData?.result:"Network Error.Please try after sometime...");
        navigate("/login")
      }
    }
  }
  return (
    <div className='login'>
      <Spin size="large" tip="Loading" spinning={loading} fullscreen={loading}>
        <Navbar />
        <div className='login-section'>
          <div className='login-image'>
            <img src={loginImg} />
          </div>

          <div className='login-data'>
            <h2 style={{ color: "var(--primary-color)" }}>Login</h2>
            <div className='email-section'>
              <h6>Email</h6>
              <input className="login-email" type='email' placeholder='Enter Email'
                name='email' onChange={handleChange} />
            </div>

            <div className='password-section'>
              <h6>Password</h6>
              <input className="login-password" type="password" placeholder='Enter Password'
                name='password' onChange={handleChange} />
            </div>
            <button className='btn btn-success login-btn'
              onClick={handleLogin}>Login</button>
            <p style={{ justifyContent: "center", alignItems: "center", marginTop: "10px", marginLeft: "-20px" }}>OR</p>
            <button className='btn btn-success login-btn' onClick={() => navigate("/register")}>SignUp</button>
          </div>
        </div>
        <Footer />
      </Spin>
    </div>
  )
}

export default Login