import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import styles from "./Checkout.module.css";

const Checkout: React.FC = () => {
  const cartItems = [
    { id: 1, title: "The Great Gatsby", price: 10.99, quantity: 1 },
    { id: 2, title: "1984", price: 8.99, quantity: 2 },
  ];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    // Add logic for placing the order here
  };

  return (
    <Container className={styles.checkoutPage}>
      <h2 className={styles.pageTitle}>Checkout</h2>
      <Row>
        {/* Billing Details Section */}
        <Col md={6}>
          <h4 className={styles.sectionTitle}>Billing Details</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="name"
                value={billingDetails.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your address"
                name="address"
                value={billingDetails.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                name="city"
                value={billingDetails.city}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your ZIP code"
                name="zip"
                value={billingDetails.zip}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Col>

        {/* Order Summary Section */}
        <Col md={6}>
          <h4 className={styles.sectionTitle}>Order Summary</h4>
          <Card className={styles.orderSummaryCard}>
            <Card.Body>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className={styles.orderItem}>
                    <Row>
                      <Col xs={8}>{item.title}</Col>
                      <Col xs={4} className="text-end">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className={styles.orderTotal}>
                <p>
                  <strong>Total:</strong> ${totalPrice.toFixed(2)}
                </p>
              </div>
            </Card.Body>
          </Card>
          <Button
            variant="primary"
            className={styles.placeOrderButton}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
