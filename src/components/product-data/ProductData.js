import React from 'react'
import "./ProductData.scss"
import CategoryProducts from '../category-products/CategoryProducts'

const ProductData = ({productSearch}) => {

    const productSearchData=productSearch?.filteredProducts?productSearch?.filteredProducts:productSearch;
  return (
         <div className='product-by-category'>
                {
                   productSearchData?.length>0?productSearchData?.map(item => {
                        return (
                            <CategoryProducts data={item} key={item._id}/>
                        )
                    }):<div><strong>Search Products are not available...</strong></div>
                }
            </div>
  )
}

export default ProductData