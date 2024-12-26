import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { CustomerData } from "../Users";

interface UserModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (customer: CustomerData) => void;
  initialUser?: Partial<CustomerData>;
  isEdit: boolean;
}

const UserModal: React.FC<UserModalProps> = ({
  show,
  onClose,
  onSave,
  initialUser,
  isEdit,
}) => {
  const [customer, setCustomer] = useState<Partial<CustomerData>>(
    initialUser || {}
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setCustomer(initialUser || {});
    setError(""); // Clear errors when modal opens
  }, [initialUser]);

  const handleChange = (field: keyof CustomerData, value: string | number) => {
    setCustomer({ ...customer, [field]: value });
  };

  const handleSubmit = () => {
    if (
      !customer.name ||
      !customer.email ||
      !customer.role ||
      !customer.status
    ) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    onSave(customer as CustomerData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? "Edit Customer" : "Add New Customer"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter customer name"
                  value={customer.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={customer.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={customer.role || ""}
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="RegisteredCustomer">
                    Registered Customer
                  </option>
                  <option value="GuestCustomer">Guest Customer</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={customer.status || ""}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
