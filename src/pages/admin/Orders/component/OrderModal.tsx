// Updated OrderModal Component
import React, { useState } from "react";
import { Modal, Button, Form, Badge, Table, Alert } from "react-bootstrap";
import apiClient from "../../../../configs/ApiClient";

interface Book {
  bookID: number;
  title: string;
  author: string;
  price: number;
}

interface OrderItem {
  orderItemID: number;
  bookID: number;
  quantity: number;
  subtotal: number;
  book: Book;
}

interface Order {
  orderID: number;
  userID: number;
  customer: string;
  orderDate: string;
  totalAmount: number;
  orderStatus: string;
  orderItems: OrderItem[];
}

interface OrderModalProps {
  show: boolean;
  onClose: () => void;
  order: Partial<Order>;
  isViewOnly: boolean;
  onStatusUpdate: (orderID: number, newStatus: string) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  show,
  onClose,
  order,
  isViewOnly,
  onStatusUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleStatusChange = async (status: string) => {
    if (!order.orderID) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.put(`/Order/${order.orderID}/status`, {
        newStatus: status,
      });
      onStatusUpdate(order.orderID, status);
      console.log(response.data);
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data || "Failed to update order status. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{order.customer}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>
          <strong>Customer:</strong> User #{order.userID}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.orderDate || "").toLocaleString()}
        </p>
        <p>
          <strong>Total:</strong> ${order.totalAmount?.toFixed(2)}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {order.orderStatus === "Pending" ? (
            <Badge bg="warning" text="dark">
              Pending
            </Badge>
          ) : order.orderStatus === "Delivered" ? (
            <Badge bg="success">Delivered</Badge>
          ) : (
            <Badge bg="danger">Canceled</Badge>
          )}
        </p>

        <h5>Order Items</h5>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price ($)</th>
              <th>Quantity</th>
              <th>Subtotal ($)</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems?.map((item, index) => (
              <tr key={item.orderItemID}>
                <td>{index + 1}</td>
                <td>{item.book.title}</td>
                <td>{item.book.author}</td>
                <td>{item.book.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>{item.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {!isViewOnly && (
          <Form>
            <Form.Group controlId="formStatus">
              <Form.Label>Update Status</Form.Label>
              <Form.Select
                defaultValue={order.orderStatus || "Pending"}
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
            disabled={loading}
          >
            Mark as Delivered
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
