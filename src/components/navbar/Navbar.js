import React, { useState, useEffect } from 'react'
import "./Navbar.scss"
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import fitgrocery from "../../assets/logo.png"
import { useNavigate } from 'react-router-dom';
import { BsFillHandbagFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { USER, ACCESS_TOKEN, setItem, getItem, USER_FIRST_NAME, removeItem, USER_LAST_NAME, PRODUCT_DATA } from '../../utils/localStorageManager';
import { Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../redux/slice/UserSlice';
import { IoMdClose } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHamburger } from "react-icons/fa";
import { message } from "antd"
import { axiosClient } from '../../utils/AxiosClient';

const Navbar = ({setProductSearch}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state?.UserReducer?.userInfo);
    const cartDataAll = useSelector((state) => state?.CartReducer?.cart);
    const cartData = cartDataAll.filter(item => item?.userId == userData?._id);

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [qty, setQty] = useState(cartData.length ? cartData.length : 0);
    const [searchParams, setSearchParams] = useState("");

    useEffect(() => {
        setUser(JSON.parse(getItem(USER)));
        setQty(cartData.length);
    }, [])

    const handleChange =async (e) => {
        const { name, value } = e.target;
        const modifiedText=convertToTitleCase(value);
        if(modifiedText.length>0){
            setSearchParams(modifiedText);
        }
       
        handleSearch();
    }

    const handleSearch = async() => {
        navigate("/search");
        if (typeof setProductSearch === 'function') {
            navigate("/search");
            const filteredResponse = await axiosClient.post(`/product/searchProduct?searchParams=${searchParams}`);
            const filteredProducts = filteredResponse?.data?.result;
            setProductSearch({filteredProducts});
          } else {
            message.info("Please Try Again...")
            console.error("setProductSearch is not a function");
          }
    }

    const convertToTitleCase = (str) => {
        if (!str) {
            return ""
        }
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    }

    const handleLogout = () => {
        message.success(`${user?.firstName} has logout successfully...`)
        setLoading(true);
        removeItem(USER);
        removeItem(USER_FIRST_NAME);
        removeItem(ACCESS_TOKEN);

        setTimeout(() => {
            setLoading(false);
            navigate("/login")
        }, 1000);

    }

    return (
        <nav className='navbar-section'>
            <Spin spinning={loading} fullscreen={loading}>
                <div className='nav-up-section'>
                    <div className='logo-section'>
                        {/* <FaShopify className='tmart-logo' />
                    <h3 className='tmart-name'>Tushar SuperMart</h3> */}
                        <a onClick={() => navigate("/")}>
                            <img className="shop-logo" src={fitgrocery} alt="fitgrocery" />
                        </a>
                    </div>

                    <div className='searchbar-section'>
                        <input type="text" placeholder='Search for products and categories' className='tmart-search' name='searchParams' onChange={handleChange} />
                        <button className='search-icon-btn' onClick={handleSearch}>
                            <IoMdSearch className='search-icon'/>
                        </button>
                    </div>

                    <div className='nav-right'>
                        {user && <div className='cart-section' onClick={() => navigate("/cart")}>
                            <BsFillHandbagFill className='shopping-cart' />
                            <p className='my-cart'>My Cart</p>
                            {qty > 0 ? <span className='cart-qty'>{qty}</span> : ""}
                        </div>
                        }
                        {!user && <div className='cart-section' onClick={() => navigate("/login")}>
                            <BsFillHandbagFill className='shopping-cart' />
                            <p className='my-cart'>Login</p>
                            {/* <span className='cart-qty'>{0}</span> */}
                        </div>
                        }
                        <div className='user-section'>
                            {user ? <>
                                <h4>Hi {user.firstName}</h4>
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        <FaUser className='nav-icon' />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {/* {user?.isAdmin && <Dropdown.Item href="" onClick={() => { navigate("/admin-section") }}>Admin Panel</Dropdown.Item>} */}
                                        <Dropdown.Item onClick={() => { navigate("/profile") }}>Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { navigate("/orders") }}>Orders</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { navigate("/orders") }}>Address</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { navigate("/orders") }}>Wallet</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { navigate("/customer-support") }}>Customer Support</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </> : (
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        <FaUser className='nav-icon' />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => { navigate("/register") }}>Register</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { navigate("/login") }}>Login</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </div>
                        {user && <IoIosLogOut className='nav-icon' onClick={handleLogout} />}

                    </div>

                </div>
                <div className='nav-down-section'>
                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic">
                            Categories
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item >Daily Essentials</Dropdown.Item>
                            <Dropdown.Item >Cosmetics</Dropdown.Item>
                            <Dropdown.Item >Other groceries</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <a href='#'>About</a>
                    <a href='#'>Contact Us</a>
                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic">
                            More
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item >FAQs</Dropdown.Item>
                            <Dropdown.Item >Privacy Policy</Dropdown.Item>
                            <Dropdown.Item >Terms & Conditions</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {
                    showNav ?
                        <div className='nav-responsive'>
                            <div className='nav-responsive-up-section'>
                                <div className='logo-section'>
                                    <a onClick={() => navigate("/")}>
                                        <img className="shop-logo" src={fitgrocery} alt="fitgrocery" />
                                    </a>
                                </div>
                                <IoMdClose className='nav-icon' onClick={() => { setShowNav(!showNav) }} />
                            </div>
                            <div className='nav-search-and-cart'>
                                <div className='searchbar-section'>
                                    <input type="text" placeholder='Search for products and categories' className='tmart-search' />
                                    <button className='search-icon-btn'>
                                        <IoMdSearch className='search-icon' />
                                    </button>
                                </div>
                                <div className='nav-right'>
                                    {user && <div className='cart-section' onClick={() => navigate("/cart")}>
                                        <BsFillHandbagFill className='shopping-cart' />
                                        <p className='my-cart'>My Cart</p>
                                        {qty > 0 ? <span className='cart-qty'>{qty}</span> : ""}
                                    </div>
                                    }
                                    {!user && <div className='cart-section' onClick={() => navigate("/login")}>
                                        <BsFillHandbagFill className='shopping-cart' />
                                        <p className='my-cart'>Login</p>
                                        {/* <span className='cart-qty'>{qty}</span> */}
                                    </div>
                                    }
                                    <div className='user-section'>
                                        {user ? <>
                                            <h4>Hi {user.firstName}</h4>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                                    <FaUser className='nav-icon' />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {/* {user?.isAdmin && <Dropdown.Item href="" onClick={() => { navigate("/admin-section") }}>Admin Panel</Dropdown.Item>} */}
                                                    <Dropdown.Item onClick={() => { navigate("/profile") }}>Profile</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { navigate("/orders") }}>Orders</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { navigate("/orders") }}>Address</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { navigate("/orders") }}>Wallet</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { navigate("/customer-support") }}>Customer Support</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </> : (
                                            <Dropdown>
                                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                                    <FaUser className='nav-icon' />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => { navigate("/register") }}>Register</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { navigate("/login") }}>Login</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        )}
                                    </div>
                                    {user && <IoIosLogOut className='nav-icon' onClick={handleLogout} />}

                                </div>
                            </div>
                            <div className='nav-down-section'>
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        Categories
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item >Daily Essentials</Dropdown.Item>
                                        <Dropdown.Item >Cosmetics</Dropdown.Item>
                                        <Dropdown.Item >Other groceries</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <a href='#'>About</a>
                                <a href='#'>Contact Us</a>
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        More
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">FAQs</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Privacy Policy</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Terms & Conditions</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        :
                        <div className='nav-responsive'>
                            <div className='nav-responsive-up-section'>
                                <div className='logo-section'>
                                    <a onClick={() => navigate("/")}>
                                        <img className="shop-logo" src={fitgrocery} alt="fitgrocery" />
                                    </a>
                                </div>
                                <GiHamburgerMenu className='nav-icon' style={{ fontSize: "35px" }} onClick={() => { setShowNav(!showNav) }} />
                            </div>
                        </div>

                }
            </Spin>
        </nav >
    )
}

export default Navbar