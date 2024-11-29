import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./components/AdminLayout/Layout";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Book from "./pages/admin/Book/Book";
import Users from "./pages/admin/Users/Users";
import Orders from "./pages/admin/Orders/Orders";
import Register from "./pages/customer/Register/Register";

function App() {
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
}

// const App: React.FC = () => (
//   <Router>
//     <AdminRoutes />
//     <CustomerRoutes />
//   </Router>
// );
export default App;
