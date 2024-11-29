import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./routes/AdminRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";

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
    </Routes>
  );
}

export default App;
