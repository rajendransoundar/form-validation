import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./App.css";

export default function App() {
  const initialvalues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialvalues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false); //initaly is false


  const handleChange = (e) => {
    console.log(e.target);
    const {name, value} = e.target
    setFormValues({...formValues, [name]: value});
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true); //when submit isSubmit is true
  };

  useEffect(() => {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!values.email) {
      errors.email = "email is required"
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter a valid email id"
    }
    if(!values.password) {
      errors.password = "password is required"
    }else if(values.password.length <4) {
      errors.password = "Password must be more than 4 characters"
    }
    return errors 
  }
 
  return (
    <div className="container">
      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      <Form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <hr />
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formValues.email}
            onChange = {handleChange}
            placeholder="Enter email"
          />
        </Form.Group>
        <p>{formErrors.email}</p>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formValues.password}
            onChange = {handleChange}
            placeholder="Password"
          />
        </Form.Group>
        <p>{formErrors.password}</p>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
