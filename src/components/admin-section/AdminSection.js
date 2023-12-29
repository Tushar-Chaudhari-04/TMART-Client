import React from 'react'
import "./AdminSection.scss"
import Navbar from '../navbar/Navbar'
import Footer from "../footer/Footer"

const AdminSection = () => {
  return (
    <div className='admin-section'>
      <div className='admin-panel'>
        <div className='left-section'>
          <p>Add Products</p>
          <p>Update Products</p>
          <p>Delete Products</p>
          <p>Search Products</p>
        </div>
        <div className='admin-border-line'></div>
        <div className='right-section'>
        <div className='admin-product-crud'>
          <h1></h1>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSection