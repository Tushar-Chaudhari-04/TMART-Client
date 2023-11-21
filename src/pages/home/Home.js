import React from 'react'
import "./Home.scss"
import Navbar from '../../components/navbar/Navbar'
import HomeBanner from '../../components/home-banner/HomeBanner'
import HomeCategories from '../../components/home-categories/HomeCategories'

const Home = () => {
    return (
        <div>
            <Navbar />
            <HomeBanner/>
            <HomeCategories/>
        </div>
    )
}

export default Home