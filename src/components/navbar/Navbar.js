import React, { useState } from 'react'
import "./Navbar.scss"
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import fitgrocery from "../../assets/logo.png" 
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [qty, setQty] = useState(10);
    const navigate=useNavigate();
    return (
        <nav className='navbar-section'>
            <div className='nav-up-section'>
                <div className='logo-section'>
                    {/* <FaShopify className='tmart-logo' />
                    <h3 className='tmart-name'>Tushar SuperMart</h3> */}
                    <a onClick={()=>navigate("/")}>
                    <img className="shop-logo" src={fitgrocery} alt="fitgrocery"/>
                    </a>
                </div>

                <div className='searchbar-section'>
                    <input type="text" placeholder='Search for products and categories' className='tmart-search' />
                    <button className='search-icon-btn'>
                        <IoMdSearch  className='search-icon'/>
                    </button>
                </div>

                <div className='nav-right'>
                    <div className='cart-section'>
                        <FaShoppingCart className='shopping-cart'/>
                        <span className='cart-qty'>{qty}</span>
                    </div>
                    <div className='user-section'>
                        <FaUser className='nav-icon'/>
                    </div>
                </div>

            </div>
            <div className='nav-down-section'>
                <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                    Categories
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Daily Essentials</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Cosmetics</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Other groceries</Dropdown.Item>
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
        </nav>
    )
}

export default Navbar