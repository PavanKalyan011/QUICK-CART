import React, { useEffect, useState } from "react";
import { useLocation,NavLink } from "react-router-dom";
import Axiosinstance from "../api/Axiosinstance";
import Loader from "./Loader";
import { FaPlus, FaMinus } from "react-icons/fa";
import { cartContext } from "../App";
import { useContext } from "react";
import { use } from "react";

const ProductDisplay = () => {
  const loc = useLocation().state;  // Get product ID passed as state
  console.log(useLocation());
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const { cartState, setCartState } = useContext(cartContext);

  const fetchProduct = async () => {
    try {
      const response = await Axiosinstance.get("/products");
      const product = response.data.find((prod) => prod.id === loc?.id);
      if (product) {
        setState(product);
      } else {
        console.error("Product not found!");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [loc]);

  // Handle cart updates (increment, decrement)
  const updateCart = (type) => {
    setCartState((prev) => {
      const existingItem = prev.cartItems.find((item) => item.title === state.title);

      if (type === "increment") {
        return {
          ...prev,
          cartValue: prev.cartValue + 1,
          cartItems: existingItem
            ? prev.cartItems.map((item) =>
                item.title === state.title ? { ...item, quantity: item.quantity + 1 } : item
              )
            : [...prev.cartItems, { ...state, quantity: 1 }],
        };
      }

      if (type === "decrement" && existingItem) {
        const updatedItems = prev.cartItems
          .map((item) =>
            item.title === state.title
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);

        return {
          ...prev,
          cartValue: Math.max(prev.cartValue - 1, 0),
          cartItems: updatedItems,
        };
      }

      return prev;
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-5">
      {/* Product Information Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img src={state.image} alt={state.title} className="w-full h-[70vh] rounded-xl shadow-lg" />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <h2 className="text-3xl font-semibold">{state.title}</h2>
          <p className="text-lg text-gray-950">{state.description}</p>
          
          {/* Price and Rating */}
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-950">${state.price}</span>
            {state.rating && (
              <span className="text-lg text-yellow-500">Rating: {state.rating.rate} ⭐</span>
            )}
          </div>

          {/* Brand and Other Info */}
          {state.brand && <p className="text-lg">Brand: {state.brand}</p>}
          {state.color && <p className="text-lg">Color: {state.color}</p>}
          {state.model && <p className="text-lg">Model: {state.model}</p>}

          {/* Add to Cart / Buy Now Section */}
          <div className="flex gap-5 mt-5">
           <NavLink to="/address"> <button className="border bg-blue-950 text-white font-bold py-2 px-4 rounded-xl">
              Buy Now
            </button></NavLink>
            <div className="flex items-center gap-4">
              <button
                className="border bg-blue-950 text-white font-bold py-2 px-4 rounded-xl flex justify-center items-center"
                onClick={() => updateCart("decrement")}
              >
                <FaMinus />
              </button>
              <span className="text-xl">{cartState.cartItems.find((item) => item.title === state.title)?.quantity || 0}</span>
              <button
                className="border bg-blue-950 text-white font-bold py-2 px-4 rounded-xl flex justify-center items-center"
                onClick={() => updateCart("increment")}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-5">You may also like</h3>
        <div className="flex flex-wrap gap-6">
          {/* Add your similar product cards here */}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
