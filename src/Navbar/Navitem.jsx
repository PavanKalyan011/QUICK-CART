import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { cartContext} from "../App";
import { FaSearch } from "react-icons/fa";
import { searchContext } from "../App";
const Navitem = () => {
  let {cartState}=useContext(cartContext)
  let {searchState,handleSearchResult}=useContext(searchContext);
//  console.log(useContext(searchContext))
// console.log(searchState)
// console.log(handleSearchResult)
// console.log(cartState.cartValue)
  let location = useLocation();
  let [serachInput,setSearchInput]=useState("");

  const handleInputChange = (e) => {
    let value = e.target.value;
    setSearchInput(value); 
    handleSearchResult(value); // Update global state
  };
  // console.log(setSearchInput)

 
  if (location.pathname === "/address" || location.pathname ==="/updateaddress" || location.pathname==="/newaddress") {
    return null;
  } else {
    return (
      <div className="flex  bg-gray-900  h-24 ">
          <div className="ml-10 w-1/4 flex justify-center items-center">
            <NavLink to="/" className="flex items-center gap-4 text-white font-bold text-2xl">
              <img src={logo} alt="Quickcart logo" className="h-16 animate-spin-slow hover:scale-[1.3] hover:rotate-90" />
               <h1 className="text-[11  px] absolute top-4 left-40">MY</h1>
                <h1 >QUICKCART</h1>
            </NavLink>
          </div>
          <div className=" ml-5 flex  items-center justify-center gap-4">
             <NavLink to="/searchresults"><FaSearch className=" size-4 relative top-5 left-36 fill-slate-400"/>
              <input type="text"  value={serachInput??""} placeholder="Search" onChange={(e)=>{handleInputChange(e)}} className="rounded-lg "/>
              </NavLink> 
          </div>
          <ul className="flex w-[65%]  justify-around items-center font-semibold text-xl text-white">
            <li>
              <NavLink to="/men">Men</NavLink>
            </li>
            <li>
              <NavLink to="/women">Women</NavLink>
            </li>
            <li>
              <NavLink to="/jewellery">Jewellery</NavLink>
            </li>
            <li>
              <NavLink to="/electronics">Electronics</NavLink>
            </li>
            <li>
              <NavLink to="/cart"  className="flex items-center gap-2">
              <p>Cart</p>
              <FaCartShopping />{cartState.cartValue>0 &&(<sup>{cartState.cartValue}</sup>)}
              </NavLink>
            </li>
            <li className="font-bold text-4xl">
              <NavLink to="/profile"> <CgProfile />
              </NavLink>
            </li>
          </ul>
      </div>
    );
  }
};

export default Navitem;
