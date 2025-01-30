import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Db_Instance from "../databaseApi/Db_Instance";
import Form from "./pages/form";

const NewAddress = () => {
  let loc = useLocation(); 
 let [state, setState] = useState({
    username: '',
    email: '',
    phn_no: '',
    address: '',
    pincode: '',
  });

  // Handling ID properly, ensuring it's a number.
  let id = loc.state ? loc.state + 1 : 1; // Defaulting to 1 if loc.state is undefined.
  console.log(id);
  console.log(loc.state);
  
  let navigate = useNavigate();

  const updateData = async () => {
    try {
      // Sending the new address data to the server
      await Db_Instance.post(`/address`, { id, ...state });
      setState({ username: '', email: '', phn_no: '', address: '', pincode: '' }); 
      console.log(state)
      alert("New Address added successfully");
      navigate("/address");
    } catch (error) {
      console.error("Error adding new address:", error);
      alert("Failed to add new address. Please try again.");
    }
  };

  return (
  <div>
    <Form state={state} setState={setState} updateData ={updateData} />
  </div>
  );
};

export default NewAddress;
