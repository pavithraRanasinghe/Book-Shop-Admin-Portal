import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./routes/AdminRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import Login from "./pages/Login/Login";
import Register from "./pages/customer/Register/Register";

function App() {
  // const location = useLocation();
  // const isLoginPage =
  //   location.pathname === "/login" || location.pathname === "/register";
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* Customer Routes */}
      <Route path="/*" element={<CustomerRoutes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
