import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Db_Instance from "../databaseApi/Db_Instance";
import Form from "./pages/form";

const UpdateAddress = () => {
  let loc = useLocation();
  console.log(loc)
  let [state, setState] = useState(loc.state||{});
  let navigate = useNavigate();

  // Asynchronous function to update data
  const updateData = async () => {
    try {
      // Sending the updated data to the server
      await Db_Instance.put(`/address/${state.id}`, state);
      alert("Details updated successfully");
      navigate("/address"); // Navigate after successful update
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address. Please try again.");
    }
  };

 
  
  return (
   <Form state={state} setState={setState} updateData={updateData} />
  );
};

export default UpdateAddress;
