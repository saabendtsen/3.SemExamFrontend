import React, { useEffect, useState } from "react";
import facade from "../apiFacade";
import { Server_URL } from "./Urls";
import { Table, Form, Button } from "react-bootstrap";


const MyBoats = () => {

  const [boats, setBoatList] = useState([]);
  const [newBoat, setNewBoat] = useState({make:"Enter Make",name:"Enter Name",brand:"Enter Brand",image:"Enter Image"});

  const storeBoatToEdit = (boat) => {
    setNewBoat({ ...boat })
  }

  const handleChange = (evt) => {
    setNewBoat({ ...newBoat, [evt.target.id]: evt.target.value });
  };


  const handleSubmit = (evt) => {
    evt.preventDefault();
    const options = facade.makeOptions("POST", true, newBoat);
    fetch(Server_URL + "/api/boat/createBoat", options).then((res) =>
      facade.handleHttpErrors(res))
      .then((data) => {
        console.log(data)
      })
      .then(setNewBoat({}))
  };

  const handleDelete = (evt) =>{
    evt.preventDefault();
    const opstions = facade.makeOptions("DELETE",true)
    fetch(Server_URL + "/api/boat/" + evt.target.value, opstions).then((res) =>
    facade.handleHttpErrors(res))
    .then((data) => {
      console.log(data)
    });
  }


  useEffect(() => {
    const options = facade.makeOptions("GET", true);
    fetch(Server_URL + "/api/boat/myBoats", options)
      .then((res) => facade.handleHttpErrors(res))
      .then((data) => setBoatList(data))
  }, [])


  return (
    <>
        <div className="row">
          <h2>My Boats</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Make</th>
                <th>Brand</th>
                <th>Image</th>
                <th>Owners</th>
                <th>At Aution</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {boats.map((el, idx) => (
                <tr key={idx}>
                  <td>{el.name}</td>
                  <td>{el.make}</td>
                  <td>{el.brand}</td>
                  <td>{el.image}</td>
                  <td>{el.owners.map((el, idx) => (
                    <ul key={idx}>{el.name}</ul>
                  ))}</td>
                  {el.auction ? (
                    <td>{el.auction.name}</td>
                  ) : (
                    <td>false</td>
                  )
                  }
                  <td><a href="xx" onClick={(e) => { e.preventDefault(); storeBoatToEdit(el) }}>edit</a> /
                   <Button variant="danger" type="submit" value={el.id} onClick={handleDelete}>Delete</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
      </div>
      <div className="col-md-5">
        <h2>Add/edit Boat</h2>
        <div className="form-group"
          onChange={handleChange}
          onSubmit={handleSubmit}
        >
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder={newBoat.name} />
            </Form.Group>
            <Form.Group controlId="make">
              <Form.Label>Make</Form.Label>
              <Form.Control type="text" placeholder={newBoat.make}/>
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control type="text" placeholder={newBoat.brand} />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder={newBoat.image} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
      <div>{JSON.stringify(newBoat)}</div>
    </>
  )
}

export default MyBoats;