import React from "react";
import { FaEyeSlash } from "react-icons/fa";

const LoginSignUpForm = ({ formData, formLoginType, handleChange, handleSubmit, setIsLogin }) => {
  const passwordVisibility = () => {
    const password = document.querySelector('input[name="password"]');  
    password.type === "password" ? password.type = "text" : password.type = "password";
  }
  return (
    <div className={`flex justify-center items-center ${formLoginType ? "h-[40vh] p-[100px]" : "h-[80vh]"}`}>
      <form onSubmit={handleSubmit} className={`border ${formLoginType ? "h-[47vh]" : "h-[60vh]"} w-[30vw] bg-gray-800 ${formLoginType ? "p-2" : "p-6"} flex flex-col rounded-xl text-center`}>
        <label className="text-white font-semibold text-2xl">{formLoginType ? "Login" : "Register"}</label>
        <br />
        {!formLoginType && (
          <>
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="border-none rounded-lg p-1 placeholder-gray-400 text-black "
            />
            <br />
          </>
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-none rounded-lg p-1 placeholder-gray-400 text-black"
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border-none rounded-lg p-1 placeholder-content-visible text-black"
          
        />
        <FaEyeSlash className="border ml-[360px] mt-[-23px] fill-black" onClick={()=>{passwordVisibility()}}/>
        <br />
        <div className="flex justify-center">
          <button type="submit" className="border-none rounded-md w-16 h-8 p-1 text-white bg-slate-950">
            {formLoginType ? "Login" : "Sign Up"}
          </button>
        </div>
        <div className="mt-4 text-white text-center">
          {formLoginType ? (
            <p>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)} className="text-blue-500 cursor-pointer">
                Create Account
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)} className="text-blue-500 cursor-pointer">
                Login
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginSignUpForm;
