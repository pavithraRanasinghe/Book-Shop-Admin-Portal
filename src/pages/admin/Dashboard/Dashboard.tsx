import React, { useEffect, useState } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import apiClient from "../../../configs/ApiClient";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch Stats
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/Dashboard/stats");
      setStats(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(
        err.response?.data || "Failed to fetch stats. Please try again later."
      );
      setLoading(false);
    }
  };

  // Fetch Recent Orders
  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/Dashboard/recent-orders");
      setRecentOrders(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(
        err.response?.data ||
          "Failed to fetch recent orders. Please try again later."
      );
      setLoading(false);
    }
  };

  // Fetch Chart Data
  // const fetchChartData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await apiClient.get("/Dashboard/chart-data");
  //     setChartData(response.data);
  //     setLoading(false);
  //   } catch (err: any) {
  //     setError(
  //       err.response?.data ||
  //         "Failed to fetch chart data. Please try again later."
  //     );
  //     setLoading(false);
  //   }
  // };

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchStats();
    fetchRecentOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      {/* Overview Cards */}
      <Row className="mb-4 gx-3">
        <Col md={3} sm={6}>
          <Card className="p-3 shadow-sm">
            <Card.Body>
              <Card.Title>Total Books</Card.Title>
              <h4 className="text-primary">{stats?.books}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="p-3 shadow-sm">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <h4 className="text-primary">{stats?.users}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="p-3 shadow-sm">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <h4 className="text-primary">{stats?.orders}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="p-3 shadow-sm">
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <h4 className="text-primary">${stats?.revenue.toFixed(2)}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts and Recent Orders */}
      <Row className="gx-3">
        {/* <Col md={6}>
          <Card className="p-3 shadow-sm h-100">
            <Card.Body>
              <Card.Title>Orders and Revenue Trend</Card.Title>
              <Bar data={chartData} />
            </Card.Body>
          </Card>
        </Col> */}
        <Col>
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
