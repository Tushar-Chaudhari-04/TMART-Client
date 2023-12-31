import React from 'react'
import "./HomeBanner.scss"
import VeggiesBanner from "../../assets/banner1.jpg"
import Slider from "react-slick";

const HomeBanner = () => {
    const bannerData = [
        {
            id: 1,
            bannerImageURL: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
            bannerTitle: "Fresh Vegetables & Groceries at your doorstep",
            bannerDesc: "We deliver fresh vegetables & groceries at your doorstep",
        },
        {
            id: 2,
            bannerImageURL: 'https://images.unsplash.com/photo-1495480137269-ff29bd0a695c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
            bannerTitle: 'Fresh Vegetables & Fruits at your doorstep',
            bannerDesc: 'Cherries and berries. Sweet peaches and nectarines. Summer baking season is here, and I couldn’t be more delighted.',
        }
    ]
    var settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='bannerslider'>
            <Slider {...settings} className='bannerslider'>
                {bannerData.map(item => {
                    return (
                        <div className='bannerdata'>
                            <div className='banner-img-section'>
                                <img src={item.bannerImageURL} alt="bannerImg" className='banner-img' />
                            </div>
                            <div className='banner-content'>
                                <h1>{item.bannerTitle}</h1>
                                <span>{item.bannerDesc}</span>
                                <button className='btn  shopnow-btn'>Shop More</button>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}

export default HomeBanner