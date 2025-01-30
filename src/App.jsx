import "./App.css";
import React, { createContext, useState } from "react";
import Navitem from "./Navbar/Navitem";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Electronics from "./Components/pages/Electronics";
import Cart from "./Components/pages/Cart";
import Men from "./Components/pages/Men";
import Women from "./Components/pages/Women";
import Cheif from "./Cheif";
import Db_Fetch from "./db_fetch/Address";
import UpdateAddress from "./Components/UpdateAddress";
import NewAddress from "./Components/NewAddress";
import Footer from "./Footer";
import Jewellery from "./Components/pages/Jewellery";
import ProductDisplay from "./Components/productDisplay";
import Delivery from "./Components/Delivery";
import Profile from "./Components/pages/Profile";

export const cartContext = createContext();
export const loginContext = createContext();

const App = () => {
  let [cartState, setCartState] = useState({
    cartItems: [],
    cartValue: 0
  });

  let [loginState, setLoginState] = useState(JSON.parse(localStorage.getItem("login")) || null);

  const handleLogin = (user) => {
    setLoginState(user);
    localStorage.setItem("login", JSON.stringify(user));
  };

  const handleLogout = () => {
    setLoginState(null);
    localStorage.removeItem("login");
  };

  return (
    <loginContext.Provider value={{ loginState, handleLogin, handleLogout }}>
      <cartContext.Provider value={{ cartState, setCartState }}>
        <div className="overflow-hidden">
          <BrowserRouter>
            {loginState && <Navitem />} {/* Only show Navbar if logged in */}
            <div className="min-h-[100vh] w-[100vw] bg-slate-700">
              <Routes>
                {/* If not logged in, show only login/signup page */}
                {!loginState ? (
                  <>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/profile" />} />
                  </>
                ) : (
                  <>
                    {/* If logged in, show all pages */}
                    <Route path="/" element={<Cheif />} />
                    <Route path="/electronics" element={<Electronics />} />
                    <Route path="/men" element={<Men />} />
                    <Route path="/women" element={<Women />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/updateaddress" element={<UpdateAddress />} />
                    <Route path="/newaddress" element={<NewAddress />} />
                    <Route path="/jewellery" element={<Jewellery />} />
                    <Route path="/productdisplay" element={<ProductDisplay />} />
                    <Route path="/delivery" element={<Delivery />} />
                    <Route path="/address" element={<Db_Fetch />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </>
                )}
              </Routes>
            </div>
            {/* Footer is always shown if logged in */}
            {loginState && <Footer />}
          </BrowserRouter>
        </div>
      </cartContext.Provider>
    </loginContext.Provider>
  );
};

export default App;
