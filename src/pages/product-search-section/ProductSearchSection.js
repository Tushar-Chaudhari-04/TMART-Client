import React, { useEffect, useState } from 'react'
import "./ProductSearchSection.scss"
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import CategoryProducts from '../../components/category-products/CategoryProducts'
import ProductData from '../../components/product-data/ProductData'
import { PRODUCT_DATA, getItem } from '../../utils/localStorageManager'


const ProductSearchSection = () => {
  
  const [productSearch,setProductSearch]=useState({});

    return (
    <div className='product-search-section'>
        <Navbar setProductSearch={setProductSearch}/>
       <ProductData productSearch={productSearch}/>
        <Footer/>
    </div>
  )
}

export default ProductSearchSection