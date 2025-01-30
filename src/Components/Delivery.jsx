import React from 'react'
import { FcShipped } from "react-icons/fc";

const Delivery = () => {
  return (
    <div className=' flex  flex-col items-center justify-center p-10 gap-10'>
      <div><FcShipped className='size-16 animate-move'/></div>
      <h1 className='text-2xl font-bold'>Your order will be delivered soon</h1>
    </div>
  )
}

export default Delivery
