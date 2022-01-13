import React, { useEffect, useState } from "react";
import facade from "../apiFacade";
import { Server_URL} from "./Urls";
import {Form, Button, Table} from "react-bootstrap";


const MyBoats = () =>{

   const [boats,setBoatList] = useState([]);
   const [newBoat,setNewBoat] = useState();



   
  useEffect(() =>{
    const options = facade.makeOptions("GET", true);
    fetch(Server_URL + "/api/boat/myBoats",options)
    .then((res) => facade.handleHttpErrors(res))
    .then((data) => setBoatList(data))
  },[])


   const handleChange = (evt) => {
    setNewBoat({ ...newBoat, [evt.target.id]: evt.target.value });
  };


  const handleSubmit = (evt) => {
    evt.preventDefault();
    const options = facade.makeOptions("POST", true, newBoat);
    fetch(Server_URL + "/api/boat/createBoat", options).then((res) =>
      facade.handleHttpErrors(res))
      .then((data) => {
      console.log(data)})
  };


return (
  <> 
   <h2>My Boats</h2>
   <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Make</th>
            <th>Brand</th>
            <th>Image</th>
            <th>Owners</th>
          </tr>
        </thead>
        <tbody>
          {boats.map((el, idx) => (
            <tr key={idx}>
              <td>{el.name}</td>        
              <td>{el.make}</td>
              <td>{el.brand}</td>      
              <td>{el.image}</td>        
              <td>{el.owners.map((el, idx) =>(
                <ul key={idx}>{el.name}</ul>
              ))}</td>
            </tr>
          ))}
        </tbody>
      </Table> 
  
  
  <div className="form-group"
  onChange={handleChange}
  onSubmit={handleSubmit}
     >
      <Form>
        <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group controlId="make">
            <Form.Label>Make</Form.Label>
            <Form.Control type="text" placeholder="Enter Make" />
        </Form.Group>
        <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control type="text" placeholder="Enter Brand" />
        </Form.Group>
        <Form.Group controlId="image">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="Enter URL" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    <div>{JSON.stringify(newBoat)}</div>
  </>
)}

export default MyBoats;
