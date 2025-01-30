import React, { useEffect, useState } from 'react'
import { Axiosinstance2 } from '../../api/Axiosinstance'
import Loader from '../Loader'
import Card from '../Card'

const Electronics = () => {
  let [state,setState]=useState([])
  let [loading,setLoading]=useState(true)
  let fetchApi=async ()=>{
     let resp= await Axiosinstance2.get("/products"); 
      setState(resp.data.products)
      setLoading(false)
  }
useEffect(()=>{
  fetchApi();
},[])
if(loading){
 <Loader/>
 } 
 return (
    <div className='p-10 flex flex-wrap gap-20 justify-around'>
     {state.map((obj,index)=>{
      return <Card product={obj} key={index}/>
     })}
    </div>
)
}

export default Electronics
