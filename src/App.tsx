import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <Routes>
      {!isLoginPage ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      ) : (
        <Route>
          <Route path="/login" element={<Login />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
