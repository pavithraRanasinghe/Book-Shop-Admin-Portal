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
import contemporaryFictionImage from "../../../assets/images/cover/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg";
import harryPotterImage from "../../../assets/images/cover/harry-potter-deathly-hallows-book-cover-i214933.jpg";
import rustyMysteryImage from "../../../assets/images/cover/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg";

const cartItems = [
  {
    id: 1,
    title: "The Enigmatic Night",
    price: 12.99,
    quantity: 1,
    image: contemporaryFictionImage,
  },
  {
    id: 2,
    title: "Harry Potter: The Deathly Hallows",
    price: 18.99,
    quantity: 2,
    image: harryPotterImage,
  },
  {
    id: 3,
    title: "Rusty Mystery",
    price: 10.49,
    quantity: 1,
    image: rustyMysteryImage,
  },
];

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
          <Link to="/notifications" className={styles.iconLink}>
            <i className="bi bi-envelope position-relative">
              <span className={styles.notificationDot}></span>
            </i>
          </Link>
          <Link to="/profile" className={styles.iconLink}>
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
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
      />
    </Navbar>
  );
};

export default Header;
