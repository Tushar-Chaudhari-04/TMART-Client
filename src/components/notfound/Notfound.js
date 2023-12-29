import React from 'react'
import "./Notfound.scss"
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd';

const Notfound = () => {
  const navigate=useNavigate();

  return (
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={()=>{navigate("/")}}>Back Home</Button>}
  />
  )
}

export default Notfound

/*
<div className='not-found'>
      <h1>404</h1>
      <h5>It seems that you are lost in perpetual black hole.
         let us help guide you out and get back you to home page
      </h5>
      <button className='btn btn-primary bnt-home' onClick={()=>navigate("/")}>Home</button>
    </div>
*/