import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string; // "Active" or "Inactive"
}

interface UserModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  initialUser?: Partial<User>;
  isEdit: boolean;
}

const UserModal: React.FC<UserModalProps> = ({
  show,
  onClose,
  onSave,
  initialUser,
  isEdit,
}) => {
  const [user, setUser] = useState<Partial<User>>(initialUser || {});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setUser(initialUser || {});
    setError(""); // Clear errors when modal opens
  }, [initialUser]);

  const handleChange = (field: keyof User, value: string | number) => {
    setUser({ ...user, [field]: value });
  };

  const handleSubmit = () => {
    if (!user.name || !user.email || !user.role || !user.status) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    onSave(user as User);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Edit User" : "Add New User"}</Modal.Title>
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
                  placeholder="Enter user name"
                  value={user.name || ""}
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
                  value={user.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={user.role || ""}
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={user.status || ""}
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
