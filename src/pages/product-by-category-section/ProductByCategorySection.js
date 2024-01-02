import React, { useEffect, useLayoutEffect } from 'react'
import "./ProductByCategorySection.scss"
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import CategoryProducts from '../../components/category-products/CategoryProducts'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import CategoryWiseData from '../../tmart-data/CategoryWiseData'
import { useSelector } from 'react-redux'
import ProductData from '../../components/product-data/ProductData'

const ProductByCategorySection = () => {
    const params = useParams();
    const location = useLocation();

    const productData = useSelector((state) => state?.ProductReducer?.productData);

    // Scroll to top if path changes
    useLayoutEffect(() => {
      window && window.scrollTo(0, 0);
    }, [location.pathname]);

    const productCategoryData = productData?.filter(item => {
        return (
            item?.categoryId === params?.categoryId
        )
    })

    return (
        <div className='pro-cat-section'>
            <Navbar />
            <h3 className='product-category-name'>{params?.categoryId}</h3>
            <ProductData productSearch={productCategoryData}/>
            <Footer />
        </div>
    )
}

export default ProductByCategorySection