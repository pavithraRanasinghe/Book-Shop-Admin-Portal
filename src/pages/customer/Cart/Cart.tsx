import React, { useEffect, useState } from "react";
import {
  Offcanvas,
  Button,
  ListGroup,
  Row,
  Col,
  Image,
  Spinner,
} from "react-bootstrap";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../configs/ApiClient";

interface Book {
  bookID: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  stockQuantity: number;
  isbn: string;
  publishedDate: string;
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
  const navigate = useNavigate();

  const fetchCartDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = localStorage.getItem("userId");

      const response = await apiClient.get(`/Cart/user/${userId}`);
      setCartItems(response.data.cartItems); // Extract cartItems from the response
    } catch (err: any) {
      setError(err.response?.data || "Failed to fetch cart details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchCartDetails();
    }
  }, [show]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  const onCheckout = () => {
    onClose();
    navigate("/checkout");
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
                        src={`/images/${item.book.bookID}.jpg`} // Replace with actual image URL if available
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
                        onClick={() => onRemoveItem(item.cartItemID)}
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
              <Button
                variant="primary"
                onClick={onCheckout}
                className={styles.checkoutButton}
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
