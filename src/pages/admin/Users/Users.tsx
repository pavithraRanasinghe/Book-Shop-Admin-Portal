import React, { useEffect, useState } from "react";
import { Table, Button, Badge, Card, Row, Col, Spinner } from "react-bootstrap";
import UserModal from "./component/UserModal"; // Assuming UserModal handles input and save
import apiClient from "../../../configs/ApiClient";

export interface CustomerData {
  userID: number;
  name: string;
  email: string;
  role: string; // "Admin", "RegisteredCustomer", "GuestCustomer"
  status: string; // "Active" or "Inactive"
}

const Users: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Partial<CustomerData>>(
    {}
  );
  const [isEdit, setIsEdit] = useState(false);

  // Fetch customers from the API
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/Customer");
      setCustomers(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpenModal = (customer?: CustomerData) => {
    if (customer) {
      setCurrentCustomer(customer);
      setIsEdit(true);
    } else {
      setCurrentCustomer({});
      setIsEdit(false);
    }
    setShowModal(true);
  };

  const handleSaveCustomer = async (customer: CustomerData) => {
    try {
      if (isEdit) {
        await apiClient.put(`/Customer/${customer.userID}`, customer);
      } else {
        await apiClient.post("/Customer", customer);
      }
      fetchCustomers();
    } catch (err) {
      setError("Failed to save customer.");
    }
    setShowModal(false);
  };

  const handleDeleteCustomer = async (id: number) => {
    try {
      await apiClient.delete(`/Customer/${id}`);
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.userID !== id)
      );
    } catch (err) {
      setError("Failed to delete customer.");
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <Row className="mb-4">
        <Col>
          <h2>Customers</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => handleOpenModal()}>
            + Add New Customer
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Table responsive bordered hover className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.userID}>
                <td>{customer.userID}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.role}</td>
                <td>
                  {customer.status === "Active" ? (
                    <Badge bg="success">Active</Badge>
                  ) : (
                    <Badge bg="danger">Inactive</Badge>
                  )}
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleOpenModal(customer)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteCustomer(customer.userID)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <UserModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveCustomer}
        initialUser={currentCustomer}
        isEdit={isEdit}
      />
    </Card>
  );
};

export default Users;
