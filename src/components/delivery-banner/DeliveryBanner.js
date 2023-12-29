import React from 'react'
import "./DeliveryBanner.scss"

const DeliveryBanner = () => {
    return (
        <div className='delivery-banner'>
            <div className='banner-img'>
                <img src='https://cdn.zeptonow.com/web-static-assets-prod/artifacts/6.18.0/_next/static/media/eta_normal_lg_bg.0a1da1af.png' />
            </div>
            <div className='banner-text-section'>
                <img src={"https://www.zeptonow.com/images/cart/delivery-banner-icon.svg"}/>
                <p className=''> Delivering to you in 12 mins</p>
            </div>
        </div>
    )
}

export default DeliveryBanner