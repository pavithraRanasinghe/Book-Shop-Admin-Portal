import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  InputGroup,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import profileImage from "../../../assets/images/admin.png";
import Cart from "../../../pages/customer/Cart/Cart";

const Header: React.FC = () => {
  const [showCart, setShowCart] = useState(false);

  const handleRemoveItem = (id: number) => {
    console.log(`Removed item with id: ${id}`);
    // Add your logic for removing the item from the cart here
  };

  return (
    <Navbar className={styles.header} expand="lg">
      <Navbar.Brand href="#" className={styles.logo}>
        <div className={styles.avatar}>S</div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className={styles.navLink}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/books" className={styles.navLink}>
            Books
          </Nav.Link>
          <Nav.Link as={Link} to="/order" className={styles.navLink}>
            Orders
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" className={styles.navLink}>
            Contact
          </Nav.Link>
          <Nav.Link as={Link} to="/about-us" className={styles.navLink}>
            About Us
          </Nav.Link>
        </Nav>
        <Form className={styles.searchForm}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search"
              className={styles.searchInput}
            />
          </InputGroup>
        </Form>
        <div className={styles.icons}>
          <div className={styles.iconLink} onClick={() => setShowCart(true)}>
            <i className="bi bi-cart-check"></i>
          </div>
          <Link to="/login" className={styles.iconLink}>
            <Image
              src={profileImage}
              roundedCircle
              className={styles.profileImage}
            />
          </Link>
        </div>
      </Navbar.Collapse>
      {/* Cart Offcanvas */}
      <Cart
        show={showCart}
        onClose={() => setShowCart(false)}
        onRemoveItem={handleRemoveItem}
      />
    </Navbar>
  );
};

export default Header;
