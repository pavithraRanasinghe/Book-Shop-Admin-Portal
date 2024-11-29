import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/AdminLayout/Layout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Orders from "../pages/admin/Orders/Orders";
import Users from "../pages/admin/Users/Users";

const AdminRoutes: React.FC = () => (
  <Routes>
    <Route path="/admin" element={<Layout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="orders" element={<Orders />} />
      <Route path="users" element={<Users />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
