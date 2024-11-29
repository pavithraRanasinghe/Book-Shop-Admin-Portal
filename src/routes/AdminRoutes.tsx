import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "../components/AdminLayout/Layout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Orders from "../pages/admin/Orders/Orders";
import Users from "../pages/admin/Users/Users";
import Book from "../pages/admin/Book/Book";
import Login from "../pages/Login/Login";
import Register from "../pages/customer/Register/Register";

const AdminRoutes: React.FC = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <Routes>
      {!isLoginPage ? (
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="book" element={<Book />} />
          <Route path="user" element={<Users />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      ) : (
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      )}
    </Routes>
  );
};

export default AdminRoutes;
