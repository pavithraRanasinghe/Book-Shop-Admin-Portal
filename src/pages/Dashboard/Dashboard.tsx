import React from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard: React.FC = () => {
  const stats = {
    books: 123,
    users: 45,
    orders: 67,
    revenue: 3456.78,
  };

  const recentOrders = [
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
  ];

  const chartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Orders",
        data: [12, 19, 8, 15, 10, 22, 18],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Revenue ($)",
        data: [200, 300, 150, 400, 250, 500, 350],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="dashboard">
      {/* Overview Cards */}
      <Row className="mb-4 gx-3">
        <Col md={3} sm={6}>
          <Card className="p-3 shadow-sm">
            <Card.Body>
              <Card.Title>Total Books</Card.Title>
              <h4 className="text-primary">{stats.books}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="p-3 shadow-sm">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <h4 className="text-primary">{stats.users}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="p-3 shadow-sm">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <h4 className="text-primary">{stats.orders}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="p-3 shadow-sm">
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <h4 className="text-primary">${stats.revenue.toFixed(2)}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts and Recent Orders */}
      <Row className="gx-3">
        <Col md={6}>
          <Card className="p-3 shadow-sm h-100">
            <Card.Body>
              <Card.Title>Orders and Revenue Trend</Card.Title>
              <Bar data={chartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3 shadow-sm h-100">
            <Card.Body>
              <Card.Title>Recent Orders</Card.Title>
              <Table responsive bordered hover className="align-middle mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>
                        {order.status === "Pending" ? (
                          <span className="badge bg-warning text-dark">
                            Pending
                          </span>
                        ) : order.status === "Delivered" ? (
                          <span className="badge bg-success">Delivered</span>
                        ) : (
                          <span className="badge bg-danger">Canceled</span>
                        )}
                      </td>
                      <td>${order.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
