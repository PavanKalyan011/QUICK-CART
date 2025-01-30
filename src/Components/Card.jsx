import React, {useContext, useEffect, useState} from "react";
import CountUp from "react-countup";
import { NavLink, useLocation } from "react-router-dom";
import { cartContext } from "../App";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const Card = (props) => {
 let {cartState,setCartState}= useContext(cartContext)
 let loc=useLocation();
//  console.log(cartState)
 let {id, title, price, rating, image,description,brand,color,model}=props.product
 
  // Generalized function to update cart
  const updateCart = (type) => {
    setCartState((prev) => {
      const existingItem = prev.cartItems.find((item) => item.title === title);

      if (type === "increment") {
        // Increment quantity or add new item
        return {
          ...prev,
          cartValue: prev.cartValue + 1,
          cartItems: existingItem
            ? prev.cartItems.map((item) =>
                item.title === title ? { ...item, quantity: item.quantity + 1 } : item
              )
            : [...prev.cartItems, { ...props.product, quantity: 1 }],
        };
      }

      if (type === "decrement" && existingItem) {
        const updatedItems = prev.cartItems
          .map((item) =>
            item.title === title
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0); // Remove items with quantity 0
          if (updatedItems.length === 0) {
            localStorage.removeItem("cartItems");
            return { ...prev, cartValue: 0, cartItems: [] };
          }

        return {
          ...prev,
          cartValue: Math.max(prev.cartValue - 1, 0), // Ensure cartValue doesn't go negative
          cartItems: updatedItems,
        
        };
     
      }
     
       

      return prev; // Default return if no match
    });
  };
  useEffect(() => {
    try {
      const savedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      if (Array.isArray(savedItems) && savedItems.length > 0) {
        setCartState(prev => ({
          ...prev,
          cartItems: savedItems,
          cartValue: savedItems.reduce((acc, item) => acc + item.quantity, 0),
        }));
      }
    } catch (error) {
      console.error("Error parsing cartItems from localStorage:", error);
    }
  }, []);
  

        useEffect(() => {
          if(cartState.cartItems.length>0){
          localStorage.setItem("cartItems", JSON.stringify(cartState.cartItems));
          }else{
            localStorage.removeItem("cartItems");
          }
        }, [cartState.cartItems]);

  const productInCart = cartState.cartItems.find((item) => item.title === props.product.title);
const quantity = productInCart ? productInCart.quantity : 0;



    return (
      
            <div className={`${loc.pathname==="/cart" && " min-h-[300px] w-[300px] gap-4 p-5" } rounded-3xl bg-white   flex font-semibold flex-col items-center justify-center text-center min-h-[350px] w-[350px] gap-5 p-5  `}>
             <NavLink to="/productdisplay" state={id}>
              <img src={image} alt="" className="h-[180px] w-[260px] my-2" />
              <h3 className="text-xl ">{title.slice(0, 25)}</h3>

              <span class="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
              <h4 className="text-lg"> Price : ${loc.pathname === "/cart" ? price*(props.product.quantity||1) : <CountUp end={price} />}   </h4>
                </span>
           
            { rating && <h5 >Rating : {rating.rate}</h5>}
              </NavLink>
            {brand  && <p >Brand : { brand.toUpperCase()}</p>}
            {/* {model && <p >Model :{model}</p> }
            {color && <p >Color : {color}</p>} */}
            
           {loc.pathname!=="/cart" ? 
           <div className='flex gap-5'>
              <NavLink to="/address" >
                <div  >
                  <button className="border bg-blue-950 w-[110px] h-[40px] rounded-2xl  text-white font-bold">
                    Buy Now
                  </button>
                </div>
              </NavLink>
                <div >
                  {quantity >0?
                      <div className="flex gap-4">
                      <button className="border bg-blue-950 w-[50px] h-[40px] rounded-2xl  text-white font-bold  flex justify-center items-center" onClick={()=>{updateCart("decrement")}}>
                      <FaMinus/>  
                      </button>
                      <span className="text-2xl">{quantity}</span>
                      <button className="border bg-blue-950 w-[50px] h-[40px] rounded-2xl  text-white font-bold flex justify-center items-center" onClick={()=>{updateCart("increment")}}>
                      <FaPlus/>
                      </button>
                      </div>
                  :
                     <button className="border bg-blue-950 w-[130px] h-[40px] rounded-2xl  text-white font-bold" onClick={()=>{updateCart("increment")}}>
                     Add to Cart
                     </button>
                  }
                </div>
              </div>
          :
           <div className="flex gap-6">
              <button className="border bg-blue-950 w-[50px] h-[40px] rounded-2xl  text-white font-bold  flex justify-center items-center" onClick={()=>{updateCart("decrement")}}>
              <FaMinus/>  
              </button>
              <span className="text-2xl">{props.product.quantity}</span>
              <button className="border bg-blue-950 w-[50px] h-[40px] rounded-2xl  text-white font-bold flex justify-center items-center" onClick={()=>{updateCart("increment")}}>
              <FaPlus/>
              </button>
           </div>
           }
              
            </div>             
    ); 
  
};

export default Card;



