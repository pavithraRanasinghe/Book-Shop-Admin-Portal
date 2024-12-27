import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import Login from "./pages/Login/Login";
import Register from "./pages/customer/Register/Register";
import CustomerRoutes from "./routes/CustomerRoutes";

const getUserRole = () => {
  const role = localStorage.getItem("role");

  if (!role) return null;

  return role;
};

// Protected Route Component for Role-Based Access
const RoleProtectedRoute: React.FC<{
  role: "Admin" | "Customer"; // Allowed roles
  children: React.ReactNode;
}> = ({ role, children }) => {
  const userRole = getUserRole();

  if (!userRole || userRole !== role) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If role matches, render the children
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <RoleProtectedRoute role="Admin">
            <AdminRoutes />
          </RoleProtectedRoute>
        }
      />

      {/* Customer Routes */}
      <Route
        path="/*"
        element={
          <RoleProtectedRoute role="Customer">
            <CustomerRoutes />
          </RoleProtectedRoute>
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
