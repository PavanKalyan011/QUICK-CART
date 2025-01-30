import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
 let loc= useLocation()
 if(loc.pathname=='/address'|| loc.pathname=='/updateaddress' || loc.pathname=="/newaddress"){
  return null;
 }else{
  return (
    <div className='bg-red-700 text-center w-[100vw] '  >
      <p>&copy;Copyright.  |    All Rights Reserved.    </p>
    </div>
  )
}
}

export default Footer
