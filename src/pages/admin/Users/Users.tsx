import React, { useState } from "react";
import { Table, Button, Badge, Card, Row, Col } from "react-bootstrap";
import UserModal from "./component/UserModal";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string; // "Active" or "Inactive"
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "Viewer",
      status: "Active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<UserData>>({});
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenModal = (user?: UserData) => {
    if (user) {
      setCurrentUser(user);
      setIsEdit(true);
    } else {
      setCurrentUser({});
      setIsEdit(false);
    }
    setShowModal(true);
  };

  const handleSaveUser = (user: UserData) => {
    if (isEdit) {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? { ...u, ...user } : u))
      );
    } else {
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...user, id: prevUsers.length + 1 },
      ]);
    }
    setShowModal(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <Card className="p-4 shadow-sm">
      <Row className="mb-4">
        <Col>
          <h2>Users</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => handleOpenModal()}>
            + Add New User
          </Button>
        </Col>
      </Row>
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.status === "Active" ? (
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
                  onClick={() => handleOpenModal(user)}
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UserModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveUser}
        initialUser={currentUser}
        isEdit={isEdit}
      />
    </Card>
  );
};

export default Users;
