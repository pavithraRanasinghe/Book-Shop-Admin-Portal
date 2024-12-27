import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./Login.module.css";
import loginImage from "../../assets/images/pexels-rickyrecap-1907785.jpg";
import apiClient from "../../configs/ApiClient";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/Auth", {
        email,
        password,
      });
      const { token, role } = response.data;

      // Store token (e.g., localStorage or context)
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", response.data.id);

      // Redirect to a dashboard or homepage
      if (role === "Admin") {
        navigate("/admin/dashboard");
      } else if (role === "Customer") {
        navigate("/");
      } else {
        console.log("Unknown role. Please contact support.");
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log(err.response.data);
      } else {
        console.log("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        {/* Left Section - Image and Text */}
        <div className={styles.leftSection}>
          <div className={styles.imageWrapper}>
            <img
              src={loginImage}
              alt="Admin Login"
              className={styles.leftImage}
            />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className={styles.rightSection}>
          <h2 className={styles.logo}>E-Book Login Panel</h2>
          <h4 className={styles.welcomeText}>Welcome to E-Book</h4>
          <Form onSubmit={handleLogin} className={styles.loginForm}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className={styles.extraOptions}>
              <Form.Check type="checkbox" label="Remember me" />
              <a href="/forgot-password" className={styles.forgotPassword}>
                Forgot password?
              </a>
            </div>

            <Button type="submit" className={styles.loginButton}>
              Sign In
            </Button>

            <div className={styles.divider}>or</div>

            <Button className={styles.googleButton}>Sign Up</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
