import Axiosinstance from '../../api/Axiosinstance'
import React, { useEffect, useState } from 'react'
import CountUp from "react-countup";
import { NavLink } from "react-router-dom";
import { GridLoader} from "react-spinners";
import Loader from '../Loader';
import Card from '../Card';


const Jewellery = () => {
  let [state,setState]=useState([])
  let [loading,setLoading]=useState(true)

  let fetchApi=async ()=>{
    let resp= await Axiosinstance.get("/products")
     setState(resp.data.filter((obj)=>{ return obj.category=="jewelery"}))
      setLoading(false)
  }

 useEffect(()=>{
  fetchApi()
 },[])


 if(loading){
  return (
   <Loader/>
  )
}
return( 
  <div className="p-10 flex flex-wrap gap-20 justify-around">
   {state.map((obj,index)=>{
    return  <Card key={index} product={obj} />
  })}
  </div>)
}

export default Jewellery
