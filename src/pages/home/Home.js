import React from 'react'
import "./Home.scss"
import Navbar from '../../components/navbar/Navbar'
import HomeBanner from '../../components/home-banner/HomeBanner'
import HomeCategories from '../../components/home-categories/HomeCategories'
import FavouritePick from '../../components/favourite-pick/FavouritePick'
import VegesBanner from '../../components/vegesbanner/VegesBanner'
import CategoryWiseData from "../../tmart-data/CategoryWiseData"
import AdvertisementBanner from '../../components/advertisement-banner/AdvertisementBanner'
import WorkingProcessSection from '../../components/working-process-section/WorkingProcessSection'
import Footer from '../../components/footer/Footer'
import { useSelector } from 'react-redux'

const Home = () => {
    const productData = useSelector((state) => state?.ProductReducer?.productData);
    console.log("productData",productData)
    return (
        <div className='home-tmart'>
            <Navbar />
            <HomeBanner/>
            <HomeCategories/>
            <FavouritePick />
            <VegesBanner/>
            <FavouritePick />
            <AdvertisementBanner/>
            <FavouritePick/>
            <WorkingProcessSection/>
            <Footer/>
        </div>
    )
}

export default Home