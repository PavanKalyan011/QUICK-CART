


import React, {useEffect, useState} from "react";
import Axiosinstance from "../api/Axiosinstance";
import Card from "./Card";
import Loader from "./Loader";


const Products= () => {
  let [state, setState] = useState([]);
  let [loading, setLoading] = useState(true);

  let fetch = async () => {
    let resp = await Axiosinstance.get("/products");
      setState(resp.data);
      setLoading(false); 
  };
  useEffect(() => {
    fetch(); 
  }, []);
  

  
  if (loading) {
     return <Loader/>
  } 
   return( 
    <div className="p-10 flex     flex-wrap  gap-20 justify-around">
       
      {state.map((obj,index)=>{
      return(  
     
      <Card key={index} product={obj}   />
    )  
    })}
   
    </div>)
};

export default Products;




