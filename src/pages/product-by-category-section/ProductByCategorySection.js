import React, { useEffect, useLayoutEffect } from 'react'
import "./ProductByCategorySection.scss"
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import CategoryProducts from '../../components/category-products/CategoryProducts'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import CategoryWiseData from '../../tmart-data/CategoryWiseData'
import { useSelector } from 'react-redux'

const ProductByCategorySection = () => {
    const params = useParams();
    const location = useLocation();

    const productData = useSelector((state) => state?.ProductReducer?.productData);

    // Scroll to top if path changes
    useLayoutEffect(() => {
      window && window.scrollTo(0, 0);
    }, [location.pathname]);

    console.log("CategoryWiseData",CategoryWiseData)
    const productCategoryData = productData?.filter(item => {
        return (
            item?.categoryId === params?.categoryId
        )
    })
    console.log("productData by category", productCategoryData)
    return (
        <div>
            <Navbar />
            <h3 className='product-category-name'>{productCategoryData[0]?.categoryId}</h3>
            <div className='product-by-category'>
                {
                    productCategoryData.map(item => {
                        return (
                            <CategoryProducts data={item} key={item._id}/>
                        )
                    })
                }
            </div>
            <Footer />
        </div>
    )
}

export default ProductByCategorySection