import React from 'react'
import "./WorkingProcessCard.scss"

const WorkingProcessCard = ({data}) => {
  return (
    <div className='WorkingProcessCard'>
        <div className='process-img-section'>
            <img src={data.imgURL} />
        </div>
        <div className='process-content-section'>
            <p className='process-content-s1'><strong>{data.head}</strong></p>
            <p className='process-content-s2'>{data.para}</p>
        </div>
    </div>
  )
}

export default WorkingProcessCard