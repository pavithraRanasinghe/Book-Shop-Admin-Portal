import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "./Register.module.css";
import loginImage from "../../../assets/images/1326370.png";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Simulate registration (replace with actual API call)
    alert("Registration successful! (Replace with actual registration logic)");
    setError("");
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        {/* Left Section - Image and Text */}
        <div className={styles.leftSection}>
          <div className={styles.imageWrapper}>
            <img src={loginImage} alt="Register" className={styles.leftImage} />
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className={styles.rightSection}>
          <h2 className={styles.logo}>Create Account</h2>
          <Form onSubmit={handleSubmit} className={styles.registerForm}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className={`w-100 ${styles.registerButton}`}>
              Register
            </Button>

            <div className={styles.loginLink}>
              Already have an account? <a href="/login">Sign In</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
