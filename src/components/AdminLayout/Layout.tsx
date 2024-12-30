import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import profileImage from "../../assets/images/admin.png";
import styles from "./Layout.module.css";

const Layout: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>("");

  // Update the date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(now.toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="light" expand="lg" className={styles.navbar}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/admin" className={styles.brand}>
            Admin Panel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <div className={styles.dateTime}>{dateTime}</div>

            <Nav>
              <Nav.Link href="/login" className={styles.profile}>
                <img
                  src={profileImage}
                  alt="Profile"
                  className={styles.profilePic}
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar and Content Layout */}
      <Container fluid className={styles.layout}>
        <Row>
          {/* Sidebar */}
          <Col md={2} className={styles.sidebar}>
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/admin/dashboard"
                className={styles.navItem}
              >
                <i className="bi bi-speedometer2"></i> Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/book" className={styles.navItem}>
                <i className="bi bi-book"></i> Books
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/user" className={styles.navItem}>
                <i className="bi bi-people"></i>Users
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/orders" className={styles.navItem}>
                <i className="bi bi-gear"></i> Orders
              </Nav.Link>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col md={10} className={styles.content}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
