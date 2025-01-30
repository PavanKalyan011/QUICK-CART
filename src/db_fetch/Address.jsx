import React, { useEffect, useState } from "react";
import Db_Instance from "../databaseApi/Db_Instance";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Address = () => {
  let [state, setState] = useState([]);
  let fetch = () => {
    let data = Db_Instance.get("/address");
    data.then((res) => {
      setState(res.data);
    });
    data.catch((error)=>{
      console.log(error)
    })
  };
  useEffect(() => {
    fetch();
  }, []);

    const deleteData=(id)=>{
    Db_Instance.delete(`/address/${id}`)
   setState(prev=>prev.filter(obj=>obj.id != id))

    }
       
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleSelectionChange = (id) => {
      setSelectedAddress(id);
    };

  return (
    <div>
      <div className=" flex bg-gray-900  h-24   items-center">
        <div className="w-1/4 flex justify-center">
          <NavLink to="/">
            <img src={logo} alt="" className="h-16 animate-spin-slow hover:scale-[1.3] hover:rotate-90" />
          </NavLink>
        </div>
        <h1 className=" w-3/4 text-4xl text-white ml-[300px]">ADDRESS</h1>
      </div>
{/* <div> */}
         <NavLink to="/newaddress" state={state.length} className="bg-slate-800 w-1/3 ml-[33%] my-3 h-10 rounded-lg text-white font-semibold text-xl flex justify-center items-center" > <h1>Add new Address</h1></NavLink>
        {/* </div> */}
      {state.map((obj, index) => {
        let {id, username, email, phn_no, address, pincode }=obj;
        const isSelected = selectedAddress === id;
        return (
          <div className="m-2 " key={index}>
          <div className=" border bg-amber-100 flex p-3 " >
            <input type="radio" checked={isSelected} onChange={()=>{handleSelectionChange(id)}} name="address"/>
            <div className="m-2 flex w-[300px] flex-col gap-2 ">
              <p className="font-semibold text-lg">{username.charAt(0).toUpperCase()+username.slice(1)}</p>
              <p>{email}</p>
              <p>{phn_no}</p>
              <p>{address}</p>
              <p>{pincode}</p>
            </div>
            <div className=" mt-10   w-14 flex flex-col items-center justify-center gap-10">
              <button onClick={()=>{deleteData(id)}} className="flex gap-5 justify-center items-center"><span>Delete</span><MdDelete className="text-4xl"/></button>
             <button><NavLink to='/updateaddress' state={obj}  className="flex gap-10 justify-center items-center"><span>Edit</span><FaEdit className="text-3xl"  /></NavLink></button> 
            </div>
          </div>
          </div>
        );
      })}
    {selectedAddress && ( <NavLink to="/delivery">
      <span className="text-center flex justify-center text-white font-bold p-10 rounded-lg"><button className="border bg-slate-800 rounded-lg p-2  text-white">Proceed to Payment</button></span>
      </NavLink>)}
    </div>
  );
};

export default Address;
