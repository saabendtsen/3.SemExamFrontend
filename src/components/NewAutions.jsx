import React, { useEffect, useState } from "react";
import facade from "../apiFacade";
import { Server_URL} from "./Urls";
import {Form, Button, Table} from "react-bootstrap";


const NewAutions = () => {
    const [newAution,setNewAution] = useState();


    const handleChange = (evt) => {
        setNewAution({ ...newAution, [evt.target.id]: evt.target.value });
      };


    const handleSubmit = (evt) => {
        evt.preventDefault();
        const options = facade.makeOptions("POST", true, newAution);
        fetch(Server_URL + "/api/auction/createAuction", options).then((res) =>
          facade.handleHttpErrors(res))
          .then((data) => {
          console.log(data)})
      };

    return(<>

 <div className="form-group"
  onChange={handleChange}
  onSubmit={handleSubmit}
     >
      <Form>
        <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder="Enter Location" />
        </Form.Group>
        <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="text" placeholder="Enter Date for Aution yyyy-mm-dd" />
        </Form.Group>
        <Form.Group controlId="time">
            <Form.Label>Time</Form.Label>
            <Form.Control type="text" placeholder="Enter Time for Aution HH:mm:ss" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
        </>)
}
export default NewAutions;