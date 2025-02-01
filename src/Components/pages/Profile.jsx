import React, { useContext, useState } from "react";
import LoginSignUpForm from "./LoginSignUpForm";
import { loginContext } from "../../App";
import { NavLink, useNavigate } from "react-router-dom";

const Profile = () => {
 let navigate= useNavigate()
  let { loginState, handleLogin, handleLogout } = useContext(loginContext);
  let [isLogin, setIsLogin] = useState(true); // Toggle between login and signup  
  console.log("Current Login State:", loginState);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find((user) => user.email === formData.email);

    if (isLogin) {
      if (!userExists) return alert("User does not exist. Please sign up.");
      if (userExists.password !== formData.password) return alert("Incorrect password");
      handleLogin(userExists);
      alert("Login successful!");
     navigate("/")
    } else {
      if (userExists) return alert("User already exists. Please login.");
      existingUsers.push(formData);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      alert("Signup successful! Please Login.");
      setIsLogin(true);
      setFormData({ username: "", email: "", password: "" }); // Reset form
    }
  };

  if (loginState !== null) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-white">
        <h2 className="text-3xl font-bold">Welcome, {loginState.username}!</h2>
        <p className="text-lg">Email: {loginState.email}</p>
        <button 
          onClick={handleLogout} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-white">
      <LoginSignUpForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formLoginType={isLogin}
        setIsLogin={setIsLogin}
      />
    </div>
  );
};

export default Profile;
