import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import Login from "./pages/Login/Login";
import Register from "./pages/customer/Register/Register";

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  // Check for the JWT token in localStorage (or wherever you store it)
  return !!localStorage.getItem("authToken");
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

      {/* Customer Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <CustomerRoutes />
          </ProtectedRoute>
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
