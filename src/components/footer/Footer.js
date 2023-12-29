import React from 'react'
import "./Footer.scss"
import TmartLogo from "../../assets/logo.png"
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className='footer-section'>
            <div className='section1'>
                <div className='logo-section'>
                    <img src={TmartLogo} />
                </div>
                <div className='social-media-section'>
                    <FaInstagram className='' />
                    <FaTwitter className='social-media-icon' />
                    <FaFacebookF className='social-media-icon' />
                    <FaLinkedinIn className='social-media-icon' />
                </div>
                <div className='copyright-section'>
                    <p>© Copyright {currentYear} Fit Grocery, Inc. All rights reserved</p>
                </div>
            </div>
            <div className='section2'>
                <p>Home</p>
                <p>Delivery Areas</p>
                <p>Careers</p>
                <p>Customer Support</p>
                <p>Press</p>
            </div>
            <div className='section3'>
                <p>Terms of Use</p>
                <p>Privacy Policy</p>
                <p>Responsible Disclosure Policy</p>
                <p>Mojo - a Zepto Blog</p>
            </div>
            <div className='section4'>
                <h4>Subscribe Now</h4>
                <p>Subscribe your email for newsletter and featured news based on your interest</p>
                <div className='subscribe-section'>
                    <MdOutlineMail className='subscribe-email-logo'/>
                    <input type="email" placeholder='Enter Your Email Address' className='subscribe-input' />
                    <FaCircleArrowRight className='subscribe-arrow'/>
                </div>
                <div className='payment-cards'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNbkuPJieLPjT8aCL7rBX_v-V--FaousGZPz9aklRPDE3047ZK9djTppF64TCUV0RhPcw&usqp=CAU"/>
            </div>
            </div>
        </div>
    )
}

export default Footer