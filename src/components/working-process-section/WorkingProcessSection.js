import React from 'react'
import "./WorkingProcessSection.scss"
import WorkingProcessCard from '../working-process-card/WorkingProcessCard'
import WorkingProcessData from "../../tmart-data/WorkingProcessData"

const WorkingProcessSection = () => {
    return (
        <div className='WorkingProcessSection'>
            <h2>How it Works</h2>
            <div className='WorkingProcessCardSection'>
                {WorkingProcessData.map(item=>{
                    return(
                        <WorkingProcessCard data={item}/>
                    )
                })}
            </div>
        </div>
    )
}

export default WorkingProcessSection