import React from "react";
import { Offcanvas, Button, ListGroup, Row, Col, Image } from "react-bootstrap";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartOffcanvasProps {
  show: boolean;
  onClose: () => void;
  cartItems: CartItem[]; // Pass cart items using updated book data
  onRemoveItem: (id: number) => void;
}

const Cart: React.FC<CartOffcanvasProps> = ({
  show,
  onClose,
  cartItems,
  onRemoveItem,
}) => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
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
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is empty!</p>
          </div>
        ) : (
          <>
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id} className={styles.cartItem}>
                  <Row>
                    <Col xs={3}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fluid
                        rounded
                        className={styles.cartItemImage}
                      />
                    </Col>
                    <Col xs={6}>
                      <p className={styles.itemTitle}>{item.title}</p>
                      <p className={styles.itemPrice}>
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </Col>
                    <Col xs={3} className="text-end">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
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
