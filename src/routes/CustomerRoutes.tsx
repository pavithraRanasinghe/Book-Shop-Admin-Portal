import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/AdminLayout/Layout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";

const CustomerRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      {/* <Route path="cart" element={<Cart />} /> */}
    </Route>
  </Routes>
);

export default CustomerRoutes;
