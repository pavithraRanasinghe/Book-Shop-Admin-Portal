import React from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";

interface Order {
  id: number;
  customer: string;
  date: string;
  status: string;
  total: number;
}

interface OrderModalProps {
  show: boolean;
  onClose: () => void;
  order: Partial<Order>;
  isViewOnly: boolean;
  onUpdateStatus: (id: number, status: string) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  show,
  onClose,
  order,
  isViewOnly,
  onUpdateStatus,
}) => {
  const handleStatusChange = (status: string) => {
    if (order.id) {
      onUpdateStatus(order.id, status);
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Order #{order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Customer:</strong> {order.customer}
        </p>
        <p>
          <strong>Date:</strong> {order.date}
        </p>
        <p>
          <strong>Total:</strong> ${order.total?.toFixed(2)}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {order.status === "Pending" ? (
            <Badge bg="warning" text="dark">
              Pending
            </Badge>
          ) : order.status === "Delivered" ? (
            <Badge bg="success">Delivered</Badge>
          ) : (
            <Badge bg="danger">Canceled</Badge>
          )}
        </p>
        {!isViewOnly && (
          <Form>
            <Form.Group controlId="formStatus">
              <Form.Label>Update Status</Form.Label>
              <Form.Select
                defaultValue={order.status || "Pending"}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
              </Form.Select>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {!isViewOnly && (
          <Button
            variant="primary"
            onClick={() => handleStatusChange("Delivered")}
          >
            Mark as Delivered
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
