import React from 'react'
import "./FavouritePick.scss"
import Slider from "react-slick";
import { FaEye } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FavouritePick = () => {

    const navigate = useNavigate();
    
    const productData = useSelector((state) => state?.ProductReducer?.productData);
    console.log("productData",productData)

    var settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1
    };

   // console.log("data", data)

    const handleChange = () => {
        console.log("btn clicked")

    }
    return (
        <div className='favouriteSlider'>
            <Slider {...settings} className='favouriteSlider'>
                {productData?.map(item => {
                    return (
                        <div className='favouriteSliderData'>
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
                                    {/* <FaEye className='eye-btn' onClick={()=>{
                                     navigate(`/products/${item.name}`)
                                }}/> */}
                                    {/* <FaCirclePlus className='eye-btn' onClick={handleChange}/> */}
                                </div>

                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}

export default FavouritePick