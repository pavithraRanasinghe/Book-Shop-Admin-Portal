// Updated Orders Component
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Badge,
  Card,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import OrderModal from "./component/OrderModal";
import apiClient from "../../../configs/ApiClient"; // Import your Axios instance

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

interface OrderData {
  orderID: number;
  userID: number;
  customer: string;
  orderDate: string;
  totalAmount: number;
  orderStatus: string;
  orderItems: OrderItem[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Partial<OrderData>>({});
  const [isViewOnly, setIsViewOnly] = useState(false);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/Order");
        setOrders(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(
          err.response?.data ||
            "Failed to fetch orders. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOpenModal = (order: OrderData, viewOnly: boolean = false) => {
    setCurrentOrder(order);
    setIsViewOnly(viewOnly);
    setShowModal(true);
  };

  const handleUpdateStatus = (id: number, status: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderID === id ? { ...order, orderStatus: status } : order
      )
    );
  };

  return (
    <Card className="p-4 shadow-sm">
      <Row className="mb-4">
        <Col>
          <h2>Customer Orders</h2>
        </Col>
      </Row>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <Table responsive bordered hover className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Total ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderID}>
                <td>{order.orderID}</td>
                <td>{order.customer}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>
                  {order.orderStatus === "Pending" ? (
                    <Badge bg="warning" text="dark">
                      Pending
                    </Badge>
                  ) : order.orderStatus === "Delivered" ? (
                    <Badge bg="success">Delivered</Badge>
                  ) : (
                    <Badge bg="danger">Canceled</Badge>
                  )}
                </td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleOpenModal(order, true)}
                  >
                    <i className="bi bi-eye"></i>
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenModal(order)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <OrderModal
        show={showModal}
        onClose={() => setShowModal(false)}
        order={currentOrder}
        isViewOnly={isViewOnly}
        onStatusUpdate={handleUpdateStatus}
      />
    </Card>
  );
};

export default Orders;
