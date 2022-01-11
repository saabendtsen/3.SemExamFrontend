import React, { useEffect, useState } from "react";
import facade from "../apiFacade";
import { Server_URL, yourIp_URL } from "./Urls";


const Owners = () =>{

   const [OwnerList,setOwnerList] = useState([]);



  useEffect(() =>{
    const options = facade.makeOptions("GET", true);
    fetch(Server_URL + "/api/info/users",options)
    .then((res) => facade.handleHttpErrors(res))
    .then((data) => setOwnerList(data))
  },[])






return (
  <>
  <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>phone</th>
          </tr>
        </thead>
        <tbody>
          {OwnerList.map((el, idx) => (
            <tr key={idx}>
              <td>{el.name}</td>        
              <td>{el.address}</td>
              <td>{el.phone}</td>      
              <td>{el.phone}</td>        
            
            </tr>
          ))}
        </tbody>
      </table> 
  </>
)}

export default Owners;
