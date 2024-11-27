import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const Login: React.FC = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form style={{ width: "300px" }}>
        <h2 className="text-center mb-4">Admin Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
