import React, { useEffect, useState } from 'react'
import "./FavouritePick.scss"
import Slider from "react-slick";
import { FaEye } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import {FaChevronLeft, FaChevronRight} from 'react-icons'
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const FavouritePick = () => {

    const navigate = useNavigate();

    const productData = useSelector((state) => state?.ProductReducer?.productData);

    const [sliderRef, setSliderRef] = useState(null)

    const sliderSettings = {
        // autoplay: true,
        // autoplaySpeed: 3000,
        // dots: true,
        // infinite: true,
        // speed: 2000,
        // slidesToShow: 6,
        // slidesToScroll: 1,
        // arrows: false,
        // fade:true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 2000,
        dots: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            }
        ],
    };


    return (
        <div className='favouriteSlider'>
            <div className='controls'>
                <button className="btn-prev" onClick={sliderRef?.slickPrev}>
                    <IoMdArrowDropleftCircle />
                </button>

                <button className="btn-next" onClick={sliderRef?.slickNext}>
                    <IoMdArrowDroprightCircle />
                </button>
            </div>
            
            <Slider ref={setSliderRef} {...sliderSettings} className='favouriteSlider'>
                {productData?.length ? productData?.map((item, index) => {
                    return (
                        <div className='favouriteSliderData' key={index}>
                            <div className='item-image-section'>
                                <img src={item.url} />
                            </div>

                            <p className='item-name'>{item.name}</p>
                            <p className='item-qty'>{item.qty}</p>
                            <div className='item-price-section'>
                                <div className='price-section'>
                                    <p className='mrp-price'>{item.mrp}</p>
                                    <p className='sale-price'>{item.price}</p>
                                </div>
                                <div className='item-btn-section'>
                                    <button className='btn btn-outline-danger' onClick={() => {
                                        navigate(`/products/${item.name}`)
                                    }}>Add</button>
                                </div>

                            </div>
                        </div>
                    )
                }) :""}
            </Slider>

        </div>
    )
}

export default FavouritePick


/*
    <FaEye className='eye-btn' onClick={()=>{
                                     navigate(`/products/${item.name}`)
                                }}/>
    <FaCirclePlus className='eye-btn' onClick={handleChange}/>
*/