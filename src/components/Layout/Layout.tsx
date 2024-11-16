import React from "react";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import navbarStyles from "./Navbar.module.css";
import sidebarStyles from "./Sidebar.module.css";

/**
 * Check out the Navbar component from React Bootstrap:
 * https://react-bootstrap.netlify.app/docs/components/navbar
 *
 * https://react-bootstrap.netlify.app/docs/components/offcanvas -- For the sidebar
 */
const Layout: React.FC = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Admin Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
              <Nav.Link as={Link} to="/reports">
                Reports
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={2} className="bg-light vh-100 p-3">
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
              <Nav.Link as={Link} to="/reports">
                Reports
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={10} className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
