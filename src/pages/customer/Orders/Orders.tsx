import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import styles from "./Orders.module.css";
import apiClient from "../../../configs/ApiClient";

interface OrderItem {
  orderItemID: number;
  book: {
    title: string;
    author: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  orderID: number;
  status: string;
  createdDate: string;
  totalAmount: number;
  orderItems: OrderItem[];
}

const CustomerOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");

  // Fetch orders from the API
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/Order"); // Replace with your API endpoint
      setOrders(response.data);
      setFilteredOrders(response.data); // Initially display all orders
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (status: string) => {
    console.log(status);
    setFilterStatus(status);
    if (status === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order: any) => order.orderStatus === status)
      );
    }
  };

 const handleRemoveOrder = async (orderID: number) => {
   try {
     const response = await apiClient.delete(`/Order/${orderID}`);

     if (response.status === 200) {
       // Update the orders state to reflect the removed order
       setOrders((prevOrders) =>
         prevOrders.filter((order) => order.orderID !== orderID)
       );
       setFilteredOrders((prevOrders) =>
         prevOrders.filter((order) => order.orderID !== orderID)
       );

       alert(response.data);
     }
   } catch (err: any) {
     if (err.response && err.response.status === 404) {
       alert(`Error: ${err.response.data}`); // Display error message for not found
     } else {
       alert("Failed to remove the order. Please try again later.");
     }
   }
 };


  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={styles.ordersPage}>
      <Container>
        <h2 className={styles.pageTitle}>Your Orders</h2>

        {/* Filter Dropdown */}
        <DropdownButton
          id="filter-dropdown"
          title={`Filter by Status: ${filterStatus}`}
          className="mb-4"
          onSelect={(status) => handleFilterChange(status || "All")}
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
          <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
          <Dropdown.Item eventKey="Cancelled">Cancelled</Dropdown.Item>
        </DropdownButton>

        {loading ? (
          <Spinner animation="border" className="d-block mx-auto mt-4" />
        ) : error ? (
          <Alert variant="danger" className="mt-4">
            {error}
          </Alert>
        ) : filteredOrders.length === 0 ? (
          <Alert variant="info" className="mt-4">
            No orders match the selected status.
          </Alert>
        ) : (
          <Row>
            {filteredOrders.map((order) => (
              <Col md={6} key={order.orderID} className="mb-4">
                <Card className={styles.orderCard}>
                  <Card.Header>
                    <strong>Order #{order.orderID}</strong>
                    <Badge
                      bg={
                        order.status === "Completed"
                          ? "success"
                          : order.status === "Pending"
                          ? "warning"
                          : "secondary"
                      }
                      className={styles.statusBadge}
                    >
                      {order.status}
                    </Badge>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className={styles.orderDate}>
                      Placed on:{" "}
                      {new Date(order.createdDate).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text className={styles.totalAmount}>
                      Total: ${order.totalAmount.toFixed(2)}
                    </Card.Text>

                    <ul className={styles.orderItemsList}>
                      {order.orderItems.map((item) => (
                        <li key={item.orderItemID}>
                          <strong>{item.book.title}</strong> by{" "}
                          {item.book.author} - {item.quantity} x $
                          {item.book.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>

                    {filterStatus === "Pending" && (
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveOrder(order.orderID)}
                        className={styles.removeButton}
                      >
                        Remove Order
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default CustomerOrders;
