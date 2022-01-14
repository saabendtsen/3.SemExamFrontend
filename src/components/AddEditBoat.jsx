import React, { useEffect, useState } from "react";
import facade from "../apiFacade";
import { Server_URL } from "./Urls";
import { Form, Button, Table } from "react-bootstrap";

const AddEditBoat = (props) => {

    const [newBoat, setNewBoat] = useState({ ...props});

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
    };

    return (
        <>
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
    )
}

export default AddEditBoat