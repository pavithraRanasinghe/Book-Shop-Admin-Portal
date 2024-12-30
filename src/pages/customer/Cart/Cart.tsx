import React, { useState, useEffect } from "react";
import {
  Offcanvas,
  Button,
  ListGroup,
  Row,
  Col,
  Image,
  Spinner,
  Form,
} from "react-bootstrap";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../configs/ApiClient";

interface Book {
  bookID: number;
  title: string;
  price: number;
}

interface CartItem {
  cartItemID: number;
  book: Book;
  quantity: number;
}

interface CartOffcanvasProps {
  show: boolean;
  onClose: () => void;
  onRemoveItem: (cartItemID: number) => void;
}

const Cart: React.FC<CartOffcanvasProps> = ({
  show,
  onClose,
  onRemoveItem,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>(""); // For capturing payment method
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchCartDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/Cart/user/${userId}`);
      setCartItems(response.data.cartItems); // Extract cartItems from the response
    } catch (err: any) {
      setError(err.response?.data || "Failed to fetch cart details.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!paymentMethod) {
      setCheckoutError("Please select a payment method.");
      return;
    }

    try {
      const response = await apiClient.post("/Order", {
        userID: userId,
        paymentMethod,
      });
      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");
      onClose();
      navigate("/books");
    } catch (err: any) {
      setCheckoutError(err.response?.data || "Failed to process checkout.");
    }
  };

  useEffect(() => {
    if (show) {
      fetchCartDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  // New function for removing items
  const handleRemoveItem = async (cartItemID: number, bookID: number) => {
    try {
      await apiClient.delete(`/Cart/remove/${userId}/${bookID}`);
      fetchCartDetails();
    } catch (err: any) {
      console.error("Failed to remove item:", err);
      setError(err.response?.data || "Failed to remove item from the cart.");
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement="end"
      className={styles.cartOffcanvas}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {loading ? (
          <div className={styles.loading}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is empty!</p>
          </div>
        ) : (
          <>
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.cartItemID}
                  className={styles.cartItem}
                >
                  <Row>
                    <Col xs={3}>
                      <Image
                        src={`/images/${item.book.bookID}.jpg`} // Replace with actual image URL
                        alt={item.book.title}
                        fluid
                        rounded
                        className={styles.cartItemImage}
                      />
                    </Col>
                    <Col xs={6}>
                      <p className={styles.itemTitle}>{item.book.title}</p>
                      <p className={styles.itemPrice}>
                        ${item.book.price.toFixed(2)} x {item.quantity}
                      </p>
                    </Col>
                    <Col xs={3} className="text-end">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          handleRemoveItem(item.cartItemID, item.book.bookID)
                        }
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className={styles.cartSummary}>
              <p>
                <strong>Total:</strong> ${totalPrice.toFixed(2)}
              </p>
              <Form.Group className="mb-3">
                <Form.Label>Select Payment Method</Form.Label>
                <Form.Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="" disabled hidden>
                    -- Choose Payment Method --
                  </option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </Form.Select>
              </Form.Group>
              {checkoutError && <p className={styles.error}>{checkoutError}</p>}
              <Button
                variant="primary"
                onClick={handleCheckout}
                className={styles.checkoutButton}
                disabled={!paymentMethod}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
