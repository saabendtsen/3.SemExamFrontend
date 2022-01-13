import React, { useEffect, useState } from "react";
import facade from "../apiFacade";
import { Server_URL} from "./Urls";
import {Table} from "react-bootstrap";


const AllAuctions = () => {

    const [allAuctions,setAllAuctions] = useState([])

   
    useEffect(() =>{
        const options = facade.makeOptions("GET", true);
        fetch(Server_URL + "/api/auction/allAuction",options)
        .then((res) => facade.handleHttpErrors(res))
        .then((data) => setAllAuctions(data))
      },[])


    return (
        <>
        <h2>All auctions</h2>
   <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Boats</th>
          </tr>
        </thead>
        <tbody>
          {allAuctions.map((el, idx) => (
            <tr key={idx}>
              <td>{el.name}</td>        
              <td>{el.location}</td>
              <td>{el.date}</td>      
              <td>{el.time}</td>        
              <td>{el.boatList.map((el, idx) =>(
                <ul key={idx}>{el.name}</ul>
              ))}</td>
            </tr>
          ))}
        </tbody>
      </Table> 
       </>
    )
}

export default AllAuctions;