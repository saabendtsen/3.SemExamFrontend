import React, { useEffect, useState } from "react";
import facade from "../apiFacade";
import { Server_URL} from "./Urls";
import {Table,Button} from "react-bootstrap";


const AllAuctions = () => {

    const [allAuctions,setAllAuctions] = useState([])

   
    useEffect(() =>{
        const options = facade.makeOptions("GET", true);
        fetch(Server_URL + "/api/auction/allAuction",options)
        .then((res) => facade.handleHttpErrors(res))
        .then((data) => setAllAuctions(data))
      },[allAuctions])


      const deleteFromAuction = (evt) =>{
          console.log(evt.target.value);
        const options = facade.makeOptions("DELETE", true);
        fetch(Server_URL + "/api/boat/deleteFromAuction/" + evt.target.value, options).then((res) =>
            facade.handleHttpErrors(res))
            .then((data) => console.log(data));
      }



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
              <td>{el.boatList.map((boat, Boatidx) =>(
                <ul key={Boatidx}>{boat.name} <Button variant="danger" type="submit" value={boat.id} onClick={deleteFromAuction}>Delete</Button></ul>
              ))}</td>
            </tr>
          ))}
        </tbody>
      </Table> 
       </>
    )
}

export default AllAuctions;