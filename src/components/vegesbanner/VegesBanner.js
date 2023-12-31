import React from 'react'
import "./VegesBanner.scss"
import VegesBanneImg from "../../assets/veges.png"

const VegesBanner = () => {
    return (
        <div className='vegesBanner'>
            <img src={VegesBanneImg} alt="VegesBanner" />
            <div className='veges-content'>
                <h3>Fresh Vegetables,Fruits and groceries at your doorstep</h3>
                <p><></>We deliver fresh vegetables,fruits and groceries at your doorstep.</p>
                <p>We believe in delvering high quality products at best price</p>
            </div>
        </div>
    )
}

export default VegesBanner