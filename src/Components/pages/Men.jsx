import Axiosinstance from '../../api/Axiosinstance'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import Card from '../Card'

const Men = () => {
  let [state,setState]=useState([])
  let [loading,setLoading]=useState(true)

  let fetchApi= async ()=>{
    let resp= await Axiosinstance.get("/products")
     setState(resp.data.filter((obj)=>{ return obj.category=="men's clothing"}))
      setLoading(false)
  }
 useEffect(()=>{
  fetchApi()
 },[])

 if (loading) {
  return <Loader/>
} 
return( 
 <div className="p-10 flex flex-wrap gap-20 justify-around">
  {state.map((obj,index)=>{
   return  <Card key={index} product={obj} />
 })}
 </div>)
}

export default Men
