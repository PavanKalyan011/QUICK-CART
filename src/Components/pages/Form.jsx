import React from 'react'
import { useState } from 'react';

const Form = ({updateData,state,setState}) => {
  let { username, email, address, pincode, phn_no } = state;

  const handleUpdate = (e) => {
    let name = e.target.name;
    let value = e.target.value;  
  if (name === "email") {
    value = value.trim().toLowerCase();
  }
  if (name === "phn_no" || name === "pincode") {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
  }
  setState(prevState => ({ ...prevState, [name]: value }));
  };

    const [showConfirm, setShowConfirm] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setShowConfirm(true);
    };
  
    const confirmSubmission = () => {
      setShowConfirm(false);
      updateData(); // Perform the actual data update
    };
  
    const cancelSubmission = () => {
      setShowConfirm(false);
    };
  

  return (
    <div className="flex bg-gradient-to-r from-indigo-800 via-10% via-purple-500 via-30% via-purple-400 via-40% via-purple-300 via-50% via-purple-500 via-70% to-pink-500 justify-center w-screen border h-[100vh] items-center">
    <form
      onSubmit={(e) => handleSubmit(e)}
      method="post"
      className="w-[30%] h-[90vmin] border-4 border-cyan-900 p-8 grid grid-rows-6 grid-cols-1 rounded-xl bg-teal-50"
    >
      <label htmlFor="user" className="font-semibold text-base">
        Username :
      </label>
      <input
        type="text"
        id="user"
        name="username"
        className="border rounded-md hover:ring-2 ring-cyan-800 hover:border-none"
        value={username}
        onChange={handleUpdate}
        required
        placeholder="Enter name"
      />
      <br />
      <br />
      <label htmlFor="email" className="font-semibold text-base">
        Email :
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="border rounded-md hover:ring-2 ring-cyan-800 hover:border-none"
        value={email}
        onChange={handleUpdate}
        required
        placeholder="Enter email"
      />
      <br />
      <br />
      <label htmlFor="phn_no" className="font-semibold text-base">
        Contact :
      </label>
      <input
        type="tel"
        id="phn_no"
        name="phn_no"
        className="border rounded-md hover:ring-2 ring-cyan-800 hover:border-none"
        value={phn_no}
        maxLength={10}
        minLength={10}
        onChange={handleUpdate}
        required
        placeholder="Enter phone number"
      />
      <br />
      <br />
      <label htmlFor="address" className="font-semibold text-base">
        Address :
      </label>
      <input
        type="text"
        id="address"
        name="address"
        className="border rounded-md hover:ring-2 ring-cyan-800 hover:border-none"
        value={address}
        onChange={handleUpdate}
        required
        placeholder="Enter full address"
      />
      <br />
      <br />
      <label htmlFor="pin" className="font-semibold text-base">
        Pincode :
      </label>
      <input
        type="text"
        id="pin"
        name="pincode"
        className="border rounded-md hover:ring-2 ring-cyan-800 hover:border-none"
        value={pincode}
        maxLength={6}
        minLength={6}
        onChange={handleUpdate}
        required
        placeholder="Enter pincode"
      />
      <br />
      <br />
      <button  type='submit' className="border bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">
        Submit
      </button>
    </form>

    {showConfirm && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-md shadow-md text-center">
          <p className="mb-4">Are you sure you want to save this address?</p>
          <button
            onClick={confirmSubmission}
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-4"
          >
            Save
          </button>
          <button
            onClick={cancelSubmission}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </div>
  )
}

export default Form
