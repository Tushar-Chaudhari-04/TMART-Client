import React from 'react'
import "./VegesBanner.scss"
import VegesBanneImg from "../../assets/veges.png"

const VegesBanner = () => {
    return (
        <div className='vegesBanner'>
            <img src={VegesBanneImg} alt="VegesBanner" />
            <div className='veges-content'>
                <h2>Fresh Vegetables,Fruits and groceries at your doorstep</h2>
                <h4>We deliver fresh vegetables,fruits and groceries at your doorstep.</h4>
                <h4>We believe in delvering high quality products at best price</h4>
            </div>
        </div>
    )
}

export default VegesBanner