import React from 'react'

const MainLoader = ({type='warning',size=100}) => {
  return (
    <div
    style={{
      position:"fixed",
      top:"0",
      left:"0",
      width:"100vw",
      height :"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}>
      <div className='spinner-border text-warning' style={{
        width: "10rem",
        height:"10rem"
      }}></div>
    </div>
  )
}

export default MainLoader
