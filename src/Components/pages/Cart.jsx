import React, { useContext } from 'react';
import Card from '../Card';
import { cartContext } from '../../App';
import { NavLink } from 'react-router-dom';
import { BsCart4 } from "react-icons/bs";

const Cart = () => {
  let { cartState } = useContext(cartContext);

  if (cartState.cartItems.length === 0) {
    return (
      <div className='flex h-screen justify-center items-center'>
        <BsCart4 className='text-9xl text-gray-500' />
        <h1 className='text-3xl text-center p-8 font-semibold  text-white '>Cart is Empty</h1>
      </div>
    );
  } else {
    return (
      <div className='flex h-screen'>
        <div className='flex flex-col gap-10 overflow-y-scroll w-[75%] p-10'>
          {cartState.cartItems.map((item, index) => (
            <Card key={index} product={item} />
          ))}
        </div>
        {cartState.cartItems.length > 0 && (
          <div className='min-h-[100vh] sticky top-10 right-0 bottom-0 w-[25%] bg-white p-10'>
            <div className='flex flex-wrap gap-5 justify-center mt-10'>
              <p className='text-lg font-bold'>Total Price: </p>
              <span className='text-lg font-semibold'>
                $ {cartState.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
              </span>
              <NavLink to='/address'>
                <button className='border text-white font-bold rounded-lg w-[12rem] h-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
                  Proceed to checkout
                </button>
              </NavLink>
              <div>
              <BsCart4 className=' mt-10 text-9xl text-gray-500' />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Cart;
