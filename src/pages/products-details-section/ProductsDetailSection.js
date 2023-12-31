import React, { useEffect, useLayoutEffect } from 'react'
import "./ProductsDetailSection.scss"
import { useLocation, useParams } from 'react-router-dom'
import favouritePicksData from '../../tmart-data/FavouritePickData';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import ProductDetails from '../../components/product-details/ProductDetails';
import WorkingProcessSection from '../../components/working-process-section/WorkingProcessSection';
import CategoryWiseData from '../../tmart-data/CategoryWiseData';

const ProductsDetailSection = () => {
    const params = useParams();
    const location = useLocation();

    // Scroll to top if path changes
    useLayoutEffect(() => {
      window && window.scrollTo(0, 0);
    }, [location.pathname]);

    const productData = CategoryWiseData.find(item => {
        return (
            item.name === params.productId
        )
    })

    return (
        <div className='product-details-section'>
            <Navbar/>
            <ProductDetails data={productData}/>
            <WorkingProcessSection/>
            <Footer/>
        </div>
    )
}

export default ProductsDetailSection