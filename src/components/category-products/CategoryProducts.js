import React from 'react'
import "./CategoryProducts.scss"
import { useNavigate, useParams } from 'react-router-dom'
import CategoryWiseData from '../../tmart-data/CategoryWiseData';

const CategoryProducts = ({data}) => {
  const navigate = useNavigate();
  console.log("data 123321", data);
  return (
    <div className='category-product'>
      <div className='item-image-section'>
        <img src={data?.url} />
      </div>
      <p className='item-name'>{data?.name}</p>
      <p className='item-qty'>{data?.qty}</p>
      <div className='item-price-section'>
        <div className='price-section'>
          <p className='mrp-price'>₹{data?.mrp}</p>
          <p className='sale-price'>₹{data?.price}</p>
        </div>
        <div className='item-btn-section'>
          <button className='btn btn-outline-danger' onClick={() => {
            navigate(`/products/${data?.name}`)
          }}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default CategoryProducts