import React, { useState } from "react";
import { Table, Button, Badge, Card, Row, Col } from "react-bootstrap";
import OrderModal from "./component/OrderModal";

interface OrderData {
  id: number;
  customer: string;
  date: string;
  status: string; // e.g., "Pending", "Delivered", "Canceled"
  total: number;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([
    {
      id: 101,
      customer: "John Doe",
      date: "2024-11-27",
      status: "Pending",
      total: 150.75,
    },
    {
      id: 102,
      customer: "Jane Smith",
      date: "2024-11-26",
      status: "Delivered",
      total: 200.0,
    },
    {
      id: 103,
      customer: "Bob Johnson",
      date: "2024-11-25",
      status: "Canceled",
      total: 0,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Partial<OrderData>>({});
  const [isViewOnly, setIsViewOnly] = useState(false);

  const handleOpenModal = (order: OrderData, viewOnly: boolean = false) => {
    setCurrentOrder(order);
    setIsViewOnly(viewOnly);
    setShowModal(true);
  };

  const handleUpdateStatus = (id: number, status: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order
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
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>
                {order.status === "Pending" ? (
                  <Badge bg="warning" text="dark">
                    Pending
                  </Badge>
                ) : order.status === "Delivered" ? (
                  <Badge bg="success">Delivered</Badge>
                ) : (
                  <Badge bg="danger">Canceled</Badge>
                )}
              </td>
              <td>${order.total.toFixed(2)}</td>
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
      <OrderModal
        show={showModal}
        onClose={() => setShowModal(false)}
        order={currentOrder}
        isViewOnly={isViewOnly}
        onUpdateStatus={handleUpdateStatus}
      />
    </Card>
  );
};

export default Orders;
